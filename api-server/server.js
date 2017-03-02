"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const jwt         = require('jsonwebtoken');


app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const bedRoutes = require("./routes/beds");
const nurseRoutes = require("./routes/nurses");
const patientRoutes = require("./routes/patients");
const requestRoutes = require("./routes/requests");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
  next();
});
// Mount all resource routes
app.use("/api/authenticate", requestRoutes(knex));
app.use("/api/beds", bedRoutes(knex));
app.use("/api/nurses", nurseRoutes(knex));
app.use("/api/patients", patientRoutes(knex));
app.use("/api/requests", requestRoutes(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
