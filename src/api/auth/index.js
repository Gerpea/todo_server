const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { StatusCodes } = require('http-status-codes')
const queries = require('./queries')
const { loginValidation } = require('./validation')
const { APP_SECRET } = require('../../config')

router.post('/register', validate(registerValidation), (req, res) => {
  try {
    const { username, password } = req.body
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        next(error)
      }
      queries
        .createUser(username, hashedPassword)
        .then((user) => {
          res.json(user)
        })
        .catch(next)
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', validate(loginValidation), (req, res) => {
  try {
    const { username, password } = req.body
    queries
      .getUserByUsername(username)
      .then(async (user) => {
        if (!user) {
          return res.status(StatusCodes.NOT_FOUND).json('User not found')
        }

        const isMatch = await bcrypt.compare(password, user.password).catch(next)
        if (isMatch) {
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
        } else {
          next({ status: StatusCodes.FORBIDDEN, message: 'Incorrect password' })
        }
      })
      .catch(next)
  } catch (error) {
    next(error)
  }
})

router.get('/logout', validate(loginValidation), (req, res) => {
  try {
    req.logout()
  } catch (error) {
    next(error)
  }
})

module.exports = router
