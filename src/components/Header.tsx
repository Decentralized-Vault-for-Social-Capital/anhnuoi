"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, LogOut } from "lucide-react";
import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from "@web3auth/modal/react";
import { useAccount } from "wagmi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    connect,
    isConnected,
    loading: connectLoading,
  } = useWeb3AuthConnect();
  const { disconnect, loading: disconnectLoading } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { address } = useAccount();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Anh Nuôi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#about"
              className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
            >
              Giới thiệu
            </Link>
            <Link
              href="#mission"
              className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
            >
              Sứ mệnh
            </Link>
            <Link
              href="#impact"
              className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
            >
              Tác động
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
            >
              Cách thức
            </Link>
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  {userInfo?.profileImage && (
                    <img
                      src={userInfo.profileImage}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {userInfo?.name || (address && truncateAddress(address))}
                  </span>
                </div>
                <Button
                  onClick={() => disconnect()}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={disconnectLoading}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {disconnectLoading ? "..." : "Thoát"}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => connect()}
                className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold rounded-full px-6"
                disabled={connectLoading}
              >
                {connectLoading ? "Đang kết nối..." : "Đăng nhập"}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link
                href="#about"
                className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Giới thiệu
              </Link>
              <Link
                href="#mission"
                className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sứ mệnh
              </Link>
              <Link
                href="#impact"
                className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tác động
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cách thức
              </Link>
              <div className="pt-4">
                {isConnected ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                      {userInfo?.profileImage && (
                        <img
                          src={userInfo.profileImage}
                          alt="Profile"
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {userInfo?.name ||
                          (address && truncateAddress(address))}
                      </span>
                    </div>
                    <Button
                      onClick={() => disconnect()}
                      variant="outline"
                      className="w-full"
                      disabled={disconnectLoading}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {disconnectLoading ? "Đang thoát..." : "Đăng xuất"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => connect()}
                    className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold"
                    disabled={connectLoading}
                  >
                    {connectLoading ? "Đang kết nối..." : "Đăng nhập"}
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
