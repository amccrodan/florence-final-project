
exports.up = function(knex, Promise) {
  knex.schema.tables('nurses', function(t) {
      t.boolean('is_nurses').default(false).notNull();
  })
};

exports.down = function(knex, Promise) {
  knex.schema.tables('nurses', function(t) {
      t.dropColumn('is_nurses');
  })
};
