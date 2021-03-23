require('dotenv').config()

const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME || 'localhost'
const DB_CONNECTION = process.env.DB_CONNECTION
const APP_SECRET = process.env.APP_SECRET || 'SECRET'

module.exports = {
  PORT,
  HOSTNAME,
  DB_CONNECTION,
  APP_SECRET,
}
