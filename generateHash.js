const crypto = require('crypto');

// Replace these with test values
const data = {
    id: '123456789', // Telegram User ID
    auth_date: Math.floor(Date.now() / 1000).toString(), // Current time as auth_date
};
const botToken = '7243306465:AAFnzCoCuz0SdOP16JzAWjGRVqzbr9TIcFw'; // Replace with your bot token

// Create the data string
const stringToCheck = `id=${data.id}&auth_date=${data.auth_date}`;
console.log('String to Check:', stringToCheck);

// Calculate the hash
const hash = crypto
    .createHmac('sha256', botToken)
    .update(stringToCheck)
    .digest('hex');

console.log('Generated hash:', hash);

// Output the full test payload
console.log('Test Payload:', {
    id: data.id,
    auth_date: data.auth_date,
    hash: hash,
});
