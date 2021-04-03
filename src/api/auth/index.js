const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { StatusCodes } = require('http-status-codes')
const queries = require('./queries')
const { loginValidation, registerValidation } = require('./validation')
const { APP_SECRET } = require('../../config')
const { validate } = require('../../middlewares/validate')
const { ErrorHandler } = require('../../utils/error')

router.post(
  '/register',
  validate(registerValidation),
  asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const createdUser = await queries.createUser(username, hashedPassword)
    res.json(createdUser)
  })
)

router.post(
  '/login',
  validate(loginValidation),
  asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await queries.getUserByUsername(username)
    if (!user) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'User not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new ErrorHandler(StatusCodes.UNPROCESSABLE_ENTITY, 'Incorrect password')
    } else {
      let token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        APP_SECRET,
        {
          expiresIn: '1 day',
        }
      )

      res.json({
        id: user.id,
        username: user.username,
        token: `Bearer ${token}`,
        expiresIn: 24,
      })
    }
  })
)

module.exports = router
