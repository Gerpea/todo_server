const { onUpdateTrigger } = require('../knexfile')

exports.up = function (knex) {
  return knex.schema
    .createTable('todos', (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.boolean('done').defaultTo(false)
      table
        .biginteger('parent_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('todos')
        .onDelete('CASCADE')
        .index()

      table.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('todos')))
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todos')
}
