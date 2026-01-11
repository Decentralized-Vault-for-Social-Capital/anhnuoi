/**
 * API Types - Type definitions for all API requests and responses
 */

// ============================================================================
// Base Types
// ============================================================================

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// ============================================================================
// Health Check Types
// ============================================================================

export interface HealthCheckData {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime?: number;
}

// ============================================================================
// Auth Types
// ============================================================================

export interface User {
  walletAddress: string;
  email: string | null;
  name: string | null;
  createdAt: string;
}

export type LoginResponse = User;

export type MeResponse = User;

// ============================================================================
// Payment Types
// ============================================================================

export interface CreatePaymentRequest {
  amount: number;
  bankCode?: string;
  language?: "vn" | "en";
}

export interface CreatePaymentResponse {
  success: boolean;
  paymentUrl: string;
  orderId: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  amountVND: number;
  tokenAmount: string;
  status: TransactionStatus;
  txHash: string | null;
  createdAt: string;
}

export type TransactionStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "expired";

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
}

export interface OrderStatusResponse {
  orderId: string;
  status: TransactionStatus;
  amountVND: number;
  txHash: string | null;
}

export interface ExchangeRateResponse {
  vndPerToken: number;
  tokenSymbol: string;
}

// ============================================================================
// Webhook Types
// ============================================================================

export interface WebhookHealthResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
}

// ============================================================================
// Impact Types
// ============================================================================

export interface SubmitProofResponse {
  success: boolean;
  ipfsUrl: string;
  txHash: string;
  explorerUrl: string;
  cid: string;
}

export interface CampaignProofsResponse {
  success: boolean;
  campaignId: number;
  proofs: string[];
}

export interface IpfsUrlResponse {
  primary: string;
  alternatives: string[];
}

export interface RelayerBalanceResponse {
  balance: string;
  address: string;
}

// ============================================================================
// Proof Display Types (Mock Data)
// ============================================================================

export interface MealProof {
  id: string;
  childId: string;
  childName: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner";
  description: string;
  imageUrl: string;
  ipfsCid: string;
  txHash: string;
  submittedBy: string;
  verifiedAt: string;
}
