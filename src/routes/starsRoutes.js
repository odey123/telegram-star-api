const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

/**
 * @swagger
 * /api/wallet/balance:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *       400:
 *         description: Wallet address is required.
 */
router.get('/balance', walletController.getWalletBalance);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Missing required fields.
 */
router.post('/deposit', walletController.depositFunds);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Missing required fields.
 */
router.post('/withdraw', walletController.withdrawFunds);

/**
 * @swagger
 * /api/wallet/history:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       transactionHash:
 *                         type: string
 *                       amount:
 *                         type: number
 *       400:
 *         description: Wallet address is required.
 */
router.get('/history', walletController.getTransactionHistory);

module.exports = router;
