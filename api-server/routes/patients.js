"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

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