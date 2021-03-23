exports.up = function (knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id')

    table.string('title').notNullable()

    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todos')
}
