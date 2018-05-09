'use strict';

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

function show(req, res) {
	// TODO
	res.status(200);
	res.send({ message: 'hola mundo' });
}

function create(req, res) {
	var params = req.body;
	var user = new User();

	if (params.name && params.surname && params.nick && params.email && params.password) {
		user.name = params.name;
		user.surname = params.surname;
		user.nick = params.nick.toLowerCase();
		user.email = params.email.toLowerCase();
		user.role = 'ROLE_USER';
		user.image = null;
		bcrypt.hash(params.password, null, null, (err, hash) => {
			user.password = hash;
			user.save((err, data) => {
				if (err) return res.status(500).send({ message: 'Error al guardar el usuario: ', error: err });
				if (data) return res.status(200).send({ user: data });
				return res.status(404).send({ message: 'No se ha registrado el usuario' });
			});
		});
	} else {
		return res.status(200).send({ message: 'Envia todos los campos necesarios.' });
	}
}

module.exports = { show, create };