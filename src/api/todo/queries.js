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

function deleteTodoById(id) {
  return knex('todos').where({ id }).delete(['id', 'title', 'created_at', 'updated_at'])
}

function updateTodoById(id, data) {
  return knex('todos').where({ id }).update(data, ['id', 'title', 'created_at', 'updated_at'])
}

module.exports = {
  createTodo,
  getTodoById,
  getTodos,
  deleteTodoById,
  updateTodoById,
}
