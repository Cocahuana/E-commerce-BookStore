const axios = require('axios');
require('dotenv').config();
const { MY_SECRET } = process.env;
const { User, Books, Cart } = require('../db');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const registerUser = async (req, res, next) => {
	const { email, password, username, status } = req.body;
	try {
		const alreadyExists = await User.findAll({ where: { email: email } });

		if (alreadyExists.length) {
			res.send('Email already registered');
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
		});

		let cartToAssociate = await Cart.create();
		await cartToAssociate.setUser(newUser);

		res.json({message: "User created succesfully!", id: newUser.id});
	} catch (err) {
		next(err);
	}
};

const updateUser = async (req, res, next) => {
	//con esto cambias username, email, contraseña, status, id, favorites y profile pics
	let {id, username, email, password, status, favorites, profilePic} = req.body;
	try {
		if (req.body.password) {
			let hashedPassword = crypto
				.createHash('md5')
				.update(password)
				.digest('hex');
			password = hashedPassword;
		}
		const userCheck = await User.findByPk(id);

		await User.update({
			username: username ? username : userCheck.username,
			email: email ? email : userCheck.email,
			password: password ? password : userCheck.password,
			status: status ? status : userCheck.status,
			favorites: favorites ? favorites : userCheck.favorites,
			profile_picture: profilePic ? profilePic : userCheck.profile_picture,
		},{
			where:{
				id: id,
			}
		});

		const updatedUser = await User.findOne({
			where:{
				id: id,
			},
		});
		res.json(updatedUser)
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
		else if (userCheck.username !== username)
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
	try {
		let userCheck = await User.findByPk(id);
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
			attributes: {exclude: ['password']},
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
	const { username, email } = req.body;
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
				profile_picture: alreadyExists.profile_picture,
				favorites: alreadyExists.favorites,
			});
		}
		if (!alreadyExists) {
			const create = await User.create({
				email: email,
				username: username,
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
};
