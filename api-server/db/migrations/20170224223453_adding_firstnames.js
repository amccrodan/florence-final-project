
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('nurses', function(t) {
            t.dropColumn('name');
            t.string('first_name').notNull();
            t.string('last_name').notNull();
        }),
        knex.schema.table('patients', function(t) {
            t.dropColumn('name');
            t.string('first_name').notNull();
            t.string('last_name').notNull();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('nurses', function(t) {
            t.dropColumn('first_name');
            t.dropColumn('last_name');
            t.string('name');
        }),
        knex.schema.table('patients', function(t) {
            t.dropColumn('first_name');
            t.dropColumn('last_name');
            t.string('name');
        })
    ]);
};
