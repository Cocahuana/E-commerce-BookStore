const axios = require('axios');
require('dotenv').config();
const { MY_SECRET } = process.env;
const { User } = require('../db');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const registerUser = async (req, res, next) => {
	const { email, password, username } = req.body;
	try {
		const alreadyExistsEmail = await User.findAll({
			where: { email: email },
		});
		const alreadyExistsUsername = await User.findAll({
			where: { username: username },
		});

		if (alreadyExistsEmail.length) {
			res.status(400).send('Email already registered');
			return;
		}
		if (alreadyExistsUsername.length) {
			res.status(400).send('That Username is already registered');
			return;
		}
		let hashedPassword = crypto
			.createHash('md5')
			.update(password)
			.digest('hex');

		const newUser = await User.create({
			email: email,
			password: hashedPassword,
			username: username,
		});
		res.status(200).send('User created succesfully!');
	} catch (err) {
		next(err);
	}
};

const userLogin = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		let hashedPassword = crypto
			.createHash('md5')
			.update(password)
			.digest('hex');
		let userCheck = await User.findOne({
			where: {
				[Op.or]: [{ username: username }, { email: username }],
			},
		});
		//Habría que filtrar la password para que no se mande al front, caso contrario alguien mediante los estados podrías verlo y des-hashearlo
		if (!userCheck)
			return res.status(400).send('Email or password does not match!');
		else if (userCheck.password !== hashedPassword)
			return res.status(400).send('Email or password does not match!');
		else {
			const jwtToken = jwt.sign(
				{
					//token creation
					id: userCheck.id,
					email: userCheck.email,
					status: userCheck.status,
				},
				MY_SECRET,
				{ expiresIn: '12h' }
			);
			// When username and password are both correct, we send to the actions the token for authentication and the status
			// Status means whick role have just Sign in.
			res.status(200).json({ token: jwtToken, status: userCheck.status });
		}
	} catch (e) {
		next(e);
	}
};

const searchUserByUsername = async (req, res, next) => {
	let { username } = req.params;
	try {
		username = `%${username}%`;
		let userCheck = await User.findOne({
			where: {
				username: {
					[Op.iLike]: username,
				},
			},
		});
		if (userCheck) res.json(userCheck);
		else res.status(400).json({ message: 'User has not been found' });
	} catch (e) {
		next(e);
	}
};

module.exports = { registerUser, userLogin, searchUserByUsername };
