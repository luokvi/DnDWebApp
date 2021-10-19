const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const FriendRequest = require('../models/friendRequest')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate("friends", { username: 1 })

  res.json(users.map( user => user.toJSON() ))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password === undefined){
      res.status(400).json({ error: "password is required" }).end()
      return
  }
  if (body.password.length < 8){
      res.status(400).json({ error: "password must be atleast 3 characters"}).end()
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

usersRouter.post('/friend', async (req, res) => {
  const body = req.body

  const senderUser = await User.findById(body.senderId).populate('friendRequests')
  const receiverUser = await User.findById(body.receiverId).populate('sentFriendRequests')
  const friendRequest = await FriendRequest.findById(body.friendRequest)

  senderUser.friends = senderUser.friends.concat(receiverUser._id)
  senderUser.friendRequests = senderUser.friendRequests.filter(r => r.id != friendRequest._id)
  const savedSender = await senderUser.save()

  receiverUser.friends = receiverUser.friends.concat(senderUser._id)
  receiverUser.sentFriendRequests = receiverUser.sentFriendRequests.filter(r => r.id != friendRequest._id)
  await receiverUser.save()

  res.json(savedSender.toJSON())
})

usersRouter.post('/friendRequest', async (req, res) => {
  const body = req.body

  const senderUser = await User.findById(body.senderId).populate(
    'friends').populate('friendRequests').populate('sentFriendRequests')
  const receiverUser = await User.findById(body.receiverId)
  
  // Check that users aren't already friends.
  const friend = senderUser.friends.find(f => f.id == receiverUser._id)
  if (friend){
    res.status(409).end()
    return
  }

  console.log(senderUser)
  // Check that there isn't already a friendrequest.
  const existingRequest = senderUser.friendRequests.find(r => r.sender == receiverUser._id)
  const existingSentRequest = senderUser.sentFriendRequests.find(r => r.receiver == receiverUser._id)
  if (existingRequest || existingSentRequest){
    res.status(409).end()
    return
  }

  const friendRequest = new FriendRequest({
    sender: senderUser._id,
    receiver: receiverUser,
    date: new Date()
  })

  const savedRequest = await friendRequest.save()

  senderUser.sentFriendRequests = senderUser.sentFriendRequests.concat(savedRequest._id)
  await senderUser.save()

  receiverUser.friendRequests = receiverUser.friendRequests.concat(savedRequest._id)
  await receiverUser.save()

  res.json(savedRequest.toJSON())
})

usersRouter.delete('/friend', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId).populate('friends')
  const friend = await User.findById(body.friendId).populate('friends')

  user.friends = user.friends.filter(f => f.id != friend._id)
  const savedUser = await user.save()

  friend.friends = friend.friends.filter(f => f.id != user._id)
  await friend.save()

  res.json(savedUser.toJSON())
})

module.exports = usersRouter