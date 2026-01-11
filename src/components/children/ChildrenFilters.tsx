"use client";

import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { provinces, grades } from "@/lib/data/children";
import { useLanguage } from "@/lib/i18n";

interface ChildrenFiltersProps {
  onFilterChange?: (filters: {
    province?: string;
    grade?: string;
    status?: string;
    search?: string;
  }) => void;
}

export function ChildrenFilters({ onFilterChange }: ChildrenFiltersProps) {
  const { t, language } = useLanguage();
  const [search, setSearch] = React.useState("");
  const [province, setProvince] = React.useState<string>("");
  const [grade, setGrade] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");

  const handleFilterChange = React.useCallback(() => {
    onFilterChange?.({
      province: province || undefined,
      grade: grade || undefined,
      status: status || undefined,
      search: search || undefined,
    });
  }, [province, grade, status, search, onFilterChange]);

  React.useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  const clearFilters = () => {
    setSearch("");
    setProvince("");
    setGrade("");
    setStatus("");
  };

  const hasFilters = search || province || grade || status;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t.children.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">{t.common.filter}:</span>
        </div>

        {/* Province Filter */}
        <Select value={province} onValueChange={setProvince}>
          <SelectTrigger className="w-[180px] rounded-xl border-gray-200">
            <SelectValue placeholder={t.children.filterByProvince} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {language === "vi" ? "Tất cả tỉnh" : "All Provinces"}
            </SelectItem>
            {provinces.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Grade Filter */}
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger className="w-[140px] rounded-xl border-gray-200">
            <SelectValue placeholder={t.children.filterByGrade} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {language === "vi" ? "Tất cả lớp" : "All Grades"}
            </SelectItem>
            {grades.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px] rounded-xl border-gray-200">
            <SelectValue placeholder={t.children.filterByStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="waiting">
              {t.children.waitingForSponsor}
            </SelectItem>
            <SelectItem value="sponsored">
              {t.children.alreadySponsored}
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          >
            {language === "vi" ? "Xóa bộ lọc" : "Clear Filters"}
          </Button>
        )}
      </div>
    </div>
  );
}
