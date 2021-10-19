require('dotenv').config()
const express = require('express')

const app = express()
app.use(express.json())

const userRouter = require('./controllers/users')
app.use('/api/users', userRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

const middleware = require('./util/middleware')
app.use(middleware.errorHandler)

app.get('/', ( req, res ) => {
  res.send( '<h1>Hello World!</h1>' )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})