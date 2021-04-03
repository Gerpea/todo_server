const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')

const config = require('./config')
require('./db')

const { StatusCodes } = require('./utils')
const todoRoute = require('./api/todo')
const authRoute = require('./api/auth')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(morgan('dev'))

require('./middlewares/passport')(passport)

const { userAuth } = require('./middlewares/userAuth')
const { handleError } = require('./utils/error')

app.use('/auth', authRoute)
app.use('/todo', todoRoute)

app.use((error, req, res, next) => {
  console.log(error)
  handleError(error, res)
})

app.listen(config.PORT, config.HOSTNAME, () => {
  console.log(`Server listening at http://${config.HOSTNAME}:${config.PORT}`)
})
