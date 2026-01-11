"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  History,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Copy,
  Check,
  Wallet,
  TrendingUp,
  Sparkles,
  Receipt,
  Loader2,
  RefreshCw,
  UtensilsCrossed,
  Shield,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useApiWithAuth } from "@/hooks/useApiWithAuth";
import type { Transaction, TransactionStatus } from "@/lib/api/types";
import { mockMealProofs, getRecentProofs } from "@/lib/data/mealProofs";
import { cn } from "@/lib/utils";

type TabType = "transactions" | "proofs";

export default function HistoryPage() {
  const { isAuthenticated, token } = useAuth();
  const { getTransactions } = useApiWithAuth();

  const [activeTab, setActiveTab] = useState<TabType>("transactions");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Mock proofs data
  const proofs = getRecentProofs(10);

  useEffect(() => {
    if (isAuthenticated && token && activeTab === "transactions") {
      fetchTransactions();
    }
  }, [isAuthenticated, token, activeTab]);

  const fetchTransactions = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const result = await getTransactions(50);
      if (result.success) {
        setTransactions(result.data.transactions);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Không thể tải lịch sử giao dịch");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
      case "processing":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "failed":
      case "expired":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "Thành công";
      case "pending":
        return "Đang chờ";
      case "processing":
        return "Đang xử lý";
      case "failed":
        return "Thất bại";
      case "expired":
        return "Hết hạn";
      default:
        return status;
    }
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
      case "processing":
        return "bg-amber-100 text-amber-700";
      case "failed":
      case "expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-white/20">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="absolute top-20 right-20 text-white/20">
            <History className="w-16 h-16" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </Link>

          <div className="text-center pb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                Minh bạch trên Blockchain
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Lịch sử hoạt động
            </h1>
            <p className="text-white/90 text-lg">
              Theo dõi giao dịch và bằng chứng bữa ăn của các em
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex gap-2">
          <button
            onClick={() => setActiveTab("transactions")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all",
              activeTab === "transactions"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Receipt className="w-5 h-5" />
            <span>Giao dịch</span>
          </button>
          <button
            onClick={() => setActiveTab("proofs")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all",
              activeTab === "proofs"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Camera className="w-5 h-5" />
            <span>Bằng chứng bữa ăn</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === "transactions" ? (
          <TransactionsTab
            transactions={transactions}
            loading={loading}
            error={error}
            isAuthenticated={isAuthenticated}
            onRefresh={fetchTransactions}
            copiedHash={copiedHash}
            onCopyHash={copyToClipboard}
            getStatusIcon={getStatusIcon}
            getStatusText={getStatusText}
            getStatusColor={getStatusColor}
            formatDate={formatDate}
            formatAmount={formatAmount}
            shortenHash={shortenHash}
          />
        ) : (
          <ProofsTab
            proofs={proofs}
            copiedHash={copiedHash}
            onCopyHash={copyToClipboard}
            formatDate={formatDate}
            shortenHash={shortenHash}
          />
        )}
      </div>
    </div>
  );
}

// Transactions Tab Component
interface TransactionsTabProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  onRefresh: () => void;
  copiedHash: string | null;
  onCopyHash: (hash: string) => void;
  getStatusIcon: (status: TransactionStatus) => React.ReactNode;
  getStatusText: (status: TransactionStatus) => string;
  getStatusColor: (status: TransactionStatus) => string;
  formatDate: (date: string) => string;
  formatAmount: (amount: number) => string;
  shortenHash: (hash: string) => string;
}

function TransactionsTab({
  transactions,
  loading,
  error,
  isAuthenticated,
  onRefresh,
  copiedHash,
  onCopyHash,
  getStatusIcon,
  getStatusText,
  getStatusColor,
  formatDate,
  formatAmount,
  shortenHash,
}: TransactionsTabProps) {
  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Đăng nhập để xem lịch sử
        </h3>
        <p className="text-gray-600 mb-6">
          Bạn cần đăng nhập để xem lịch sử giao dịch của mình
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            Đăng nhập ngay
          </Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Đang tải lịch sử giao dịch...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Không thể tải dữ liệu
        </h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button
          onClick={onRefresh}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Thử lại
        </Button>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Receipt className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Chưa có giao dịch nào
        </h3>
        <p className="text-gray-600 mb-6">
          Bạn chưa thực hiện giao dịch ủng hộ nào
        </p>
        <Link href="/children">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Ủng hộ ngay
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {transactions.length} giao dịch
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="text-gray-600"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Làm mới
        </Button>
      </div>

      {/* Transaction List */}
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {getStatusIcon(tx.status)}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800">
                    {formatAmount(tx.amountVND)} VND
                  </span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      getStatusColor(tx.status)
                    )}
                  >
                    {getStatusText(tx.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(tx.createdAt)}
                </p>
                {tx.txHash && (
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {shortenHash(tx.txHash)}
                    </code>
                    <button
                      onClick={() => onCopyHash(tx.txHash!)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {copiedHash === tx.txHash ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={`https://explorer.sepolia.mantle.xyz/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Token</p>
              <p className="font-bold text-amber-600">{tx.tokenAmount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Proofs Tab Component
interface ProofsTabProps {
  proofs: typeof mockMealProofs;
  copiedHash: string | null;
  onCopyHash: (hash: string) => void;
  formatDate: (date: string) => string;
  shortenHash: (hash: string) => string;
}

function ProofsTab({
  proofs,
  copiedHash,
  onCopyHash,
  formatDate,
  shortenHash,
}: ProofsTabProps) {
  const getMealTypeText = (type: string) => {
    switch (type) {
      case "breakfast":
        return "Bữa sáng";
      case "lunch":
        return "Bữa trưa";
      case "dinner":
        return "Bữa tối";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {proofs.length} bằng chứng bữa ăn
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Đã xác thực trên Blockchain</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-green-800 mb-1">
              Minh bạch 100% trên Blockchain
            </h3>
            <p className="text-sm text-green-700">
              Mỗi bữa ăn được chụp ảnh và lưu trữ trên IPFS, ghi nhận trên
              blockchain Mantle để đảm bảo tính minh bạch và không thể thay đổi.
            </p>
          </div>
        </div>
      </div>

      {/* Proof List */}
      {proofs.map((proof) => (
        <div
          key={proof.id}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-48 h-48 md:h-auto relative flex-shrink-0">
              <Image
                src={proof.imageUrl}
                alt={proof.description}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-amber-700">
                {getMealTypeText(proof.mealType)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    {proof.childName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(proof.verifiedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Đã xác thực</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{proof.description}</p>

              <div className="flex flex-wrap gap-4 text-xs">
                {/* IPFS CID */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">IPFS:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                    {shortenHash(proof.ipfsCid)}
                  </code>
                  <button
                    onClick={() => onCopyHash(proof.ipfsCid)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {copiedHash === proof.ipfsCid ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                {/* TX Hash */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">TX:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                    {shortenHash(proof.txHash)}
                  </code>
                  <button
                    onClick={() => onCopyHash(proof.txHash)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {copiedHash === proof.txHash ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                  <a
                    href={`https://explorer.sepolia.mantle.xyz/tx/${proof.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  <UtensilsCrossed className="w-3 h-3 inline mr-1" />
                  Gửi bởi: {proof.submittedBy}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
