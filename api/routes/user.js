'use strict';

const express = require('express');
const multipaty = require('connect-multiparty');
const UserController = require('../controllers/user')
const AuthMiddleware = require('../middlewares/auth');
const AvatarMiddleware = multipaty({ uploadDir: './uploads/avatars' });

var api = express.Router();

api.get('/:page?', AuthMiddleware.isLoggedIn, UserController.browse);
api.get('/:id', AuthMiddleware.isLoggedIn, UserController.read);
api.put('/:id', AuthMiddleware.isLoggedIn, UserController.edit);
api.get('/avatar/:image', UserController.get_avatar);
api.post('/avatar/:id', [AuthMiddleware.isLoggedIn, AvatarMiddleware], UserController.add_avatar);

module.exports = api;