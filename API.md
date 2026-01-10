# Relayer API Documentation

**Version:** 1.0.0  
**Base URL:** `https://api.example.com` (Production) or `http://localhost:3000` (Development)

## Overview

The Relayer API provides blockchain integration services for converting fiat (VND) payments into blockchain tokens. It supports Web3Auth authentication and VNPay payment gateway integration.

---

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Auth Endpoints](#auth-endpoints)
  - [Payment Endpoints](#payment-endpoints)
  - [Impact Endpoints](#impact-endpoints)
  - [Webhook Endpoints](#webhook-endpoints)
- [Response Formats](#response-formats)
- [Error Codes](#error-codes)
- [Integration Guide](#integration-guide)

---

## Authentication

Most endpoints require authentication using **Web3Auth JWT tokens**.

### How to Authenticate

1. Include the JWT token in the `Authorization` header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

2. The token must be a valid Web3Auth JWT (idToken) obtained from Web3Auth authentication flow.

3. Protected endpoints will extract the wallet address from the token automatically.

### Public Endpoints

The following endpoints do **not** require authentication:
- `GET /health`
- `GET /api/payment/vnpay-return`
- `GET /api/payment/vnpay-ipn`
- `GET /api/payment/rate`
- `POST /api/v1/impact/proof/ipfs-url`
- `GET /api/webhook/health`

---

## Endpoints

### Health Check

#### `GET /health`

Check if the API server is running.

**Authentication:** None

**cURL Example:**
```bash
curl -X GET http://localhost:3000/health
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-01-10T12:00:00.000Z",
    "uptime": 3600
  }
}
```

---

### Auth Endpoints

#### `POST /api/auth/login`

Register or login a user with Web3Auth credentials.

**Authentication:** Required (Web3Auth JWT)

**Request Body:**
```json
{
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `walletAddress` | string | Yes | Ethereum wallet address from Web3Auth provider |

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN" \
  -d '{
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-01-10T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Server error during user creation

---

#### `GET /api/auth/me`

Get the current authenticated user's profile.

**Authentication:** Required (Web3Auth JWT)

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-01-10T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing JWT token
- `404 Not Found`: User not found in database

---

### Payment Endpoints

#### `POST /api/payment/create`

Create a VNPay payment URL for purchasing tokens with VND.

**Authentication:** Required (Web3Auth JWT)

**Request Body:**
```json
{
  "amount": 100000,
  "bankCode": "NCB",
  "language": "vn"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/payment/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN" \
  -d '{
    "amount": 100000,
    "bankCode": "NCB",
    "language": "vn"
  }'
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | number | Yes | Payment amount in VND (minimum: 10,000) |
| `bankCode` | string | No | Bank code for direct payment (e.g., "NCB", "VIETCOMBANK") |
| `language` | string | No | Payment page language: "vn" or "en" (default: "vn") |

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "paymentUrl": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?...",
    "orderId": "20260110120000_0x1234...5678"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid amount (minimum 10,000 VND)
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Failed to create payment

**Usage Flow:**
1. Client calls this endpoint with payment amount
2. Receive `paymentUrl` and `orderId`
3. Redirect user to `paymentUrl` for payment
4. User completes payment on VNPay
5. VNPay redirects back to return URL with payment result

---

#### `GET /api/payment/vnpay-return`

VNPay return URL handler (user redirect after payment).

**Authentication:** None (Public callback endpoint)

**Query Parameters:** (Automatically provided by VNPay)
- `vnp_Amount`
- `vnp_BankCode`
- `vnp_ResponseCode`
- `vnp_TransactionNo`
- `vnp_TxnRef`
- `vnp_SecureHash`
- ...and other VNPay parameters

**Response:** Redirects to frontend with query parameters:
```
{FRONTEND_URL}/payment/result?success=true&orderId=xxx&message=Payment%20successful&amount=100000
```

**Note:** This endpoint is called by VNPay and the user's browser. Do not call directly.

**cURL Example:** ⚠️ Not recommended - This endpoint should only be called by VNPay.

---

#### `GET /api/payment/vnpay-ipn`

VNPay IPN (Instant Payment Notification) handler for server-to-server notification.

**Authentication:** None (VNPay secure hash verification)

**Query Parameters:** (Automatically provided by VNPay - same as return URL)

**Response:**
```json
{
  "RspCode": "00",
  "Message": "Success"
}
```

**Response Codes:**
- `00`: Success
- `97`: Invalid signature
- `99`: Unknown error

**Note:** This endpoint is called by VNPay servers. Do not call directly. It triggers the blockchain transaction processing.

**cURL Example:** ⚠️ Not recommended - This endpoint should only be called by VNPay servers.

---

#### `GET /api/payment/transactions`

Get the authenticated user's transaction history.

**Authentication:** Required (Web3Auth JWT)

**Query Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | number | No | Number of transactions to return (default: 50, max: 100) |

**Example Request:**
```
GET /api/payment/transactions?limit=20
```

**cURL Example:**
```bash
# Get all transactions
curl -X GET http://localhost:3000/api/payment/transactions \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN"

# Get limited transactions
curl -X GET "http://localhost:3000/api/payment/transactions?limit=20" \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "txn_1234567890",
        "orderId": "20260110120000_0x1234...5678",
        "amountVND": 100000,
        "tokenAmount": "10.0",
        "status": "completed",
        "txHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        "createdAt": "2026-01-10T12:00:00.000Z"
      }
    ],
    "total": 1
  }
}
```

**Transaction Status Values:**
- `pending`: Payment received, waiting for blockchain transaction
- `processing`: Blockchain transaction in progress
- `completed`: Tokens successfully transferred
- `failed`: Transaction failed
- `expired`: Payment memo expired

**Error Responses:**
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Failed to retrieve transactions

---

#### `GET /api/payment/order/:orderId`

Get the status of a specific order.

**Authentication:** Required (Web3Auth JWT)

**Path Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `orderId` | string | Yes | The order ID returned from create payment |

**Example Request:**
```
GET /api/payment/order/20260110120000_0x1234...5678
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/payment/order/20260110120000_0x1234...5678 \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "20260110120000_0x1234...5678",
    "status": "completed",
    "amountVND": 100000,
    "txHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Order ID is required
- `401 Unauthorized`: Invalid or missing JWT token
- `404 Not Found`: Order not found
- `500 Internal Server Error`: Failed to get order status

---

#### `GET /api/payment/rate`

Get the current VND to token conversion rate.

**Authentication:** None (Public)

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/payment/rate
```

**Response:**
```json
{
  "success": true,
  "data": {
    "vndPerToken": 10000,
    "tokenSymbol": "TOKEN"
  }
}
```

**Example Calculation:**
- If `vndPerToken = 10000` and user pays 100,000 VND
- User receives: 100,000 / 10,000 = 10 tokens

---

### Impact Endpoints

#### `POST /api/v1/impact/proof`

Submit proof of impact (image) to IPFS and record on blockchain.

**Authentication:** Required (Web3Auth JWT)

**Request Body:** `multipart/form-data`
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | File | Yes | Image file (JPEG, PNG, WebP, max 5MB) |
| `campaignId` | number | Yes | Campaign identifier (positive integer) |
| `description` | string | No | Description of the proof |

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/v1/impact/proof \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN" \
  -F "image=@/path/to/meal_receipt.jpg" \
  -F "campaignId=1" \
  -F "description=Meals delivered to 10 families in District 1"
```

**Response:**
```json
{
  "success": true,
  "ipfsUrl": "https://gateway.pinata.cloud/ipfs/QmXxxx...",
  "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "explorerUrl": "https://explorer.sepolia.mantle.xyz/tx/0x1234567890abcdef...",
  "cid": "QmXxxx..."
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input (missing file, invalid campaignId)
- `401 Unauthorized`: Invalid or missing JWT token
- `503 Service Unavailable`: IPFS service temporarily unavailable
- `502 Bad Gateway`: Blockchain service temporarily unavailable
- `500 Internal Server Error`: Server error

---

#### `GET /api/v1/impact/campaign/:campaignId/proofs`

Retrieve all proofs submitted for a specific campaign from the blockchain.

**Authentication:** Required (Web3Auth JWT)

**Path Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `campaignId` | number | Yes | Campaign identifier (positive integer) |

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/v1/impact/campaign/1/proofs \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "campaignId": 1,
  "proofs": [
    "QmXxxx...",
    "QmYyyy...",
    "QmZzzz..."
  ]
}
```

**Error Responses:**
- `400 Bad Request`: Invalid campaignId
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Failed to retrieve proofs

---

#### `POST /api/v1/impact/proof/ipfs-url`

Generate IPFS gateway URLs from a CID (useful if primary gateway is down).

**Authentication:** None (Public)

**Request Body:**
```json
{
  "cid": "QmXxxx..."
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/v1/impact/proof/ipfs-url \
  -H "Content-Type: application/json" \
  -d '{
    "cid": "QmXxxx..."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "primary": "https://gateway.pinata.cloud/ipfs/QmXxxx...",
    "alternatives": [
      "https://gateway.pinata.cloud/ipfs/QmXxxx...",
      "https://ipfs.io/ipfs/QmXxxx...",
      "https://QmXxxx....ipfs.w3s.link/"
    ]
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid CID
- `500 Internal Server Error`: Failed to generate URLs

---

#### `GET /api/v1/impact/relayer/balance`

Check the relayer wallet balance on Mantle network (for monitoring purposes).

**Authentication:** Required (Web3Auth JWT)

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/v1/impact/relayer/balance \
  -H "Authorization: Bearer YOUR_WEB3AUTH_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": "1.5234",
    "address": "0x1234567890abcdef1234567890abcdef12345678"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Failed to retrieve balance

---

### Webhook Endpoints

#### `GET /api/webhook/health`

Health check endpoint for webhook monitoring.

**Authentication:** None

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/webhook/health
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-01-10T12:00:00.000Z"
  }
}
```

---

## Quick Testing Script

Here's a bash script to test all public endpoints:

```bash
#!/bin/bash

# Configuration
API_URL="http://localhost:3000"
JWT_TOKEN="YOUR_WEB3AUTH_JWT_TOKEN"

echo "Testing Public Endpoints..."
echo "=============================="

# Health Check
echo -e "\n1. Health Check:"
curl -X GET "$API_URL/health"

# Payment Rate
echo -e "\n\n2. Payment Rate:"
curl -X GET "$API_URL/api/payment/rate"

# Webhook Health
echo -e "\n\n3. Webhook Health:"
curl -X GET "$API_URL/api/webhook/health"

# IPFS URL Generator
echo -e "\n\n4. IPFS URL Generator:"
curl -X POST "$API_URL/api/v1/impact/proof/ipfs-url" \
  -H "Content-Type: application/json" \
  -d '{"cid": "QmTest123"}'

echo -e "\n\nTesting Protected Endpoints (JWT Required)..."
echo "==============================================="

# Auth - Me
echo -e "\n5. Get User Profile:"
curl -X GET "$API_URL/api/auth/me" \
  -H "Authorization: Bearer $JWT_TOKEN"

# Payment - Transactions
echo -e "\n\n6. Get Transactions:"
curl -X GET "$API_URL/api/payment/transactions?limit=5" \
  -H "Authorization: Bearer $JWT_TOKEN"

# Impact - Campaign Proofs
echo -e "\n\n7. Get Campaign Proofs:"
curl -X GET "$API_URL/api/v1/impact/campaign/1/proofs" \
  -H "Authorization: Bearer $JWT_TOKEN"

# Impact - Relayer Balance
echo -e "\n\n8. Get Relayer Balance:"
curl -X GET "$API_URL/api/v1/impact/relayer/balance" \
  -H "Authorization: Bearer $JWT_TOKEN"

echo -e "\n\nDone!"
```

**Usage:**
```bash
# Save as test_api.sh
chmod +x test_api.sh
./test_api.sh
```

---

**Last Updated:** January 11

## Response Formats

### Success Response

All successful API responses follow this format:

```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

---

## Error Codes

| HTTP Status | Description |
|-------------|-------------|
| `200 OK` | Request succeeded |
| `400 Bad Request` | Invalid request parameters |
| `401 Unauthorized` | Missing or invalid authentication token |
| `404 Not Found` | Resource not found |
| `500 Internal Server Error` | Server error occurred |

---

## Integration Guide

### Step 1: Authenticate User

1. Implement Web3Auth in your frontend application
2. Obtain the JWT `idToken` from Web3Auth after user login
3. Store the token securely in your application

### Step 2: Create Payment

```javascript
const response = await fetch('https://api.example.com/api/payment/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  },
  body: JSON.stringify({
    amount: 100000, // 100,000 VND
    language: 'en'
  })
});

const { data } = await response.json();
console.log('Payment URL:', data.paymentUrl);
console.log('Order ID:', data.orderId);

// Redirect user to payment URL
window.location.href = data.paymentUrl;
```

### Step 3: Handle Payment Return

After payment, VNPay redirects to your frontend with query parameters:

```javascript
// Parse URL query parameters
const params = new URLSearchParams(window.location.search);
const success = params.get('success') === 'true';
const orderId = params.get('orderId');
const message = params.get('message');

if (success) {
  console.log('Payment successful!');
  // Poll order status or show success message
} else {
  console.log('Payment failed:', message);
}
```

### Step 4: Check Order Status

```javascript
const response = await fetch(
  `https://api.example.com/api/payment/order/${orderId}`,
  {
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  }
);

const { data } = await response.json();
console.log('Order status:', data.status);
console.log('Transaction hash:', data.txHash);
```

### Step 5: View Transaction History

```javascript
const response = await fetch(
  'https://api.example.com/api/payment/transactions?limit=10',
  {
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  }
);

const { data } = await response.json();
console.log('Transactions:', data.transactions);
```

---

## Important Notes

1. **Minimum Payment:** The minimum payment amount is 10,000 VND.

2. **Token Calculation:** Tokens are calculated as: `amount_vnd / vndPerToken`

3. **Transaction Processing:** After successful VNPay payment, the blockchain transaction is processed asynchronously via a queue system. Check the order status to confirm token transfer.

4. **Idempotency:** The system prevents duplicate transactions using unique order IDs.

5. **CORS:** Configure `CORS_ORIGIN` environment variable for allowed origins.

6. **Rate Limiting:** Implement rate limiting on your client side to avoid overwhelming the API.

7. **Webhook Security:** VNPay webhooks (IPN) are verified using secure hash signatures.

---

## Support

For technical support or questions about the API, please contact:
- Email: support@example.com
- Documentation: https://docs.example.com
- GitHub: https://github.com/Decentralized-Vault-for-Social-Capital/relayer

---

**Last Updated:** January 10, 2026
