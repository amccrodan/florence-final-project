const saltRounds = 10;
const myPlaintextPassword = '1234';

exports.seed = function(knex, Promise) {

  let passwordHash = '$2a$10$BWf4o77OrKu9UTAgq9mQm.kdi5HWdT8Bbc6XBe/NlcncSAVvTUvri';
  // Deletes ALL existing entries
  return knex('nurses').del()
    .then(function () {
      // Inserts seed entries
      return knex('nurses').insert([
        {id: 1, first_name: 'joy', last_name: 'mccrodan', active: true, image: '1.jpg', password: passwordHash, is_nurse: true},
        {id: 2, first_name: 'annie', last_name: 'rademaker', active: false, image: '5.jpg', password: passwordHash},
        {id: 3, first_name: 'julia', last_name: 'wong', active: false, image: '6.jpg', password: passwordHash, is_nurse: true},
        {id: 4, first_name: 'emily', last_name: 'bamford', active: true, image: '7.jpg', password: passwordHash},
        {id: 5, first_name: 'nurse', last_name: 'master', active: true, image: '8.jpg', password: passwordHash, is_nurse: true},
        {id: 6, first_name: 'joe', last_name: 'delconte', active: true, image: '2.jpg', password: passwordHash, is_nurse: true},
        {id: 7, first_name: 'trey', last_name: 'foresberg', active: true, image: '3.jpg', password: passwordHash, is_nurse: true},
        {id: 8, first_name: 'parker', last_name: 'stark', active: true, image: '4.jpg', password: passwordHash}
      ]);
    });
};
