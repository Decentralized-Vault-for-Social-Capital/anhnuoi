"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * VNPay Return Handler
 *
 * This page receives direct VNPay callback parameters and redirects to the
 * main payment result page. This provides a seamless experience whether the
 * user comes from:
 * 1. Backend redirect (with processed success/orderId/amount params)
 * 2. Direct VNPay callback (with vnp_* params)
 *
 * The result page handles both scenarios and displays the appropriate UI.
 */

function VNPayReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the result page with all query parameters preserved
    const queryString = searchParams.toString();
    router.replace(`/payment/result${queryString ? `?${queryString}` : ""}`);
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            </div>
            <p className="text-xl font-medium text-gray-700 mb-2">
              Đang xử lý kết quả thanh toán...
            </p>
            <p className="text-gray-500 text-center">
              Vui lòng đợi trong giây lát, hệ thống đang xác nhận giao dịch của
              bạn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VNPayReturnLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            </div>
            <p className="text-xl font-medium text-gray-700 mb-2">
              Đang xử lý...
            </p>
            <p className="text-gray-500">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VNPayReturnPage() {
  return (
    <Suspense fallback={<VNPayReturnLoading />}>
      <VNPayReturnContent />
    </Suspense>
  );
}
