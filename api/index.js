'use strict';

const app = require('./app');
const port = 3800;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gerardo:P3r3z*@development-fstz3.mongodb.net/mean_social').then(
	() => {
		console.log('La conexión a la base de datos fue exitosa.');

		app.listen(port, () => {
			console.log('Servidor corriendo en http://localhost:' + port)
		});
	},
	(err) => {
		console.log(err);
	}
);