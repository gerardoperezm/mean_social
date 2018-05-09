'use strict';

const express = require('express');
const UserController = require('../controllers/user')
const AuthMiddleware = require('../middlewares/auth');

var api = express.Router();

// api.get('/', AuthMiddleware.ensureAuth, UserController.browse);
api.get('/:page?', UserController.browse);
api.get('/:id', UserController.read);

module.exports = api;