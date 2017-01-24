exports.up = function up(knex) {
  return knex.schema.createTable('places', (table) => {
    table.increments('id').primary();
    table.text('name');
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('places');
};
