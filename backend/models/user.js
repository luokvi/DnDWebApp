const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log('connected!')
  })
  .catch((error) => {
    console.log('error connecting: ', error.message)
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 5 },
  passwordHash: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FriendRequest' }],
  sentFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FriendRequest' }],
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  creations: {
    enemies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enemy' }],
    encounters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Encounter' }],
    campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }]
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model("User", userSchema)