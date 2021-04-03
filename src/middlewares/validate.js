const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes')
const { ErrorHandler } = require('../utils/error')

const validate = (checks) => [
  ...checks,
  (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

    throw new ErrorHandler(StatusCodes.UNPROCESSABLE_ENTITY, errors)
  },
]

module.exports = {
  validate,
}
