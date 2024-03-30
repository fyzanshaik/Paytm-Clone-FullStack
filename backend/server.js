const express = require('express');
const bp = require('body-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const userRoute = require('./routes/userRoute');
const accountRoute = require('./routes/accountRoute');
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Get request was made');
});

app.use('/api/v1/', userRoute);
app.use('/api/v1/account', accountRoute);

app.listen(PORT, () => {
	console.log(`Server has started running on PORT: ${PORT}`);
});
