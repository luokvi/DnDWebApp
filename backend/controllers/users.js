const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const FriendRequest = require('../models/friendRequest')
const TokenCheck = require('../util/tokenCheck')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate("friends", { username: 1 })

  res.json(users.map( user => user.toJSON() ))
})

usersRouter.get('/:id', async (req, res) => {
  // TODO: return more info if user's own info vs other user's.
  const id = req.params.id

  const user = await User.findById(id).populate('friends', { username: 1}).populate(
    'friendRequests', {sender: 1}).populate(
    'characters', {name: 1, race: 1, class: 1, level: 1}).populate(
    'creations.campaigns', {name: 1}).populate(
    'creations.enemies', {name: 1, race: 1, description: 1}).populate(
    'creations.equipment', {name: 1, description: 1}).populate(
    'creations.weapons', {name: 1, description: 1}).populate(
    'creations.spells', {name: 1, description: 1})

  if (user === null){
    res.status(404).end()
    return
  }

  res.json(user.toJSON())
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

  res.json(savedUser.toJSON())
})

usersRouter.post('/friend', async (req, res) => {
  const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.senderId)
  if (!authorized){
    res.status(401).send(checkMessage).end()
    return
  }
  const body = req.body

  const senderUser = await User.findById(body.senderId).populate('friendRequests').populate('friends')
  const receiverUser = await User.findById(body.receiverId).populate('sentFriendRequests')
  const friendRequest = await FriendRequest.findById(body.friendRequest).populate('sender').populate('receiver')

  // Check that friendRequest exists and is between sender and receiver.
  if (!friendRequest ||
    !(friendRequest.sender.id === receiverUser.id) ||
    !(friendRequest.receiver.id === senderUser.id))
    {
      res.status(403).end()
      return
    }

  // Check if users are already friends.
  const alreadyFriend = senderUser.friends.find(f => f._id == receiverUser.id)
  let check = true
  if (!alreadyFriend){
    check = false
  }
  if (check){
    res.status(409).end()
    return
  }

  senderUser.friends = senderUser.friends.concat(receiverUser._id)
  senderUser.friendRequests = senderUser.friendRequests.filter(r => r.id != friendRequest._id)
  const savedSender = await senderUser.save()

  receiverUser.friends = receiverUser.friends.concat(senderUser._id)
  receiverUser.sentFriendRequests = receiverUser.sentFriendRequests.filter(r => r.id != friendRequest._id)
  await receiverUser.save()

  await FriendRequest.deleteOne({ "_id": friendRequest._id})

  res.json(savedSender.toJSON())
})

usersRouter.post('/friendRequest', async (req, res) => {
  const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.senderId)
  if (!authorized){
    res.status(401).send(checkMessage).end()
    return
  }

  const body = req.body

  const senderUser = await User.findById(body.senderId).populate(
    'friends').populate('friendRequests').populate('sentFriendRequests')
  const receiverUser = await User.findById(body.receiverId)
  
  // Check that users aren't already friends.
  const friend = senderUser.friends.find(f => f.id == receiverUser._id)
  if (friend){
    res.status(409).json({error: "Already friends."}).end()
    return
  }

  // Check that there isn't already a friendrequest.
  const existingRequest = await FriendRequest.findOne({ sender: receiverUser._id, receiver: senderUser._id })
  const existingSentRequest = await FriendRequest.findOne( {sender: senderUser._id, receiver: receiverUser._id})

  if (existingRequest !== null || existingSentRequest !== null){
    res.status(409).json({error: 'Already sent a request.'}).end()
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
  const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
  if (!authorized){
    res.status(401).send(checkMessage).end()
    return
  }

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