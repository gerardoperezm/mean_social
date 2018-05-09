'use strict';

const mongoosePagination = require('mongoose-pagination');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

function browse(req, res) {
	// var user_id = req.user.sub;

	var page = req.params.page ? req.params.page : 1;
	var items = 10;

	User.find().sort('_id').paginate(page, items, (err, data, total) => {
		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
		if (!data) return res.status(404).send({ message: 'No hay usuarios disponibles' });

		return res.status(200).send({ users: data, total: total, pages: Math.ceil(total / items) });
	});
}

function read(req, res) {
	User.findById(req.params.id, (err, data) => {
		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
		if (!data) return res.status(404).send({ message: 'El usuario no existe' });

		data.password = undefined;
		return res.status(200).send({ user: data });
	});
}

function edit(req, res) {
	return null;
}

function add(req, res) {
	return null;
}

function drop(req, res) {
	return null;
}

module.exports = { browse, read, edit, add, drop };