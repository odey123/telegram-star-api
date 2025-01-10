const TonWeb = require('tonweb');

// Initialize TonWeb with a public provider (testnet in this case)
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));

// Function to verify a payment
const verifyPayment = async (transactionHash) => {
  try {
    // Fetch transaction details
    const transactionDetails = await tonweb.provider.getTransaction(transactionHash);

    // Check if the transaction exists and is confirmed
    if (!transactionDetails || !transactionDetails.utime) {
      return { success: false, message: 'Transaction not found or not confirmed' };
    }

    // Validate recipient wallet address
    if (transactionDetails.in_msg.destination !== process.env.TON_WALLET_ADDRESS) {
      return { success: false, message: 'Transaction not sent to the correct wallet' };
    }

    // Validate amount
    const amountReceived = Number(transactionDetails.in_msg.value) / 1e9; // Convert nanoton to TON
    if (amountReceived < 1) { // Example minimum amount
      return { success: false, message: 'Insufficient payment amount' };
    }

    // Payment is valid
    return { success: true, amount: amountReceived, message: 'Payment verified' };

  } catch (error) {
    console.error('Error verifying payment:', error);
    return { success: false, message: 'Verification failed' };
  }
};

module.exports = { verifyPayment };
