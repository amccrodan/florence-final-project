
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {bed_id: 4, patient_id: 4, nurse_id: 1, status_id: 3, request_type_id: 2},
        {bed_id: 12, patient_id: 14, nurse_id: 5, status_id: 2, request_type_id: 4, description: 'Im lonely'},
        {bed_id: 4, patient_id: 4, status_id: 1, request_type_id: 2, description: 'Ello mate'},
        {bed_id: 1, patient_id: 1,  status_id: 1, request_type_id: 5, description: 'HALP'},
        {bed_id: 11, patient_id: 20,  status_id: 4, request_type_id: 1},
        {bed_id: 23, patient_id: 9, nurse_id: 3, status_id: 2, request_type_id: 3}
      ]);
    });
};
