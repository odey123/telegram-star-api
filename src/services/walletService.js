const User = require('../models/User');
const Payment = require('../models/payment');

const walletService = {
  // Get wallet balance
  getWalletBalance: async (walletAddress) => {
    try {
      const user = await User.findOne({ walletAddress });
      if (!user) {
        throw new Error('User not found');
      }
      return { balance: user.walletBalance, currency: user.currency };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Deposit funds (TON transfer to wallet)
  depositFunds: async (walletAddress, amount, transactionHash) => {
    try {
      if (amount <= 0) {
        throw new Error('Deposit amount must be greater than zero');
      }

      const user = await User.findOne({ walletAddress });
      if (!user) {
        throw new Error('User not found');
      }

      user.walletBalance += amount;
      await user.save();

      await Payment.create({
        walletAddress,
        transactionHash,
        amount,
        status: 'verified',
        currency: 'TON',
      });

      return user.walletBalance;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Withdraw funds (TON transfer out)
  withdrawFunds: async (walletAddress, amount, transactionHash) => {
    try {
      if (amount <= 0) {
        throw new Error('Withdrawal amount must be greater than zero');
      }

      const user = await User.findOne({ walletAddress });
      if (!user || user.walletBalance < amount) {
        throw new Error('Insufficient balance');
      }

      user.walletBalance -= amount;
      await user.save();

      await Payment.create({
        walletAddress,
        transactionHash,
        amount,
        status: 'verified',
        currency: 'TON',
      });

      return user.walletBalance;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get transaction history
  getTransactionHistory: async (walletAddress) => {
    try {
      return await Payment.find({ walletAddress }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error('Error retrieving transaction history');
    }
  },
};

module.exports = walletService;
