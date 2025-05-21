const orderService = require('../services/orderService');

class OrderController {
  async placeOrder(req, res) {
    try {
      const { userId, starId, quantity } = req.body;
      if (!userId || !starId || !quantity) {
        return res.status(400).json({
          success: false,
          message: 'userId, starId and quantity are required'
        });
      }
      
      const order = await orderService.placeOrder({ userId, starId, quantity });
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        order
      });
    } catch (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  async getOrderStatus(req, res) {
    try {
      const { orderId } = req.query;
      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: 'orderId is required'
        });
      }
      
      const status = await orderService.getOrderStatus(orderId);
      return res.status(200).json({
        success: true,
        orderStatus: status
      });
    } catch (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  async getOrderHistory(req, res) {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required'
        });
      }
      
      const history = await orderService.getOrderHistory(userId);
      return res.status(200).json({
        success: true,
        history
      });
    } catch (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
}

module.exports = OrderController;