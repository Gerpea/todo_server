const knex = require('../../db')

function createTodo(title) {
  return knex('todos').insert({ title }).returning(['id', 'title'])
}

module.exports = {
  createTodo,
}
