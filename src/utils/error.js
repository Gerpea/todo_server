const { StatusCodes } = require('http-status-codes')

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, res) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message = 'Internal Error' } = err
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  })
}

module.exports = {
  ErrorHandler,
  handleError,
}
