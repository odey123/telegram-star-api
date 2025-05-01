const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// Get Wallet Balance
/**
 * @swagger
 * /api/wallet/balance?walletAddress=YOUR_WALLET_ADDRESS:
 *   get:
 *     summary: Get wallet balance
 *     description: Retrieve the balance of a user's wallet.
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet balance retrieved successfully.
 */
router.get('/balance', (req, res) => walletController.getWalletBalance(req, res));

// Deposit Funds
/**
 * @swagger
 * /api/wallet/deposit:
 *   post:
 *     summary: Deposit funds into wallet
 *     description: Deposit TON into a user's wallet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletAddress:
 *                 type: string
 *               amount:
 *                 type: number
 *               transactionHash:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deposit successful.
 */
router.post('/deposit', (req, res) => walletController.depositFunds(req, res));

// Withdraw Funds
/**
 * @swagger
 * /api/wallet/withdraw:
 *   post:
 *     summary: Withdraw funds from wallet
 *     description: Withdraw TON from a user's wallet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletAddress:
 *                 type: string
 *               amount:
 *                 type: number
 *               transactionHash:
 *                 type: string
 *     responses:
 *       200:
 *         description: Withdrawal successful.
 */
router.post('/withdraw', (req, res) => walletController.withdrawFunds(req, res));

// Get Transaction History
/**
 * @swagger
 * /api/wallet/history?walletAddress=YOUR_WALLET_ADDRESS:
 *   get:
 *     summary: Get wallet transaction history
 *     description: Retrieve a user's transaction history.
 *     parameters:
 *       - in: query
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully.
 */
router.get('/history', (req, res) => walletController.getTransactionHistory(req, res));

// Get TON Price from Binance
/**
 * @swagger
 * /api/wallet/price:
 *   get:
 *     summary: Get TON price from Binance
 *     description: Fetch the current TON/USDT price using Binance public API.
 *     responses:
 *       200:
 *         description: Current TON/USDT price retrieved successfully.
 */
router.get('/price', (req, res) => walletController.getTonPrice(req, res));

module.exports = router;
