"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("nurses")
      .where("id", req.params.id)

      .then((results) => {
        res.json(results);
      });
  });

  router.put("/:id", (req, res) => {

    function findNurse(){
      knex
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
      .update("active", false)
      .then((results) => {
        res.json(results);
      });
    }


  });

 return router;
}