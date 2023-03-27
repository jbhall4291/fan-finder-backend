const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String
    }
}); 

const User = mongoose.model('User', userSchema)

module.exports = User;