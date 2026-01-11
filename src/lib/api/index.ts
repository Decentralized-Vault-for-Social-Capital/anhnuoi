/**
 * API Module - Central export for all API services
 *
 * Usage:
 * ```typescript
 * import { api } from "@/lib/api";
 *
 * // Health check
 * const health = await api.health.check();
 *
 * // Auth
 * const user = await api.auth.login(token);
 * const me = await api.auth.getMe(token);
 *
 * // Payment
 * const payment = await api.payment.create(token, { amount: 100000 });
 * const transactions = await api.payment.getTransactions(token);
 * const order = await api.payment.getOrderStatus(token, orderId);
 * const rate = await api.payment.getExchangeRate();
 * ```
 */

// Services
import * as healthService from "./services/health";
import * as authService from "./services/auth";
import * as paymentService from "./services/payment";
import * as webhookService from "./services/webhook";
import * as impactService from "./services/impact";

// Export API namespace
export const api = {
  health: {
    check: healthService.checkHealth,
  },
  auth: {
    login: authService.login,
    getMe: authService.getMe,
  },
  payment: {
    create: paymentService.createPayment,
    getTransactions: paymentService.getTransactions,
    getOrderStatus: paymentService.getOrderStatus,
    getExchangeRate: paymentService.getExchangeRate,
    triggerVnpayIpn: paymentService.triggerVnpayIpn,
    calculateTokenAmount: paymentService.calculateTokenAmount,
    redirectToPayment: paymentService.redirectToPayment,
    parsePaymentResult: paymentService.parsePaymentResult,
  },
  webhook: {
    checkHealth: webhookService.checkWebhookHealth,
  },
  impact: {
    submitProof: impactService.submitProof,
    getCampaignProofs: impactService.getCampaignProofs,
    getIpfsUrls: impactService.getIpfsUrls,
    getRelayerBalance: impactService.getRelayerBalance,
  },
} as const;

// Export types
export type * from "./types";

// Export individual services for direct import
export {
  healthService,
  authService,
  paymentService,
  webhookService,
  impactService,
};

// Export API client for advanced usage
export { apiClient } from "./client";

export default api;
