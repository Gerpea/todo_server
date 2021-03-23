const express = require('express')
const router = express.Router()

const { validate } = require('../../middlewares/validate')
const {
  createTodoValidation,
  getTodoValidation,
  deleteTodoValidation,
  updateTodoValidation,
} = require('./validation')
const queries = require('./queries')

router.get('/', (req, res, next) => {
  try {
    queries
      .getTodos()
      .then((todos) => res.json(todos))
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validate(getTodoValidation), (req, res, next) => {
  try {
    const { id } = req.params
    queries
      .getTodoById(id)
      .then((todo) => {
        if (todo) {
          return res.json(todo)
        }
        next(`Todo with id: ${id} does not exist`)
      })
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
})

router.post('/', validate(createTodoValidation), (req, res, next) => {
  try {
    const { title } = req.body
    queries
      .createTodo(title)
      .then((todo) => res.json(todo[0]))
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validate(deleteTodoValidation), (req, res, next) => {
  try {
    const { id } = req.params
    queries
      .deleteTodoById(id)
      .then((todo) => {
        if (todo[0]) {
          return res.json(todo[0])
        }
        next(`Todo with id: ${id} does not exist`)
      })
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
})

router.put('/:id', validate(updateTodoValidation), (req, res, next) => {
  try {
    const { id } = req.params
    const { title } = req.body
    queries
      .updateTodoById(id, { title })
      .then((todo) => {
        if (todo[0]) {
          return res.json(todo[0])
        }
        next(`Todo with id: ${id} does not exist`)
      })
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
})

module.exports = router
