
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('nurses', function(t) {
            t.boolean('is_nurse').default(false).notNull();
        })
     ]);
};

exports.down = function(knex, Promise) {
     return Promise.all([
        knex.schema.table('nurses', function(t) {
            t.dropColumn('is_nurse');
        })
    ]);
};
