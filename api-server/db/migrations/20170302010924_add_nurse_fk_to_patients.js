
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('patients', function(t) {
            t.integer('nurse_id');
            t.foreign('nurse_id').references('nurses.id');
        })
     ]);
};

exports.down = function(knex, Promise) {
     return Promise.all([
        knex.schema.table('patients', function(t) {
            t.dropColumn('nurse_id');
        })
    ]);
};
