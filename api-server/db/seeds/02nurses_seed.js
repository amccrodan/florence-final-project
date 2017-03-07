const saltRounds = 10;
const myPlaintextPassword = '1234';

exports.seed = function(knex, Promise) {

  let passwordHash = '$2a$10$BWf4o77OrKu9UTAgq9mQm.kdi5HWdT8Bbc6XBe/NlcncSAVvTUvri';
  // Deletes ALL existing entries
  return knex('nurses').del()
    .then(function () {
      // Inserts seed entries
      return knex('nurses').insert([
        {first_name: 'Joy', last_name: 'McCrodan', active: true, image: 'http://localhost:8080/images/nurses/1.jpg', password: passwordHash, is_nurse: true},
        {first_name: 'Annie', last_name: 'Rademaker', active: false, image: 'http://localhost:8080/images/nurses/5.jpg', password: passwordHash},
        {first_name: 'Julia', last_name: 'Wong', active: false, image: 'http://localhost:8080/images/nurses/6.jpg', password: passwordHash, is_nurse: true},
        {first_name: 'Emily', last_name: 'Bamford', active: true, image: 'http://localhost:8080/images/nurses/7.jpg', password: passwordHash},
        {first_name: 'Clara', last_name: 'Barton', active: true, image: 'http://localhost:8080/images/nurses/8.jpg', password: passwordHash, is_nurse: true},
        {first_name: 'Joe', last_name: 'Deltorres', active: true, image: 'http://localhost:8080/images/nurses/2.jpg', password: passwordHash, is_nurse: true},
        {first_name: 'Trey', last_name: 'Forsberg', active: true, image: 'http://localhost:8080/images/nurses/3.jpg', password: passwordHash, is_nurse: true},
        {first_name: 'Parker', last_name: 'Stark', active: true, image: 'http://localhost:8080/images/nurses/4.jpg', password: passwordHash}
      ]);
    });
};
