const StarService = require('../services/starsService');

class StarController {
    async giftStar(req, res) {
        try {
            const { senderId, recipientId, starId, quantity } = req.body;

            const result = await StarService.giftStar(senderId, recipientId, starId, quantity);

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async purchaseStar(req, res) {
        try {
            const { walletAddress, starId, quantity } = req.body;const StarService = require('../services/starsService');

            class StarController {
                async giftStar(req, res) {
                    try {
                        const { senderId, recipientId, starId, quantity } = req.body;
            
                        if (!senderId || !recipientId || !starId || !quantity) {
                            return res.status(400).json({ success: false, error: 'Missing required fields' });
                        }
            
                        const result = await StarService.giftStar(senderId, recipientId, starId, quantity);
            
                        res.status(200).json({ success: true, data: result });
                    } catch (error) {
                        console.error('Error gifting star:', error.message);
                        res.status(500).json({ success: false, error: 'Failed to gift star', details: error.message });
                    }
                }
            
                async purchaseStar(req, res) {
                    try {
                        const { walletAddress, starId, quantity } = req.body;
            
                        if (!walletAddress || !starId || !quantity) {
                            return res.status(400).json({ success: false, error: 'Missing required fields' });
                        }
            
                        const result = await StarService.purchaseStars(walletAddress, starId, quantity);
            
                        if (!result.success) {
                            return res.status(400).json({ success: false, error: result.message });
                        }
            
                        res.status(200).json({ success: true, data: result });
                    } catch (error) {
                        console.error('Error purchasing star:', error.message);
                        res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
                    }
                }
            
                async checkStarBalance(req, res) {
                    try {
                        const { userId } = req.params;
            
                        if (!userId) {
                            return res.status(400).json({ success: false, error: 'User ID is required' });
                        }
            
                        const result = await StarService.checkStarBalance(userId);
            
                        if (!result.success) {
                            return res.status(404).json({ success: false, error: result.message });
                        }
            
                        res.status(200).json({ success: true, data: result });
                    } catch (error) {
                        console.error('Error checking star balance:', error.message);
                        res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
                    }
                }
            }
            
            module.exports = new StarController();
            
            if (!walletAddress || !starId || !quantity) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const result = await StarService.purchaseStars(walletAddress, starId, quantity);

            if (!result.success) {
                return res.status(400).json({ error: result.message });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error('Error purchasing star:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async checkStarBalance(req, res) {
        try {
            const { userId } = req.params;

            const result = await StarService.checkStarBalance(userId);

            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error('Error checking star balance:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new StarController();
