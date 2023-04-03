const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Chats', chatsSchema)