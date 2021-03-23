const { checkSchema } = require('express-validator')
const queries = require('./queries')

module.exports = {
  createTodoValidation: checkSchema({
    title: {
      in: ['body'],
      isString: {
        errorMessage: 'title should be a string',
      },
    },
    done: {
      in: ['body'],
      optional: true,
      isBoolean: {
        errorMessage: 'done should be a boolean',
      },
    },
    parent_id: {
      in: ['body'],
      optional: true,
      isInt: {
        errorMessage: 'parent_id should be an integer',
        bail: true,
      },
      custom: {
        options: (value) => {
          return queries.getTodoById(value).then((todo) => {
            if (!todo) {
              return Promise.reject(`todo with id: ${value} does not exist`)
            } else {
              return Promise.resolve(true)
            }
          })
        },
      },
    },
  }),
  getTodoValidation: checkSchema({
    id: {
      in: ['params'],
      isInt: {
        errorMessage: 'id should be an integer',
      },
    },
  }),
  deleteTodoValidation: checkSchema({
    id: {
      in: ['params'],
      isInt: {
        errorMessage: 'id should be an integer',
      },
    },
  }),
  updateTodoValidation: checkSchema({
    id: {
      in: ['params'],
      isInt: {
        errorMessage: 'id should be an integer',
      },
    },
    title: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'title should be a string',
      },
    },
    done: {
      in: ['body'],
      optional: true,
      isBoolean: {
        errorMessage: 'done should be a boolean',
      },
    },
    parent_id: {
      in: ['body'],
      optional: true,
      isInt: {
        errorMessage: 'parent_id should be an integer',
        bail: true,
      },
      custom: {
        options: (value) => {
          return queries.getTodoById(value).then((todo) => {
            if (!todo) {
              return Promise.reject(`todo with id: ${value} does not exist`)
            } else {
              return Promise.resolve(true)
            }
          })
        },
      },
    },
  }),
}
