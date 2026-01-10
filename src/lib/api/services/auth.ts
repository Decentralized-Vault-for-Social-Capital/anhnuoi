/**
 * Auth Service - Authentication API endpoints
 */

import { apiClient } from "../client";
import type { ApiResult, LoginResponse, MeResponse } from "../types";

/**
 * Login or register user with Web3Auth credentials
 * @param walletAddress - User's wallet address from Web3Auth
 * @returns User data including wallet address, email, and name
 */
export async function login(
  walletAddress: string
): Promise<ApiResult<LoginResponse>> {
  return apiClient.post<LoginResponse>("/api/auth/login", { walletAddress });
}

/**
 * Get current authenticated user's profile
 * @param token - Web3Auth JWT token (idToken)
 * @returns User profile data
 */
export async function getMe(token: string): Promise<ApiResult<MeResponse>> {
  return apiClient.get<MeResponse>("/api/auth/me", token);
}
