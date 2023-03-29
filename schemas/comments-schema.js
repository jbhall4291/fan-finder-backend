const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String
    },
    gig_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('Comments', commentsSchema)