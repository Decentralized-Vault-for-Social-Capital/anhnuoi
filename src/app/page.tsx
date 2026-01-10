"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ArrowDown } from "lucide-react";
import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
} from "@web3auth/modal/react";

export default function Home() {
  const {
    connect,
    isConnected,
    loading: connectLoading,
  } = useWeb3AuthConnect();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport with background image */}
      <section className="relative h-screen">
        <Image
          src="/anhnuoi/nuoi_em_2.jpg"
          alt="Trẻ em vùng cao"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <p className="text-orange-300 text-lg mb-2 tracking-widest uppercase">
            Mùa 12 • 2025—2026
          </p>
          <h1 className="text-5xl md:text-8xl font-light tracking-tight mb-4">
            Nuôi Em
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/80 mb-8 text-center max-w-xl">
            Bữa cơm níu chân trẻ tới trường
          </p>

          <Button
            onClick={() => !isConnected && connect()}
            size="lg"
            className="bg-white text-gray-900 hover:bg-white/90 font-medium text-base px-8 py-6 rounded-none"
            disabled={connectLoading}
          >
            {isConnected
              ? "Nhận mã Nuôi Em"
              : connectLoading
              ? "Đang kết nối..."
              : "Tham gia ngay"}
          </Button>

          <a href="#story" className="absolute bottom-12 animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/60" />
          </a>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-600 text-sm tracking-widest uppercase mb-4">
                Về dự án
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
                Hơn 120,000 em nhỏ vùng cao đang cần sự chung tay của bạn
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Từ năm 2014, dự án Nuôi Em đã mang đến bữa cơm trưa cho hàng
                chục nghìn trẻ em tại các bản làng xa xôi nhất Việt Nam. Mỗi
                ngày, 8.500đ có thể thay đổi một cuộc đời.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Anh Nuôi là phiên bản phi tập trung, sử dụng blockchain để đảm
                bảo mọi đóng góp đều minh bạch và đến đúng người cần.
              </p>
            </div>
            <div className="relative">
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-orange-400" />
              <div className="absolute -top-2 right-12 w-2 h-2 rounded-full bg-cyan-400" />
              <div className="absolute top-8 -right-6 w-2 h-2 rounded-full bg-green-500" />
              <div className="absolute -bottom-4 -left-4 w-3 h-3 rounded-full bg-red-500" />
              <div className="absolute -bottom-2 left-16 w-2 h-2 rounded-full bg-yellow-400" />
              <div className="absolute bottom-12 -left-6 w-2 h-2 rounded-full bg-blue-500" />
              <div className="absolute top-1/2 -right-5 w-2 h-2 rounded-full bg-pink-500" />
              <div className="absolute top-1/3 -left-5 w-2 h-2 rounded-full bg-purple-500" />

              {/* Diagonal sliced image container */}
              <div className="relative w-full aspect-[4/3] overflow-visible">
                <div
                  className="relative w-full h-full"
                  style={{ transform: "rotate(-8deg)" }}
                >
                  {/* Slice 1 */}
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
                        src="/anhnuoi/nuoi_em_5.jpeg"
                        alt="Bữa cơm của các em"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  {/* Slice 2 */}
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
                        src="/anhnuoi/nuoi_em_5.jpeg"
                        alt="Bữa cơm của các em"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {/* Slice 3 */}
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
                        src="/anhnuoi/nuoi_em_5.jpeg"
                        alt="Bữa cơm của các em"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {/* Slice 4 */}
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
                        src="/anhnuoi/nuoi_em_5.jpeg"
                        alt="Bữa cơm của các em"
                        fill
                        className="object-cover object-bottom"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-light text-gray-900">
                120K+
              </p>
              <p className="text-gray-500 mt-2">em được nuôi</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-gray-900">
                200+
              </p>
              <p className="text-gray-500 mt-2">điểm trường</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-gray-900">
                12
              </p>
              <p className="text-gray-500 mt-2">năm hoạt động</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-gray-900">
                8.5K
              </p>
              <p className="text-gray-500 mt-2">đồng/bữa ăn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-orange-600 text-sm tracking-widest uppercase mb-4">
              Hình ảnh
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Những nụ cười từ vùng cao
            </h2>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 md:col-span-4 aspect-[4/3] relative">
              <Image
                src="/anhnuoi/nuoi_em_3.jpg"
                alt="Trẻ em ăn cơm"
                fill
                className="object-cover"
              />
            </div>
            <div className="col-span-3 md:col-span-2 aspect-square relative">
              <Image
                src="/anhnuoi/nuoi_em_4.jpg"
                alt="Em cảm ơn"
                fill
                className="object-cover"
              />
            </div>
            <div className="col-span-3 md:col-span-2 aspect-square relative">
              <Image
                src="/anhnuoi/nuoi_em.jpg"
                alt="Nuôi em"
                fill
                className="object-cover"
              />
            </div>
            <div className="col-span-6 md:col-span-4 aspect-[4/3] relative">
              <Image
                src="/anhnuoi/den_vau.jpg"
                alt="Người sáng lập"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="py-24 md:py-32 bg-gray-900 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-orange-400 text-sm tracking-widest uppercase mb-4">
              Cách thức
            </p>
            <h2 className="text-3xl md:text-4xl font-light">
              Đơn giản và minh bạch
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light">01</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Đăng nhập</h3>
              <p className="text-white/60 leading-relaxed">
                Đăng nhập bằng email hoặc mạng xã hội qua Web3Auth. Không cần
                cài đặt ví.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light">02</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Nhận mã NE</h3>
              <p className="text-white/60 leading-relaxed">
                Mỗi mã tương ứng một em nhỏ cụ thể. Bạn biết chính xác mình đang
                giúp ai.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light">03</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Theo dõi</h3>
              <p className="text-white/60 leading-relaxed">
                Nhận cập nhật ảnh và video về em nhỏ hàng tháng. Mọi giao dịch
                ghi trên blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-orange-600 text-sm tracking-widest uppercase mb-4">
            Chi phí
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
            1.450.000đ / năm học
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
            150.000đ/tháng × 9 tháng học + 100.000đ cơ sở vật chất
          </p>
          <p className="text-gray-500 text-sm">
            Tương đương khoảng 4.000đ mỗi ngày — ít hơn một ly trà đá
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-orange-600 text-sm tracking-widest uppercase mb-4">
              Địa bàn
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              900+ xã khó khăn nhất
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
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
            ].map((province) => (
              <span
                key={province}
                className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200"
              >
                {province}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 md:py-40">
        <Image
          src="/anhnuoi/nuoi_em_5.jpeg"
          alt="Các em nhỏ"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <Heart className="w-12 h-12 mx-auto mb-8 text-orange-400" />
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            Mỗi bữa cơm là một ước mơ được chắp cánh
          </h2>
          <p className="text-white/70 mb-10 text-lg">
            Cảm ơn bạn đã dành thời gian tìm hiểu. Sự quan tâm của bạn đã là một
            món quà.
          </p>
          <Button
            onClick={() => !isConnected && connect()}
            size="lg"
            className="bg-white text-gray-900 hover:bg-white/90 font-medium text-base px-10 py-6 rounded-none"
            disabled={connectLoading}
          >
            {isConnected ? "Nhận mã Nuôi Em" : "Bắt đầu ngay"}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-orange-400" />
                <span className="text-lg font-medium">Anh Nuôi</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Phiên bản phi tập trung của dự án Nuôi Em, sử dụng blockchain để
                minh bạch hóa từ thiện.
              </p>
            </div>

            <div>
              <p className="text-white/50 text-sm mb-4 uppercase tracking-wider">
                Liên hệ
              </p>
              <p className="text-white/70 text-sm mb-2">097 530 2307</p>
              <p className="text-white/70 text-sm">duannuoiem@gmail.com</p>
            </div>

            <div>
              <p className="text-white/50 text-sm mb-4 uppercase tracking-wider">
                Dự án gốc
              </p>
              <a
                href="https://www.nuoiem.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 text-sm"
              >
                nuoiem.com ↗
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2026 Anh Nuôi — Decentralized Charity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
