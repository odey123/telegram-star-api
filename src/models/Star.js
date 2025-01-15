const mongoose = require('mongoose');

const StarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const Star = mongoose.models.Star || mongoose.model('Star', StarSchema);

module.exports = Star;
