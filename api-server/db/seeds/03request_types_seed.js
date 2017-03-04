
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('request_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('request_types').insert([
        {type: 'Food'},
        {type: 'Bathroom'},
        {type: 'Medicine'},
        {type: 'Other'},
        {type: 'Emergency'}
      ]);
    });
};
