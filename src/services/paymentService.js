const TonWeb = require('tonweb');

class PaymentService {
  constructor() {
    // Initialize TonWeb with a public testnet provider
    this.tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));
  }

  // Return wallet address
  async getWalletAddress() {
    return process.env.TON_WALLET_ADDRESS;
  }

  // Verify payment on the TON blockchain
  async verifyPayment(transactionHash) {
    try {
      // Fetch transaction details from TON blockchain
      const transactionDetails = await this.tonweb.provider.getTransaction(transactionHash);

      // Check if the transaction exists and is confirmed
      if (!transactionDetails || !transactionDetails.utime) {
        return { success: false, message: 'Transaction not found or not confirmed' };
      }

      // Validate the destination wallet address
      if (transactionDetails.in_msg.destination !== process.env.TON_WALLET_ADDRESS) {
        return { success: false, message: 'Transaction not sent to the correct wallet' };
      }

      // Validate the received amount (convert nanoton to TON)
      const amountReceived = Number(transactionDetails.in_msg.value) / 1e9; // 1 TON = 10^9 nanoton
      if (amountReceived < 1) { // Example: minimum 1 TON required
        return { success: false, message: 'Insufficient payment amount' };
      }

      // Return a successful verification result
      return { success: true, amount: amountReceived, message: 'Payment verified successfully' };
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Payment verification failed');
    }
  }
}

module.exports = new PaymentService();
