// routes/star.routes.js
const express = require('express');
const router = express.Router();
const StarController = require('../controllers/starsController');

// Gift Star Route
router.post('/giftStar', StarController.giftStar);
router.post('/purchase', StarController.purchaseStar)
router.get('/check-balance/:userId', StarController.checkStarBalance)

module.exports = router;
