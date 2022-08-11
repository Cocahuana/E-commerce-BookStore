const axios = require('axios');
const db = require('../db');
const { User, Books, Comment, Cart } = require('../db');
const { Op } = require('sequelize');

const banUser = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let userToBan = await User.findOne({
			where: {
				id: userId,
			},
		});
		if (userToBan) {
			await userToBan.update({
				status: 'Banned',
			});
			Comment.destroy({
				where: {
					UserId: userId,
				},
			});
			res.status(200).send(`User ${userToBan.username} has been banned!`);
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const unbanUser = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let userToUnban = await User.findOne({
			where: {
				id: userId,
			},
		});
		if (userToUnban) {
			await userToUnban.update({
				status: 'User',
			});
			let unbanned = await User.findByPk(userId);
			res.status(200).send(unbanned);
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const upgradeToAdmin = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let userToAdmin = await User.findOne({
			where: {
				id: userId,
			},
		});
		if (userToAdmin) {
			await userToAdmin.update({
				status: 'Admin',
			});
			res.status(200).send(
				`User ${userToAdmin.username} has been upgraded to admin!`
			);
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const hideBook = async (req, res, next) => {
	let { bookId } = req.body;
	try {
		let bookToHide = await Books.findOne({
			where: {
				id: bookId,
			},
		});
		if (bookToHide) {
			await bookToHide.update({
				stock: 0,
			});
			res.status(200).send(`${bookToHide.title} has been hidden!`);
		} else {
			res.status(400).send('No book was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const deleteComment = async (req, res, next) => {
	let { commentId } = req.body;
	try {
		await Comment.destroy({
			where: {
				id: commentId,
			},
		});
		res.send(`Comment has been deleted`);
	} catch (err) {
		next(err);
	}
};

const getAllOrders = async (req, res, next) => {
	try {
		let allOrders = await Cart.findAll({
			where: {
				status: {
					[Op.not]: 'Active',
				},
			},
			include: {
				model: Books,
			},
		});
		res.json(allOrders);
	} catch (err) {
		next(err);
	}
};

const showBook = async (req, res, next) => {
	let { bookId } = req.body;
	try {
		let bookToShow = await Books.findOne({
			where: {
				id: bookId,
			},
		});
		if (bookToShow) {
			await bookToShow.update({
				stock: 50,
			});
			res.status(200).send(`${bookToShow.title} is now shown!`);
		} else {
			res.status(400).send('No book was found with that id');
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	banUser,
	unbanUser,
	upgradeToAdmin,
	hideBook,
	showBook,
	deleteComment,
	getAllOrders,
};
