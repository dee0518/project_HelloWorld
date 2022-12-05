const express = require('express');

const app = express();

const trip = require('./api/trip');

app.use(express.json({ extended: false }));

app.use('api/trip', trip);
