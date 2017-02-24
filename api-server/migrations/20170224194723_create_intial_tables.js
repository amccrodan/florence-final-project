
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('nurses', function(t) {
            t.increments('id').primary();
            t.string('name').notNull();
            t.text('image').notNull();
            t.boolean('active').default(false).notNull();
            t.integer('password').notNull();
        }),
        knex.schema.createTable('statuses', function(t) {
            t.increments('id').primary();
            t.string('title').notNull();
        }),
        knex.schema.createTable('request_types', function(t) {
            t.increments('id').primary();
            t.string('type').notNull();
        }),
        knex.schema.createTable('rooms', function(t) {
            t.increments('id').primary();
        }),
        knex.schema.createTable('beds', function(t) {
            t.increments('id').primary();
            t.integer('patient_id');
            t.foreign('patient_id').references('patients.id');
            t.integer('room_id').notNull();
            t.foreign('room_id').references('rooms.id');
        }),
        knex.schema.createTable('patients', function(t) {
            t.increments('id').primary();
            t.string('name').notNull();
            t.string('medical_history').notNull();
            t.integer('bed_id').notNull();
            t.foreign('bed_id').references('beds.id');
            t.timestamps();
        }),
        knex.schema.createTable('requests', function(t) {
            t.increments('id').primary();
            t.integer('bed_id').notNull();
            t.foreign('bed_id').references('beds.id');
            t.integer('patient_id');
            t.foreign('patient_id').references('patients.id');
            t.integer('nurse_id');
            t.foreign('nurse_id').references('nurses.id');
            t.integer('status_id');
            t.foreign('status_id').references('statuses.id');
            t.integer('request_type_id');
            t.foreign('request_type_id').references('request_types.id');
            t.string('description');
            t.timestamps();
        })
    ])
}

exports.down = function(knex, Promise) {
    return Promise.all([

    ])
}