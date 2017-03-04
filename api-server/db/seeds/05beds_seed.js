
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beds').del()
    .then(function () {
      // Inserts seed entries
      return knex('beds').insert([
        {room_id: 1},
        {room_id: 2},
        {room_id: 2},
        {room_id: 3},
        {room_id: 4},
        {room_id: 5},
        {room_id: 5},
        {room_id: 5},
        {room_id: 6},
        {room_id: 7},
        {room_id: 8},
        {room_id: 9},
        {room_id: 10},
        {room_id: 11},
        {room_id: 12},
        {room_id: 13},
        {room_id: 14},
        {room_id: 15},
        {room_id: 15},
        {room_id: 10},
        {room_id: 12},
        {room_id: 8},
        {room_id: 7},
        {room_id: 7},
        {room_id: 10}
      ]);
    });
};
