const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const FriendRequest = require('../models/friendRequest')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate("friends", { username: 1, id: 1 })

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

usersRouter.post('/addFriend', async (req, res) => {
  const body = req.body

  const requestId = body.requestId
  const senderUser = await User.findById(body.senderId).populate("friendRequests")
  const receiverUser = await User.findById(body.receiverId)

  // Check that there is a friendrequest from receiver to sender.
  const receivedRequest = await senderUser.friendRequests.filter(request => request == requestId)
  console.log(senderUser)
  if (!receivedRequest._id){
    res.status(403).json({ error: "no friendrequest from this receiver to sender"}).end()
    return
  }

  senderUser.friends = senderUser.friends.concat(receiverUser._id)
  // Remove friendrequest from added friend.
  senderUser.friendRequests  = senderUser.friendRequests.filter(request => request._id != requestId)
  await senderUser.save()

  receiverUser.friends = receiverUser.friends.concat(senderUser._id)
  // Remove sent friendrequest to added friend.
  receiverUser.sentFriendRequests  = receiverUser.sentFriendRequests.filter(
    request => request._id != requestId)
  await receiverUser.save()

  res.status(200).end()
})

usersRouter.post('/friendRequest', async (req, res) => {
  const body = req.body

  const senderUser = await User.findById(body.senderId)
  const receiverUser = await User.findById(body.receiverId)

  const friendRequest = new FriendRequest({
    sender: senderUser._id,
    receiver: receiverUser,
    date: new Date()
  })

  const savedRequest = await friendRequest.save()

  senderUser.sentFriendRequests = senderUser.sentFriendRequests.concat(savedRequest._id)
  await senderUser.save()

  receiverUser.friendRequests = receiverUser.friendRequests.concat(savedRequest._id)
  receiverUser.save()

  res.json(savedRequest.toJSON())
})

usersRouter.delete('/friend', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId)
  const friendToDelete = await User.findById(body.friendId)

  user.friends = user.friends.filter(friend => friend != friendToDelete._id)
  const savedUser = await user.save()

  friendToDelete.friends = friendToDelete.friends.filter(friend => friend != user._id)
  const savedFriend = await friendToDelete.save()

  res.json(savedUser, savedFriend)
})

module.exports = usersRouter