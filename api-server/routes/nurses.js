"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Get a list of all nurses
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("nurses")
      .where("id", req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  //Create a new nurse
  router.post("/"), (req, res) => {
    knex("nurses").insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      image: req.body.image,
      active: req.body.active,
      password: req.body.params
    })
    .then((results) => {
      res.json(results);
    });
  }

  //Get a specific nurse's info when displaying who is assigned to a request
  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("nurses")
      .where("id", req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  //Update a nurses status ie active: true -> active: false
  router.put("/:id", (req, res) => {

    function findNurseStatus(){
      return knex
        .select("active")
        .from("nurses")
        .where("id", req.params.id)
    }

    const status = findNurseStatus();

    if (status.active){
      status
      .update("active", false)
      .then((results) => {
        res.json(results);
      });
    }else{
      status
      .update("active", true)
      .then((results) => {
        res.json(results);
      });
    }
  });
  return router;
}