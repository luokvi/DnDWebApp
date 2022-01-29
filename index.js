require('dotenv').config()
const express = require('express')

const app = express()
require('express-async-errors')
app.use(express.json())

const userRouter = require('./backend/controllers/users')
app.use('/api/users', userRouter)

const loginRouter = require('./backend/controllers/login')
app.use('/api/login', loginRouter)

const characterRouter = require('./backend/controllers/character')
app.use('/api/character', characterRouter)

const itemsRouter = require('./backend/controllers/items')
app.use('/api/items', itemsRouter)

const campaignRouter = require('./backend/controllers/campaign')
app.use('/api/dm', campaignRouter)

const middleware = require('./backend/util/middleware')
app.use(middleware.errorHandler)

app.use(express.static('build'))

app.get('/', ( req, res ) => {
  res.send( '<h1>Hello World!</h1>' )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})