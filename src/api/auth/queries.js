const knex = require('../../db')

function createUser(username, password) {
  return knex('users')
    .insert({ username, password })
    .returning(['id', 'username', 'created_at', 'updated_at'])
}

function getUserByUsername(username) {
  return knex('users').where({ username }).first().returning('id', 'username')
}

module.exports = {
  createUser,
  getUserByUsername,
}
