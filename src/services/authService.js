const crypto = require ("crypto")

class AuthService {
    authenticateTelegramUser(id, auth_date, hash, botToken) {
        try {
            if (!id || !auth_date || !hash) {
                throw new Error('Missing required parameters');
            }

            // Debug incoming data
            console.log('Incoming Data:', { id, auth_date, hash });
            
            // Step 1: Construct the string to check
            const stringToCheck = `id=${id}&auth_date=${auth_date}`;
            console.log('String to Check:', stringToCheck);

            // Step 2: Calculate the hash
            const calculatedHash = crypto
                .createHmac('sha256', botToken)
                .update(stringToCheck)
                .digest('hex');
            console.log('Calculated Hash:', calculatedHash);

            // Step 3: Validate the hash
            if (calculatedHash !== hash) {
                throw new Error('Authentication failed: hash mismatch');
            }

            // Step 4: Validate auth_date expiration
            const currentTime = Math.floor(Date.now() / 1000);
            const timeDiff = currentTime - parseInt(auth_date, 10);
            console.log('Current Time:', currentTime, 'Auth Date:', auth_date, 'Time Difference:', timeDiff);
            if (timeDiff > 60) {
                throw new Error('Authentication failed: auth date expired');
            }

            return { success: true, user: { id } };
        } catch (error) {
            throw new Error(error.message);
        }
    }
} 


module.exports = new AuthService();
