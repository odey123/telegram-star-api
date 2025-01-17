const dotenv = require('dotenv');
const AuthService = require('../services/authService');

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

class AuthController {
    async authenticateUser(req, res) {
        try {
            const { id, auth_date, hash } = req.body;

            if (!id || !auth_date || !hash) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            // Verify the auth_date is not expired
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            const timeDiff = currentTime - parseInt(auth_date); // Time difference in seconds

            if (timeDiff > 60) { // Adjust threshold if necessary
                return res.status(403).json({ error: 'Authentication failed: auth date expired' });
            }

            // Delegate authentication to AuthService
            const result = AuthService.authenticateTelegramUser(id, auth_date, hash, TELEGRAM_BOT_TOKEN);

            // Return the success response
            return res.status(200).json({ message: 'Authentication successful', user: result.user });
        } catch (error) {
            console.error('Error during Telegram authentication:', error.message);
            return res.status(403).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
