const PaymentService = require('../services/paymentService');
const User = require('../models/User');
const {verifyTONTransaction} = require('../services/tonPaymentService'); // Assuming this is a utility function for transaction verification

class PaymentController {
    async getWalletAddress(req, res) {
        try {
            const walletAddress = PaymentService.getWalletAddress();
            res.status(200).json({ walletAddress });
        } catch (error) {
            console.error('Error retrieving wallet address:', error);
            res.status(500).json({
                error: 'Failed to retrieve wallet address',
                details: error.message
            });
        }
    }

    async verifyPayment(req, res) {
        try {
            const { transactionHash } = req.body; 

            if (!transactionHash) {
                return res.status(400).json({ error: 'Transaction hash is required' });
            }

            const verificationResult = await PaymentService.verifyPayment(transactionHash); 

            if (verificationResult.success) { // Fixed typo
                return res.status(200).json({
                    status: 'success',
                    amount: verificationResult.amount,
                    message: 'Payment verified successfully'
                });
            } else {
                return res.status(400).json({ 
                    error: verificationResult.message || 'Payment verification failed' 
                });
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            res.status(500).json({ 
                error: 'Failed to verify payment',
                details: error.message
            });
        }
    }

    async verifyTransaction(req, res) {
        try {
            const { txHash, expectedAmount, from } = req.body;

            if (!txHash || !expectedAmount || !from || !user) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const isValid = await verifyTONTransaction(txHash, expectedAmount, from);
            if (!isValid) return res.status(400).json({error: 'Invalid transaction'});
            

            //update user's star balance here
            const user = await User.findById(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.starBalance += expectedAmount; // Or replace with the amount you want to add
        await user.save()
           res.json({message: 'Stars credited successfully', newBalance: user.starBalance});
          } catch (err) {
            res.status(500).json({ error: 'Verification failed', details: err.message });
          }
    }
}
module.exports = new PaymentController();
