const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const { name, email, phone, password, state, district, address, pin } = req.body;
		const hashed_pass = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, phone, password: hashed_pass, state, district, address, pin });
		user.save();
		res.status(200).json({
			message: "User registered successfully."
		});
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, phone, password } = req.body;
		const user = await User.findOne({email});
		if (!user) {
			return res.status(501).json({
				message: 'Please enter a valid email or phone number.'
			});
		}
		const req_pass = await bcrypt.compare(password, user.password);
		if (!req_pass) {
			return res.status(201).json({
				message: 'Incorrect password.'
			});
		}
		const token = jwt.sign({
			data: user._id
		}, 'thisissecrettokenforlaundryserviceproject12@#');
		
		res.status(202).json({
			status: "token generated sucessfully",
			token : token
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error.'
		});
	}
});

module.exports = router;