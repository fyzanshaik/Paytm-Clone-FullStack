const mongoose = require('mongoose');
const url = 'mongodb+srv://fyzanshaik:faizanshaik12@cluster0.1dobvnk.mongodb.net/';
mongoose
	.connect(url)
	.then(() => {
		console.log('Mongo Database connected succesfully');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

module.exports = mongoose.connection;
