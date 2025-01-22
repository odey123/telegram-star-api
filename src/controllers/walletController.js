const walletService = require('../services/walletService');

// Controller to handle the get wallet balance request
const getWalletBalance = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming user is authenticated and userId is in the request
    const balance = await walletService.getWalletBalance(userId);
    return res.status(200).json(balance);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller to handle deposit funds request
const depositFunds = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming user is authenticated and userId is in the request
    const depositAmount = parseFloat(req.query.amount); // Amount to deposit

    if (!depositAmount || depositAmount <= 0) {
      return res.status(400).json({ message: 'Invalid deposit amount' });
    }

    const updatedBalance = await walletService.depositFunds(userId, depositAmount);
    return res.status(200).json({ message: 'Deposit successful', balance: updatedBalance });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller to handle withdraw funds request
const withdrawFunds = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming user is authenticated and userId is in the request
    const withdrawAmount = parseFloat(req.query.amount); // Amount to withdraw

    if (!withdrawAmount || withdrawAmount <= 0) {
      return res.status(400).json({ message: 'Invalid withdrawal amount' });
    }

    const updatedBalance = await walletService.withdrawFunds(userId, withdrawAmount);
    return res.status(200).json({ message: 'Withdrawal successful', balance: updatedBalance });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller to get the wallet transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming user is authenticated and userId is in the request
    const transactions = await walletService.getTransactionHistory(userId);
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
