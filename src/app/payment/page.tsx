"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  Coins,
  History,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import type {
  Transaction,
  TransactionStatus,
  ExchangeRateResponse,
} from "@/lib/api/types";
import { cn } from "@/lib/utils";

// Predefined amounts in VND
const PRESET_AMOUNTS = [50000, 100000, 200000, 500000, 1000000, 2000000];

// Bank options
const BANK_OPTIONS = [
  { code: "", name: "Tất cả ngân hàng", icon: "🏦" },
  { code: "NCB", name: "NCB", icon: "🏛️" },
  { code: "VIETCOMBANK", name: "Vietcombank", icon: "💳" },
  { code: "TECHCOMBANK", name: "Techcombank", icon: "🔷" },
  { code: "MBBANK", name: "MB Bank", icon: "💜" },
  { code: "VPBANK", name: "VPBank", icon: "💚" },
];

const statusConfig: Record<
  TransactionStatus,
  { icon: React.ReactNode; label: string; color: string }
> = {
  pending: {
    icon: <Clock className="w-4 h-4" />,
    label: "Đang chờ",
    color: "text-yellow-600 bg-yellow-50",
  },
  processing: {
    icon: <Loader2 className="w-4 h-4 animate-spin" />,
    label: "Đang xử lý",
    color: "text-blue-600 bg-blue-50",
  },
  completed: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    label: "Hoàn thành",
    color: "text-emerald-600 bg-emerald-50",
  },
  failed: {
    icon: <XCircle className="w-4 h-4" />,
    label: "Thất bại",
    color: "text-red-600 bg-red-50",
  },
  expired: {
    icon: <AlertCircle className="w-4 h-4" />,
    label: "Hết hạn",
    color: "text-gray-600 bg-gray-50",
  },
};

function PaymentContent() {
  const searchParams = useSearchParams();
  const {
    isAuthenticated,
    isConnected,
    token,
    login,
    isLoading: authLoading,
  } = useAuth();

  // Get child info from URL params (when coming from child detail page)
  const childId = searchParams.get("childId");
  const childName = searchParams.get("childName");
  const initialAmount = searchParams.get("amount");

  // Form state
  const [amount, setAmount] = useState<number>(
    initialAmount ? parseInt(initialAmount, 10) : 100000
  );
  const [customAmount, setCustomAmount] = useState<string>(initialAmount || "");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data state
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse | null>(
    null
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingRate, setIsLoadingRate] = useState(true);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  // Fetch exchange rate on mount
  useEffect(() => {
    const fetchRate = async () => {
      setIsLoadingRate(true);
      try {
        const result = await api.payment.getExchangeRate();
        if (result.success) {
          setExchangeRate(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch exchange rate:", err);
      } finally {
        setIsLoadingRate(false);
      }
    };

    fetchRate();
  }, []);

  // Fetch transactions when authenticated
  const fetchTransactions = useCallback(async () => {
    if (!token) return;

    setIsLoadingTransactions(true);
    try {
      const result = await api.payment.getTransactions(token, 10);
      if (result.success) {
        setTransactions(result.data.transactions);
      }
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setIsLoadingTransactions(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchTransactions();
    }
  }, [isAuthenticated, token, fetchTransactions]);

  // Calculate token amount
  const tokenAmount =
    exchangeRate && amount
      ? (amount / exchangeRate.vndPerToken).toFixed(2)
      : "0";

  // Handle amount selection
  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomAmount(value);
    if (value) {
      setAmount(parseInt(value, 10));
    }
  };

  // Handle payment submission
  const handleSubmit = async () => {
    if (!isAuthenticated || !token) {
      setError("Vui lòng đăng nhập để thanh toán");
      return;
    }

    if (amount < 10000) {
      setError("Số tiền tối thiểu là 10,000 VNĐ");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await api.payment.create(token, {
        amount,
        bankCode: selectedBank || undefined,
        language: "vn",
      });

      if (result.success) {
        // Redirect to VNPay payment URL
        window.location.href = result.data.paymentUrl;
      } else {
        setError(result.error || "Không thể tạo thanh toán");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      console.error("Payment error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format currency
  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-white/20">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="absolute top-20 right-20 text-white/20">
            <Coins className="w-16 h-16" />
          </div>
          <div className="absolute bottom-10 left-1/4 text-white/20">
            <Wallet className="w-10 h-10" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          {/* Back Link */}
          <Link
            href={childId ? `/children/${childId}` : "/"}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {childId ? "Quay lại trang em nhỏ" : "Quay lại trang chủ"}
            </span>
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                Thanh toán an toàn với VNPay
              </span>
            </div>
            {childName ? (
              <>
                <div className="inline-flex items-center gap-2 mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Đỡ đầu em {childName}
                </h1>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                  Cảm ơn bạn đã chọn đỡ đầu em {childName}. Mỗi đóng góp của bạn
                  sẽ giúp em có cơ hội được học tập và phát triển tốt hơn.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Nạp tiền ủng hộ
                </h1>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                  Chuyển đổi VNĐ thành token để ủng hộ các em nhỏ. Mọi đóng góp
                  đều được ghi nhận minh bạch trên blockchain.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sponsoring Info Card */}
            {childName && (
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl shadow-md border border-rose-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center">
                    <Heart className="w-7 h-7 text-rose-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-rose-600 font-medium">Bạn đang đỡ đầu</p>
                    <p className="text-xl font-bold text-gray-800">
                      {childName}
                    </p>
                  </div>
                  <Link
                    href={`/children/${childId}`}
                    className="text-rose-500 hover:text-rose-600 text-sm font-medium"
                  >
                    Xem thông tin →
                  </Link>
                </div>
              </div>
            )}

            {/* Exchange Rate Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Tỷ giá hiện tại
                </h2>
                {isLoadingRate && (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                )}
              </div>

              {exchangeRate ? (
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-amber-600 mb-1">1 Token</p>
                    <p className="text-2xl font-bold text-amber-700">
                      {formatVND(exchangeRate.vndPerToken)} VNĐ
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                  <div className="flex-1 bg-emerald-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-emerald-600 mb-1">
                      Token Symbol
                    </p>
                    <p className="text-2xl font-bold text-emerald-700">
                      {exchangeRate.tokenSymbol}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-20 bg-gray-50 rounded-xl animate-pulse" />
              )}
            </div>

            {/* Amount Selection */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Chọn số tiền
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleAmountSelect(preset)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all text-center",
                        amount === preset && !customAmount
                          ? "border-amber-500 bg-amber-50 text-amber-700"
                          : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                      )}
                    >
                      <p className="text-lg font-bold">{formatVND(preset)}</p>
                      <p className="text-sm text-gray-500">VNĐ</p>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hoặc nhập số tiền khác
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Nhập số tiền..."
                      className="w-full px-4 py-3 pr-16 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      VNĐ
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    * Số tiền tối thiểu: 10,000 VNĐ
                  </p>
                </div>

                {/* Token Preview */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-emerald-600">Bạn sẽ nhận</p>
                        <p className="text-2xl font-bold text-emerald-700">
                          {tokenAmount}{" "}
                          <span className="text-lg">
                            {exchangeRate?.tokenSymbol || "Token"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <Sparkles className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Selection */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Chọn ngân hàng
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BANK_OPTIONS.map((bank) => (
                    <button
                      key={bank.code}
                      onClick={() => setSelectedBank(bank.code)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all text-center",
                        selectedBank === bank.code
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                      )}
                    >
                      <span className="text-2xl mb-2 block">{bank.icon}</span>
                      <p className="text-sm font-medium">{bank.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary & Pay */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-center">
                <p className="text-amber-100 text-sm mb-1">Tổng thanh toán</p>
                <p className="text-4xl font-bold text-white">
                  {formatVND(amount)}
                  <span className="text-lg font-normal ml-1">VNĐ</span>
                </p>
                <p className="text-amber-100 mt-2">
                  ≈ {tokenAmount} {exchangeRate?.tokenSymbol || "Token"}
                </p>
              </div>

              <div className="p-6 space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {!isAuthenticated && !isConnected ? (
                  <Button
                    onClick={login}
                    disabled={authLoading}
                    className={cn(
                      "w-full rounded-xl h-12 text-lg font-bold",
                      "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
                      "text-white shadow-lg hover:shadow-xl transition-all",
                      "hover:cursor-pointer"
                    )}
                  >
                    {authLoading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Wallet className="w-5 h-5 mr-2" />
                    )}
                    Đăng nhập để thanh toán
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || amount < 10000}
                    className={cn(
                      "w-full rounded-xl h-12 text-lg font-bold",
                      "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
                      "text-white shadow-lg hover:shadow-xl transition-all",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "hover:cursor-pointer"
                    )}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <CreditCard className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? "Đang xử lý..." : "Thanh toán ngay"}
                  </Button>
                )}

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Bảo mật bởi VNPay</span>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Số tiền nạp</span>
                    <span className="font-medium">{formatVND(amount)} VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tỷ giá</span>
                    <span className="font-medium">
                      {exchangeRate
                        ? `${formatVND(exchangeRate.vndPerToken)} VNĐ/Token`
                        : "..."}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí giao dịch</span>
                    <span className="font-medium text-emerald-600">
                      Miễn phí
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100 font-bold">
                    <span>Token nhận được</span>
                    <span className="text-amber-600">
                      {tokenAmount} {exchangeRate?.tokenSymbol || "Token"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-bold text-amber-800 mb-4">
                Lợi ích khi đóng góp
              </h3>
              <ul className="space-y-3 text-sm text-amber-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                  <span>Minh bạch 100% trên blockchain</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                  <span>Theo dõi đóng góp realtime</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                  <span>Không phí ẩn, không trung gian</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                  <span>Hỗ trợ trực tiếp cho các em</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        {isAuthenticated && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <History className="w-6 h-6 text-amber-500" />
                Lịch sử giao dịch
              </h2>
              <Button
                variant="outline"
                onClick={fetchTransactions}
                disabled={isLoadingTransactions}
                className="rounded-xl border-amber-300 text-amber-600 hover:bg-amber-50"
              >
                <RefreshCw
                  className={cn(
                    "w-4 h-4 mr-2",
                    isLoadingTransactions && "animate-spin"
                  )}
                />
                Làm mới
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              {isLoadingTransactions ? (
                <div className="p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
                  <p className="text-gray-500">Đang tải...</p>
                </div>
              ) : transactions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {transactions.map((tx) => {
                    const status = statusConfig[tx.status];
                    return (
                      <div
                        key={tx.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                status.color
                              )}
                            >
                              {status.icon}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {formatVND(tx.amountVND)} VNĐ
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(tx.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                                status.color
                              )}
                            >
                              {status.icon}
                              {status.label}
                            </span>
                            <p className="text-sm text-emerald-600 mt-1">
                              +{tx.tokenAmount} Token
                            </p>
                            {tx.txHash && (
                              <a
                                href={`https://explorer.sepolia.mantle.xyz/tx/${tx.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline flex items-center justify-end gap-1 mt-1"
                              >
                                Xem TX
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">Chưa có giao dịch nào</p>
                  <p className="text-sm text-gray-400">
                    Các giao dịch của bạn sẽ hiển thị ở đây
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export with Suspense wrapper for useSearchParams
export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
