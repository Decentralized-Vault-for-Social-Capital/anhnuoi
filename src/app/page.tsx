"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ArrowDown,
  Users,
  MapPin,
  Calendar,
  Coins,
  ChevronRight,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n";

// Vietnam Retro Modernism Color Constants
const colors = {
  terracotta: "#C25E44",
  sage: "#7D8A4E",
  ochre: "#E9A164",
  cream: "#F7F3E9",
  charcoal: "#2D3A2E",
  deepGreen: "#1F2D1F",
};

// Decorative SVG Components
const MountainIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" fill="currentColor" className={className}>
    <path d="M50 5 L85 55 H15 Z" />
    <path d="M30 25 L50 55 H10 Z" opacity="0.7" />
  </svg>
);

const PithHatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" fill="currentColor" className={className}>
    <ellipse cx="50" cy="50" rx="45" ry="10" />
    <path d="M50 5 Q20 35 15 50 H85 Q80 35 50 5" />
  </svg>
);

const CircleDecoration = ({
  size = "w-32 h-32",
  color = "bg-terracotta/10",
  className = "",
}: {
  size?: string;
  color?: string;
  className?: string;
}) => <div className={`rounded-full ${size} ${color} ${className}`} />;

const SemiCircle = ({
  direction = "top",
  size = "w-48 h-24",
  color = "bg-sage/20",
  className = "",
}: {
  direction?: "top" | "bottom" | "left" | "right";
  size?: string;
  color?: string;
  className?: string;
}) => {
  const radiusClass = {
    top: "rounded-t-full",
    bottom: "rounded-b-full",
    left: "rounded-l-full",
    right: "rounded-r-full",
  }[direction];

  return <div className={`${size} ${color} ${radiusClass} ${className}`} />;
};

export default function Home() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();

  const handleAction = () => {
    if (isAuthenticated) {
      router.push("/children");
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <CircleDecoration
            size="w-[600px] h-[600px]"
            color="bg-[#C25E44]/5"
            className="absolute -top-40 -right-40"
          />
          <CircleDecoration
            size="w-[400px] h-[400px]"
            color="bg-[#7D8A4E]/5"
            className="absolute top-1/3 -left-32"
          />
          <SemiCircle
            direction="top"
            size="w-80 h-40"
            color="bg-[#E9A164]/10"
            className="absolute bottom-0 right-1/4"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7D8A4E]/10 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#7D8A4E]" />
                <span className="text-[#7D8A4E] text-sm font-semibold uppercase tracking-wider">
                  {t.home.season}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-montserrat)] text-5xl md:text-6xl lg:text-7xl font-bold text-[#2D3A2E] mb-6 leading-[1.1]">
                Anh Nuôi
              </h1>

              <p className="text-xl md:text-2xl text-[#5C4033] mb-4 font-medium">
                {t.home.tagline}
              </p>

              <p className="text-[#6B7280] leading-relaxed mb-8 max-w-lg">
                {t.home.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAction}
                  size="lg"
                  className="bg-[#C25E44] hover:bg-[#A14D38] text-white font-bold text-base px-8 py-6 rounded-xl border-2 border-[#C25E44] hover:border-[#A14D38] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]  hover:cursor-pointer"
                  disabled={isLoading}
                >
                  {isAuthenticated
                    ? t.home.getMealCode
                    : isLoading
                    ? t.common.connecting
                    : t.home.joinNow}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#2D3A2E] text-[#2D3A2E] hover:bg-[#2D3A2E] hover:text-white font-bold text-base px-8 py-6 rounded-xl transition-all duration-200 hover:cursor-pointer"
                  onClick={() =>
                    document
                      .getElementById("story")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t.home.learnMore}
                </Button>
              </div>
            </div>

            {/* Right - Hero Image with decorations */}
            <div className="order-1 lg:order-2 relative group cursor-pointer">
              {/* Decorative dots - fade out on hover */}
              <div className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-[#C25E44] transition-all duration-500 group-hover:opacity-0 group-hover:scale-0" />
              <div className="absolute -top-2 right-12 w-2 h-2 rounded-full bg-[#7D8A4E] transition-all duration-500 group-hover:opacity-0 group-hover:scale-0" />
              <div className="absolute top-8 -right-6 w-2 h-2 rounded-full bg-[#E9A164] transition-all duration-500 group-hover:opacity-0 group-hover:scale-0" />
              <div className="absolute -bottom-4 -left-4 w-3 h-3 rounded-full bg-[#C25E44] transition-all duration-500 group-hover:opacity-0 group-hover:scale-0" />
              <div className="absolute -bottom-2 left-16 w-2 h-2 rounded-full bg-[#E9A164] transition-all duration-500 group-hover:opacity-0 group-hover:scale-0" />
              <div className="absolute bottom-12 -left-6 w-2 h-2 rounded-full bg-[#7D8A4E] transition-all duration-500 group-hover:opacity-0 group-hover:scale-0" />
              <div className="absolute top-1/2 -right-5 w-2 h-2 rounded-full bg-[#E9A164] transition-all duration-500 group-hover:opacity-0 group-hover:scale-0" />
              <div className="absolute top-1/3 -left-5 w-2 h-2 rounded-full bg-[#7D8A4E] transition-all duration-500 group-hover:opacity-0 group-hover:scale-0" />

              {/* Diagonal sliced image - transforms to full image on hover */}
              <div className="relative w-full aspect-[4/3] overflow-visible">
                {/* Sliced view - fades out on hover */}
                <div
                  className="relative w-full h-full transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-95"
                  style={{ transform: "rotate(-8deg)" }}
                >
                  <div
                    className="absolute w-full overflow-hidden rounded-full"
                    style={{
                      height: "22%",
                      top: "0%",
                      clipPath: "inset(0 0 0 0 round 9999px)",
                    }}
                  >
                    <div
                      style={{
                        transform: "rotate(8deg) scale(1.2)",
                        transformOrigin: "center",
                      }}
                      className="w-full h-[500%] relative -top-0"
                    >
                      <Image
                        src="/anhnuoi/nuoi_em_2.jpg"
                        alt="Trẻ em vùng cao"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>
                  <div
                    className="absolute w-full overflow-hidden rounded-full"
                    style={{
                      height: "22%",
                      top: "26%",
                      clipPath: "inset(0 0 0 0 round 9999px)",
                    }}
                  >
                    <div
                      style={{
                        transform: "rotate(8deg) scale(1.2)",
                        transformOrigin: "center",
                      }}
                      className="w-full h-[500%] relative -top-[130%]"
                    >
                      <Image
                        src="/anhnuoi/nuoi_em_2.jpg"
                        alt="Trẻ em vùng cao"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute w-full overflow-hidden rounded-full"
                    style={{
                      height: "22%",
                      top: "52%",
                      clipPath: "inset(0 0 0 0 round 9999px)",
                    }}
                  >
                    <div
                      style={{
                        transform: "rotate(8deg) scale(1.2)",
                        transformOrigin: "center",
                      }}
                      className="w-full h-[500%] relative -top-[260%]"
                    >
                      <Image
                        src="/anhnuoi/nuoi_em_2.jpg"
                        alt="Trẻ em vùng cao"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute w-full overflow-hidden rounded-full"
                    style={{
                      height: "22%",
                      top: "78%",
                      clipPath: "inset(0 0 0 0 round 9999px)",
                    }}
                  >
                    <div
                      style={{
                        transform: "rotate(8deg) scale(1.2)",
                        transformOrigin: "center",
                      }}
                      className="w-full h-[500%] relative -top-[390%]"
                    >
                      <Image
                        src="/anhnuoi/nuoi_em_2.jpg"
                        alt="Trẻ em vùng cao"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-bottom"
                      />
                    </div>
                  </div>
                </div>

                {/* Full image - fades in on hover */}
                <div className="absolute inset-0 opacity-0 scale-105 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/anhnuoi/nuoi_em_2.jpg"
                    alt="Trẻ em vùng cao"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D3A2E]/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* OLD STYLE - Circular frame with floating icons
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] h-[90%] rounded-full border-[6px] border-[#C25E44]/20 absolute" />
                <div className="w-[95%] h-[95%] rounded-full border-2 border-dashed border-[#7D8A4E]/30 absolute animate-[spin_60s_linear_infinite]" />
              </div>

              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src="/anhnuoi/nuoi_em_2.jpg"
                    alt="Trẻ em vùng cao"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#E9A164] rounded-2xl flex items-center justify-center shadow-lg animate-float">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#7D8A4E] rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            */}
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#story"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("story")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B7280] hover:text-[#C25E44] transition-all duration-300 ease-out hover:translate-y-1 cursor-pointer"
        >
          <span className="text-xs uppercase tracking-wider">Khám phá</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </section>

      {/* Story Section */}
      <section id="story" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F7F3E9] to-transparent" />
        <SemiCircle
          direction="right"
          size="w-40 h-80"
          color="bg-[#C25E44]/5"
          className="absolute top-20 -left-20"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image gallery */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/anhnuoi/nuoi_em_5.jpeg"
                      alt="Bữa cơm của các em"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative rounded-2xl overflow-hidden bg-[#7D8A4E] p-6 flex flex-col justify-end">
                    <p className="text-white/80 text-sm">Mỗi ngày</p>
                    <p className="text-white text-3xl font-bold">8.500đ</p>
                    <p className="text-white/80 text-sm">
                      có thể thay đổi một cuộc đời
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square relative rounded-2xl overflow-hidden bg-[#E9A164] p-6 flex flex-col justify-center items-center text-center">
                    <Heart className="w-12 h-12 text-white mb-3" />
                    <p className="text-white font-bold text-lg">Từ năm 2014</p>
                    <p className="text-white/80 text-sm">
                      Đồng hành cùng trẻ em vùng cao
                    </p>
                  </div>
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/anhnuoi/nuoi_em_3.jpg"
                      alt="Trẻ em ăn cơm"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Decoration */}
              <CircleDecoration
                size="w-24 h-24"
                color="bg-[#C25E44]/10"
                className="absolute -bottom-6 -right-6 -z-10"
              />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block text-[#C25E44] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Về dự án
              </span>

              <h2 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3A2E] mb-6 leading-tight">
                Hơn 120,000 em nhỏ vùng cao đang cần sự chung tay
              </h2>

              <p className="text-[#5C4033] text-lg leading-relaxed mb-6">
                Từ năm 2014, dự án Nuôi Em đã mang đến bữa cơm trưa cho hàng
                chục nghìn trẻ em tại các bản làng xa xôi nhất Việt Nam.
              </p>

              <p className="text-[#6B7280] leading-relaxed mb-8">
                <strong className="text-[#2D3A2E]">Anh Nuôi</strong> là phiên
                bản phi tập trung, sử dụng công nghệ blockchain để đảm bảo mọi
                đóng góp đều minh bạch, có thể truy vết và đến đúng người cần.
              </p>

              {/* Feature list */}
              <div className="space-y-4">
                {[
                  {
                    icon: Users,
                    text: "Kết nối trực tiếp với từng em nhỏ",
                    color: "bg-[#C25E44]",
                  },
                  {
                    icon: MapPin,
                    text: "Hoạt động tại 900+ xã khó khăn nhất",
                    color: "bg-[#7D8A4E]",
                  },
                  {
                    icon: Calendar,
                    text: "Cập nhật định kỳ hàng tháng",
                    color: "bg-[#E9A164]",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-[#2D3A2E] font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Terracotta background */}
      <section className="relative py-20 bg-[#C25E44] overflow-hidden grain-texture">
        {/* Decorative elements */}
        <CircleDecoration
          size="w-64 h-64"
          color="bg-white/5"
          className="absolute -top-20 -left-20"
        />
        <CircleDecoration
          size="w-48 h-48"
          color="bg-white/5"
          className="absolute -bottom-12 right-20"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: "120K+",
                labelKey: "childrenSupported" as const,
                icon: Users,
              },
              { value: "200+", labelKey: "schools" as const, icon: MapPin },
              { value: "12", labelKey: "provinces" as const, icon: Calendar },
              { value: "8.5K", labelKey: "costPerMeal" as const, icon: Coins },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70">{t.home.stats[stat.labelKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <CircleDecoration
          size="w-96 h-96"
          color="bg-[#7D8A4E]/5"
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[#7D8A4E] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {t.header.howItWorks}
            </span>
            <h2 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3A2E]">
              {t.home.howItWorks.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: t.home.howItWorks.step1Title,
                description: t.home.howItWorks.step1Desc,
                color: "border-[#C25E44]",
                bgColor: "bg-[#C25E44]/5",
                textColor: "text-[#C25E44]",
              },
              {
                step: "02",
                title: t.home.howItWorks.step2Title,
                description: t.home.howItWorks.step2Desc,
                color: "border-[#7D8A4E]",
                bgColor: "bg-[#7D8A4E]/5",
                textColor: "text-[#7D8A4E]",
              },
              {
                step: "03",
                title: t.home.howItWorks.step4Title,
                description: t.home.howItWorks.step4Desc,
                color: "border-[#E9A164]",
                bgColor: "bg-[#E9A164]/5",
                textColor: "text-[#E9A164]",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl ${item.bgColor} border-2 ${item.color} hover:shadow-xl transition-all duration-300 group`}
              >
                <div
                  className={`absolute -top-5 left-8 px-4 py-2 rounded-full bg-white ${item.textColor} font-bold text-lg border-2 ${item.color}`}
                >
                  {item.step}
                </div>
                <div className="pt-4">
                  <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-bold text-[#2D3A2E] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with Sage Green */}
      <section className="relative py-24 md:py-32 bg-[#7D8A4E] overflow-hidden grain-texture">
        <CircleDecoration
          size="w-80 h-80"
          color="bg-white/5"
          className="absolute -top-20 -right-20"
        />
        <SemiCircle
          direction="top"
          size="w-96 h-48"
          color="bg-white/5"
          className="absolute bottom-0 left-1/4"
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-white/70 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            {t.home.pricing.label}
          </span>

          <h2 className="font-[family-name:var(--font-montserrat)] text-4xl md:text-6xl font-bold text-white mb-6">
            1.450.000đ
            <span className="block text-2xl md:text-3xl font-normal text-white/80 mt-2">
              {t.home.pricing.perYear}
            </span>
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto">
            <p className="text-white/90 mb-2">{t.home.pricing.breakdown}</p>
            <p className="text-white/70 text-sm">
              {t.home.pricing.equivalent}{" "}
              <span className="text-white font-bold">
                4.000đ{t.home.pricing.perDay}
              </span>{" "}
              {t.home.pricing.lessThan}
            </p>
          </div>

          <Button
            onClick={handleAction}
            size="lg"
            className="bg-white text-[#7D8A4E] hover:bg-white/90 font-bold text-base px-10 py-6 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer"
            disabled={isLoading}
          >
            {isAuthenticated ? t.home.getMealCode : t.home.pricing.startNow}
            <Heart className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[#E9A164] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {t.home.gallery.label}
            </span>
            <h2 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3A2E]">
              {t.home.gallery.title}
            </h2>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 md:col-span-4 aspect-[16/9] relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/anhnuoi/nuoi_em_3.jpg"
                alt={t.home.gallery.childrenEating}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="col-span-3 md:col-span-2 aspect-square relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/anhnuoi/nuoi_em_4.jpg"
                alt={t.home.gallery.thankYou}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-3 md:col-span-2 aspect-square relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/anhnuoi/nuoi_em.jpg"
                alt={t.home.gallery.nuoiEm}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-6 md:col-span-4 aspect-[16/9] relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/anhnuoi/den_vau.jpg"
                alt={t.home.gallery.founder}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="relative py-24 md:py-32 bg-[#EDE8DC] overflow-hidden">
        <CircleDecoration
          size="w-72 h-72"
          color="bg-[#C25E44]/5"
          className="absolute -bottom-20 -left-20"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#C25E44] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {t.home.locations.label}
            </span>
            <h2 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3A2E] mb-4">
              {t.home.locations.title}
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              {t.home.locations.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Điện Biên",
              "Cao Bằng",
              "Lào Cai",
              "Lai Châu",
              "Hà Giang",
              "Lạng Sơn",
              "Yên Bái",
              "Thanh Hóa",
              "Gia Lai",
              "Đắk Lắk",
              "Kon Tum",
              "Đắk Nông",
            ].map((province, index) => (
              <span
                key={province}
                className={`px-5 py-2.5 text-sm font-medium rounded-full border-2 transition-all duration-200 hover:scale-105 cursor-default
                  ${
                    index % 3 === 0
                      ? "bg-[#C25E44]/10 border-[#C25E44]/30 text-[#C25E44]"
                      : ""
                  }
                  ${
                    index % 3 === 1
                      ? "bg-[#7D8A4E]/10 border-[#7D8A4E]/30 text-[#7D8A4E]"
                      : ""
                  }
                  ${
                    index % 3 === 2
                      ? "bg-[#E9A164]/10 border-[#E9A164]/30 text-[#5C4033]"
                      : ""
                  }
                `}
              >
                {province}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <Image
          src="/anhnuoi/nuoi_em_5.jpeg"
          alt="Các em nhỏ"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2D3A2E]/80" />

        {/* Decorative overlay */}
        <CircleDecoration
          size="w-96 h-96"
          color="bg-[#C25E44]/10"
          className="absolute -top-20 -right-20"
        />
        <CircleDecoration
          size="w-64 h-64"
          color="bg-[#7D8A4E]/10"
          className="absolute -bottom-20 -left-20"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <div className="w-20 h-20 mx-auto mb-8 bg-[#C25E44] rounded-full flex items-center justify-center animate-float">
            <Heart className="w-10 h-10 text-white" />
          </div>

          <h2 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t.home.cta.title}
          </h2>

          <p className="text-white/70 mb-10 text-lg max-w-xl mx-auto">
            {t.home.cta.description}
          </p>

          <Button
            onClick={handleAction}
            size="lg"
            className="bg-[#C25E44] hover:bg-[#A14D38] text-white font-bold text-base px-10 py-6 rounded-xl border-2 border-[#C25E44] hover:border-[#A14D38] transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer"
            disabled={isLoading}
          >
            {isAuthenticated ? t.home.getMealCode : t.home.pricing.startNow}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#2D3A2E] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#C25E44] rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold block">Nuôi Em</span>
                  <span className="text-white/50 text-sm">
                    {t.home.footer.brandSubtitle}
                  </span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                {t.home.footer.brandDescription}
              </p>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white/50 text-sm mb-4 uppercase tracking-wider font-semibold">
                {t.home.footer.contact}
              </p>
              <div className="space-y-3">
                <a
                  href="tel:0975302307"
                  className="flex items-center gap-3 text-white/70 hover:text-[#E9A164] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  097 530 2307
                </a>
                <a
                  href="mailto:duannuoiem@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-[#E9A164] transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  duannuoiem@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">{t.home.footer.copyright}</p>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">
                {t.home.footer.poweredBy}
              </span>
              <span className="text-[#7D8A4E] text-xs font-semibold">
                Blockchain
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
