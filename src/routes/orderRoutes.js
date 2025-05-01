const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const orderController = new OrderController(); // Create instance here

/**
 * @swagger
 * /api/orders/place:
 *   post:
 *     summary: Place an order for stars
 */
router.post('/place', (req, res) => orderController.placeOrder(req, res));

/**
 * @swagger
 * /api/orders/status:
 *   get:
 *     summary: Get order status
 */
router.get('/status', (req, res) => orderController.getOrderStatus(req, res));

/**
 * @swagger
 * /api/orders/history:
 *   get:
 *     summary: Get order history
 */
router.get('/history', (req, res) => orderController.getOrderHistory(req, res));

module.exports = router;