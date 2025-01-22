const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  stars: [
    {
      starId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Star',  // Reference to Star model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0, // Ensure quantity is set by default if not provided
      },
    },
  ],
  walletBalance: {
    type: Number,
    default: 0, // Start with a default balance of 0 TON
  },
  currency: {
    type: String,
    enum: ['TON', 'Stars'],
    default: 'TON', // Default to TON
  },
});

module.exports = mongoose.model('User', UserSchema);
