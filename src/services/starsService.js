const User = require('../models/User');
const Star = require('../models/Star');

class StarService {
    async giftStar(senderId, recipientId, starId, quantity) {
        try {
            const sender = await User.findById(senderId).lean();
            const recipient = await User.findById(recipientId).lean();

            if (!sender || !recipient) {
                throw new Error('Sender or recipient not found');
            }

            const senderStarIndex = sender.stars.findIndex(s => s.starId.toString() === starId);
            if (senderStarIndex === -1 || sender.stars[senderStarIndex].quantity < quantity) {
                throw new Error('Insufficient stars to gift');
            }

            // Update sender's stars
            sender.stars[senderStarIndex].quantity -= quantity;

            // Update recipient's stars
            const recipientStarIndex = recipient.stars.findIndex(s => s.starId.toString() === starId);
            if (recipientStarIndex !== -1) {
                recipient.stars[recipientStarIndex].quantity += quantity;
            } else {
                recipient.stars.push({ starId, quantity });
            }

            await User.findByIdAndUpdate(senderId, { stars: sender.stars });
            await User.findByIdAndUpdate(recipientId, { stars: recipient.stars });

            return { success: true, message: 'Star gifted successfully' };
        } catch (error) {
            throw new Error(`Gift Star Error: ${error.message}`);
        }
    }

    async purchaseStars(walletAddress, starId, quantity) {
        try {
            const user = await User.findOne({ walletAddress }).lean();
            if (!user) {
                throw new Error('User not found');
            }

            const star = await Star.findById(starId).lean();
            if (!star) {
                throw new Error('Star not found');
            }

            const totalCost = star.price * quantity;
            if (!user.walletBalance || user.walletBalance < totalCost) {
                throw new Error('Insufficient balance to purchase stars');
            }

            // Deduct from wallet balance
            const updatedBalance = user.walletBalance - totalCost;

            // Update user stars
            const userStarIndex = user.stars.findIndex(s => s.starId.toString() === starId);
            if (userStarIndex !== -1) {
                user.stars[userStarIndex].quantity += quantity;
            } else {
                user.stars.push({ starId, quantity });
            }

            await User.findByIdAndUpdate(user._id, { walletBalance: updatedBalance, stars: user.stars });

            return { success: true, message: 'Star purchased successfully', balance: updatedBalance };
        } catch (error) {
            throw new Error(`Purchase Stars Error: ${error.message}`);
        }
    }

    async checkStarBalance(userId) {
        try {
            const user = await User.findById(userId).populate('stars.starId', 'name price').lean();
            if (!user) {
                return { success: false, message: 'User not found' };
            }

            const starBalances = user.stars.map(star => ({
                starId: star.starId?._id || null,
                name: star.starId?.name || 'Unknown Star',
                quantity: star.quantity,
                price: star.starId?.price || 0,
            }));

            return { success: true, starBalances };
        } catch (error) {
            throw new Error(`Check Star Balance Error: ${error.message}`);
        }
    }
}

module.exports = new StarService();
