exports.up = function up(knex) {
  return knex.schema.createTable('uploads', (table) => {
    table.increments('id').primary();
    table.integer('camp_id').references('id').inTable('camps');
    table.string('path');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('uploads');
};
