'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const jwt         = require('jsonwebtoken');
const cookieSession = require('cookie-session');
const bedRoutes = require('./routes/beds');
const nurseRoutes = require('./routes/nurses');
const patientRoutes = require('./routes/patients');
const requestRoutes = require('./routes/requests');
const authenticateRoutes = require('./routes/authenticate');

app.use(cookieSession({
  name: 'session',
  secret: 'SuperSecureSecret'
}));
app.set('superSecret', 'secret');

app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/beds', bedRoutes(knex));
app.use('/api/nurses', nurseRoutes(knex));
app.use('/api/patients', patientRoutes(knex));
app.use('/api/requests', requestRoutes(knex));
app.use('/api/authenticate', authenticateRoutes(knex, jwt, app));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  next();
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
