const PaymentService = require('../services/paymentService');

class PaymentController {
    async getWalletAddress(req, res) {
        try {
            const walletAddress = await PaymentService.getWalletAddress();
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
            const { transactionHash } = req.body; // Fixed typo

            if (!transactionHash) {
                return res.status(400).json({ error: 'Transaction hash is required' });
            }

            const verificationResult = await PaymentService.verifyPayment(transactionHash); // Fixed method call

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
}

module.exports = new PaymentController();
