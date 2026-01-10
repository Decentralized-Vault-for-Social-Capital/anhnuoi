"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Calendar,
  Heart,
  Share2,
  BookOpen,
  Shirt,
  UtensilsCrossed,
  CheckCircle2,
  User,
  Building2,
  Flame,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockChildren } from "@/lib/data/children";
import { cn } from "@/lib/utils";

const needIcons: Record<string, React.ReactNode> = {
  "Sách vở": <BookOpen className="w-4 h-4" />,
  "Quần áo": <Shirt className="w-4 h-4" />,
  "Quần áo ấm": <Shirt className="w-4 h-4" />,
  "Áo ấm": <Shirt className="w-4 h-4" />,
  "Bữa ăn trưa": <UtensilsCrossed className="w-4 h-4" />,
  "Học phí": <GraduationCap className="w-4 h-4" />,
  "Đồ dùng học tập": <BookOpen className="w-4 h-4" />,
  "Sách tham khảo": <BookOpen className="w-4 h-4" />,
  "Giày dép": <Shirt className="w-4 h-4" />,
  "Cặp sách": <BookOpen className="w-4 h-4" />,
};

export default function ChildDetailPage() {
  const params = useParams();
  const childId = params.child as string;

  const child = useMemo(() => {
    return mockChildren.find((c) => c.id === childId);
  }, [childId]);

  if (!child) {
    notFound();
  }

  const isSponsored = child.status === "sponsored";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Hero Section - Like the image design */}
      <div className="relative overflow-hidden">
        {/* Top Banner with location */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-400 py-3">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-amber-900">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{child.district}</span>
            <span>•</span>
            <span>{child.province}</span>
          </div>
        </div>

        {/* Main Hero */}
        <div className="relative bg-gradient-to-b from-yellow-300 via-yellow-200 to-amber-100 pb-12">
          {/* Decorative Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 text-yellow-400/50">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="absolute top-40 right-20 text-yellow-400/50">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute bottom-20 left-1/4 text-yellow-400/50">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 pt-8">
            {/* Back Link */}
            <Link
              href="/children"
              className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách</span>
            </Link>

            {/* Program Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-2">
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-amber-900 font-serif italic">
                Nuôi Em
              </h1>
              <p className="text-amber-800 mt-2">Năm học {child.schoolYear}</p>
            </div>

            {/* Child Photo Card */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Outer decorative ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-yellow-400 to-amber-400 opacity-50" />
                <div className="absolute -inset-2 rounded-full bg-yellow-300" />

                {/* Photo container */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={child.imageUrl}
                    alt={child.name}
                    fill
                    className="object-cover"
                    sizes="224px"
                    priority
                  />
                </div>

                {/* Decorative leaves */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-emerald-500">
                  <svg
                    width="80"
                    height="24"
                    viewBox="0 0 80 24"
                    fill="currentColor"
                  >
                    <path d="M40 24c-10-5-20-10-40-12C20 10 30 5 40 0c10 5 20 10 40 12-20 2-30 7-40 12z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Child Info */}
            <div className="text-center">
              <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg">
                <p className="text-xl font-bold text-amber-700 mb-1">
                  {child.code}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
                  {child.name}
                </h2>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-2 my-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <div className="w-12 h-0.5 bg-amber-300" />
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>

                {/* Sponsor info if sponsored */}
                {isSponsored && child.sponsor && (
                  <div className="mt-4 text-right">
                    <p className="text-sm text-gray-500 italic">
                      Cảm ơn Anh/Chị:
                    </p>
                    <p className="text-amber-700 font-semibold italic">
                      {child.sponsor.type === "organization"
                        ? `Công ty ${child.sponsor.name}`
                        : child.sponsor.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Câu chuyện của em
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {child.story}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-sm text-gray-500">Tuổi</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 ml-13">
                  {child.age} tuổi
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-500">Giới tính</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 ml-13">
                  {child.gender === "male" ? "Nam" : "Nữ"}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-500">Lớp</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 ml-13">
                  {child.grade}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-500">Trường</span>
                </div>
                <p className="text-lg font-bold text-gray-800 ml-13 truncate">
                  {child.school}
                </p>
              </div>
            </div>

            {/* Needs Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Em cần hỗ trợ
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  {child.needs.map((need, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full border border-amber-200"
                    >
                      {needIcons[need] || <CheckCircle2 className="w-4 h-4" />}
                      <span className="font-medium">{need}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-center">
                <p className="text-amber-100 text-sm mb-1">Hỗ trợ hàng tháng</p>
                <p className="text-4xl font-bold text-white">
                  {child.monthlySupport.toLocaleString("vi-VN")}
                  <span className="text-lg font-normal ml-1">VNĐ</span>
                </p>
              </div>

              <div className="p-6">
                {isSponsored ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      Đã có người đỡ đầu
                    </h4>
                    <p className="text-gray-500 text-sm mb-4">
                      Em {child.name} đã được{" "}
                      <span className="text-amber-600 font-medium">
                        {child.sponsor?.name}
                      </span>{" "}
                      nhận đỡ đầu.
                    </p>
                    <Link href="/children">
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-amber-300 text-amber-600 hover:bg-amber-50 hover:cursor-pointer"
                      >
                        Xem các em khác
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Button
                      className={cn(
                        "w-full rounded-xl h-12 text-lg font-bold mb-4",
                        "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
                        "text-white shadow-lg hover:shadow-xl transition-all",
                        "hover:cursor-pointer"
                      )}
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Đỡ đầu ngay
                    </Button>

                    <p className="text-center text-sm text-gray-500 mb-4">
                      Thanh toán an toàn qua VNPay
                    </p>

                    <div className="border-t border-gray-100 pt-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-center text-gray-600 hover:text-amber-600 hover:cursor-pointer"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Chia sẻ câu chuyện
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Impact Note */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-amber-800 text-sm leading-relaxed">
                <span className="font-bold">*Theo thống kê,</span>
                <br />
                Mỗi 1 chia sẻ hình ảnh này sẽ giúp thêm 1 bé được nhận Nuôi Cơm
              </p>
              <p className="text-amber-600 font-medium mt-3 text-center">
                www.nuoiem.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Children */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Các em nhỏ khác cần được đỡ đầu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockChildren
              .filter((c) => c.id !== child.id && c.status === "waiting")
              .slice(0, 4)
              .map((relatedChild) => (
                <Link
                  key={relatedChild.id}
                  href={`/children/${relatedChild.id}`}
                  className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-200 group-hover:border-amber-400 transition-colors">
                      <Image
                        src={relatedChild.imageUrl}
                        alt={relatedChild.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-amber-600 font-medium">
                        {relatedChild.code}
                      </p>
                      <h3 className="font-bold text-gray-800 truncate group-hover:text-amber-600 transition-colors">
                        {relatedChild.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {relatedChild.district}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
