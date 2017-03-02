
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {bed_id: 4, patient_id: 4, nurse_id: 1, status_id: 3, request_type_id: 2, created_at: 'yesterday', updated_at: 'yesterday'},
        {bed_id: 12, patient_id: 14, nurse_id: 5, status_id: 2, request_type_id: 4, description: 'Im lonely', created_at: 'now', updated_at: 'now'},
        {bed_id: 4, patient_id: 4, status_id: 1, request_type_id: 2, description: 'Ello mate', created_at: 'now', updated_at: 'now'},
        {bed_id: 1, patient_id: 1,  status_id: 1, request_type_id: 5, description: 'HALP', created_at: 'now', updated_at: 'now'},
        {bed_id: 11, patient_id: 20,  status_id: 4, request_type_id: 1, created_at: 'now', updated_at: 'now'},
        {bed_id: 23, patient_id: 9, nurse_id: 3, status_id: 2, request_type_id: 3, created_at: 'now', updated_at: 'now'}
      ]);
    });
};
