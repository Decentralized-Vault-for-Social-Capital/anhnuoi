/**
 * Payment Service - Payment API endpoints
 */

import { apiClient } from "../client";
import type {
  ApiResult,
  CreatePaymentRequest,
  CreatePaymentResponse,
  TransactionsResponse,
  OrderStatusResponse,
  ExchangeRateResponse,
} from "../types";

/**
 * Create a VNPay payment URL for purchasing tokens
 * @param token - Web3Auth JWT token (idToken)
 * @param data - Payment request data (amount, bankCode, language)
 * @returns Payment URL and order ID
 */
export async function createPayment(
  token: string,
  data: CreatePaymentRequest
): Promise<ApiResult<CreatePaymentResponse>> {
  return apiClient.post<CreatePaymentResponse>("/payment/create", data, token);
}

/**
 * Get user's transaction history
 * @param token - Web3Auth JWT token (idToken)
 * @param limit - Number of transactions to return (default: 50, max: 100)
 * @returns List of transactions and total count
 */
export async function getTransactions(
  token: string,
  limit: number = 50
): Promise<ApiResult<TransactionsResponse>> {
  return apiClient.get<TransactionsResponse>(
    `/payment/transactions?limit=${limit}`,
    token
  );
}

/**
 * Get status of a specific order
 * @param token - Web3Auth JWT token (idToken)
 * @param orderId - The order ID from createPayment
 * @returns Order status and transaction hash
 */
export async function getOrderStatus(
  token: string,
  orderId: string
): Promise<ApiResult<OrderStatusResponse>> {
  return apiClient.get<OrderStatusResponse>(
    `/payment/order/${encodeURIComponent(orderId)}`,
    token
  );
}

/**
 * Get current VND to token exchange rate (Public endpoint)
 * @returns Exchange rate and token symbol
 */
export async function getExchangeRate(): Promise<
  ApiResult<ExchangeRateResponse>
> {
  return apiClient.get<ExchangeRateResponse>("/payment/rate");
}

/**
 * Calculate token amount from VND amount
 * @param amountVND - Amount in VND
 * @param vndPerToken - Exchange rate (VND per token)
 * @returns Token amount
 */
export function calculateTokenAmount(
  amountVND: number,
  vndPerToken: number
): number {
  return amountVND / vndPerToken;
}

/**
 * Redirect user to VNPay payment page
 * @param paymentUrl - Payment URL from createPayment response
 */
export function redirectToPayment(paymentUrl: string): void {
  if (typeof window !== "undefined") {
    window.location.href = paymentUrl;
  }
}

/**
 * Parse payment result from URL query parameters
 * @returns Payment result object or null if not on result page
 */
export function parsePaymentResult(): {
  success: boolean;
  orderId: string | null;
  message: string | null;
  amount: number | null;
} | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const success = params.get("success");

  if (success === null) {
    return null;
  }

  return {
    success: success === "true",
    orderId: params.get("orderId"),
    message: params.get("message"),
    amount: params.get("amount") ? Number(params.get("amount")) : null,
  };
}
