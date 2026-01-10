/**
 * Health Service - Health check API endpoints
 */

import { apiClient } from "../client";
import type { ApiResult, HealthCheckData } from "../types";

/**
 * Check API server health status
 * @returns Health check data including status, timestamp, and uptime
 */
export async function checkHealth(): Promise<ApiResult<HealthCheckData>> {
  return apiClient.get<HealthCheckData>("/health");
}
