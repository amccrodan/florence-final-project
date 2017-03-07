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
  router.post('/'), (req, res) => {
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
