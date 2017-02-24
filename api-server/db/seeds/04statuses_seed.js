
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('statuses').insert([
        {id: 1, title: 'Pending'},
        {id: 2, title: 'In Progress'},
        {id: 3, title: 'Completed'},
        {id: 4, title: 'Cancelled'}
      ]);
    });
};
