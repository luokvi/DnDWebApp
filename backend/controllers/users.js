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
  receiverUser.sentFriendRequests  = receiverUser.sentFriendRequests.filter(request => request._id != requestId)
  await receiverUser.save()

  res.status(200).end()
})

usersRouter.post('/friendRequest', async (req, res) => {
  const body = req.body

  const senderUser = await User.findById(body.senderId).populate('friends').populate('sentFriendRequests').populate('friendRequests')
  const receiverUser = await User.findById(body.receiverId)

  // Check if users are already friends.
  const alredyFriend = senderUser.friends.filter(friend => friend.id == body.receiverId)
  if (alredyFriend.id){
    res.status(403).json({ error: "cannot send a friend request"}).end()
    return
  }

  // Check if already sent a friend request.
  const sentRequest = senderUser.sentFriendRequests.filter(request => request.receiver == body.receiverId)
  const receivedRequest = senderUser.friendRequests.filter(request => request.sender == body.receiverId)
  if (sentRequest[0] || receivedRequest[0]){
    res.status(403).json({ error: "cannot send a friend request"}).end()
    return
  }

  const newRequest = new FriendRequest({
    sender: senderUser,
    receiver: receiverUser,
    date: new Date()
  })

  const savedRequest = await newRequest.save()

  receiverUser.friendRequests = receiverUser.friendRequests.concat(savedRequest)
  await receiverUser.save()

  senderUser.sentFriendRequests = senderUser.sentFriendRequests.concat(savedRequest)
  await senderUser.save()

  res.json(savedRequest)
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