'use strict';

const fs = require('fs');
const path = require('path'); 
const mongoosePagination = require('mongoose-pagination');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

/**
  * Browse
  * Returns a list of n paginated users
  */
function browse(req, res) {
	var user_id = req.user.sub;

	var page = req.params.page ? req.params.page : 1;
	var items = 10;

	User.find().sort('_id').paginate(page, items, (err, data, total) => {
		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
		if (!data) return res.status(404).send({ message: 'No hay usuarios disponibles' });

		return res.status(200).send({ users: data, total: total, pages: Math.ceil(total / items) });
	});
}

/**
  * Read
  * Returns a single user identified by id
  */
function read(req, res) {
	User.findById(req.params.id, (err, data) => {
		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
		if (!data) return res.status(404).send({ message: 'El usuario no existe' });

		data.password = undefined;
		return res.status(200).send({ user: data });
	});
}

/**
  * Edit
  * Update the actual logged user
  */
function edit(req, res) {
	var user_id = req.params.id;
	var update = req.body;

	// do not update password in this method
	delete update.password;

	if (user_id != req.user.sub) return res.status(500).send({ message: 'No tienes permiso para actualizar este usuario' });

	User.findByIdAndUpdate(user_id, update, {new: true}, (err, data) => {
		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
		if (!data) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
		return res.status(200).send({ user: data });
	});
}

/**
  * Get avatar
  * Get the actual avatar
  */
function get_avatar(req, res) {
	var image_file = req.params.image;
	var path_file = './uploads/avatars/' + image_file;

	fs.exists(path_file, (exists) => {
		if (!exists) return res.status(404).send({ message: 'No existe la imagen' });
		return res.status(200).sendFile(path.resolve(path_file));
	});
}

/**
  * Add avatar
  * Add picture to the actual logged user
  */
function add_avatar(req, res) {
	var img_formats = ['png', 'jpg', 'jpeg', 'git'];

	var user_id = req.params.id;
	var file_path = req.files.image.path;
	var file_name = file_path.split('\/')[2];
	var file_ext = file_name.split('\.')[1];

	if (user_id != req.user.sub) return removeAvatar(res, file_path, 'No tienes permiso para actualizar este usuario');
	if (!req.files) return res.status(500).send({ message: 'No se han subido imagenes' });
	if (img_formats.indexOf(file_ext) == -1) return removeAvatar(res, file_path, 'Extension no valida');

	User.findByIdAndUpdate(user_id, {image:file_name}, {new: true}, (err, data) => {
		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
		if (!data) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
		return res.status(200).send({ user: data });
	});

	return res.status(200).send({ message: 'Imagen actualizada correctamente' });
}

function drop(req, res) {
	return null;
}



function removeAvatar(res, path, message) {
	fs.unlink(path, (err) => {
		return res.status(200).send({ message: message, error: err });
	});
}

module.exports = { browse, read, edit, get_avatar, add_avatar, drop };



