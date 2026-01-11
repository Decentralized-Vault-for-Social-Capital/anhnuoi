"use client";

import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export default function ChildNotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-amber-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {language === "vi" ? "Không tìm thấy em nhỏ" : "Child not found"}
        </h1>
        <p className="text-gray-500 mb-8 max-w-md">
          {language === "vi"
            ? "Em nhỏ bạn đang tìm kiếm có thể đã được đỡ đầu hoặc không tồn tại trong hệ thống."
            : "The child you are looking for may have been sponsored or does not exist in the system."}
        </p>
        <Link href="/children">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-6 hover:cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "vi"
              ? "Xem danh sách các em nhỏ"
              : "View children list"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
