const knex = require('knex')

const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')
const environmentConfig = { ...config[environment], connection: process.env.DB_CONNECTION }
const connection = knex(environmentConfig)

module.exports = connection
