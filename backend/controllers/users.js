const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const FriendRequest = require('../models/friendRequest')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})

  res.json(users.map( user => user.toJSON() ))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password === undefined){
      res.status(400).json({ error: "password is required" })
      return
  }
  if (body.password.length < 8){
      res.status(400).json({ error: "password must be atleast 3 characters"})
      return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

usersRouter.put('/addFriend', async (req, res) => {
  const body = req.body

  const requestId = body.requestId
  const senderUser = await User.findById(body.senderId)
  const receiverUser = await User.findById(body.receiverId)

  senderUser.friends = senderUser.friends.concat(receiverUser._id)
  // Remove friendrequest from added friend.
  senderUser.friendRequests  = senderUser.friendRequests.filter(request => request._id != requestId)
  await senderUser.save()

  receiverUser.friends = receiverUser.friends.concat(senderUser._id)
  // Remove sent friendrequest to added friend.
  receiverUser.sentFriendRequests  = receiverUser.sentFriendRequests.filter(request => request._id != requestId)
  await receiverUser.save()

  res.json({ sender})
})

usersRouter.put('/friendRequest', async (req, res) => {
  const body = req.body

  const senderUser = await User.findById(body.senderId)
  const receiverUser = await User.findById(body.receiverId)

  const newRequest = new FriendRequests({
    sender: senderUser._id,
    receiver: receiverUser._id,
    date: new Date()
  })

  receiverUser.friendRequests = receiverUser.friendRequests.concat(newRequest)
  await receiverUser.save()

  senderUser.sentFriendRequests = senderUser.sentFriendRequests.concat(newRequest)
  await senderUser.save()

  res.json(newRequest)
})

module.exports = usersRouter