const express = require('express')
const router = express.Router()

const { validate } = require('../../middlewares/validate')
const { createTodoValidation } = require('./validation')
const queries = require('./queries')

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

module.exports = router
