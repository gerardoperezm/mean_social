'use strict';

const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');

const jwt = require('../services/jwt')

function register(req, res) {
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

function login(req, res) {
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({ email: email }, (err, user) => {
		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
		if (!user) return res.status(404).send({ message: 'El email no esta registrado' });
		bcrypt.compare(password, user.password, (err, check) => {
			if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
			if (!check) return res.status(404).send({ message: 'Contraseña incorrecta' });

			if (params.gettoken) {
				// Generate and return token
				return res.status(200).send({ token: jwt.createToken(user) });
			} else {
				// Don't return password
				user.password = undefined;
				return res.status(200).send({ user: user });
			}
		});
	});
}

module.exports = { register, login };