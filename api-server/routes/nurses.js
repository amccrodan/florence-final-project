"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Get a specific nurse by id
  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("nurses")
      .where("id", req.params.id)

      .then((results) => {
        res.json(results);
      });
    return router;
  });

  //Update a nurses status ie active: true -> active: false
  router.put("/:id", (req, res) => {

    function findNurse(){
      return knex
        .select("active")
        .from("nurses")
        .where("id", req.params.id)
    }

    const status = findNurse();

    if (status.active){
      findNurse()
      .update("active", false)
      .then((results) => {
        res.json(results);
      });
    }else{
      findNurse()
      .update("active", true)
      .then((results) => {
        res.json(results);
      });
    }
    return router;
  });

  router.post("/"), (req, res) => {
    knex("nurses").insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      image: req.body.image,
      active: req.body.active
      password: req.body.params
    })
    .then((results) => {
      res.json(results);
    });
    return router;
  }
}