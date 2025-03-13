const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { getConnectionLink, verifyWallet } = require("../services/tonConnect");
// Route to get wallet balance
router.get('/balance', walletController.getWalletBalance);

router.get("/connect", getConnectionLink);  // Get wallet connection link

router.post("/verify", verifyWallet);
// Route to deposit funds
router.post('/deposit', walletController.depositFunds);

// Route to withdraw funds
router.post('/withdraw', walletController.withdrawFunds);

// Route to get transaction history
router.get('/history', walletController.getTransactionHistory);

module.exports = router;