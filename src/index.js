const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const config = require('./config')
require('./db')

const todoRoute = require('./api/todo')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/todo', todoRoute)

app.use((error, req, res, next) => {
  return res.status(500).json({ error })
})

app.listen(config.PORT, config.HOSTNAME, () => {
  console.log(`Server listening at http://${config.HOSTNAME}:${config.PORT}`)
})
