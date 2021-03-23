const { checkSchema } = require('express-validator')

module.exports = {
  createTodoValidation: checkSchema({
    title: {
      in: ['body'],
      isString: {
        errorMessage: 'title should be a string',
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
}
