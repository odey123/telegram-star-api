const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config()

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

class AuthController {
        async aunthenticateUser(req, res) {
            try {
               
                const {id, auth_date, hash } = req.body;

                if (!id || !auth_date || !hash) {
                    return res.status(400).json({ error: 'Missing required parameters'})

                }

                const stringToCheck =  `id=${id}&auth_date=${auth_date}`;

                const secretKey = TELEGRAM_BOT_TOKEN
                const calculatedHash = crypto
                    .createHmac('sha256', secretKey)
                    .update(stringToCheck)
                    .digest('hex')

                if (calculatedHash !== hash) {
                    return res.status(403).json ({ error: 'Authentication failed: hash mismatch'})
                }
            
             
            const currentTime = Math.floor(Date.now() / 1000)
            const timeDiff = currentTime - parseInt(auht_date);
            if (timeDiff > 60) {
                return res.status(403).json({ error: 'Authentication failed: auth date expired'})
            }

            return res.status(200).json({ message: 'Authentication successful', user: { id }})

        } catch (error) {
            console.error('Error during Teleram authentication:', error)
            res.status(500).json({ error: 'Internal Server Error'})
        }
    }
}

module.exports =  new AuthController()