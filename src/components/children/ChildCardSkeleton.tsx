"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ChildCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="absolute inset-0 flex items-center justify-center pt-4">
          <Skeleton className="w-40 h-40 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Skeleton className="w-24 h-7 rounded-full" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5">
        <div className="flex flex-col items-center gap-2 mb-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-center mb-3">
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex justify-center mb-4">
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function ChildrenGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ChildCardSkeleton key={i} />
      ))}
    </div>
  );
}
