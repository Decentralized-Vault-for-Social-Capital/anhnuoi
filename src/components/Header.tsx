"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, LogOut, User, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    login,
    logout,
    isLoading,
    isAuthenticated,
    isConnected,
    user,
    userInfo,
    address,
  } = useAuth();

  // Show as authenticated if Web3Auth is connected OR if API auth completed
  const showAsLoggedIn = isConnected || isAuthenticated;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Show email, name, or truncated address
  const displayName =
    userInfo?.email ||
    userInfo?.name ||
    user?.name ||
    (address && truncateAddress(address)) ||
    "User";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F3E9]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group hover:scale-95 transition-transform duration-300 ease-out"
          >
            <Image
              src="/logo.png"
              alt="Ánh Nuôi Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-24">
            <Link
              href="#story"
              className="text-[#2D3A2E] hover:text-[#C25E44] transition-colors font-medium text-md"
            >
              Về dự án
            </Link>
            <Link
              href="#how-it-works"
              className="text-[#2D3A2E] hover:text-[#C25E44] transition-colors font-medium text-md"
            >
              Cách thức
            </Link>
            <Link
              href="/children"
              className="text-[#2D3A2E] hover:text-[#C25E44] transition-colors font-medium text-md"
            >
              Danh sách em
            </Link>
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center gap-4">
            {showAsLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#EDE8DC] rounded-xl border border-[#E5E1D8]">
                  {userInfo?.profileImage ? (
                    <img
                      src={userInfo.profileImage}
                      alt="Profile"
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-[#7D8A4E] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-[#2D3A2E]">
                    {displayName}
                  </span>
                </div>
                <Button
                  onClick={() => logout()}
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-2 border-[#2D3A2E] text-[#2D3A2E] hover:bg-[#2D3A2E] hover:text-white font-medium"
                  disabled={isLoading}
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  {isLoading ? "..." : "Thoát"}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => login()}
                className="bg-[#C25E44] hover:bg-[#A14D38] text-white font-bold rounded-xl px-6 border-2 border-[#C25E44] hover:border-[#A14D38] transition-all hover:scale-[1.02] hover:cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Đang kết nối..." : "Đăng nhập"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-[#EDE8DC] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#2D3A2E]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2D3A2E]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-[#E5E1D8] bg-[#F7F3E9]">
            <nav className="flex flex-col gap-4">
              <Link
                href="#story"
                className="text-[#2D3A2E] hover:text-[#C25E44] transition-colors font-medium px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Về dự án
              </Link>
              <Link
                href="#how-it-works"
                className="text-[#2D3A2E] hover:text-[#C25E44] transition-colors font-medium px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cách thức
              </Link>
              <Link
                href="/children"
                className="text-[#2D3A2E] hover:text-[#C25E44] transition-colors font-medium px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Danh sách em
              </Link>
              <div className="pt-4 mt-2 border-t border-[#E5E1D8]">
                {showAsLoggedIn ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#EDE8DC] rounded-xl">
                      {userInfo?.profileImage ? (
                        <img
                          src={userInfo.profileImage}
                          alt="Profile"
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-[#7D8A4E] flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-[#2D3A2E]">
                        {displayName}
                      </span>
                    </div>
                    <Button
                      onClick={() => logout()}
                      variant="outline"
                      className="w-full rounded-xl border-2 border-[#2D3A2E] text-[#2D3A2E] hover:bg-[#2D3A2E] hover:text-white font-medium"
                      disabled={isLoading}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {isLoading ? "Đang thoát..." : "Đăng xuất"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => login()}
                    className="w-full bg-[#C25E44] hover:bg-[#A14D38] text-white font-bold rounded-xl border-2 border-[#C25E44] hover:cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang kết nối..." : "Đăng nhập"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
