"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Heart, Users, TrendingUp, ArrowLeft } from "lucide-react";
import {
  ChildCard,
  ChildrenFilters,
  ChildrenGridSkeleton,
} from "@/components/children";
import { mockChildren } from "@/lib/data/children";
import type { Child } from "@/lib/types/child";

export default function ChildrenPage() {
  const [isLoading] = useState(false);
  const [filters, setFilters] = useState<{
    province?: string;
    grade?: string;
    status?: string;
    search?: string;
  }>({});

  // Filter children based on current filters
  const filteredChildren = useMemo(() => {
    return mockChildren.filter((child) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          child.name.toLowerCase().includes(searchLower) ||
          child.code.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Province filter
      if (filters.province && filters.province !== "all") {
        if (child.province !== filters.province) return false;
      }

      // Grade filter
      if (filters.grade && filters.grade !== "all") {
        if (child.grade !== filters.grade) return false;
      }

      // Status filter
      if (filters.status && filters.status !== "all") {
        if (child.status !== filters.status) return false;
      }

      return true;
    });
  }, [filters]);

  // Stats
  const stats = useMemo(() => {
    const total = mockChildren.length;
    const waiting = mockChildren.filter((c) => c.status === "waiting").length;
    const sponsored = mockChildren.filter(
      (c) => c.status === "sponsored"
    ).length;
    return { total, waiting, sponsored };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-300/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về trang chủ</span>
          </Link>

          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              <span>Chương trình Nuôi Em</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Các Em Nhỏ Cần{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Được Đỡ Đầu
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mỗi em nhỏ đều có một câu chuyện, một ước mơ. Hãy cùng chúng tôi
              mang đến cho các em cơ hội được học tập và phát triển.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-amber-100 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng số em nhỏ</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-orange-100 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {stats.waiting}
              </p>
              <p className="text-sm text-gray-500">Đang chờ đỡ đầu</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-emerald-100 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {stats.sponsored}
              </p>
              <p className="text-sm text-gray-500">Đã có người đỡ đầu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <ChildrenFilters onFilterChange={setFilters} />

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Hiển thị{" "}
            <span className="font-semibold text-gray-800">
              {filteredChildren.length}
            </span>{" "}
            em nhỏ
          </p>
        </div>

        {/* Children Grid */}
        {isLoading ? (
          <ChildrenGridSkeleton />
        ) : filteredChildren.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredChildren.map((child: Child) => (
              <ChildCard key={child.id} child={child} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500">
              Hãy thử thay đổi bộ lọc để xem thêm các em nhỏ khác.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Mỗi sự đỡ đầu là một tia sáng
          </h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            Chỉ với 150.000 VNĐ mỗi tháng, bạn có thể giúp một em nhỏ có bữa ăn
            đủ đầy và cơ hội đến trường.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-amber-600 font-semibold rounded-full hover:bg-amber-50 transition-colors shadow-lg"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
