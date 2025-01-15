const mongoose = require('mongoose');
const User = require('../models/User');
const Star = require('../models/Star');
const PaymentService = require('./paymentService');

class StarService {
    async giftStar(senderId, recipientId, starId, quantity) {
        try {
            // Use new keyword when creating ObjectId
            const senderIdObjectId = new mongoose.Types.ObjectId(senderId);
            const starIdObjectId = new mongoose.Types.ObjectId(starId);

            const sender = await User.findById(senderIdObjectId);
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

    async purchaseStars(userId, starId, transactionHash) {
        try {
            // Use new keyword for ObjectId conversion
            const userIdObjectId = new mongoose.Types.ObjectId(userId);
            const starIdObjectId = new mongoose.Types.ObjectId(starId);

            const paymentService = new PaymentService();
            const paymentVerification = await paymentService.verifyPayment(transactionHash);

            if (!paymentVerification.success) {
                return { success: false, message: paymentVerification.message };
            }

            // Step 2: Fetch the star details
            const star = await Star.findById(starIdObjectId);
            if (!star) {
                return { success: false, message: 'Star not found' };
            }

            // Step 3: Check if the payment amount matches the star price
            if (paymentVerification.amount < star.price) {
                return { success: false, message: 'Insufficient payment for the star' };
            }

            // Step 4: Update the user's star balance
            const user = await User.findById(userIdObjectId);
            if (!user) {
                return { success: false, message: 'User not found' };
            }

            const userStarBalance = user.stars.find(s => s.starId.toString() === starId);
            if (userStarBalance) {
                userStarBalance.quantity += 1; // Add one star for each purchase
            } else {
                user.stars.push({ starId, quantity: 1 });
            }

            await user.save();

            return { success: true, message: 'Star purchased successfully', star };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async checkStarBalance(userId) {
        try {
            // Use new keyword for ObjectId conversion
            const userIdObjectId = new mongoose.Types.ObjectId(userId);

            const user = await User.findById(userIdObjectId).populate('stars.starId', 'name price');
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
