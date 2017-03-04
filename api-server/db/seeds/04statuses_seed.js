
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('statuses').insert([
        {title: 'Pending'},
        {title: 'In Progress'},
        {title: 'Completed'},
        {title: 'Cancelled'}
      ]);
    });
};
