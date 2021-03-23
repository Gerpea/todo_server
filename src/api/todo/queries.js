const knex = require('../../db')

function createTodo(title) {
  return knex('todos').insert({ title }).returning(['id', 'title', 'created_at', 'updated_at'])
}

function getTodoById(id) {
  return knex('todos').where({ id }).first()
}

function getTodos() {
  return knex('todos')
}

module.exports = {
  createTodo,
  getTodoById,
  getTodos,
}
