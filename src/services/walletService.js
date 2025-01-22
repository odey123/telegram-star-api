const User = require('../models/User'); // Assuming this path is correct
const Payment = require('../models/payment'); // Import Payment model

const walletService = {
  // Method to get the wallet balance
  getWalletBalance: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return { balance: user.walletBalance, currency: 'TON' }; // Assuming the currency is TON
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Method to deposit funds into the wallet
  depositFunds: async (userId, amount) => {
    try {
      if (amount <= 0) {
        throw new Error('Deposit amount must be greater than zero');
      }

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Update the wallet balance
      user.walletBalance += amount;
      await user.save(); // Save the updated user object

      // Create a payment transaction record (deposit)
      const payment = await Payment.create({
        userId: userId,
        transactionHash: 'DEPOSIT' + Date.now(), // Generate a simple transactionHash (you can change this)
        amount: amount,
        status: 'verified', // Assume the deposit is verified immediately
        currency: 'TON', // Assuming TON is the currency
      });

      return user.walletBalance; // Return the updated wallet balance
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Method to withdraw funds from the wallet
  withdrawFunds: async (userId, amount) => {
    try {
      if (amount <= 0) {
        throw new Error('Withdrawal amount must be greater than zero');
      }

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Ensure the user has enough balance to withdraw
      if (user.walletBalance < amount) {
        throw new Error('Insufficient balance');
      }

      // Update the wallet balance
      user.walletBalance -= amount;
      await user.save(); // Save the updated user object

      // Create a payment transaction record (withdrawal)
      const payment = await Payment.create({
        userId: userId,
        transactionHash: 'WITHDRAW' + Date.now(), // Generate a simple transactionHash (you can change this)
        amount: amount,
        status: 'verified', // Assume the withdrawal is verified immediately
        currency: 'TON', // Assuming TON is the currency
      });

      return user.walletBalance; // Return the updated wallet balance
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Method to get the payment (transaction) history
  getTransactionHistory: async (userId) => {
    try {
      const transactions = await Payment.find({ userId }).sort({ createdAt: -1 });
      return transactions;
    } catch (error) {
      throw new Error('Error retrieving transaction history');
    }
  },
};

module.exports = walletService;
