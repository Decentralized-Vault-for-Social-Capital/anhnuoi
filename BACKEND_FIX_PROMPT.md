# Backend API Fix: Web3Auth JWT Authentication

## Problem Statement

The backend API endpoint `POST /api/auth/login` is failing with the error:
```
[Auth] No wallet address found in token
```

**Root Cause**: The backend is attempting to extract an Ethereum wallet address directly from the Web3Auth JWT token, but Web3Auth JWTs contain **public keys** (secp256k1 and ed25519), not the derived Ethereum address.

---

## Web3Auth JWT Structure

Web3Auth's idToken contains:
```json
{
  "iat": 1736581419,
  "aud": "BK5wi8kFJ14x6JJW7EyYyMKSOjzHaxbF8Ga4zgwjGpB0oBTYE_yzgHhf7lw8LmjBg0F5ZVHPqdYMYi_pB-lF0DQ",
  "iss": "https://api-auth.web3auth.io",
  "email": "test_account_4450@example.com",
  "name": "test account",
  "wallets": [
    {
      "public_key": "02e24b18385b6bd1bc70a6ca3c3277cfa6fa6ddf36ef39ddff578f56e60ac04c06",
      "type": "web3auth_key",
      "curve": "secp256k1"
    },
    {
      "public_key": "a4ca0f0a1c3a74cb6be84ae3a6b685e769e41cff1fe4e1faacf0e0f2e5c6d3a8",
      "type": "web3auth_threshold_key",
      "curve": "ed25519"
    }
  ]
}
```

**Key Point**: There is NO direct `walletAddress` or `address` field in the JWT. The Ethereum address must be:
1. Derived from the secp256k1 public key, OR
2. Accepted from the request body (with JWT validation)

---

## Current Frontend Implementation

The frontend now sends:
- **Authorization Header**: `Bearer <JWT_TOKEN>` (for authentication)
- **Request Body**: `{ "walletAddress": "0x4A462C1365af29a169E316d3423246cd99b6ACbA" }`

The wallet address is obtained via Web3Auth's Ethereum provider using the `eth_accounts` RPC call.

---

## Recommended Backend Fix (Option 1: Accept from Request Body)

**Update the `/api/auth/login` endpoint to:**

1. **Validate the JWT token** in the Authorization header
2. **Extract user info** (email, name) from the JWT
3. **Accept the wallet address** from the request body
4. **Optional**: Verify the wallet address matches the JWT's public key

### Pseudocode:
```typescript
async function handleLogin(req, res) {
  // 1. Extract and validate JWT
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }
  
  // 2. Verify JWT (using Web3Auth's public keys)
  const decodedToken = await verifyWeb3AuthJWT(token);
  
  // 3. Get wallet address from request body
  const { walletAddress } = req.body;
  if (!walletAddress) {
    return res.status(400).json({ error: 'Missing walletAddress in request body' });
  }
  
  // 4. Optional: Verify address matches JWT's secp256k1 public key
  const derivedAddress = deriveEthereumAddress(decodedToken.wallets[0].public_key);
  if (derivedAddress.toLowerCase() !== walletAddress.toLowerCase()) {
    return res.status(400).json({ error: 'Wallet address does not match JWT public key' });
  }
  
  // 5. Create or update user
  const user = await upsertUser({
    walletAddress,
    email: decodedToken.email,
    name: decodedToken.name,
  });
  
  return res.json({ success: true, data: user });
}
```

---

## Alternative Fix (Option 2: Derive Address from JWT)

If you want to derive the Ethereum address from the JWT's secp256k1 public key:

### Algorithm:
```typescript
import { keccak256 } from 'ethereumjs-util';
import { ec as EC } from 'elliptic';

function deriveEthereumAddress(compressedPublicKey: string): string {
  // 1. Parse the compressed secp256k1 public key
  const ec = new EC('secp256k1');
  const key = ec.keyFromPublic(compressedPublicKey, 'hex');
  
  // 2. Get uncompressed public key (remove '04' prefix)
  const uncompressedPubKey = key.getPublic().encode('hex', false).slice(2);
  
  // 3. Keccak256 hash of the uncompressed public key
  const hash = keccak256(Buffer.from(uncompressedPubKey, 'hex'));
  
  // 4. Take last 20 bytes and prepend '0x'
  const address = '0x' + hash.slice(-40);
  
  return address;
}

// Usage in login handler:
async function handleLogin(req, res) {
  const token = extractToken(req);
  const decodedToken = await verifyWeb3AuthJWT(token);
  
  // Find the secp256k1 wallet
  const secp256k1Wallet = decodedToken.wallets.find(
    w => w.curve === 'secp256k1'
  );
  
  if (!secp256k1Wallet) {
    return res.status(400).json({ error: 'No secp256k1 public key in JWT' });
  }
  
  // Derive the Ethereum address
  const walletAddress = deriveEthereumAddress(secp256k1Wallet.public_key);
  
  // Create or update user
  const user = await upsertUser({
    walletAddress,
    email: decodedToken.email,
    name: decodedToken.name,
  });
  
  return res.json({ success: true, data: user });
}
```

### Dependencies (if using Option 2):
```json
{
  "dependencies": {
    "elliptic": "^6.5.4",
    "ethereumjs-util": "^7.1.5"
  }
}
```

---

## Example Test Case

**Expected Behavior:**

**Request:**
```http
POST /api/auth/login
Authorization: Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVjRDFSVWJfWXlyaDJ...
Content-Type: application/json

{
  "walletAddress": "0x4A462C1365af29a169E316d3423246cd99b6ACbA"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "walletAddress": "0x4A462C1365af29a169E316d3423246cd99b6ACbA",
    "email": "test_account_4450@example.com",
    "name": "test account",
    "createdAt": "2026-01-11T12:00:00.000Z"
  }
}
```

---

## Verification Steps

After implementing the fix:

1. **Test the endpoint** with the Web3Auth JWT and wallet address
2. **Verify JWT validation** is working (reject invalid tokens)
3. **Verify user creation** in the database
4. **Test the `/api/auth/me` endpoint** to ensure user retrieval works
5. **Check logs** for successful authentication without errors

---

## Frontend Changes Already Made

✅ Updated `src/lib/api/services/auth.ts` to send JWT token:
```typescript
export async function login(walletAddress: string, token: string) {
  return apiClient.post("/api/auth/login", { walletAddress }, token);
}
```

✅ Updated `src/hooks/useAuth.ts` to pass token:
```typescript
const result = await api.auth.login(walletAddress, jwtToken);
```

---

## Contact Information

- **Web3Auth Network**: SAPPHIRE_DEVNET (development), SAPPHIRE_MAINNET (production)
- **Client ID**: `BK5wi8kFJ14x6JJW7EyYyMKSOjzHaxbF8Ga4zgwjGpB0oBTYE_yzgHhf7lw8LmjBg0F5ZVHPqdYMYi_pB-lF0DQ`
- **Auth Connection**: `anh-nuoi` (email_passwordless)
- **Chain**: Mantle Sepolia Testnet (chainId: 0x138b)

---

## Summary

**Quick Fix (Recommended)**:
Accept `walletAddress` from request body after validating JWT. This is simpler and more reliable than deriving the address.

**Complete Fix**:
1. Validate JWT token from Authorization header
2. Extract email/name from JWT
3. Use `walletAddress` from request body (or derive from JWT's secp256k1 public key)
4. Create/update user in database
5. Return user data

The frontend is now correctly sending both the JWT token and wallet address. The backend just needs to use them properly.
