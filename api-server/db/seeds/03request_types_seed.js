
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('request_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('request_types').insert([
        {id: 1, type: 'Food'},
        {id: 2, type: 'Bathroom'},
        {id: 3, type: 'Medicine'},
        {id: 4, type: 'Other'},
        {id: 5, type: 'Emergency'}
      ]);
    });
};
