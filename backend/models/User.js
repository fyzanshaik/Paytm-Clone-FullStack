const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
	},
	password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;