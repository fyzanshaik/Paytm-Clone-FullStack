import express, { Request, Response } from 'express';
import cors from 'cors';
require('dotenv').config();
import dbConnection from './db';

import userRoute from './routes/userRoute';
import accountRoute from './routes/accountRoute';

const PORT = process.env.PORT || 3000;
if (!PORT) {
	throw new Error('PORT number is not defined');
}

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Get request was made');
});

app.use('/api/v1/', userRoute);
app.use('/api/v1/account', accountRoute);

dbConnection.on('connected', () => {
	console.log('Database connected successfully');
	app.listen(PORT, () => {
		console.log(`Server has started running on PORT: ${PORT}`);
	});
});

dbConnection.on('error', (error) => {
	console.error('Error connecting to MongoDB:', error);
});
