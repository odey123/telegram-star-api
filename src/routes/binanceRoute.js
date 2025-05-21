const express = require('express');
const router = express.Router();
const binanceService = require('../services/binanceService');

/**
 * @swagger
 * /binance/price/{symbol}:
 *   get:
 *     summary: Get the current price of a cryptocurrency symbol from Binance
 *     tags: [Binance]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Cryptocurrency symbol in Binance format (e.g., BTCUSDT, TONUSDT)
 *     responses:
 *       200:
 *         description: Price fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 price:
 *                   type: number
 *                   example: 27345.67
 *       500:
 *         description: Failed to fetch price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to fetch price
 *                 error:
 *                   type: string
 *                   example: Network error or Binance API failure
 */
router.get('/binance/price/:symbol', async (req, res) => {
  try {
    const price = await binanceService.getPrice(req.params.symbol);
    res.json({ success: true, price });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch price',
      error: error.message,
    });
  }
});

module.exports = router;
