
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('nurses', function(t) {
          t.string('password').notNull();
        })
     ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('nurses', function(t) {
          t.dropColumn('password');
        })
     ]);
};
