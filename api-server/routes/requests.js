"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Get all requests
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("requests")
      .then((results) => {
        res.json(results);
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
    knex
      .select("status")
      .from("requests")
      .where("id", req.params.id)
      .update("status", req.params.status)
      .then((results) => {
        res.json(results);
      });
  });
}