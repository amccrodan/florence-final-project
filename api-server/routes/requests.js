'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/', (req, res) => {
    knex
      .select('requests.id as request_id',
       'request_type_id',
       'requests.bed_id',
       'requests.created_at',
       'requests.updated_at',
       'requests.description',
       'requests.nurse_id AS nurse_id',
       'patients.id as patient_id',
       'status_id',
       'patients.first_name',
       'patients.last_name',
       'patients.doctor',
       'patients.emergency_contact_name',
       'patients.emergency_contact_number',
       'patients.allergies',
       'patients.recent_illness',
       'patients.previous_injuries',
       'patients.notes',
       'nurses.image',
       'nurses.first_name AS nurse_first_name',
       'nurses.last_name AS nurse_last_name',
       'beds.room_id')
      .orderBy('requests.created_at')
      .from('requests')
      .join('patients', 'patients.id', 'requests.patient_id')
      .join('nurses', 'requests.nurse_id', 'nurses.id')
      .join('beds', 'requests.bed_id', 'beds.id')
      .then((results) => {
        res.json(results);
    });
  });

  router.post('/', (req, res) => {
    knex('requests').insert({
      bed_id: req.body.bed_id,
      patient_id: req.body.patient_id,
      status_id: 1,
      nurse_id: req.body.nurse_id,
      request_type_id: req.body.request_type_id,
      description: req.body.description,
      created_at: 'now',
      updated_at: 'now'
    }).returning('id')
      .then((results) => {
        res.status(200).send(results);
    }).catch(function(err) {
        console.error(err);
    });
  });

  router.get('/:id', (req, res) => {
    knex
      .select('*')
      .from('requests')
      .where('requests.id', req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.put('/:id', (req, res) => {
    knex('requests')
      .where('id', req.params.id)
      .update({
        'nurse_id': req.body.nurse_id,
        'status_id': req.body.status_id,
        'updated_at': 'now',
        'nurse_log': req.body.nurse_log
      })
      .then((results) => {
        res.json(results);
      }).catch(function(err) {
          console.error(err);
      });
  });
  return router;
}
