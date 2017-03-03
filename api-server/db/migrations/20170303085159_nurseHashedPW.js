
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('nurses', function(t) {
          t.dropColumn('password');
        })
     ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('nurses', function(t) {
          t.integer('password').notNull();
        })
     ]);
};
