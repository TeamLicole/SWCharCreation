exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('chars', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('gender');
      table.string('species');
      table.string('alignment');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('chars'),
  ]);
};
