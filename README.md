# Telegram Stars Mini App

## Project Overview
The Telegram Stars Mini App allows users to interact with stars that can be purchased, gifted, and tracked within the app. The app is designed to integrate with the TON blockchain for payment processing and uses MongoDB for database management.

### Current Features
1. **Gift Star**: Users can gift stars to others.
2. **Purchase Star**: Users can purchase stars using TON cryptocurrency.
3. **Check Star Balance**: Users can view their star balances and details.

---

## Backend API Documentation
The backend provides the following routes:

### 1. **Gift Star**
- **Endpoint**: `POST /api/stars/giftStar`
- **Request Body**:
  ```json
  {
    "senderId": "<sender_user_id>",
    "recipientId": "<recipient_user_id>",
    "starId": "<star_id>",
    "quantity": <number>
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "message": "Star gifted successfully"
    }
    ```
  - **Error**:
    ```json
    {
      "error": "Error message here"
    }
    ```

### 2. **Purchase Star**
- **Endpoint**: `POST /api/stars/purchase`
- **Request Body**:
  ```json
  {
    "starId": "<star_id>",
    "userId": "<user_id>",
    "paymentHash": "<transaction_hash>"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "message": "Star purchased successfully",
      "star": {
        "id": "<star_id>",
        "name": "<star_name>",
        "price": <price>
      }
    }
    ```
  - **Error**:
    ```json
    {
      "error": "Error message here"
    }
    ```

### 3. **Check Star Balance**
- **Endpoint**: `GET /api/stars/checkbalance`
- **Request Query Parameters**:
  - `userId`: The ID of the user whose balance you want to check.
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "starBalances": [
        {
          "starId": "<star_id>",
          "name": "<star_name>",
          "quantity": <number>,
          "price": <price>
        }
      ]
    }
    ```
  - **Error**:
    ```json
    {
      "error": "Error message here"
    }
    ```

---

## Wallet Functionality

### 4. **Get Wallet Balance**
This endpoint retrieves the balance of the user's wallet in TON or Stars.

- **Endpoint**: `GET /api/wallet/balance`
- **Query Parameters**: 
  - `userId` (required): The unique identifier of the user (from Telegram or your database).
- **Response**:
  ```json
  {
    "balance": 100,
    "currency": "TON"
  }

### 5. **Deposit Funds**
This endpoint allows users to deposit TON into their wallet. The balance is updated accordingly.

- **Endpoint**: `POST /api/wallet/deposit`
- **Query Parameters**:
 -`userId` (required): The unique identifier of the user.
`amount` (required): The amount of TON to deposit.
-**Response**:
```json
{
  "balance": 150
}

### 6. **Withdraw Funds**
This endpoint allows users to withdraw TON from their wallet, with validation to ensure sufficient funds.

- **Endpoint**: `POST /api/wallet/withdraw`
- **Query Parameters**:
- userId (required): The unique identifier of the user.
`amount` (required): The amount of TON to withdraw.
Response:
json

{
  "balance": 50
}

### 7. Transaction History
This endpoint allows users to retrieve their transaction history (deposits and withdrawals).

Endpoint: GET /api/wallet/history
Query Parameters:
userId (required): The unique identifier of the user.
Response:
json

[
  {
    "userId": "123456",
    "transactionHash": "DEPOSIT1642994167077",
    "amount": 100,
    "currency": "TON",
    "status": "verified",
    "createdAt": "2025-01-22T10:00:00Z"
  },
  {
    "userId": "123456",
    "transactionHash": "WITHDRAW1642994200000",
    "amount": 50,
    "currency": "TON",
    "status": "verified",
    "createdAt": "2025-01-22T11:00:00Z"
  }
]


## Database Models

### 1. **Star Model**
- **Schema**:
  ```javascript
  {
    name: String,
    price: Number,
    description: String,
    createdAt: { type: Date, default: Date.now }
  }
  ```

### 2. **User Model**
- **Schema**:
  ```javascript
  {
    username: String,
    stars: [
      {
        starId: { type: mongoose.Schema.Types.ObjectId, ref: 'Star' },
        quantity: Number
      }
    ]
  }
  ```

---

## Environment Setup

### Backend
1. Clone the repository:
   ```bash
   git clone 
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://ohotujude:iNFu7JTF0BSaSCFl@cluster0.sfwkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   TON_WALLET_ADDRESS=UQB_nL5fzbDCNbnvq0D0ZLx4vfG2gLm96YQgvtpv1AHuszfb
   TON_API_KEY=e19f41be916ee2a9ce1e20d8afa3b32dd8c53d1fbf96818c1b558582a45239b
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

---

## Notes for Frontend Developer
- **Routes**: Ensure you are using the routes specified above to interact with the backend.
- **User Management**: The backend assumes valid `userId`, `senderId`, and `recipientId`. For now, use mock data for testing until user management is implemented.
- **TON Integration**: You may need to display payment statuses and handle `paymentHash` verification on the frontend.
- **Error Handling**: Handle errors gracefully based on the responses provided by the backend.

If you need additional endpoints or modifications, let the backend team know.

---

## Future Enhancements
- Add user authentication.
- Improve error messages for better debugging.
- Implement real-time updates for star balances.
- Add support for bulk star purchases or gifts.

Feel free to reach out for clarifications or additional features!

