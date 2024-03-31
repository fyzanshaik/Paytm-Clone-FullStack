// const mongoose = require('mongoose');
import mongoose, { Connection } from 'mongoose';
const url: string | undefined = process.env.MONGODB_URL;
if (!url) {
	throw new Error('MongoDB URL is not provided.');
}

mongoose.connect(url).catch((error) => {
	console.error('Error connecting to MongoDB:', error);
});

const dbConnection: Connection = mongoose.connection;

export default dbConnection;
