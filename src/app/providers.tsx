"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
  phantomWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Provider as JotaiProvider } from "jotai";
import Header from "@/components/Header";
import { Web3AuthContextProvider } from "@/context/CustomWeb3AuthContext";
import { LanguageProvider } from "@/lib/i18n";
import { sepolia } from "wagmi/chains";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "",
  projectId: "ddf8cf3ee0013535c3760d4c79c9c8b9",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [phantomWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [sepolia],
  transports: {},
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <LanguageProvider>
        <Web3AuthContextProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                <Header />
                {children}
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </Web3AuthContextProvider>
      </LanguageProvider>
    </JotaiProvider>
  );
}
