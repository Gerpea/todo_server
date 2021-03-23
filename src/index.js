const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const config = require('./config')
require('./db')

const { StatusCodes } = require('./utils')
const todoRoute = require('./api/todo')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/todo', todoRoute)

app.use((error, req, res, next) => {
  const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR
  const message = error.message || error.detail || error
  return res.status(status).json({
    error: {
      message,
      errors: error.errors,
    },
  })
})

app.listen(config.PORT, config.HOSTNAME, () => {
  console.log(`Server listening at http://${config.HOSTNAME}:${config.PORT}`)
})
