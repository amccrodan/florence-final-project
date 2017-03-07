'use strict';

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (knex) => {

  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('nurses')
      .then((results) => {
        res.json(results);
      });
  });

  router.post('/', (req, res) => {
    let hashedPass;
    if (!req.body.password) {
      hashedPass = null
    } else {
      hashedPass = bcrypt.hashSync(req.body.password, saltRounds);
    }
    knex('nurses').insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      image: req.body.image,
      is_nurse: req.body.is_nurse,
      password: hashedPass
    })
    .then((results) => {
      res.json({
        success: true,
        message: 'Inserted into database!',
      });
    })
    .catch((error) => {
      res.json({
        error: error.name
      })
    })
  });

  router.get('/:id', (req, res) => {
    knex
      .select('*')
      .from('nurses')
      .where('id', req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.put('/:id', (req, res) => {

    function findNurseStatus(){
      return knex
        .select('active')
        .from('nurses')
        .where('id', req.params.id)
    }

    const status = findNurseStatus();

    if (status.active){
      status
      .update('active', false)
      .then((results) => {
        res.json(results);
      });
    }else{
      status
      .update('active', true)
      .then((results) => {
        res.json(results);
      });
    }
  });
  return router;
}
