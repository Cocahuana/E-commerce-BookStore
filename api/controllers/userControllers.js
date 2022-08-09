const axios = require('axios');
require('dotenv').config();
const { MY_SECRET } = process.env;
const { User, Books, Cart, Comment } = require('../db');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const registerUser = async (req, res, next) => {
	const { email, password, username, status } = req.body;
	try {
		const alreadyExistsMail = await User.findAll({
			where: { email: email },
		});

		if (alreadyExistsMail.length) {
			console.log('Email already registered');
			res.status(400).send('Email already registered');
			return;
		}
		const alreadyExistsUsername = await User.findAll({
			where: { username: username },
		});

		if (alreadyExistsUsername.length) {
			console.log('Username already registered');
			res.status(400).send('Username already registered');
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
			status: status,
			profile_picture:
				'https://media.istockphoto.com/vectors/man-reading-book-and-question-marks-vector-id1146072534?k=20&m=1146072534&s=612x612&w=0&h=sMqSGvSjf4rg1IjZD-6iHEJxHDHOw3ior1ZRmc-E1YQ=',
		});

		let cartToAssociate = await Cart.create();
		await cartToAssociate.setUser(newUser);

		res.json({
			message: 'User created succesfully!',
			id: newUser.id,
			email: newUser.email,
		});
	} catch (err) {
		next(err);
	}
};

const updateUser = async (req, res, next) => {
	//con esto cambias username, email, contraseña, status, id, favorites y profile pics
	let { id, password } = req.body;
	try {
		if (req.body.password) {
			let hashedPassword = crypto
				.createHash('md5')
				.update(password)
				.digest('hex');
			password = hashedPassword;
		}

		await User.update(req.body, {
			where: {
				id: id,
			},
		});

		const updatedUser = await User.findOne({
			where: {
				id: id,
			},
			attributes: { exclude: ['password'] },
		});
		res.json(updatedUser);
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

		if (!userCheck) return res.status(400).send('User not found');
		else if (userCheck.password !== hashedPassword)
			return res.status(400).send('Password does not match!');
		else if (
			userCheck.username !== username &&
			userCheck.email !== username
		)
			return res.status(400).send('Username does not match!');
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
			res.status(200).json({
				token: jwtToken,
				status: userCheck.status,
				id: userCheck.id,
				email: userCheck.email,
				username: userCheck.username,
				profile_picture: userCheck.profile_picture,
				favorites: userCheck.favorites,
				subscribed: userCheck.subscribed,
			});
		}
	} catch (e) {
		next(e);
	}
};

const addFavorite = async (req, res) => {
	let { idUser, idBook } = req.body;
	try {
		let user = await User.findByPk(idUser);

		if (user) {
			let newArray = user.favorites;
			if (!newArray.includes(idBook)) {
				newArray.push(idBook);
			} else {
				throw new Error('Invalid id');
			}

			await User.upsert({
				id: user.id,
				email: user.email,
				password: user.password,
				username: user.username,
				profile_picture: user.profile_picture,
				status: user.status,
				favorites: newArray,
			});

			return res.send('Added id');
		} else {
			throw new Error('Invalid user');
		}
	} catch (error) {
		res.status(400).json(error.message);
	}
};

const searchUserById = async (req, res, next) => {
	let { id } = req.params;
	console.log(id);
	try {
		let userCheck = await User.findByPk(id);
		console.log(userCheck);
		if (userCheck) res.json(userCheck);
		else res.status(400).json({ message: 'User has not been found' });
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

const getAllUsers = async (req, res, next) => {
	try {
		let users = await User.findAll({
			attributes: { exclude: ['password'] },
		});
		if (users) res.json(users);
		else res.status(400).json({ message: 'not users found' });
	} catch (e) {
		next(e);
	}
};

const getFavorite = async (req, res) => {
	let { idUser } = req.params;

	try {
		let user = await User.findByPk(idUser);

		if (user) {
			let response = user.favorites;
			res.send(response);
		} else {
			throw new Error('Invalid user');
		}
	} catch (error) {
		res.status(400).json(error.message);
	}
};

const getComments = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await Comment.findAll({
			where: { UserId: id },
		});
		res.send(data);
	} catch (error) {
		console.log(error);
	}
};

const deleteFavorite = async (req, res) => {
	let { idUser, idBook } = req.body;

	try {
		let user = await User.findByPk(idUser);

		if (user) {
			let newArray = user.favorites;
			if (newArray.includes(idBook)) {
				newArray = newArray.filter((e) => e !== idBook);
			} else {
				throw new Error('Invalid id');
			}

			await User.upsert({
				id: user.id,
				email: user.email,
				password: user.password,
				username: user.username,
				profile_picture: user.profile_picture,
				status: user.status,
				favorites: newArray,
			});

			res.send('Id removed');
		} else {
			throw new Error('Invalid user');
		}
	} catch (error) {
		res.status(400).json(error.message);
	}
};

const profilePicture = async (id, body) => {
	try {
		await User.update(body, {
			where: {
				id: id,
			},
		});
		return { message: 'Actualizado' };

		// let { image, userId } = req.body;
		// let user = await User.findByPk(userId);
		// if(user) {
		// 	let response = await User.update({
		// 		where: {
		// 		profile_picture: User.image
		// 	}
		// 	});

		// 	res.status(200).send(response);
	} catch (error) {
		// res.status(400).json(error.message);
	}
};

const googleSignIn = async (req, res, next) => {
	const { username, email, profile_picture } = req.body;
	try {
		const alreadyExists = await User.findOne({ where: { email: email } });
		if (alreadyExists) {
			const jwtToken = jwt.sign(
				{
					//token creation
					id: alreadyExists.id,
					email: alreadyExists.email,
					status: 'User',
				},
				MY_SECRET,
				{ expiresIn: '12h' }
			);

			res.status(200).json({
				token: jwtToken,
				status: 'User',
				id: alreadyExists.id,
				email: alreadyExists.email,
				username: alreadyExists.username,
				profile_picture: profile_picture,
				favorites: alreadyExists.favorites,
			});
		}
		if (!alreadyExists) {
			const create = await User.create({
				email: email,
				username: username,
				profile_picture: profile_picture,
			});
			let cartToAssociate = await Cart.create();
			await cartToAssociate.setUser(create);
			const jwtToken = jwt.sign(
				{
					//token creation
					id: create.id,
					email: create.email,
					status: create.status,
				},
				MY_SECRET,
				{ expiresIn: '12h' }
			);
			res.status(200).json({
				token: jwtToken,
				status: create.status,
				id: create.id,
				email: create.email,
				username: create.username,
				profile_picture: create.profile_picture,
				favorites: create.favorites,
			});
		}
	} catch (e) {
		console.log(e);
		next(e);
	}
};

const resetPassword = async (req, res, next) => {
	let { userId, password } = req.body;
	try {
		let user = await User.findOne({
			where: {
				id: userId,
			},
		});

		if (!user)
			return res.status(400).send('User has not been found with that ID');

		let hashedPassword = crypto
			.createHash('md5')
			.update(password)
			.digest('hex');

		await User.update(
			{
				password: hashedPassword,
			},
			{
				where: {
					id: userId,
				},
			}
		);

		res.send(`User ${user.username} has updated their password`);
	} catch (err) {
		next(err);
	}
};

const changeSubscription = async (req, res, next) => {
	let { email } = req.body;
	try {
		let user = await User.findOne({
			where: {
				email: email,
			},
		});

		if (!user)
			return res.status(400).send('User has not been found with that ID');

		await User.update(
			{
				subscribed:
					user.subscribed === 'Subscribed'
						? 'Unsubscribed'
						: 'Subscribed',
			},
			{
				where: {
					email: email,
				},
			}
		);

		res.send(
			`User ${user.username} has ${
				user.subscribed === 'Subscribed' ? 'Unsubscribed' : 'Subscribed'
			}`
		);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	registerUser,
	userLogin,
	addFavorite,
	getFavorite,
	deleteFavorite,
	searchUserByUsername,
	searchUserById,
	getAllUsers,
	profilePicture,
	updateUser,
	googleSignIn,
	resetPassword,
	changeSubscription,
	getComments,
};
