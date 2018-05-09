'use strict';

const express = require('express');
const bodyParser = require('body-parser');

var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/follow', require('./routes/follow'));


// Export server
module.exports = app;