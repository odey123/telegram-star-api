const express = require('express');
const router = express.Router();
const binanceService = require('../services/binanceService');

router.get('/binance/price/:symbol', async (req, res) => {
  try {
    const price = await binanceService.getPrice(req.params.symbol);
    res.json({ success: true, price });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch price', error: error.message });
  }
});

module.exports = router;
