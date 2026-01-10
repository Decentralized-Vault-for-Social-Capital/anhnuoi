import { type Web3AuthContextConfig } from "@web3auth/modal/react";
import {
  WALLET_CONNECTORS,
  WEB3AUTH_NETWORK,
  MFA_LEVELS,
  type Web3AuthOptions,
} from "@web3auth/modal";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "";

// const web3AuthOptions: Web3AuthOptions = {
//   clientId, // Pass your Web3Auth Client ID, ideally using an environment variable
//   web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
//   modalConfig: {
//     connectors: {
//       [WALLET_CONNECTORS.AUTH]: {
//         label: "auth",
//         loginMethods: {
//           google: {
//             name: "google login",
//             // logoDark: "url to your custom logo which will shown in dark mode",
//           },
//           email_passwordless: {
//             name: "email passwordless login",
//             showOnModal: true,
//             authConnectionId: "w3a-email_passwordless-demo",
//           },
//           sms_passwordless: {
//             name: "sms passwordless login",
//             showOnModal: true,
//             authConnectionId: "w3a-sms_passwordless-demo",
//           },
//         },
//         showOnModal: true, // set to false to hide all social login methods
//       },
//     },
//     hideWalletDiscovery: true, // set to true to hide external wallets discovery
//   },
//   mfaLevel: MFA_LEVELS.MANDATORY,
// };

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
};

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
};

export default web3AuthContextConfig;
