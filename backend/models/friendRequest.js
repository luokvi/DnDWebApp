const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log('connected!')
  })
  .catch((error) => {
    console.log('error connecting: ', error.message)
  })

const friendRequestSchema = new mongoose.Schema({
    sender: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    date: [{ type: mongoose.Schema.Types.Date, required: true}]
})

friendRequestSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("FriendRequest", friendRequestSchema)