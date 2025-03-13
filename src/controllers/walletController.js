const walletService = require('../services/walletService');

// Get wallet balance
const getWalletBalance = async (req, res) => {
  try {
    const { walletAddress } = req.body; // Expecting walletAddress in the request body
    if (!walletAddress) return res.status(400).json({ message: 'Wallet address is required' });

    const balance = await walletService.getWalletBalance(walletAddress);
    return res.status(200).json(balance);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Deposit funds
const depositFunds = async (req, res) => {
  try {
    const { walletAddress, amount, transactionHash } = req.body;
    if (!walletAddress || !amount || !transactionHash) {
      return res.status(400).json({ message: 'Wallet address, amount, and transaction hash are required' });
    }

    const updatedBalance = await walletService.depositFunds(walletAddress, amount, transactionHash);
    return res.status(200).json({ message: 'Deposit successful', balance: updatedBalance });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Withdraw funds
const withdrawFunds = async (req, res) => {
  try {
    const { walletAddress, amount, transactionHash } = req.body;
    if (!walletAddress || !amount || !transactionHash) {
      return res.status(400).json({ message: 'Wallet address, amount, and transaction hash are required' });
    }

    const updatedBalance = await walletService.withdrawFunds(walletAddress, amount, transactionHash);
    return res.status(200).json({ message: 'Withdrawal successful', balance: updatedBalance });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    if (!walletAddress) return res.status(400).json({ message: 'Wallet address is required' });

    const transactions = await walletService.getTransactionHistory(walletAddress);
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getWalletBalance,
  depositFunds,
  withdrawFunds,
  getTransactionHistory,
};
