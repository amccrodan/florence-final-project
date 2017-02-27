
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('nurses').del()
    .then(function () {
      // Inserts seed entries
      return knex('nurses').insert([
        {id: 1, first_name: 'Joy', last_name: 'McCrodan', active: true, image: 'example.img', password: 1234, is_nurse: true},
        {id: 2, first_name: 'Annie', last_name: 'Rademaker', active: false, image: 'example.img', password: 1234, is_nurse: true},
        {id: 3, first_name: 'Julia', last_name: 'Wong', active: false, image: 'example.img', password: 1234, is_nurse: true},
        {id: 4, first_name: 'Emily', last_name: 'Bamford', active: true, image: 'example.img', password: 1234, is_nurse: true},
        {id: 5, first_name: 'Nurse', last_name: 'Master', active: true, image: 'example.img', password: 1234, is_nurse: true},
        {id: 6, first_name: 'Joe', last_name: 'Delconte', active: true, image: 'example.img', password: 1234},
        {id: 7, first_name: 'Trey', last_name: 'Foresberg', active: true, image: 'example.img', password: 1234},
        {id: 8, first_name: 'Parker', last_name: 'Stark', active: true, image: 'example.img', password: 1234}
      ]);
    });
};
