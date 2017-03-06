
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('patients', function(t) {
          t.dropColumn('medical_history'),
          t.string('doctor').notNull(),
          t.string('emergency_contact_name').notNull(),
          t.string('emergency_contact_number').notNull(),
          t.string('allergies').notNull(),
          t.string('previous_injuries').notNull(),
          t.string('recent_illness').notNull(),
          t.string('notes');
      })
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('patients', function(t) {
        t.string('medical_history'),
        t.dropColumn('doctor'),
        t.dropColumn('emergency_contact_name'),
        t.dropColumn('emergency_contact_number'),
        t.dropColumn('allergies'),
        t.dropColumn('previous_injuries'),
        t.dropColumn('recent_illness'),
        t.dropColumn('notes');
      })
   ]);
};
