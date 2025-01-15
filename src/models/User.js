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
});

module.exports = mongoose.model('User', UserSchema);
