"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Get all requests
  router.get("/", (req, res) => {
    knex
      .select("*")
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