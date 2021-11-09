const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
    time: { type: Date, required: true }
})

module.exports = mongoose.model("TokenBlacklist", blacklistSchema)