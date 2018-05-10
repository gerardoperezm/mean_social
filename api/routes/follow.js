'use strict';

const express = require('express');
const FollowController = require('../controllers/follow')
const AuthMiddleware = require('../middlewares/auth');

var api = express.Router();

api.get('/following/:id?/:page?', AuthMiddleware.isLoggedIn, FollowController.browse);
api.get('/followers/:id?/:page?', AuthMiddleware.isLoggedIn, FollowController.read);
api.post('/', AuthMiddleware.isLoggedIn, FollowController.add);
api.delete('/:id', AuthMiddleware.isLoggedIn, FollowController.drop);

module.exports = api;