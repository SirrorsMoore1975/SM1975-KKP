/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('photos', function(table) {
    table.increments('id')
    .primary();
    table.integer('user_id')
    .references('id')
    .inTable('users');
    table.integer('prefecture_id')
    .references('id')
    .inTable('prefectures')
    table.string('photo_key');
    table.varchar('description');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('photos');
};
