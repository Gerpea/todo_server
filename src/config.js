require('dotenv').config()

const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME || 'localhost'
const DB_CONNECTION = process.env.DB_CONNECTION

module.exports = {
  PORT,
  HOSTNAME,
  DB_CONNECTION,
}
