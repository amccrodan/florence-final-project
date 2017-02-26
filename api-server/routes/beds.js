"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Get a list of all beds when assigning room
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("beds")
      .orderBy("id")
      .then((results) => {
        res.json(results);
    });
  });

  // Get a single bed by id
  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("beds")
      .where('id', req.params.id)
      .then((results) => {
        res.json(results);
    });
  });
 return router;
}