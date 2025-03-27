const User = require('../models/User');
const Payment = require('../models/payment');

const walletService = {
    // Get wallet balance
    getWalletBalance: async (walletAddress) => {
        try {
            const user = await User.findOne({ walletAddress }).lean();
            if (!user) {
                return { success: false, message: 'User not found' };
            }
            return { success: true, balance: user.walletBalance, currency: user.currency || 'TON' };
        } catch (error) {
            console.error('Get Wallet Balance Error:', error);
            return { success: false, message: 'Failed to retrieve wallet balance' };
        }
    },

    // Deposit funds (TON transfer to wallet)
    depositFunds: async (walletAddress, amount, transactionHash) => {
        try {
            if (amount <= 0) {
                throw new Error('Deposit amount must be greater than zero');
            }

            const user = await User.findOneAndUpdate(
                { walletAddress },
                { $inc: { walletBalance: amount } },
                { new: true }
            );

            if (!user) {
                throw new Error('User not found');
            }

            await Payment.create({
                walletAddress,
                transactionHash,
                amount,
                status: 'verified',
                currency: 'TON',
            });

            return { success: true, balance: user.walletBalance, message: 'Deposit successful' };
        } catch (error) {
            console.error('Deposit Funds Error:', error);
            return { success: false, message: 'Deposit failed' };
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

            return { success: true, balance: user.walletBalance, message: 'Withdrawal successful' };
        } catch (error) {
            console.error('Withdraw Funds Error:', error);
            return { success: false, message: 'Withdrawal failed' };
        }
    },

    // Get transaction history
    getTransactionHistory: async (walletAddress) => {
        try {
            const transactions = await Payment.find({ walletAddress }).sort({ createdAt: -1 }).lean();
            return { success: true, transactions };
        } catch (error) {
            console.error('Transaction History Error:', error);
            return { success: false, message: 'Error retrieving transaction history' };
        }
    },
};

module.exports = walletService;
