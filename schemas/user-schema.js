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

module.exports = mongoose.model('User', userSchema)