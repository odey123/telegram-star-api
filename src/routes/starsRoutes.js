const express = require('express');
const router = express.Router();
const starController = require('../controllers/starsController');

/**
 * @swagger
 * /api/stars/gift:
 *   post:
 *     summary: Gift stars to another user
 *     description: Send stars as a gift to another user.  
 *     Full URL: https://telegram-star-api.onrender.com/api/stars/gift
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromUserId:
 *                 type: string
 *               toUserId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Star gifted successfully.
 *       400:
 *         description: Invalid input or insufficient stars.
 */
router.post('/gift', starController.giftStar);

/**
 * @swagger
 * /api/stars/purchase:
 *   post:
 *     summary: Purchase stars
 *     description: Purchase a specific number of stars using wallet funds.  
 *     Full URL: https://telegram-star-api.onrender.com/api/stars/purchase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Star purchase successful.
 *       400:
 *         description: Insufficient balance or invalid data.
 */
router.post('/purchase', starController.purchaseStar);

/**
 * @swagger
 * /api/stars/checkbalance:
 *   get:
 *     summary: Check star balance
 *     description: Retrieve the star balance of a user.  
 *     Full URL: https://telegram-star-api.onrender.com/api/stars/checkbalance
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Star balance retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *       400:
 *         description: User ID is required.
 */
router.get('/checkbalance', starController.checkStarBalance);

module.exports = router;
