/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_has_prefecture', function(table) {
    table.integer('user_id')
    .references('id')
    .inTable('users')
    table.integer('prefecture_id')
    .references('id')
    .inTable('prefectures')
    table.primary(['user_id','prefecture_id']);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('user_has_prefecture');
};
