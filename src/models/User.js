const mongoose = require ('mongoose')

const UserSchema = new mongoose.schema({
    telegramId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: false
    },
    balance: {
        type: Number,
        default: 0,
    },
    createdAT: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Star', StarSchema);

