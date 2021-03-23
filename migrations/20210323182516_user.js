const { onUpdateTrigger } = require('../knexfile')

exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id')

      table.string('username').notNullable()
      table.boolean('password').notNullable()

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('users')))
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
