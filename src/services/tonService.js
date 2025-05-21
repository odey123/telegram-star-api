const axios = require('axios');

const TON_API_KEY = process.env.TON_API_KEY; // Ensure you have your API key set in your environment variables

const tonService = {
  async getTransactionVolume(walletAddress) {
    const url = `https://tonapi.io/v1/blockchain/accounts/${walletAddress}/transactions?limit=100`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${TON_API_KEY}`,
        },
      });

      const transactions = response.data.transactions || [];
      let incoming = 0;
      let outgoing = 0;

      for (const tx of transactions) {
        const value = tx.amount / 1e9; // Convert from nanoTON to TON
        if (tx.is_income) {
          incoming += value;
        } else {
          outgoing += value;
        }
      }

      return {
        incoming,
        outgoing,
        total: incoming + outgoing,
      };
    } catch (error) {
      console.error('Error fetching transaction volume:', error.message);
      throw new Error('Failed to fetch volume');
    }
  },
};

module.exports = tonService;
