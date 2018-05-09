'use strict';

const express = require('express');
const UserController = require('../controllers/user')

var api = express.Router();

api.get('/', UserController.show);
api.post('/', UserController.create);

module.exports = api;