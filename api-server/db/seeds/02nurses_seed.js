const saltRounds = 10;
const myPlaintextPassword = '1234';

exports.seed = function(knex, Promise) {

  let passwordHash = '$2a$10$BWf4o77OrKu9UTAgq9mQm.kdi5HWdT8Bbc6XBe/NlcncSAVvTUvri';
  // Deletes ALL existing entries
  return knex('nurses').del()
    .then(function () {
      // Inserts seed entries
      return knex('nurses').insert([
        {id: 1, first_name: 'Joy', last_name: 'McCrodan', active: true, image: '1.jpg', password: passwordHash, is_nurse: true},
        {id: 2, first_name: 'Annie', last_name: 'Rademaker', active: false, image: '5.jpg', password: passwordHash},
        {id: 3, first_name: 'Julia', last_name: 'Wong', active: false, image: '6.jpg', password: passwordHash, is_nurse: true},
        {id: 4, first_name: 'Emily', last_name: 'Bamford', active: true, image: '7.jpg', password: passwordHash},
        {id: 5, first_name: 'Nurse', last_name: 'Master', active: true, image: '8.jpg', password: passwordHash, is_nurse: true},
        {id: 6, first_name: 'Joe', last_name: 'Delconte', active: true, image: '2.jpg', password: passwordHash, is_nurse: true},
        {id: 7, first_name: 'Trey', last_name: 'Foresberg', active: true, image: '3.jpg', password: passwordHash, is_nurse: true},
        {id: 8, first_name: 'Parker', last_name: 'Stark', active: true, image: '4.jpg', password: passwordHash}
      ]);
    });
};
