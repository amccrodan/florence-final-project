exports.seed = function(knex, Promise) {
    // Inserts seed entries
    return ( 
      knex('beds').where('id', '=', 1).update({patient_id: 1})
      .then(function() {
        return knex('beds').where('id', '=', 2).update({patient_id: 2})
      .then(function() {
        return knex('beds').where('id', '=', 4).update({patient_id: 4})
      .then(function() {
        return knex('beds').where('id', '=', 5).update({patient_id: 5})
      .then(function() {
        return knex('beds').where('id', '=', 6).update({patient_id: 3})
      .then(function() {
        return knex('beds').where('id', '=', 7).update({patient_id: 10})
      .then(function() {
        return knex('beds').where('id', '=', 8).update({patient_id: 7})
      .then(function() {
        return knex('beds').where('id', '=', 9).update({patient_id: 13})
      .then(function() {
        return knex('beds').where('id', '=', 10).update({patient_id: 19})
      .then(function() {
        return knex('beds').where('id', '=', 11).update({patient_id: 20})
      .then(function() {
        return knex('beds').where('id', '=', 12).update({patient_id: 14})
      .then(function() {
        return knex('beds').where('id', '=', 13).update({patient_id: 12})
      .then(function() {
        return knex('beds').where('id', '=', 14).update({patient_id: 8})
      .then(function() {
        return knex('beds').where('id', '=', 15).update({patient_id: 17})
      .then(function() {
        return knex('beds').where('id', '=', 16).update({patient_id: 18})
      .then(function() {
        return knex('beds').where('id', '=', 17).update({patient_id: 16})
      .then(function() {
        return knex('beds').where('id', '=', 18).update({patient_id: 15})
      .then(function() {
        return knex('beds').where('id', '=', 19).update({patient_id: 11})
      .then(function() {
        return knex('beds').where('id', '=', 21).update({patient_id: 6})
      .then(function() {
        return knex('beds').where('id', '=', 23).update({patient_id: 9})

      })
      })
      })
      })
      })
      })
      })
      })
      })
      })
      })
      })  
      })
      })
      })
      })
      })
      }) 
      })

   );
}