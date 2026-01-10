/**
 * Web3Auth Configuration
 * Centralized config for Web3Auth integration
 */

import { type Web3AuthContextConfig } from "@web3auth/modal/react";
import {
  WEB3AUTH_NETWORK,
  type Web3AuthOptions,
  CHAIN_NAMESPACES,
} from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { mantleSepoliaTestnet } from "viem/chains";
import { env } from "@/config/env";

export const clientId = env.web3AuthClientId || "";

// Determine if we're in production
const isProduction = process.env.NODE_ENV === "production";

// Chain configuration for Web3Auth
export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: `0x${mantleSepoliaTestnet.id.toString(16)}`,
  rpcTarget: mantleSepoliaTestnet.rpcUrls.default.http[0],
  displayName: mantleSepoliaTestnet.name,
  blockExplorerUrl: mantleSepoliaTestnet.blockExplorers?.default.url || "",
  ticker: mantleSepoliaTestnet.nativeCurrency.symbol,
  tickerName: mantleSepoliaTestnet.nativeCurrency.name,
  logo: "https://cryptologos.cc/logos/mantle-mnt-logo.png",
};

// Create the private key provider
export const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

export const web3AuthOptions: Web3AuthOptions = {
  clientId,
  // Use SAPPHIRE_MAINNET for production, SAPPHIRE_DEVNET for development
  web3AuthNetwork: isProduction
    ? WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
    : WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  //   privateKeyProvider: privateKeyProvider as any,
  uiConfig: {
    appName: "Nuôi Em",
    theme: {
      primary: "#C25E44",
    },
    mode: "light",
    logoLight: "https://web3auth.io/images/web3authlog.png",
    logoDark: "https://web3auth.io/images/web3authlogodark.png",
    defaultLanguage: "en",
    loginGridCol: 3,
    primaryButton: "socialLogin",
    uxMode: "popup", // Ensure popup mode
  },
};

export const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
};

export default web3AuthContextConfig;
