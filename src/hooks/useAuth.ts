/**
 * useAuth Hook - Complete authentication flow with Web3Auth + API
 *
 * This hook manages:
 * 1. Web3Auth connection (social/email login)
 * 2. JWT token extraction from Web3Auth
 * 3. API authentication (register/login)
 * 4. Global auth state management
 */

"use client";

import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { useWeb3AuthContext } from "@/context/CustomWeb3AuthContext";
import { useAccount } from "wagmi";
import { api } from "@/lib/api";
import {
  tokenAtom,
  userAtom,
  authLoadingAtom,
  authErrorAtom,
  isAuthenticatedAtom,
} from "@/store/authStore";
import type { User } from "@/lib/api/types";

export function useAuth() {
  // Jotai state
  const [token, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useAtom(authLoadingAtom);
  const [error, setError] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  // Custom Web3Auth context
  const {
    web3Auth,
    isConnected,
    isInitialized,
    isLoading: web3AuthLoading,
    userInfo,
    connect: web3AuthConnect,
    connectWithModal: web3AuthConnectWithModal,
    disconnect: web3AuthDisconnect,
    getUserInfo,
  } = useWeb3AuthContext();

  // Wagmi account
  const { address } = useAccount();

  /**
   * Get JWT token from Web3Auth
   */
  const getIdToken = useCallback(async (): Promise<string | null> => {
    try {
      if (!web3Auth) {
        console.warn("Web3Auth not initialized");
        return null;
      }

      // Use getUserInfo method for getting user data including idToken
      const userAuthInfo = await web3Auth.getUserInfo();

      // Check if idToken is available from user info
      if (userAuthInfo?.idToken) {
        return userAuthInfo.idToken;
      }

      // Fallback: Try to get session ID from Web3Auth instance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const web3AuthInstance = web3Auth as any;
      if (web3AuthInstance.sessionId) {
        return web3AuthInstance.sessionId;
      }

      console.warn("Could not retrieve idToken");
      return null;
    } catch (err) {
      console.error("Failed to get ID token:", err);
      return null;
    }
  }, [web3Auth]);

  /**
   * Login to API with wallet address
   */
  const loginToApi = useCallback(
    async (walletAddress: string, jwtToken: string): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await api.auth.login(walletAddress);

        if (result.success) {
          setUser(result.data);
          setToken(jwtToken);
          return result.data;
        } else {
          setError(result.error);
          return null;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setToken, setError, setIsLoading]
  );

  /**
   * Fetch current user from API
   */
  const fetchCurrentUser = useCallback(
    async (jwtToken: string): Promise<User | null> => {
      try {
        const result = await api.auth.getMe(jwtToken);

        if (result.success) {
          setUser(result.data);
          return result.data;
        }
        return null;
      } catch {
        return null;
      }
    },
    [setUser]
  );

  /**
   * Full login flow: Web3Auth -> Get Token -> API Login
   */
  const login = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Connect with Web3Auth Modal (shows login options)
      // Using connectWithModal instead of direct connectTo for better v10 compatibility
      await web3AuthConnectWithModal();

      // Note: The actual API login happens in the useEffect
      // when isConnected becomes true

      // If connect() resolves but user is not connected (modal was closed),
      // reset loading state. The useEffect will handle the connected case.
    } catch (err) {
      const message = err instanceof Error ? err.message : "Connection failed";
      setError(message);
    } finally {
      // Always reset loading after connect attempt completes
      // The useEffect will set it again if needed for API login
      setIsLoading(false);
    }
  }, [web3AuthConnectWithModal, setError, setIsLoading]);

  /**
   * Full logout flow: Clear state -> Disconnect Web3Auth
   */
  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      // Clear local state first
      setUser(null);
      setToken(null);
      setError(null);

      // Disconnect from Web3Auth
      await web3AuthDisconnect();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [web3AuthDisconnect, setUser, setToken, setError, setIsLoading]);

  /**
   * Refresh token and re-authenticate
   */
  const refreshAuth = useCallback(async () => {
    if (!isConnected) return null;

    const newToken = await getIdToken();
    if (newToken) {
      setToken(newToken);
      return fetchCurrentUser(newToken);
    }
    return null;
  }, [isConnected, getIdToken, setToken, fetchCurrentUser]);

  /**
   * Effect: Reset loading state when Web3Auth loading finishes
   * This handles the case where modal is closed without completing login
   */
  useEffect(() => {
    // When web3AuthLoading becomes false and user is not connected,
    // ensure our loading state is also reset
    if (!web3AuthLoading && !isConnected && isLoading) {
      setIsLoading(false);
    }
  }, [web3AuthLoading, isConnected, isLoading, setIsLoading]);

  /**
   * Effect: Handle Web3Auth connection state changes
   * When user connects via Web3Auth, automatically login to API
   */
  useEffect(() => {
    const handleConnection = async () => {
      if (isConnected && !user) {
        setIsLoading(true);

        // Get JWT token from Web3Auth
        const jwtToken = await getIdToken();

        if (jwtToken && address) {
          // Login to API with wallet address
          await loginToApi(address, jwtToken);
        } else {
          setError("Failed to get authentication token or wallet address");
          setIsLoading(false);
        }
      }
    };

    // Small delay to ensure Web3Auth is fully initialized
    const timeoutId = setTimeout(handleConnection, 500);

    return () => clearTimeout(timeoutId);
  }, [
    isConnected,
    user,
    address,
    getIdToken,
    loginToApi,
    setError,
    setIsLoading,
  ]);

  /**
   * Effect: Restore session on mount
   * If token exists in storage and Web3Auth is connected, verify with API
   */
  useEffect(() => {
    const restoreSession = async () => {
      if (token && isConnected && !user) {
        setIsLoading(true);

        // Try to fetch current user with stored token
        const fetchedUser = await fetchCurrentUser(token);

        if (!fetchedUser) {
          // Token is invalid, try to get a new one
          const newToken = await getIdToken();
          if (newToken) {
            setToken(newToken);
            await fetchCurrentUser(newToken);
          } else {
            // Can't restore session, clear token
            setToken(null);
          }
        }

        setIsLoading(false);
      }
    };

    restoreSession();
  }, [
    token,
    isConnected,
    user,
    fetchCurrentUser,
    getIdToken,
    setToken,
    setIsLoading,
  ]);

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || web3AuthLoading,
    error,

    // Web3Auth info
    userInfo,
    address,
    isConnected,
    isInitialized,

    // Actions
    login,
    logout,
    refreshAuth,
    getIdToken,

    // Direct API calls (for advanced usage)
    loginToApi,
    fetchCurrentUser,
  };
}

export default useAuth;
