const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String
    },
    gigs: {
        type: Array,
    },
    chats: {
        type: Array,   
    }
}); 

module.exports = mongoose.model('User', userSchema)