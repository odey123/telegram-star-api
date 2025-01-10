const mongoose = require ("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    transactionHash: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    currency: {
        type: String,
        default: 'TON'
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'failed'],
      default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);
