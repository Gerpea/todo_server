const { validationResult } = require('express-validator')

const validate = (checks) => [
  ...checks,
  (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

    next({ errors: extractedErrors })
  },
]

module.exports = {
  validate,
}
