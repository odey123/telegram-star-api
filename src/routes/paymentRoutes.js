const express = require('express');
const PaymentController  = require('../controllers/paymentController');
const router = express.Router();

router.get('/address', PaymentController.getWalletAddress);
router.post('/verify', PaymentController.verifyPayment);

module.exports = router;
