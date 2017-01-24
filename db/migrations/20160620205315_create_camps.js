exports.up = function up(knex) {
  return knex.schema.createTable('camps', (table) => {
    table.increments('id').primary();
    table.jsonb('name');
    table.jsonb('additional_names');
    table.jsonb('description');
    table.jsonb('location');
    table.integer('activity_id').references('id').inTable('activities');
    table.integer('place_id').references('id').inTable('places');
    table.integer('type_id').references('id').inTable('types');
    table.jsonb('published');
    table.jsonb('features');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('camps');
};
