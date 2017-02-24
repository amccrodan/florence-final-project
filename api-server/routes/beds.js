"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // Get all beds
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