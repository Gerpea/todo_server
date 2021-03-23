const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const config = require('./config')
require('./db')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.listen(config.PORT, config.HOSTNAME, () => {
  console.log(`Server listening at http://${config.HOSTNAME}:${config.PORT}`)
})
