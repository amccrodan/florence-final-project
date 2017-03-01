"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Get all requests
  router.get("/", (req, res) => {
    knex
      .select("requests.id as request_id", "requests.bed_id", "patients.id as patient_id", "nurse_id", "status_id", "request_type_id", "patients.first_name", "patients.last_name")
      .from("requests")
      .join("patients", function(){
        this.on('patients.id', '=', 'requests.patient_id')
      })
      .then((results) => {
        res.json(results);
    });
  });

  //Create a new request
  router.post("/", (req, res) => {
    knex("requests").insert({
      bed_id: req.body.bed_id,
      patient_id: req.body.patient_id,
      status_id: 1,
      request_type_id: req.body.request_type_id,
      description: req.body.description
    }).returning('id')
      .then((results) => {
        res.status(200).send(results);
    }).catch(function(err) {
        console.error(err);
    });
  });

  //Get a specific request by id
  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("requests")
      .where("id", req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  //Update a request status ie. pending -> complete
  router.put("/:id", (req, res) => {
    console.log(req.body);
    knex('requests')
      .where("id", req.body.request_id)
      .update("status_id", req.body.status_id)
      .then((results) => {
        res.json(results);
      }).catch(function(err) {
          console.error(err);
      });
  });
  return router;
}
