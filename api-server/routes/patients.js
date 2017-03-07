'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/', (req, res) => {
    knex
      .select('patients.id',
      'patients.first_name',
      'patients.last_name',
      'patients.bed_id',
      'beds.room_id')
      .orderBy('patients.id')
      .from('patients')
      .join('beds', 'patients.bed_id', 'beds.id')
      .then((results) => {
        res.json(results);
    });
  });
  // Create a new patient
  router.post('/', (req, res) => {

    console.log('req.body', req.body);
    knex('patients').insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      doctor: req.body.doctor,
      emergency_contact_name: req.body.emergency_contact_name,
      emergency_contact_number: req.body.emergency_contact_number,
      allergies: req.body.allergies,
      previous_injuries: req.body.previous_injuries,
      recent_illness: req.body.recent_illness,
      notes: req.body.notes,
      bed_id: req.body.bed_id,
      nurse_id: req.body.nurse_id
    }, 'id')
    .then((results) => {
      knex('beds')
      .where('id', '=', req.body.bed_id)
      .update({
        patient_id: results[0]
      })
      .then((results) => {
        res.json({
          success: true,
          message: 'Inserted into database!',
        });
      })
    })
    .catch((error) => {
      // error.name just sends string 'error' if something goes wrong
      res.json({
        error: error.name
      })
    })
  })

  //Get a single patient by id
  router.get('/:id', (req, res) => {
    knex
      .select('*')
      .from('patients')
      .where('id', req.params.id)
      .then((results) => {
        res.json(results);
    });
  });
  return router;
}
