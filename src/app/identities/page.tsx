"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Heart,
  Shield,
  CheckCircle2,
  ExternalLink,
  Globe,
  Copy,
  Check,
  Sparkles,
  Building2,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { identities, type Identity } from "@/lib/data/identities";
import { cn } from "@/lib/utils";

type Language = "vi" | "en";

export default function IdentitiesPage() {
  const [language, setLanguage] = useState<Language>("vi");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const t = {
    vi: {
      title: "Các Trung tâm Nuôi Em",
      subtitle:
        "Danh sách các trung tâm hỗ trợ trẻ em được xác thực trên blockchain",
      backToHome: "Quay lại trang chủ",
      established: "Thành lập",
      children: "em nhỏ",
      location: "Địa điểm",
      mission: "Sứ mệnh",
      impact: "Tác động",
      features: "Chương trình hỗ trợ",
      contractAddress: "Địa chỉ hợp đồng",
      viewOnExplorer: "Xem trên Explorer",
      supportNow: "Ủng hộ ngay",
      verifiedOnBlockchain: "Đã xác thực trên Blockchain",
      totalCenters: "Trung tâm",
      totalChildren: "Em nhỏ được hỗ trợ",
      transparentDonations: "Minh bạch 100%",
    },
    en: {
      title: "Nuoi Em Centers",
      subtitle: "List of verified child support centers on the blockchain",
      backToHome: "Back to Home",
      established: "Established",
      children: "children",
      location: "Location",
      mission: "Mission",
      impact: "Impact",
      features: "Support Programs",
      contractAddress: "Contract Address",
      viewOnExplorer: "View on Explorer",
      supportNow: "Support Now",
      verifiedOnBlockchain: "Verified on Blockchain",
      totalCenters: "Centers",
      totalChildren: "Children Supported",
      transparentDonations: "100% Transparent",
    },
  };

  const text = t[language];

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const totalChildren = identities.reduce(
    (sum, id) => sum + id.childrenCount,
    0
  );

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
            <Building2 className="w-16 h-16" />
          </div>
          <div className="absolute bottom-10 left-1/4 text-white/20">
            <Shield className="w-10 h-10" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{text.backToHome}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full p-1">
              <button
                onClick={() => setLanguage("vi")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  language === "vi"
                    ? "bg-white text-amber-600"
                    : "text-white hover:bg-white/10"
                )}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  language === "en"
                    ? "bg-white text-amber-600"
                    : "text-white hover:bg-white/10"
                )}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center pb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                {text.verifiedOnBlockchain}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {text.title}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {text.subtitle}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                <p className="text-3xl font-bold text-white">
                  {identities.length}
                </p>
                <p className="text-white/80 text-sm">{text.totalCenters}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                <p className="text-3xl font-bold text-white">{totalChildren}</p>
                <p className="text-white/80 text-sm">{text.totalChildren}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                <p className="text-3xl font-bold text-white">⛓️</p>
                <p className="text-white/80 text-sm">
                  {text.transparentDonations}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Identity List */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {identities.map((identity, index) => (
            <IdentityCard
              key={identity.id}
              identity={identity}
              language={language}
              text={text}
              index={index}
              copiedAddress={copiedAddress}
              onCopyAddress={handleCopyAddress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface IdentityCardProps {
  identity: Identity;
  language: Language;
  text: Record<string, string>;
  index: number;
  copiedAddress: string | null;
  onCopyAddress: (address: string) => void;
}

function IdentityCard({
  identity,
  language,
  text,
  index,
  copiedAddress,
  onCopyAddress,
}: IdentityCardProps) {
  const colors = [
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-teal-500",
  ];
  const bgColors = ["bg-amber-50", "bg-emerald-50"];
  const accentColors = ["text-amber-600", "text-emerald-600"];

  const gradientColor = colors[index % colors.length];
  const bgColor = bgColors[index % bgColors.length];
  const accentColor = accentColors[index % accentColors.length];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradientColor} p-6 md:p-8`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-lg flex-shrink-0">
              <Image
                src={identity.image}
                alt={identity.name[language]}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {identity.name[language]}
              </h2>
              <div className="flex items-center gap-2 text-white/80 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{identity.location[language]}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{text.established}</span>
              </div>
              <p className="text-xl font-bold text-white">
                {identity.established}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-4 h-4" />
                <span className="font-medium">{text.children}</span>
              </div>
              <p className="text-xl font-bold text-white">
                {identity.childrenCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {identity.description[language]}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className={`${bgColor} rounded-2xl p-5`}>
            <div className="flex items-center gap-2 mb-3">
              <Target className={`w-5 h-5 ${accentColor}`} />
              <h3 className={`font-bold ${accentColor}`}>{text.mission}</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {identity.mission[language]}
            </p>
          </div>

          {/* Impact */}
          <div className={`${bgColor} rounded-2xl p-5`}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className={`w-5 h-5 ${accentColor}`} />
              <h3 className={`font-bold ${accentColor}`}>{text.impact}</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {identity.impact[language]}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            {text.features}
          </h3>
          <div className="flex flex-wrap gap-2">
            {identity.features[language].map((feature, idx) => (
              <span
                key={idx}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium",
                  bgColor,
                  accentColor
                )}
              >
                <CheckCircle2 className="w-3 h-3" />
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Contract Address */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-800">
                {text.contractAddress}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white rounded-xl px-4 py-3 text-sm text-gray-700 font-mono break-all border border-gray-200">
              {identity.contractAddress}
            </code>
            <button
              onClick={() => onCopyAddress(identity.contractAddress)}
              className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              title="Copy address"
            >
              {copiedAddress === identity.contractAddress ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          <a
            href={`https://explorer.sepolia.mantle.xyz/address/${identity.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm mt-3"
          >
            <Globe className="w-4 h-4" />
            {text.viewOnExplorer}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-center">
          <Link href="/payment">
            <Button
              className={cn(
                "h-12 px-8 rounded-xl text-lg font-bold",
                `bg-gradient-to-r ${gradientColor}`,
                "text-white shadow-lg hover:shadow-xl transition-all",
                "hover:scale-[1.02] active:scale-[0.98]",
                "hover:cursor-pointer"
              )}
            >
              <Heart className="w-5 h-5 mr-2" />
              {text.supportNow}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
