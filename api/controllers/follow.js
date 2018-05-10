 'use strict';

const mongoosePagination = require('mongoose-pagination');

const User = require('../models/user');
const Follow = require('../models/follow');

/**
  * Browse
  * List all followed users
  */
function browse(req, res) {
	var user_id = req.user.sub;
	var page = 1;
	var items = 4;

	var paginated = true;

	if (req.params.id && req.params.page) {
		user_id = req.params.id;
		page = req.params.page;
	} else if (req.params.id) {
		// page instead of user id
		if (/^[0-9]+$/.test(req.params.id)) {
			page = req.params.id;
		} else {
			user_id = req.params.id;
			paginated = false;
		}
	} else {
		paginated = false;
	}

	if (paginated) {

		Follow.find({ user: user_id }).populate('followed').paginate(page, items, (err, data, total) => {
			if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
			if (!data) return res.status(404).send({ message: 'No se sigue a ningun usuario' });
			return res.status(200).send({ follows: data, total: total, pages: Math.ceil(total / items) });
		});

	} else {

		Follow.find({ user: user_id }).populate('followed').exec((err, data) => {
			if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
			if (!data) return res.status(404).send({ message: 'No se sigue a ningun usuario' });
			return res.status(200).send({ follows: data });
		});

	}
}

/**
  * Read
  * List followers for a particular user
  */
function read(req, res) {
	var user_id = req.user.sub;
	var page = 1;
	var items = 4;

	var paginated = true;

	if (req.params.id && req.params.page) {
		user_id = req.params.id;
		page = req.params.page;
	} else if (req.params.id) {
		// page instead of user id
		if (/^[0-9]+$/.test(req.params.id)) {
			page = req.params.id;
		} else {
			user_id = req.params.id;
			paginated = false;
		}
	} else {
		paginated = false;
	}

	if (paginated) {

		Follow.find({ followed: user_id }).populate('user').paginate(page, items, (err, data, total) => {
			if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
			if (!data) return res.status(404).send({ message: 'No se sigue a ningun usuario' });
			return res.status(200).send({ follows: data, total: total, pages: Math.ceil(total / items) });
		});

	} else {

		Follow.find({ followed: user_id }).populate('user').exec((err, data) => {
			if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
			if (!data) return res.status(404).send({ message: 'No se sigue a ningun usuario' });
			return res.status(200).send({ follows: data });
		});

	}
}

/**
  * Add
  * Add a new follow
  */
function add(req, res) {
	var params = req.body;
 	var follow = new Follow();

 	follow.user = req.user.sub;
 	follow.followed = params.followed;

 	follow.save((err, data) => {
 		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
 		if (!data) return res.status(404).send({ message: 'No se pudo seguir al usuario' });
 		return res.status(200).send({ follow: data });
 	});
}

/**
  * Drop
  * Unfollow user by id
  */
function drop(req, res) {
	var user_id = req.user.sub;
	var follow_id = req.params.id; 

	Follow.find({ 'user': user_id, 'followed': follow_id }).remove((err) => {
		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
		return res.status(200).send({ message: 'Has dejado de seguir al usuario' });
	});
}

module.exports = {  browse, read, add, drop };

