const axios = require('axios');


exports.verifyTONTransaction = async (txHash, amount, from) => {
  // Use Toncenter API or TonAPI to fetch transaction
  const res = await axios.get(`https://toncenter.com/api/v2/getTransactions?address=${process.env.TON_PLATFORM_WALLET}&limit=10`);
  
  const tx = res.data.transactions.find(tx => 
    tx.transaction_id.hash === txHash &&
    tx.in_msg.source === from &&
    parseFloat(tx.in_msg.value) >= amount * 1e9 // convert TON to nanoTON
  );

  return !!tx;
};


// const TonWeb = require('tonweb');
// require('dotenv').config();

// // Initialize TonWeb (Testnet)
// const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));

// // Function to verify a payment
// const verifyPayment = async (transactionHash) => {
//     try {
//         // Fetch transaction details from TON Center
//         const { result: transactionDetails } = await tonweb.provider.call('getTransactions', {
//             address: process.env.TON_WALLET_ADDRESS,
//             limit: 1, // Fetch only the latest transaction
//             lt: transactionHash,
//         });

//         if (!transactionDetails || transactionDetails.length === 0) {
//             return { success: false, message: 'Transaction not found or not confirmed' };
//         }

//         const transaction = transactionDetails[0];

//         // Validate recipient wallet address
//         const destinationAddress = transaction.in_msg?.destination;
//         if (!destinationAddress || destinationAddress !== process.env.TON_WALLET_ADDRESS) {
//             return { success: false, message: 'Transaction not sent to the correct wallet' };
//         }

//         // Validate amount received
//         const amountReceived = Number(transaction.in_msg.value) / 1e9; // Convert from nanotons
//         if (amountReceived < 1) {
//             return { success: false, message: 'Insufficient payment amount' };
//         }

//         return { success: true, amount: amountReceived, message: 'Payment verified' };
//     } catch (error) {
//         console.error('Error verifying payment:', error.message);
//         return { success: false, message: 'Verification failed' };
//     }
// };

// module.exports = { verifyPayment };
