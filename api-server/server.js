"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');


app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));

const bedRoutes = require("./routes/beds");
const nurseRoutes = require("./routes/nurses");
const patientRoutes = require("./routes/patients");
const requestRoutes = require("./routes/requests");


// Mount all resource routes
app.use("/api/beds", bedRoutes(knex));

app.use("/api/nurses", nurseRoutes(knex));

app.use("/api/patients", patientRoutes(knex));

app.use("/api/requests", requestRoutes(knex));