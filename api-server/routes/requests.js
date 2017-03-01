"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Get all requests
  router.get("/", (req, res) => {
    knex
      .select("requests.id as request_id", "requests.bed_id", "patients.id as patient_id", "requests.nurse_id AS nurse_id", "status_id", "request_type_id", "patients.first_name", "patients.last_name", "nurses.image", "nurses.first_name AS nurse_first_name", "nurses.last_name AS nurse_last_name")
      .from("requests")
      .join("patients", function(){
        this.on('patients.id', '=', 'requests.patient_id')
      })
      .leftJoin("nurses", "requests.nurse_id", "nurses.id")
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
      request_type: req.body.request_type,
      description: req.body.description
    })
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
    knex
      .select("status")
      .from("requests")
      .where("id", req.params.id)
      .update("status", req.body.status)
      .then((results) => {
        res.json(results);
      });
  });
  return router;
}