/**
 * Impact Service - Impact proof API endpoints
 */

import { apiClient } from "../client";
import type {
  ApiResult,
  SubmitProofResponse,
  CampaignProofsResponse,
  IpfsUrlResponse,
  RelayerBalanceResponse,
} from "../types";

/**
 * Get all proofs for a specific campaign
 * @param token - Web3Auth JWT token (idToken)
 * @param campaignId - Campaign identifier
 * @returns List of proof CIDs
 */
export async function getCampaignProofs(
  token: string,
  campaignId: number
): Promise<ApiResult<CampaignProofsResponse>> {
  return apiClient.get<CampaignProofsResponse>(
    `/v1/impact/campaign/${campaignId}/proofs`,
    token
  );
}

/**
 * Generate IPFS gateway URLs from a CID (Public endpoint)
 * @param cid - IPFS Content Identifier
 * @returns Primary and alternative IPFS gateway URLs
 */
export async function getIpfsUrls(
  cid: string
): Promise<ApiResult<IpfsUrlResponse>> {
  return apiClient.post<IpfsUrlResponse>("/v1/impact/proof/ipfs-url", { cid });
}

/**
 * Get relayer wallet balance
 * @param token - Web3Auth JWT token (idToken)
 * @returns Relayer balance and address
 */
export async function getRelayerBalance(
  token: string
): Promise<ApiResult<RelayerBalanceResponse>> {
  return apiClient.get<RelayerBalanceResponse>(
    "/v1/impact/relayer/balance",
    token
  );
}

/**
 * Submit proof of impact (requires FormData - handled separately)
 * This is a placeholder - actual implementation requires multipart/form-data
 */
export async function submitProof(
  token: string,
  image: File,
  campaignId: number,
  description?: string
): Promise<ApiResult<SubmitProofResponse>> {
  // This requires special handling for FormData
  const formData = new FormData();
  formData.append("image", image);
  formData.append("campaignId", campaignId.toString());
  if (description) {
    formData.append("description", description);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/impact/proof`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP Error: ${response.status}`,
      };
    }

    return data as ApiResult<SubmitProofResponse>;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      error: message,
    };
  }
}
