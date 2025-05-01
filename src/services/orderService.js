// services/order.service.js
const Order = require('../models/Order');
const User = require('../models/User');
const Star = require('../models/Star');

class OrderService {
  async placeOrder({ userId, starId, quantity, paymentHash }) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const star = await Star.findById(starId);
    if (!star) throw new Error('Star not found');

    const baseAmount = star.price * quantity;
    const serviceFee = 0.1 * baseAmount; // 10% service fee
    const totalAmount = baseAmount + serviceFee;

    const order = new Order({
      user: user._id,
      star: star._id,
      quantity,
      totalAmount,
      serviceFee,
      paymentHash,
      status: 'pending'
    });

    await order.save();
    return order;
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.status = status;
    await order.save();
    return order;
  }

  async getUserOrders(userId) {
    return await Order.find({ user: userId }).populate('star');
  }

  async getAllOrders() {
    return await Order.find().populate('user').populate('star');
  }
}

module.exports = new OrderService();
