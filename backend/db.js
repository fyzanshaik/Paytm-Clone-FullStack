const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;
mongoose
	.connect(url)
	.then(() => {
		console.log('Mongo Database connected succesfully');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

module.exports = mongoose.connection;
