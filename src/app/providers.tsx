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
import { WagmiProvider, http, createConfig } from "wagmi";
import { Provider as JotaiProvider } from "jotai";
import Header from "@/components/Header";
import { Web3AuthProvider } from "@web3auth/modal/react";
import web3AuthContextConfig from "@/context/web3authContext";
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
      <Web3AuthProvider config={web3AuthContextConfig}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Header />
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </Web3AuthProvider>
    </JotaiProvider>
  );
}
