'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Create a new patient
  router.post('/'), (req, res) => {
    // ERD looks like this:
      // first_name:  'Phil',
      // last_name: 'Doe',
      // doctor: 'Dr. Abraham Kennedy',
      // emergency_contact_name: 'Ken Doe',
      // emergency_contact_number: '(123)456-7890',
      // allergies: 'Poor indentation',
      // previous_injuries: 'none',
      // recent_illness: 'Strep throat',
      // notes: 'Thinks Annie is his long lost love', -- can be null
      // bed_id: 2,
      // nurse_id: 3
    knex('patients').insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      medical_history: req.body.medical_history,
      bed_id: req.body.bed_id
    })
    .then((results) => {
      res.json(results);
    });
  }

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
