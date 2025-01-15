const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Telegram authentication route
router.post('/connect', authController.aunthenticateUser);

module.exports = router;
