'use strict';

const mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
	text: String,
	created_at: String,
	emmiter: { type: mongoose.Schema.ObjectID, ref: 'User', },
	receiver: { type: mongoose.Schema.ObjectID, ref: 'User', },
});

module.exports = mongoose.model('Message', MessageSchema);