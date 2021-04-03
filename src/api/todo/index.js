const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const { StatusCodes } = require('../../utils')

const { validate } = require('../../middlewares/validate')
const {
  createTodoValidation,
  getTodoValidation,
  deleteTodoValidation,
  updateTodoValidation,
} = require('./validation')
const queries = require('./queries')
const { ErrorHandler } = require('../../utils/error')

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const todos = awaitqueries.getTodos()
    res.json(todos)
  })
)

router.get(
  '/:id',
  validate(getTodoValidation),
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const todo = await queries.getTodoById(id)

    if (todo) {
      res.json(todo)
    } else {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, `Todo with id: ${id} does not exist`)
    }
  })
)

router.post(
  '/',
  validate(createTodoValidation),
  asyncHandler(async (req, res) => {
    const { title, done, parent_id } = req.body
    const createdTodo = await queries.createTodo(title, done, parent_id)
    res.json(createdTodo[0])
  })
)

router.delete(
  '/:id',
  validate(deleteTodoValidation),
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletedTodo = await queries.deleteTodoById(id)

    if (deletedTodo[0]) {
      res.json(deletedTodo[0])
    } else {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, `Todo with id: ${id} does not exist`)
    }
  })
)

router.put(
  '/:id',
  validate(updateTodoValidation),
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, done, parent_id } = req.body
    const todo = await queries.updateTodoById(id, { title, done, parent_id })
    return res.json(todo[0])
  })
)

module.exports = router
