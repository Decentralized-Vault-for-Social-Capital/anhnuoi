"use client";

import React from "react";
import { useLanguage, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "default" | "compact" | "pill";
  className?: string;
}

export function LanguageSwitcher({
  variant = "default",
  className,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "compact") {
    return (
      <button
        onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
          "bg-gray-100 hover:bg-gray-200 text-gray-700",
          className
        )}
      >
        <Globe className="w-4 h-4" />
        <span>{language === "vi" ? "EN" : "VI"}</span>
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full p-1",
          className
        )}
      >
        <button
          onClick={() => setLanguage("vi")}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
            language === "vi"
              ? "bg-white text-amber-600 shadow-sm"
              : "text-white hover:bg-white/10"
          )}
        >
          🇻🇳 VI
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
            language === "en"
              ? "bg-white text-amber-600 shadow-sm"
              : "text-white hover:bg-white/10"
          )}
        >
          🇬🇧 EN
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-gray-100 rounded-lg p-1",
        className
      )}
    >
      <button
        onClick={() => setLanguage("vi")}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          language === "vi"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        🇻🇳 Tiếng Việt
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          language === "en"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        🇬🇧 English
      </button>
    </div>
  );
}

export default LanguageSwitcher;
