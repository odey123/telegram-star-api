const { Spot } = require('@binance/connector');
require('dotenv').config();

const client = new Spot(process.env.BINANCE_API_KEY, process.env.BINANCE_API_SECRET);

// Example: Get price of a symbol
const getPrice = async (symbol = 'BTCUSDT') => {
  try {
    const response = await client.tickerPrice(symbol);
    return response.data;
  } catch (error) {
    console.error('Binance API error:', error.message);
    throw error;
  }
};

module.exports = {
  getPrice,
};
