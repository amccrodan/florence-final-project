
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beds').del()
    .then(function () {
      // Inserts seed entries
      return knex('beds').insert([
        {id: 1, room_id: 1},
        {id: 2, room_id: 2},
        {id: 3, room_id: 2},
        {id: 4, room_id: 3},
        {id: 5, room_id: 4},
        {id: 6, room_id: 5},
        {id: 7, room_id: 5},
        {id: 8, room_id: 5},
        {id: 9, room_id: 6},
        {id: 10, room_id: 7},
        {id: 11, room_id: 8},
        {id: 12, room_id: 9},
        {id: 13, room_id: 10},
        {id: 14, room_id: 11},
        {id: 15, room_id: 12},
        {id: 16, room_id: 13},
        {id: 17, room_id: 14},
        {id: 18, room_id: 15},
        {id: 19, room_id: 15},
        {id: 20, room_id: 10},
        {id: 21, room_id: 12},
        {id: 22, room_id: 8},
        {id: 23, room_id: 7},
        {id: 24, room_id: 7},
        {id: 25, room_id: 10}
      ]);
    });
};
