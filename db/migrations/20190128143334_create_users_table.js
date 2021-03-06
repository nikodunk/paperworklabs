
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.text('uid').unique().notNullable();
    table.text('email');
    table.boolean('is_active').notNullable().defaultTo(true);
    table.text('usergroup').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
