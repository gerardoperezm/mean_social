'use strict';

const express = require('express');
const FollowController = require('../controllers/follow')
const AuthMiddleware = require('../middlewares/auth');

var api = express.Router();

// api.get('/all/:page?', AuthMiddleware.isLoggedIn, UserController.browse);
// api.get('/:id', AuthMiddleware.isLoggedIn, UserController.read);
// api.put('/:id', AuthMiddleware.isLoggedIn, UserController.edit);
// api.get('/avatar/:image', UserController.get_avatar);
// api.post('/avatar/:id', [AuthMiddleware.isLoggedIn, AvatarMiddleware], UserController.add_avatar);

api.get('/prueba', AuthMiddleware.isLoggedIn, FollowController.prueba);

module.exports = api;