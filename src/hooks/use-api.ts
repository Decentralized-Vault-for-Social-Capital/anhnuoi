/**
 * API Hooks - React hooks for API integration
 */

"use client";

import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import type {
  User,
  Transaction,
  TransactionStatus,
  ExchangeRateResponse,
  CreatePaymentRequest,
} from "@/lib/api";

// ============================================================================
// Generic API Hook
// ============================================================================

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApiState<T>(initialData: T | null = null): UseApiState<T> & {
  setData: (data: T | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
} {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  return { data, loading, error, setData, setLoading, setError, reset };
}

// ============================================================================
// Auth Hooks
// ============================================================================

export function useAuth() {
  const state = useApiState<User>();

  const login = useCallback(
    async (walletAddress: string, token: string) => {
      state.setLoading(true);
      state.setError(null);

      const result = await api.auth.login(walletAddress, token);

      if (result.success) {
        state.setData(result.data);
      } else {
        state.setError(result.error);
      }

      state.setLoading(false);
      return result;
    },
    [state]
  );

  const getMe = useCallback(
    async (token: string) => {
      state.setLoading(true);
      state.setError(null);

      const result = await api.auth.getMe(token);

      if (result.success) {
        state.setData(result.data);
      } else {
        state.setError(result.error);
      }

      state.setLoading(false);
      return result;
    },
    [state]
  );

  return {
    user: state.data,
    loading: state.loading,
    error: state.error,
    login,
    getMe,
    reset: state.reset,
  };
}

// ============================================================================
// Payment Hooks
// ============================================================================

export function useCreatePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = useCallback(
    async (token: string, data: CreatePaymentRequest) => {
      setLoading(true);
      setError(null);

      const result = await api.payment.create(token, data);

      if (!result.success) {
        setError(result.error);
      }

      setLoading(false);
      return result;
    },
    []
  );

  const createAndRedirect = useCallback(
    async (token: string, data: CreatePaymentRequest) => {
      const result = await createPayment(token, data);

      if (result.success) {
        api.payment.redirectToPayment(result.data.paymentUrl);
      }

      return result;
    },
    [createPayment]
  );

  return {
    loading,
    error,
    createPayment,
    createAndRedirect,
  };
}

export function useTransactions() {
  const state = useApiState<Transaction[]>([]);
  const [total, setTotal] = useState(0);

  const fetchTransactions = useCallback(
    async (token: string, limit?: number) => {
      state.setLoading(true);
      state.setError(null);

      const result = await api.payment.getTransactions(token, limit);

      if (result.success) {
        state.setData(result.data.transactions);
        setTotal(result.data.total);
      } else {
        state.setError(result.error);
      }

      state.setLoading(false);
      return result;
    },
    [state]
  );

  return {
    transactions: state.data ?? [],
    total,
    loading: state.loading,
    error: state.error,
    fetchTransactions,
    reset: state.reset,
  };
}

export function useOrderStatus() {
  const [status, setStatus] = useState<TransactionStatus | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(async (token: string, orderId: string) => {
    setLoading(true);
    setError(null);

    const result = await api.payment.getOrderStatus(token, orderId);

    if (result.success) {
      setStatus(result.data.status);
      setTxHash(result.data.txHash);
    } else {
      setError(result.error);
    }

    setLoading(false);
    return result;
  }, []);

  const pollStatus = useCallback(
    async (
      token: string,
      orderId: string,
      options: {
        interval?: number;
        maxAttempts?: number;
        onStatusChange?: (status: TransactionStatus) => void;
      } = {}
    ) => {
      const { interval = 3000, maxAttempts = 20, onStatusChange } = options;

      let attempts = 0;

      const poll = async (): Promise<TransactionStatus | null> => {
        if (attempts >= maxAttempts) {
          setError("Polling timeout");
          return null;
        }

        attempts++;
        const result = await checkStatus(token, orderId);

        if (result.success) {
          const currentStatus = result.data.status;
          onStatusChange?.(currentStatus);

          // Stop polling if completed or failed
          if (
            currentStatus === "completed" ||
            currentStatus === "failed" ||
            currentStatus === "expired"
          ) {
            return currentStatus;
          }

          // Continue polling
          await new Promise((resolve) => setTimeout(resolve, interval));
          return poll();
        }

        return null;
      };

      return poll();
    },
    [checkStatus]
  );

  return {
    status,
    txHash,
    loading,
    error,
    checkStatus,
    pollStatus,
  };
}

export function useExchangeRate() {
  const state = useApiState<ExchangeRateResponse>();

  const fetchRate = useCallback(async () => {
    state.setLoading(true);
    state.setError(null);

    const result = await api.payment.getExchangeRate();

    if (result.success) {
      state.setData(result.data);
    } else {
      state.setError(result.error);
    }

    state.setLoading(false);
    return result;
  }, [state]);

  const calculateTokens = useCallback(
    (amountVND: number) => {
      if (!state.data) return 0;
      return api.payment.calculateTokenAmount(
        amountVND,
        state.data.vndPerToken
      );
    },
    [state.data]
  );

  return {
    rate: state.data,
    loading: state.loading,
    error: state.error,
    fetchRate,
    calculateTokens,
  };
}

// ============================================================================
// Health Hooks
// ============================================================================

export function useHealthCheck() {
  const [healthy, setHealthy] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await api.health.check();

    if (result.success) {
      setHealthy(result.data.status === "healthy");
    } else {
      setHealthy(false);
      setError(result.error);
    }

    setLoading(false);
    return result;
  }, []);

  return {
    healthy,
    loading,
    error,
    checkHealth,
  };
}
