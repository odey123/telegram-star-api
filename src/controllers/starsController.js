const StarService = require ('../services/starsService')

class StarController {
    async giftStar(req, res){
        try {
            const { senderId, recipientId, starId, quantity } = req.body

            const result = await StarService.giftStar(senderId, recipientId, starId, quantity)

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message })
        }
    }

async purchaseStar(req, res) {
        try {
            const { starId, userId, paymentHash } = req.body

            if (!starId|| !userId || !paymentHash) {
                return res.status(400).json({error: 'Missing required fields'})
            }
            
            const star = await Star.findById(starId)
            if (!star) {
                return res.status(404).json({ errror: 'Star not found'})
            }

            const tonweb = new Tonweb (new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
                apiKey: 'ee19f41be916ee2a9ce1e20d8afa3b32dd8c53d1fbf96818c1b558582a45239b'
        }))
           

        const paymentDetails = await tonweb.provider.getTransaction(paymentHash);

        if (!paymentDetails || paymentDetails.in_msg.source === null) {
            return res.status(400).json({ error: 'Invalid payment hash or transaction not found' });
        }

        const transactionAmount = paymentDetails.in_msg.value / 1e9; // Convert nanoton to TON
        const transactionTo = paymentDetails.in_msg.destination;

        if (transactionAmount < star.price) {
            return res.status(400).json({ error: 'Insufficient payment amount' });
        }

       
        if (transactionTo !== process.env.TON_WALLET_ADDRESS) {
            return res.status(400).json({ error: 'Payment was not sent to the correct address' });
        }

        // Step 4: Credit the user with the star
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.starBalance += 1; // Increment star balance
        await user.save();

        res.status(200).json({ message: 'Star purchased successfully!', star });
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

        res.status(200).json({ success: true, starBalances: result.starBalances });
    } catch (error) {
        console.error('Error checking star balance:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}   
}
module.exports = new StarController()