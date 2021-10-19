const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = false
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

  res.status(200).send({ token, username: user.username })
})

module.exports = loginRouter