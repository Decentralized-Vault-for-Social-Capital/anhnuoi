/**
 * API Client - Core HTTP client for making API requests
 */

import { env } from "@/config/env";
import type { ApiResult } from "./types";

// ============================================================================
// Types
// ============================================================================

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.apiUrl || "";
  }

  /**
   * Make an HTTP request to the API
   */
  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResult<T>> {
    const { method = "GET", body, headers = {}, token } = options;

    const url = `${this.baseUrl}${endpoint}`;

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Add authorization header if token is provided
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    try {
      console.log("API Request:", {
        url,
        method,
        body,
        headers: requestHeaders,
      });
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP Error: ${response.status}`,
        };
      }

      return data as ApiResult<T>;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        success: false,
        error: message,
      };
    }
  }

  /**
   * GET request
   */
  get<T>(endpoint: string, token?: string): Promise<ApiResult<T>> {
    return this.request<T>(endpoint, { method: "GET", token });
  }

  /**
   * POST request
   */
  post<T>(
    endpoint: string,
    body?: unknown,
    token?: string
  ): Promise<ApiResult<T>> {
    return this.request<T>(endpoint, { method: "POST", body, token });
  }

  /**
   * PUT request
   */
  put<T>(
    endpoint: string,
    body?: unknown,
    token?: string
  ): Promise<ApiResult<T>> {
    return this.request<T>(endpoint, { method: "PUT", body, token });
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, token?: string): Promise<ApiResult<T>> {
    return this.request<T>(endpoint, { method: "DELETE", token });
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const apiClient = new ApiClient();
export default apiClient;
