"use client";

/**
 * Web3Auth Context using Modal SDK v10
 * Uses @web3auth/modal as recommended by v9->v10 migration guide
 * Chain configuration is managed via Web3Auth Developer Dashboard
 */

import React, {
  ReactNode,
  useCallback,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Web3Auth, AUTH_CONNECTION, WALLET_CONNECTORS } from "@web3auth/modal";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  type IProvider,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { mantleSepoliaTestnet } from "viem/chains";
import { env } from "@/config/env";

const clientId = env.web3AuthClientId || "";

// Chain configuration for custom chain (Mantle Sepolia)
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: `0x${mantleSepoliaTestnet.id.toString(16)}`,
  rpcTarget: mantleSepoliaTestnet.rpcUrls.default.http[0],
  displayName: mantleSepoliaTestnet.name,
  blockExplorerUrl: mantleSepoliaTestnet.blockExplorers?.default.url || "",
  ticker: mantleSepoliaTestnet.nativeCurrency.symbol,
  tickerName: mantleSepoliaTestnet.nativeCurrency.name,
  logo: "https://cryptologos.cc/logos/mantle-mnt-logo.png",
};

interface UserInfo {
  email?: string;
  name?: string;
  profileImage?: string;
  verifier?: string;
  verifierId?: string;
  typeOfLogin?: string;
  aggregateVerifier?: string;
  dappShare?: string;
  idToken?: string;
  oAuthIdToken?: string;
  oAuthAccessToken?: string;
}

interface Web3AuthContextValue {
  web3Auth: Web3Auth | null;
  provider: IProvider | null;
  isConnected: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  userInfo: Partial<UserInfo> | null;
  address: string | null;
  connect: (loginProvider?: string) => Promise<IProvider | null>;
  connectWithModal: () => Promise<IProvider | null>;
  disconnect: () => Promise<void>;
  getUserInfo: () => Promise<Partial<UserInfo> | null>;
  getAddress: () => Promise<string | null>;
}

// Default context value
const defaultContextValue: Web3AuthContextValue = {
  web3Auth: null,
  provider: null,
  isConnected: false,
  isInitialized: false,
  isLoading: false,
  userInfo: null,
  address: null,
  connect: async () => null,
  connectWithModal: async () => null,
  disconnect: async () => {},
  getUserInfo: async () => null,
  getAddress: async () => null,
};

// Context
const Web3AuthUnifiedContext =
  createContext<Web3AuthContextValue>(defaultContextValue);

// Provider component
export function Web3AuthContextProvider({ children }: { children: ReactNode }) {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  // Initialize Web3Auth
  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        console.log("Initializing Web3Auth Modal with clientId:", clientId);

        // Create private key provider for custom chain
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        // Create Web3Auth Modal instance (v10 API)
        const web3AuthInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          // privateKeyProvider,
          uiConfig: {
            uxMode: "popup",
            loginMethodsOrder: ["email_passwordless", "google", "facebook"],
          },
          // Configure auth connection IDs for login methods
          // connectorSettings: {
          //   auth: {
          //     loginMethods: {
          //       email_passwordless: {
          //         authConnectionId: "anh-nuoi",
          //       },
          //     },
          //   },
          // },
        });

        console.log("Web3Auth Modal instance created, initializing...");

        // Initialize
        await web3AuthInstance.init();

        console.log(
          "Web3Auth Modal initialized successfully, status:",
          web3AuthInstance.status
        );

        // Debug: Check if auth connector is properly configured
        // @ts-expect-error - accessing internal connectors for debugging
        const connectors = web3AuthInstance.connectors || [];
        console.log(
          "Available connectors:",
          connectors.map((c: { name: string }) => c.name)
        );

        const authConnector = connectors.find(
          (c: { name: string }) => c.name === "auth"
        );
        if (authConnector) {
          console.log("Auth connector status:", authConnector.status);
          // @ts-expect-error - accessing internal for debugging
          console.log("Auth instance exists:", !!authConnector.authInstance);
        } else {
          console.warn(
            "⚠️ No auth connector found! Email/social login will not work."
          );
          console.warn(
            "⚠️ Please enable 'Email Passwordless' in your Web3Auth Dashboard:"
          );
          console.warn("⚠️ https://dashboard.web3auth.io/");
        }

        setWeb3Auth(web3AuthInstance);
        setIsInitialized(true);

        // Check if already connected
        if (web3AuthInstance.connected && web3AuthInstance.provider) {
          setProvider(web3AuthInstance.provider);
          setIsConnected(true);

          // Get address from provider
          try {
            const accounts = (await web3AuthInstance.provider.request({
              method: "eth_accounts",
            })) as string[];
            if (accounts && accounts.length > 0) {
              setAddress(accounts[0]);
              console.log("Restored address:", accounts[0]);
            }
          } catch (e) {
            console.log("Could not get address:", e);
          }

          try {
            const info = await web3AuthInstance.getUserInfo();
            setUserInfo(info);
            console.log("Restored user info:", info);
          } catch (e) {
            console.log("Could not get user info:", e);
          }
        }
      } catch (error) {
        console.error("Web3Auth init error:", error);
        setIsInitialized(true); // Still set initialized to prevent infinite loading
      }
    };

    initWeb3Auth();
  }, []);

  // Helper function to get address from provider
  const fetchAddress = useCallback(
    async (web3authProvider: IProvider): Promise<string | null> => {
      try {
        const accounts = (await web3authProvider.request({
          method: "eth_accounts",
        })) as string[];
        if (accounts && accounts.length > 0) {
          return accounts[0];
        }
        return null;
      } catch (e) {
        console.error("Failed to get address:", e);
        return null;
      }
    },
    []
  );

  // Connect with Modal UI
  const connectWithModal = useCallback(async (): Promise<IProvider | null> => {
    if (!web3Auth) {
      console.error("Web3Auth not initialized");
      return null;
    }

    setIsLoading(true);
    try {
      console.log("Opening Web3Auth Modal...");
      const web3authProvider = await web3Auth.connect();

      if (web3authProvider) {
        setProvider(web3authProvider);
        setIsConnected(true);

        // Get address from provider
        const addr = await fetchAddress(web3authProvider);
        if (addr) {
          setAddress(addr);
          console.log("Connected address:", addr);
        }

        try {
          const info = await web3Auth.getUserInfo();
          setUserInfo(info);
          console.log("User info:", info);
        } catch (e) {
          console.log("Could not get user info after connect:", e);
        }
      }

      return web3authProvider;
    } catch (error) {
      console.error("Connect error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [web3Auth, fetchAddress]);

  // Connect directly with a specific provider (no-modal style using connectTo)
  const connect = useCallback(
    async (
      loginProvider: string = "email_passwordless"
    ): Promise<IProvider | null> => {
      console.log("Connect called with provider:", loginProvider);

      if (!web3Auth) {
        console.error("Web3Auth not initialized");
        return null;
      }

      // Map login provider strings to AUTH_CONNECTION constants
      const authConnectionMap: Record<string, string> = {
        email_passwordless: AUTH_CONNECTION.EMAIL_PASSWORDLESS,
        google: AUTH_CONNECTION.GOOGLE,
        facebook: AUTH_CONNECTION.FACEBOOK,
        twitter: AUTH_CONNECTION.TWITTER,
        discord: AUTH_CONNECTION.DISCORD,
        apple: AUTH_CONNECTION.APPLE,
        github: AUTH_CONNECTION.GITHUB,
        linkedin: AUTH_CONNECTION.LINKEDIN,
        reddit: AUTH_CONNECTION.REDDIT,
        twitch: AUTH_CONNECTION.TWITCH,
        line: AUTH_CONNECTION.LINE,
        kakao: AUTH_CONNECTION.KAKAO,
        wechat: AUTH_CONNECTION.WECHAT,
        sms_passwordless: AUTH_CONNECTION.SMS_PASSWORDLESS,
        farcaster: AUTH_CONNECTION.FARCASTER,
      };

      const authConnection = authConnectionMap[loginProvider] || loginProvider;
      console.log("Using authConnection:", authConnection);

      setIsLoading(true);
      try {
        // Use connectTo for direct connection without modal
        console.log("Calling connectTo with authConnection:", authConnection);
        const web3authProvider = await web3Auth.connectTo(
          WALLET_CONNECTORS.AUTH,
          {
            authConnection,
            // Use custom Auth Connection ID for email_passwordless
            ...(authConnection === AUTH_CONNECTION.EMAIL_PASSWORDLESS && {
              authConnectionId: "anh-nuoi",
            }),
          }
        );

        if (web3authProvider) {
          setProvider(web3authProvider);
          setIsConnected(true);

          // Get address from provider
          const addr = await fetchAddress(web3authProvider);
          if (addr) {
            setAddress(addr);
            console.log("Connected address:", addr);
          }

          try {
            const info = await web3Auth.getUserInfo();
            setUserInfo(info);
            console.log("User info:", info);
          } catch (e) {
            console.log("Could not get user info after connect:", e);
          }
        }

        return web3authProvider;
      } catch (error) {
        console.error("Connect error:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [web3Auth, fetchAddress]
  );

  // Disconnect function
  const disconnect = useCallback(async (): Promise<void> => {
    if (!web3Auth) {
      console.error("Web3Auth not initialized");
      return;
    }

    setIsLoading(true);
    try {
      await web3Auth.logout();
      setProvider(null);
      setIsConnected(false);
      setUserInfo(null);
      setAddress(null);
    } catch (error) {
      console.error("Disconnect error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [web3Auth]);

  // Get user info function
  const getUserInfo =
    useCallback(async (): Promise<Partial<UserInfo> | null> => {
      if (!web3Auth || !isConnected) {
        return null;
      }

      try {
        const info = await web3Auth.getUserInfo();
        setUserInfo(info);
        return info;
      } catch (error) {
        console.error("Get user info error:", error);
        return null;
      }
    }, [web3Auth, isConnected]);

  // Get address function
  const getAddress = useCallback(async (): Promise<string | null> => {
    if (!provider) {
      return null;
    }
    const addr = await fetchAddress(provider);
    if (addr) {
      setAddress(addr);
    }
    return addr;
  }, [provider, fetchAddress]);

  const contextValue: Web3AuthContextValue = {
    web3Auth,
    provider,
    isConnected,
    isInitialized,
    isLoading,
    userInfo,
    address,
    connect,
    connectWithModal,
    disconnect,
    getUserInfo,
    getAddress,
  };

  return (
    <Web3AuthUnifiedContext.Provider value={contextValue}>
      {children}
    </Web3AuthUnifiedContext.Provider>
  );
}

// Custom hook to use the context
export function useWeb3AuthContext(): Web3AuthContextValue {
  const context = useContext(Web3AuthUnifiedContext);
  return context;
}

export default Web3AuthUnifiedContext;
