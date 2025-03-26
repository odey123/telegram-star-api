const express = require('express');
const PaymentController  = require('../controllers/paymentController');
const router = express.Router();

/**
 * @swagger
 * /api/payment/address:
 *   get:
 *     summary: Get the wallet address
 *     description: Retrieves the static wallet address for payments.
 *     responses:
 *       200:
 *         description: Successfully retrieved wallet address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 walletAddress:
 *                   type: string
 *       500:
 *         description: Failed to retrieve wallet address
 */
router.get('/address', PaymentController.getWalletAddress);

/**
 * @swagger
 * /api/payment/verify:
 *   post:
 *     summary: Verify a payment
 *     description: Verifies a payment transaction on the TON blockchain.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionHash:
 *                 type: string
 *                 description: The transaction hash to verify
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, missing or invalid transaction hash
 *       500:
 *         description: Internal server error
 */
router.post('/verify', PaymentController.verifyPayment);

module.exports = router;