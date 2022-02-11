const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	phone: { type: Number, unique: true, required: true },
	password: { type: String, required: true },
	state: { type: String, required: true },
	district: { type: String, required: true },
	address: { type: String, required: true },
	pin: { type: Number, required: true }
});


module.exports = mongoose.model('User', userSchema);