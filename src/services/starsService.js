const User = require('../models/User');
const Star = require('../models/Star');

class StarService {
    async giftStar(senderId, recipientId, starId, quantity) {
        try {
            const sender = await User.findById(senderId);
            const recipient = await User.findById(recipientId);

            if (!sender || !recipient) {
                throw new Error('Sender or recipient not found');
            }

            const senderStarBalance = sender.stars.find(s => s.starId.toString() === starId);
            if (!senderStarBalance || senderStarBalance.quantity < quantity) {
                throw new Error('Insufficient stars to gift');
            }
            senderStarBalance.quantity -= quantity;

            const recipientStarBalance = recipient.stars.find(s => s.starId.toString() === starId);
            if (recipientStarBalance) {
                recipientStarBalance.quantity += quantity;
            } else {
                recipient.stars.push({ starId, quantity });
            }

            await sender.save();
            await recipient.save();

            return { success: true, message: 'Star gifted successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async purchaseStars(walletAddress, starId, quantity) {
        try {
            const user = await User.findOne({ walletAddress });
            if (!user) {
                throw new Error('User not found');
            }

            const star = await Star.findById(starId);
            if (!star) {
                throw new Error('Star not found');
            }

            const totalCost = star.price * quantity;
            if (user.walletBalance < totalCost) {
                throw new Error('Insufficient balance to purchase stars');
            }

            user.walletBalance -= totalCost;
            const userStar = user.stars.find(s => s.starId.toString() === starId);
            if (userStar) {
                userStar.quantity += quantity;
            } else {
                user.stars.push({ starId, quantity });
            }
            await user.save();

            return { success: true, message: 'Star purchased successfully', balance: user.walletBalance };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async checkStarBalance(userId) {
        try {
            const user = await User.findById(userId).populate('stars.starId', 'name price');
            if (!user) {
                return { success: false, message: 'User not found' };
            }

            const starBalances = user.stars.map(star => ({
                starId: star.starId._id,
                name: star.starId.name,
                quantity: star.quantity,
                price: star.starId.price,
            }));

            return { success: true, starBalances };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new StarService();
