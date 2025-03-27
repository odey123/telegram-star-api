const walletService = require('../services/walletService');

// Get wallet balance
const getWalletBalance = async (req, res) => {
  try {
    const { walletAddress } = req.params; // Use params instead of body
    if (!walletAddress) {
      return res.status(400).json({ success: false, message: 'Wallet address is required' });
    }

    const balance = await walletService.getWalletBalance(walletAddress);
    return res.status(200).json({ success: true, balance });
  } catch (error) {
    console.error('Error fetching wallet balance:', error.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error', details: error.message });
  }
};

// Deposit funds
const depositFunds = async (req, res) => {
  try {
    const { walletAddress, amount, transactionHash } = req.body;

    if (!walletAddress || !amount || !transactionHash) {
      return res.status(400).json({ success: false, message: "Wallet address, amount, and transaction hash are required" });
    }

    const updatedBalance = await walletService.depositFunds(walletAddress, amount, transactionHash);
    
    console.log("Updated Balance Response:", updatedBalance); // Debugging

    if (!updatedBalance || updatedBalance.success === false) {
      return res.status(400).json({ success: false, message: "Deposit failed", balance: updatedBalance });
    }

    return res.status(200).json({ success: true, message: "Deposit successful", balance: updatedBalance });

  } catch (error) {
    console.error("Error processing deposit:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error", details: error.message });
  }
};

// Withdraw funds
const withdrawFunds = async (req, res) => {
  try {
    const { walletAddress, amount, transactionHash } = req.body;
    if (!walletAddress || !amount || !transactionHash) {
      return res.status(400).json({ success: false, message: 'Wallet address, amount, and transaction hash are required' });
    }

    const updatedBalance = await walletService.withdrawFunds(walletAddress, amount, transactionHash);
    return res.status(200).json({ success: true, message: 'Withdrawal successful', balance: updatedBalance });
  } catch (error) {
    console.error('Error processing withdrawal:', error.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error', details: error.message });
  }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const { walletAddress } = req.params; // Use params instead of body
    if (!walletAddress) {
      return res.status(400).json({ success: false, message: 'Wallet address is required' });
    }

    const transactions = await walletService.getTransactionHistory(walletAddress);
    return res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error('Error fetching transaction history:', error.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error', details: error.message });
  }
};

module.exports = {
  getWalletBalance,
  depositFunds,
  withdrawFunds,
  getTransactionHistory,
};
