"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Child } from "@/lib/types/child";
import { cn } from "@/lib/utils";

interface ChildCardProps {
  child: Child;
  className?: string;
}

export function ChildCard({ child, className }: ChildCardProps) {
  const isSponsored = child.status === "sponsored";

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
        "border border-gray-100 hover:border-amber-200",
        className
      )}
    >
      {/* Status Badge */}
      {isSponsored && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-medium shadow-lg">
            <Heart className="w-3 h-3 fill-current" />
            Đã có người đỡ đầu
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="absolute inset-0 bg-[url('/anhnuoi/pattern.svg')] opacity-10" />

        {/* Decorative elements */}
        <div className="absolute top-4 left-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>

        {/* Child Image */}
        <div className="absolute inset-0 flex items-center justify-center pt-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
            <Image
              src={child.imageUrl}
              alt={child.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </div>

        {/* Code Badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-amber-700 shadow-md">
            {child.code}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name & Age */}
        <div className="text-center mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
            {child.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {child.age} tuổi • {child.gender === "male" ? "Nam" : "Nữ"}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-3">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span className="text-sm">{child.district}</span>
        </div>

        {/* Grade & School */}
        <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-4">
          <GraduationCap className="w-4 h-4 text-amber-500" />
          <span className="text-sm">{child.grade}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-4 mb-4">
          <p className="text-xs text-gray-500 text-center mb-2">
            Hỗ trợ hàng tháng
          </p>
          <p className="text-2xl font-bold text-center text-amber-600">
            {child.monthlySupport.toLocaleString("vi-VN")}
            <span className="text-base font-normal text-gray-500 ml-1">
              VNĐ
            </span>
          </p>
        </div>

        {/* Action Button */}
        <Link href={`/children/${child.id}`} className="block">
          <Button
            className={cn(
              "w-full rounded-xl font-semibold transition-all duration-300 hover:cursor-pointer",
              isSponsored
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-md hover:shadow-lg"
            )}
          >
            {isSponsored ? "Xem chi tiết" : "Đỡ đầu ngay"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
