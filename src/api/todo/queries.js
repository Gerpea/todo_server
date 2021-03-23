const knex = require('../../db')

function createTodo(title, done, parent_id) {
  return knex('todos')
    .insert({ title, done, parent_id })
    .returning(['id', 'title', 'done', 'parent_id', 'created_at', 'updated_at'])
}

function getTodoById(id) {
  return knex('todos').where({ id }).first()
}

function getTodos() {
  return knex('todos')
}

function deleteTodoById(id) {
  return knex('todos').where({ id }).delete(['id'])
}

function updateTodoById(id, data) {
  return knex('todos')
    .where({ id })
    .update(data, ['id', 'title', 'done', 'parent_id', 'created_at', 'updated_at'])
}

module.exports = {
  createTodo,
  getTodoById,
  getTodos,
  deleteTodoById,
  updateTodoById,
}
