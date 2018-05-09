'use strict';

const express = require('express');
const AuthController = require('../controllers/auth')

var api = express.Router();

api.post('/register', AuthController.register);
api.post('/login', AuthController.login);

module.exports = api;