/**
 * Auth Store - Global authentication state using Jotai
 */

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { User } from "@/lib/api/types";

// ============================================================================
// Types
// ============================================================================

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// Atoms
// ============================================================================

/**
 * JWT Token stored in localStorage for persistence
 */
export const tokenAtom = atomWithStorage<string | null>("auth_token", null);

/**
 * Current authenticated user
 */
export const userAtom = atom<User | null>(null);

/**
 * Loading state for auth operations
 */
export const authLoadingAtom = atom<boolean>(false);

/**
 * Auth error message
 */
export const authErrorAtom = atom<string | null>(null);

/**
 * Derived atom: Check if user is authenticated
 */
export const isAuthenticatedAtom = atom((get) => {
  const user = get(userAtom);
  const token = get(tokenAtom);
  return !!user && !!token;
});

/**
 * Derived atom: Combined auth state
 */
export const authStateAtom = atom<AuthState>((get) => ({
  user: get(userAtom),
  token: get(tokenAtom),
  isAuthenticated: get(isAuthenticatedAtom),
  isLoading: get(authLoadingAtom),
  error: get(authErrorAtom),
}));
