'use strict';

const mongoose = require('mongoose');

var FollowSchema = mongoose.Schema({
	user: { type: mongoose.Schema.ObjectId, ref: 'User' },
	followed: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Follow', FollowSchema);