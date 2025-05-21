const walletService = require('../services/walletService');
const axios = require('axios');
const tonService = require('../services/tonService');

class WalletController {
  // Get wallet balance (using query params)
  async getWalletBalance(req, res) {
    try {
      const { walletAddress } = req.query;
      if (!walletAddress) {
        return res.status(400).json({
          success: false,
          message: 'Wallet address is required',
        });
      }

      const balance = await walletService.getWalletBalance(walletAddress);
      return res.status(200).json({ success: true, balance });
    } catch (error) {
      console.error('Error fetching wallet balance:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        details: error.message,
      });
    }
  }

  // Withdraw funds
  async withdrawFunds(req, res) {
    try {
      const { walletAddress, amount, transactionHash } = req.body;
      if (!walletAddress || !amount || !transactionHash) {
        return res.status(400).json({
          success: false,
          message: 'Wallet address, amount, and transaction hash are required',
        });
      }

      const updatedBalance = await walletService.withdrawFunds(
        walletAddress,
        amount,
        transactionHash
      );
      return res.status(200).json({
        success: true,
        message: 'Withdrawal successful',
        balance: updatedBalance,
      });
    } catch (error) {
      console.error('Error processing withdrawal:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        details: error.message,
      });
    }
  }

  // Get transaction history
  async getTransactionHistory(req, res) {
    try {
      const { walletAddress } = req.query;
      if (!walletAddress) {
        return res.status(400).json({
          success: false,
          message: 'Wallet address is required',
        });
      }

      const transactions = await walletService.getTransactionHistory(walletAddress);
      return res.status(200).json({ success: true, transactions });
    } catch (error) {
      console.error('Error fetching transaction history:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        details: error.message,
      });
    }
  }

  // Get TON price from Binance
  async getTonPrice(req, res) {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
        params: { symbol: 'TONUSDT' }
      });

      const price = parseFloat(response.data.price);
      return res.status(200).json({
        success: true,
        symbol: 'TON/USDT',
        price,
      });
    } catch (error) {
      console.error('Error fetching TON price:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch TON price',
        details: error.message,
      });
    }
  }

  async connectWallet(req, res) {
    try  {
       const { walletAddress } = req.body;

       if (!walletAddress) {
          return res.status(400).json({ success: false, message: 'Wallet address is required' });
       }
      
       user.tonwallet = walletAddress;
       await user.save(); 

       return res.status(200).json({
        sucess: true,
        message: 'Wallet connected successfully',
        data: {
          walletAddress: user.tonwallet,
        }
       })
    } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
          console.error('Error connecting wallet:', error.message);
    }
  }


async getTransactionVolume(req, res) {
  try {
    const { walletAddress } = req.query;
    if (!walletAddress) {
      return res.status(400).json({ success: false, message: 'Wallet address is required' });
    }

    const volume = await tonService.getTransactionVolume(walletAddress);
    return res.status(200).json({
      success: true,
      walletAddress,
      volume,
    });
  } catch (error) {
    console.error('Error in getTransactionVolume:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch transaction volume', details: error.message });
  }
}


}

module.exports = new WalletController(); // Return instance, not class
