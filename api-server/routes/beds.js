'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('beds')
      .orderBy('id')
      .then((results) => {
        res.json(results);
    });
  });

  router.get('/:id', (req, res) => {
    knex
      .select('beds.id as bed_id', 'beds.room_id', 'beds.patient_id', 'patients.nurse_id')
      .from('beds')
      .join('patients', function(){
        this.on('beds.id', '=', 'patients.bed_id')
      })
      .where('beds.id', req.params.id)
      .then((results) => {
        res.json(results);
    });
  });
 return router;
}
