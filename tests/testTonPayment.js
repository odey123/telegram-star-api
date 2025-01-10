const fetch = require('node-fetch'); // Import fetch for making HTTP requests

// Function to verify payment by checking transaction using RPC
async function verifyPayment(transactionHash) {
  try {
    // Ensure the transaction hash is valid before sending the request
    if (!transactionHash || transactionHash.length !== 64) {
      throw new Error('Invalid transaction hash format');
    }

    const response = await fetch('https://testnet.toncenter.com/api/v2/jsonRPC', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'getTransaction',
        params: [transactionHash]  // Ensure this is an array with the correct transaction hash
      })
    });

    const data = await response.json();

    // Log the full response to inspect the returned data
    console.log('Full Response:', data);

    // Check if there is an error in the response
    if (data.error) {
      throw new Error(`Error from TON provider: ${data.error.message}`);
    }

    // Check if the transaction details are available
    const transaction = data.result;

    if (!transaction) {
      throw new Error('Transaction not found or invalid response');
    }

    console.log('Transaction Details:', transaction);

    // Validate the transaction (e.g., amount received, destination address)
    if (transaction.in_msg.destination === 'your_wallet_address_here') {
      console.log('Payment verified successfully!');
    } else {
      console.log('Invalid wallet address');
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
  }
}

// Example test function to call the payment verification
verifyPayment('sample_transaction_hash_here');
