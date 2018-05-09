'use strict';

// const fs = require('fs');
// const path = require('path');
const mongoosePagination = require('mongoose-pagination');

const User = require('../models/user');
const Follow = require('../models/follow');

function prueba(req, res) {
	res.status(200).send({ message: 'Hola desde followers' });
}

/**
  * Browse
  * Returns a list of n paginated users
  */
// function browse(req, res) {
// 	var user_id = req.user.sub;

// 	var page = req.params.page ? req.params.page : 1;
// 	var items = 10;

// 	User.find().sort('_id').paginate(page, items, (err, data, total) => {
// 		if (err) return res.status(500).send({ message: 'Error en la peticion', error: err });
// 		if (!data) return res.status(404).send({ message: 'No hay usuarios disponibles' });

// 		return res.status(200).send({ users: data, total: total, pages: Math.ceil(total / items) });
// 	});
// }

// module.exports = { browse };

module.exports = { prueba };

