exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('requests', function(t) {
        t.string('nurse_log');
      })
   ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('requests', function(t) {
        t.dropColumn('nurse_log');
      })
   ]);
};
