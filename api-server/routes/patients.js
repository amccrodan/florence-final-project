"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Create a new patient
  router.post("/"), (req, res) => {
    knex("patients").insert({
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
  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("patients")
      .where('id', req.params.id)
      .then((results) => {
        res.json(results);
    });
  });
  return router;
}