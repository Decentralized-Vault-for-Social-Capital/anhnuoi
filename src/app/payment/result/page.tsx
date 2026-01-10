"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useApiWithAuth } from "@/hooks/useApiWithAuth";
import type { TransactionStatus } from "@/lib/api/types";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated, token } = useAuth();
  const { getOrderStatus } = useApiWithAuth();

  const [status, setStatus] = useState<TransactionStatus | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  // Parse URL parameters from VNPay redirect
  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");

  // Poll order status to check blockchain transaction
  useEffect(() => {
    if (!success || !orderId || !isAuthenticated || !token) return;

    const pollStatus = async () => {
      setIsPolling(true);

      let attempts = 0;
      const maxAttempts = 20;
      const interval = 3000;

      while (attempts < maxAttempts) {
        try {
          const result = await getOrderStatus(orderId);

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
  }, [success, orderId, isAuthenticated, token, getOrderStatus]);

  const formatAmount = (amt: string) => {
    return new Intl.NumberFormat("vi-VN").format(Number(amt));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div
            className={`p-8 text-center ${
              success
                ? "bg-gradient-to-r from-emerald-500 to-green-500"
                : "bg-gradient-to-r from-red-500 to-rose-500"
            }`}
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              {success ? (
                <CheckCircle2 className="w-12 h-12 text-white" />
              ) : (
                <XCircle className="w-12 h-12 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {success ? "Thanh toán thành công!" : "Thanh toán thất bại"}
            </h1>
            <p className="text-white/80 text-sm">
              {success
                ? "Cảm ơn bạn đã đóng góp cho chương trình Nuôi Em"
                : message || "Đã có lỗi xảy ra trong quá trình thanh toán"}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Amount */}
            {amount && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500">Số tiền</span>
                <span className="text-xl font-bold text-gray-800">
                  {formatAmount(amount)} VNĐ
                </span>
              </div>
            )}

            {/* Order ID */}
            {orderId && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500">Mã đơn hàng</span>
                <span className="text-sm font-mono text-gray-700 truncate max-w-[200px]">
                  {orderId}
                </span>
              </div>
            )}

            {/* Blockchain Status */}
            {success && (
              <div className="py-3 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Trạng thái blockchain</span>
                  <div className="flex items-center gap-2">
                    {isPolling && (
                      <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                    )}
                    <StatusBadge status={status} />
                  </div>
                </div>

                {/* Transaction Hash */}
                {txHash && (
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
                  >
                    <span className="truncate">{txHash}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 space-y-3">
              <Link href="/children" className="block">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl hover:cursor-pointer">
                  Tiếp tục đỡ đầu
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button
                  variant="outline"
                  className="w-full rounded-xl hover:cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Về trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: TransactionStatus | null }) {
  if (!status) {
    return (
      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
        Đang kiểm tra...
      </span>
    );
  }

  const statusConfig: Record<
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
      label: "Hoàn thành",
    },
    failed: { bg: "bg-red-100", text: "text-red-700", label: "Thất bại" },
    expired: { bg: "bg-gray-100", text: "text-gray-700", label: "Hết hạn" },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}
    >
      {config.label}
    </span>
  );
}

function PaymentResultLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-8">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-amber-500 mb-4" />
            <p className="text-gray-600">Đang tải kết quả thanh toán...</p>
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
