const crypto = require('crypto');

// Replace these with test values
const data = {
    id: '123456789',
    auth_date: '1673952000',
};
const botToken = '7243306465:AAFnzCoCuz0SdOP16JzAWjGRVqzbr9TIcFw'; // Replace with your bot token

// Create the data string
const stringToCheck = `id=${data.id}&auth_date=${data.auth_date}`;

// Calculate the hash
const hash = crypto
    .createHmac('sha256', botToken)
    .update(stringToCheck)
    .digest('hex');

console.log('Generated hash:', hash);
