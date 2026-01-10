/**
 * Webhook Service - Webhook monitoring API endpoints
 */

import { apiClient } from "../client";
import type { ApiResult, WebhookHealthResponse } from "../types";

/**
 * Check webhook service health status
 * @returns Webhook health status and timestamp
 */
export async function checkWebhookHealth(): Promise<
  ApiResult<WebhookHealthResponse>
> {
  return apiClient.get<WebhookHealthResponse>("/api/webhook/health");
}
