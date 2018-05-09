'use strict';

const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	name: String,
	surname: String,
	nick: { type: String, unique: true },
	email: { type: String, unique: true },
	password: String,
	role: String,
	image: String
});

module.exports = mongoose.model('User', UserSchema);