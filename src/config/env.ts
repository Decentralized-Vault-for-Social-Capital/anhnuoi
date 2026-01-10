/**
 * Environment Configuration
 * Automatically selects the correct configuration based on NODE_ENV
 */

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

export const env = {
  // Environment flags
  isDevelopment,
  isProduction,

  // API URL - automatically selects based on environment
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  // Web3Auth
  web3AuthClientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
} as const;

// Validate required environment variables
export function validateEnv() {
  const requiredEnvVars = [
    "NEXT_PUBLIC_WEB3AUTH_CLIENT_ID",
    "NEXT_PUBLIC_API_URL",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingVars.join(", ")}`);
  }
}

export default env;
