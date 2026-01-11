"use client";

import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Heart,
  CreditCard,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useApiWithAuth } from "@/hooks/useApiWithAuth";
import type { TransactionStatus } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated, token } = useAuth();
  const { getOrderStatus } = useApiWithAuth();
  const { t, language } = useLanguage();

  const [status, setStatus] = useState<TransactionStatus | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [copied, setCopied] = useState(false);

  // Parse URL parameters - support both backend redirect and direct VNPay params
  const paymentInfo = useMemo(() => {
    // Check for backend processed params first
    const backendSuccess = searchParams.get("success");
    const backendOrderId = searchParams.get("orderId");
    const backendMessage = searchParams.get("message");
    const backendAmount = searchParams.get("amount");

    if (backendSuccess !== null) {
      return {
        success: backendSuccess === "true",
        orderId: backendOrderId,
        message: backendMessage,
        amount: backendAmount ? Number(backendAmount) : null,
        source: "backend" as const,
      };
    }

    // Check for direct VNPay params
    const vnpResponseCode = searchParams.get("vnp_ResponseCode");
    const vnpTransactionStatus = searchParams.get("vnp_TransactionStatus");
    const vnpAmount = searchParams.get("vnp_Amount");
    const vnpTxnRef = searchParams.get("vnp_TxnRef");
    const vnpBankCode = searchParams.get("vnp_BankCode");
    const vnpOrderInfo = searchParams.get("vnp_OrderInfo");
    const vnpPayDate = searchParams.get("vnp_PayDate");
    const vnpTransactionNo = searchParams.get("vnp_TransactionNo");

    if (vnpResponseCode !== null) {
      // VNPay response codes: 00 = success
      const isSuccess =
        vnpResponseCode === "00" && vnpTransactionStatus === "00";

      // VNPay amount is in VND * 100
      const amountInVND = vnpAmount ? Number(vnpAmount) / 100 : null;

      // Parse pay date (format: yyyyMMddHHmmss)
      let formattedPayDate: string | null = null;
      if (vnpPayDate) {
        const year = vnpPayDate.substring(0, 4);
        const month = vnpPayDate.substring(4, 6);
        const day = vnpPayDate.substring(6, 8);
        const hour = vnpPayDate.substring(8, 10);
        const minute = vnpPayDate.substring(10, 12);
        const second = vnpPayDate.substring(12, 14);
        formattedPayDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
      }

      return {
        success: isSuccess,
        orderId: vnpTxnRef,
        message: isSuccess
          ? language === "vi"
            ? "Thanh toán thành công"
            : "Payment successful"
          : getVNPayErrorMessage(vnpResponseCode, language),
        amount: amountInVND,
        source: "vnpay" as const,
        bankCode: vnpBankCode,
        orderInfo: vnpOrderInfo
          ? decodeURIComponent(vnpOrderInfo.replace(/\+/g, " "))
          : null,
        payDate: formattedPayDate,
        transactionNo: vnpTransactionNo,
        responseCode: vnpResponseCode,
      };
    }

    // No valid params found
    return {
      success: false,
      orderId: null,
      message:
        language === "vi"
          ? "Không tìm thấy thông tin thanh toán"
          : "Payment information not found",
      amount: null,
      source: "unknown" as const,
    };
  }, [searchParams, language]);

  // Poll order status to check blockchain transaction
  useEffect(() => {
    if (
      !paymentInfo.success ||
      !paymentInfo.orderId ||
      !isAuthenticated ||
      !token
    )
      return;

    const pollStatus = async () => {
      setIsPolling(true);

      let attempts = 0;
      const maxAttempts = 20;
      const interval = 3000;

      while (attempts < maxAttempts) {
        try {
          const result = await getOrderStatus(paymentInfo.orderId!);

          if (result.success) {
            setStatus(result.data.status);
            setTxHash(result.data.txHash);

            // Stop polling if terminal state
            if (
              result.data.status === "completed" ||
              result.data.status === "failed" ||
              result.data.status === "expired"
            ) {
              break;
            }
          }
        } catch (err) {
          console.error("Failed to get order status:", err);
        }

        attempts++;
        await new Promise((resolve) => setTimeout(resolve, interval));
      }

      setIsPolling(false);
    };

    pollStatus();
  }, [
    paymentInfo.success,
    paymentInfo.orderId,
    isAuthenticated,
    token,
    getOrderStatus,
  ]);

  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat("vi-VN").format(amt);
  };

  const handleCopyOrderId = async () => {
    if (paymentInfo.orderId) {
      await navigator.clipboard.writeText(paymentInfo.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-amber-200">
          <Sparkles className="w-12 h-12" />
        </div>
        <div className="absolute top-40 right-20 text-amber-200">
          <Heart className="w-10 h-10" />
        </div>
        <div className="absolute bottom-40 left-1/4 text-amber-200">
          <CreditCard className="w-8 h-8" />
        </div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-lg w-full">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div
              className={cn(
                "relative p-10 text-center overflow-hidden",
                paymentInfo.success
                  ? "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500"
                  : "bg-gradient-to-br from-red-400 via-rose-500 to-pink-500"
              )}
            >
              {/* Animated circles background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />
              </div>

              <div className="relative">
                {/* Icon */}
                <div
                  className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
                    "bg-white/20 backdrop-blur-sm",
                    paymentInfo.success && "animate-bounce-slow"
                  )}
                >
                  {paymentInfo.success ? (
                    <CheckCircle2 className="w-14 h-14 text-white" />
                  ) : (
                    <XCircle className="w-14 h-14 text-white" />
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-white mb-3">
                  {paymentInfo.success
                    ? t.paymentResult.success
                    : t.paymentResult.failed}
                </h1>
                <p className="text-white/90 text-lg">
                  {paymentInfo.success
                    ? t.paymentResult.thankYou
                    : paymentInfo.message ||
                      (language === "vi"
                        ? "Đã có lỗi xảy ra trong quá trình thanh toán"
                        : "An error occurred during payment")}
                </p>

                {/* Amount Badge */}
                {paymentInfo.amount && (
                  <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                    <p className="text-white/80 text-sm mb-1">
                      {t.paymentResult.amount}
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatAmount(paymentInfo.amount)}{" "}
                      <span className="text-lg font-normal">VNĐ</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-5">
              {/* Order ID */}
              {paymentInfo.orderId && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {t.paymentResult.orderId}
                      </p>
                      <p className="font-mono text-sm text-gray-800 break-all">
                        {paymentInfo.orderId}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyOrderId}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title={t.common.copy}
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* VNPay specific info */}
              {paymentInfo.source === "vnpay" && (
                <div className="grid grid-cols-2 gap-4">
                  {paymentInfo.bankCode && (
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-blue-600 mb-1">
                        {language === "vi" ? "Ngân hàng" : "Bank"}
                      </p>
                      <p className="font-semibold text-blue-800">
                        {paymentInfo.bankCode}
                      </p>
                    </div>
                  )}
                  {paymentInfo.transactionNo && (
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-purple-600 mb-1">
                        {language === "vi" ? "Mã giao dịch" : "Transaction ID"}
                      </p>
                      <p className="font-semibold text-purple-800">
                        {paymentInfo.transactionNo}
                      </p>
                    </div>
                  )}
                  {paymentInfo.payDate && (
                    <div className="col-span-2 bg-amber-50 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <p className="text-sm text-amber-600">
                          {language === "vi"
                            ? "Thời gian thanh toán"
                            : "Payment time"}
                        </p>
                      </div>
                      <p className="font-semibold text-amber-800 mt-1">
                        {paymentInfo.payDate}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Blockchain Status */}
              {paymentInfo.success && isAuthenticated && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span className="font-medium text-amber-800">
                        {language === "vi"
                          ? "Trạng thái blockchain"
                          : "Blockchain status"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isPolling && (
                        <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                      )}
                      <StatusBadge status={status} language={language} />
                    </div>
                  </div>

                  {/* Transaction Hash */}
                  {txHash && (
                    <a
                      href={`https://explorer.sepolia.mantle.xyz/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 bg-white/50 rounded-lg px-3 py-2 mt-2"
                    >
                      <span className="truncate font-mono">{txHash}</span>
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                  )}

                  {!txHash && status !== "completed" && (
                    <p className="text-sm text-amber-600 mt-2">
                      {isPolling
                        ? language === "vi"
                          ? "Đang xử lý giao dịch trên blockchain..."
                          : "Processing transaction on blockchain..."
                        : language === "vi"
                        ? "Token sẽ được chuyển vào ví của bạn trong giây lát"
                        : "Tokens will be transferred to your wallet shortly"}
                    </p>
                  )}
                </div>
              )}

              {/* Error details for failed payments */}
              {!paymentInfo.success &&
                paymentInfo.responseCode &&
                paymentInfo.responseCode !== "00" && (
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <p className="text-sm text-red-600 mb-1">
                      {language === "vi" ? "Mã lỗi:" : "Error code:"}{" "}
                      {paymentInfo.responseCode}
                    </p>
                    <p className="text-red-800">
                      {getVNPayErrorMessage(paymentInfo.responseCode, language)}
                    </p>
                  </div>
                )}

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Actions */}
              <div className="space-y-3 pt-2">
                {paymentInfo.success ? (
                  <>
                    <Link href="/children" className="block">
                      <Button
                        className={cn(
                          "w-full h-12 rounded-xl text-lg font-semibold",
                          "bg-gradient-to-r from-amber-500 to-orange-500",
                          "hover:from-amber-600 hover:to-orange-600",
                          "text-white shadow-lg hover:shadow-xl transition-all",
                          "hover:cursor-pointer"
                        )}
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        {language === "vi"
                          ? "Tiếp tục đỡ đầu các em"
                          : "Continue sponsoring children"}
                      </Button>
                    </Link>
                    <Link href="/payment" className="block">
                      <Button
                        variant="outline"
                        className="w-full h-11 rounded-xl border-amber-300 text-amber-600 hover:bg-amber-50 hover:cursor-pointer"
                      >
                        {t.payment.viewAllTransactions}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/payment" className="block">
                      <Button
                        className={cn(
                          "w-full h-12 rounded-xl text-lg font-semibold",
                          "bg-gradient-to-r from-amber-500 to-orange-500",
                          "hover:from-amber-600 hover:to-orange-600",
                          "text-white shadow-lg hover:shadow-xl transition-all",
                          "hover:cursor-pointer"
                        )}
                      >
                        {t.paymentResult.tryAgain}
                      </Button>
                    </Link>
                  </>
                )}

                <Link href="/" className="block">
                  <Button
                    variant="ghost"
                    className="w-full h-11 rounded-xl text-gray-600 hover:text-gray-800 hover:cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.common.backToHome}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {language === "vi"
                ? "Mọi giao dịch đều được ghi nhận minh bạch trên blockchain"
                : "All transactions are transparently recorded on the blockchain"}
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                🔒 {language === "vi" ? "Bảo mật SSL" : "SSL Secure"}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                ⛓️ Blockchain
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                💳 VNPay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
  language,
}: {
  status: TransactionStatus | null;
  language: string;
}) {
  if (!status) {
    return (
      <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
        {language === "vi" ? "Đang kiểm tra..." : "Checking..."}
      </span>
    );
  }

  const statusConfigVi: Record<
    TransactionStatus,
    { bg: string; text: string; label: string }
  > = {
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      label: "Chờ xử lý",
    },
    processing: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Đang xử lý",
    },
    completed: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      label: "✓ Hoàn thành",
    },
    failed: { bg: "bg-red-100", text: "text-red-700", label: "Thất bại" },
    expired: { bg: "bg-gray-100", text: "text-gray-700", label: "Hết hạn" },
  };

  const statusConfigEn: Record<
    TransactionStatus,
    { bg: string; text: string; label: string }
  > = {
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      label: "Pending",
    },
    processing: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Processing",
    },
    completed: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      label: "✓ Completed",
    },
    failed: { bg: "bg-red-100", text: "text-red-700", label: "Failed" },
    expired: { bg: "bg-gray-100", text: "text-gray-700", label: "Expired" },
  };

  const config =
    language === "vi" ? statusConfigVi[status] : statusConfigEn[status];

  return (
    <span
      className={`px-3 py-1.5 ${config.bg} ${config.text} text-xs font-medium rounded-full`}
    >
      {config.label}
    </span>
  );
}

function getVNPayErrorMessage(code: string, language: string): string {
  const errorMessagesVi: Record<string, string> = {
    "00": "Giao dịch thành công",
    "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)",
    "09": "Giao dịch không thành công do: Thẻ/Tài khoản chưa đăng ký dịch vụ InternetBanking",
    "10": "Giao dịch không thành công do: Khách hàng xác thực sai quá 3 lần",
    "11": "Giao dịch không thành công do: Đã hết hạn chờ thanh toán",
    "12": "Giao dịch không thành công do: Thẻ/Tài khoản bị khóa",
    "13": "Giao dịch không thành công do: Bạn nhập sai mật khẩu OTP",
    "24": "Giao dịch không thành công do: Khách hàng hủy giao dịch",
    "51": "Giao dịch không thành công do: Tài khoản không đủ số dư",
    "65": "Giao dịch không thành công do: Tài khoản đã vượt quá hạn mức giao dịch trong ngày",
    "75": "Ngân hàng thanh toán đang bảo trì",
    "79": "Giao dịch không thành công do: Nhập sai mật khẩu thanh toán quá số lần quy định",
    "99": "Lỗi không xác định",
  };

  const errorMessagesEn: Record<string, string> = {
    "00": "Transaction successful",
    "07": "Deduction successful. Transaction suspected (related to fraud, abnormal transaction)",
    "09": "Transaction failed: Card/Account not registered for InternetBanking service",
    "10": "Transaction failed: Customer authentication failed 3 times",
    "11": "Transaction failed: Payment waiting period expired",
    "12": "Transaction failed: Card/Account is locked",
    "13": "Transaction failed: Wrong OTP password",
    "24": "Transaction failed: Customer cancelled transaction",
    "51": "Transaction failed: Insufficient account balance",
    "65": "Transaction failed: Account exceeded daily transaction limit",
    "75": "Payment bank is under maintenance",
    "79": "Transaction failed: Payment password entered incorrectly too many times",
    "99": "Unknown error",
  };

  const errorMessages = language === "vi" ? errorMessagesVi : errorMessagesEn;
  return (
    errorMessages[code] ||
    (language === "vi"
      ? `Lỗi không xác định (Mã: ${code})`
      : `Unknown error (Code: ${code})`)
  );
}

function PaymentResultLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            </div>
            <p className="text-xl font-medium text-gray-700 mb-2">
              Processing...
            </p>
            <p className="text-gray-500">Please wait a moment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={<PaymentResultLoading />}>
      <PaymentResultContent />
    </Suspense>
  );
}
