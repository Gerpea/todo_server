const { checkSchema } = require('express-validator')
const queries = require('./queries')

module.exports = {
  registerValidation: checkSchema({
    username: {
      in: ['body'],
      isString: {
        errorMessage: 'title should be a string',
        bail: true,
      },
      custom: {
        options: (value) => {
          return queries.getUserByUsername(value).then((user) => {
            if (user) {
              return Promise.reject(`user with username: ${value} already exist`)
            } else {
              return Promise.resolve(true)
            }
          })
        },
      },
    },
    password: {
      in: ['body'],
      isString: {
        errorMessage: 'password should be a string',
      },
    },
  }),
  loginValidation: checkSchema({
    username: {
      in: ['body'],
      isString: {
        errorMessage: 'username should be a string',
      },
    },
    password: {
      in: ['body'],
      isString: {
        errorMessage: 'password should be a string',
      },
    },
  }),
}
