const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
    time: { type: Date, required: true }
})

module.exports = mongoose.model("TokenBlacklist", blacklistSchema)