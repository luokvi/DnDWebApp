const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const TokenCheck = require('../util/tokenCheck')
const TokenBlacklist = require('../models/tokenBlacklist')

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  let passwordCorrect = false
  if(user !== null){
    passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
  }

  if (!(user && passwordCorrect)){
    res.status(401).json({ error: 'Invalid Username or Password'})
    return
  }

  const tokenUser = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(tokenUser, process.env.TOKENSECRET, {expiresIn: '12h'})

  res.status(200).send({ token, username: user.username, userid: user._id })
})

// On logout add used token to a blacklist, so it can't be used again for a time.
loginRouter.post('/logout', async (req, res) => {
  const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

  const auth = req.get('authorization').toLowerCase()
  const token = auth.substring(7)
  
  const tokenItem = new TokenBlacklist({
    token: token,
    time: new Date()
  })

  await tokenItem.save()

  res.status(200).send('Logged out.').end()
})

module.exports = loginRouter