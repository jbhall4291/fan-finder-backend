const mongoose = require("mongoose");
const PASS = process.env.PASS

// later, add connection for production db (atlas)

const db = mongoose.createConnection('mongodb://127.0.0.1:27017/test', {maxPoolSize: 10})

module.exports = db