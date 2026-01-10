/**
 * useApiWithAuth Hook - Make authenticated API calls
 *
 * This hook provides easy access to make API calls with the current JWT token
 */

"use client";

import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom, isAuthenticatedAtom } from "@/store/authStore";
import { api } from "@/lib/api";
import type { CreatePaymentRequest } from "@/lib/api/types";

export function useApiWithAuth() {
  const token = useAtomValue(tokenAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  /**
   * Ensure user is authenticated before making API call
   */
  const requireAuth = useCallback(() => {
    if (!token) {
      throw new Error("Authentication required. Please login first.");
    }
    return token;
  }, [token]);

  // ============================================================================
  // Auth API
  // ============================================================================

  const getMe = useCallback(async () => {
    const authToken = requireAuth();
    return api.auth.getMe(authToken);
  }, [requireAuth]);

  // ============================================================================
  // Payment API
  // ============================================================================

  const createPayment = useCallback(
    async (data: CreatePaymentRequest) => {
      const authToken = requireAuth();
      return api.payment.create(authToken, data);
    },
    [requireAuth]
  );

  const createPaymentAndRedirect = useCallback(
    async (data: CreatePaymentRequest) => {
      const authToken = requireAuth();
      const result = await api.payment.create(authToken, data);

      if (result.success) {
        api.payment.redirectToPayment(result.data.paymentUrl);
      }

      return result;
    },
    [requireAuth]
  );

  const getTransactions = useCallback(
    async (limit?: number) => {
      const authToken = requireAuth();
      return api.payment.getTransactions(authToken, limit);
    },
    [requireAuth]
  );

  const getOrderStatus = useCallback(
    async (orderId: string) => {
      const authToken = requireAuth();
      return api.payment.getOrderStatus(authToken, orderId);
    },
    [requireAuth]
  );

  // Public endpoints (no auth required)
  const getExchangeRate = useCallback(() => {
    return api.payment.getExchangeRate();
  }, []);

  const checkHealth = useCallback(() => {
    return api.health.check();
  }, []);

  return {
    // State
    token,
    isAuthenticated,

    // Auth API
    getMe,

    // Payment API
    createPayment,
    createPaymentAndRedirect,
    getTransactions,
    getOrderStatus,
    getExchangeRate,

    // Utils
    checkHealth,
    calculateTokenAmount: api.payment.calculateTokenAmount,
    parsePaymentResult: api.payment.parsePaymentResult,
  };
}

export default useApiWithAuth;
