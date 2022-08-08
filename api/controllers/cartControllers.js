const { Cart, User, Books, Cart_Books } = require('../db');
const { Op } = require('sequelize');

const getCart = async (req, res, next) => {
	let { userId } = req.query;
	try {
		let cartUser = await Cart.findOne({
			where: {
				UserId: userId,
				status: 'Active',
			},
			include: {
				model: User,
				attributes: ['username', 'profile_picture', 'status'],
				model: Books,
				attributes: [
					'id',
					'title',
					'currency',
					'price',
					'authors',
					'image',
				],
				through: { attributes: ['amount'] },
			},
		});
		if (cartUser) res.status(200).json(cartUser);
		else res.status(400).send('No user was found with that ID');
	} catch (err) {
		next(err);
	}
};

const getAllCarts = async (req, res, next) => {
	let { userId } = req.query;
	try {
		let allCartsUser = await Cart.findAll({
			where: {
				UserId: userId,
			},
			order: [['status', 'ASC']],
			include: {
				model: Books,
				attributes: ['id', 'title', 'price', 'authors'],
				through: { attributes: ['amount'] },
			},
		});
		if (allCartsUser) res.status(200).json(allCartsUser);
		else res.status(400).send('No user was found with that ID');
	} catch (err) {
		next(err);
	}
};

const addBookToCart = async (req, res, next) => {
	let { bookId, userId } = req.body;
	try {
		let bookToAdd = await Books.findOne({
			where: {
				id: bookId,
			},
		});

		if (!bookToAdd)
			return res.status(400).send('No book was found with that ID');

		let cart = await Cart.findOne({
			where: {
				UserId: userId,
				status: 'Active',
			},
			include: {
				model: Books,
			},
		});

		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

		let repeatedBookCheck = cart.Books.filter((book) => book.id === bookId);
		if (repeatedBookCheck.length > 0) {
			if (
				repeatedBookCheck[0].Cart_Books.amount + 1 >
				repeatedBookCheck[0].stock
			)
				return res
					.status(400)
					.send(
						`${repeatedBookCheck[0].title} has no more stock left!`
					);
			await Cart_Books.update(
				{
					amount: repeatedBookCheck[0].Cart_Books.amount + 1,
				},
				{
					where: {
						CartId: cart.id,
						BookId: bookId,
					},
				}
			);
			return res.send('Amount increased');
		} else {
			await cart.addBook(bookToAdd);
			return res.send(`${bookToAdd.title} added to cart!`);
		}
	} catch (err) {
		next(err);
	}
};

const removeOneBookFromCart = async (req, res, next) => {
	let { userId, bookId } = req.query;
	try {
		let bookToRemove = await Books.findOne({
			where: {
				id: bookId,
			},
		});

		if (!bookToRemove)
			return res.status(400).send('No book was found with that ID');

		let cart = await Cart.findOne({
			where: {
				UserId: userId,
				status: 'Active',
			},
			include: {
				model: Books,
			},
		});

		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

		let repeatedBookCheck = cart.Books.filter(
			(book) => book.id === bookId && book.Cart_Books.amount > 1
		);
		if (repeatedBookCheck.length > 0) {
			await Cart_Books.update(
				{
					amount: repeatedBookCheck[0].Cart_Books.amount - 1,
				},
				{
					where: {
						CartId: cart.id,
						BookId: bookId,
					},
				}
			);
			return res.send({ bookToRemove });
		} else {
			if (await cart.removeBook(bookToRemove))
				return res.send(
					`All copies of ${bookToRemove.title} removed from cart`
				);
			else return res.send(`No copies of ${bookToRemove.title} in cart!`);
		}
	} catch (err) {
		next(err);
	}
};

const removeAllBooksFromCart = async (req, res, next) => {
	let { userId, bookId } = req.body;
	try {
		let bookToRemove = await Books.findOne({
			where: {
				id: bookId,
			},
		});

		if (!bookToRemove)
			return res.status(400).send('No book was found with that ID');

		let cart = await Cart.findOne({
			where: {
				UserId: userId,
				status: 'Active',
			},
			include: {
				model: Books,
			},
		});

		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

		if (await cart.removeBook(bookToRemove))
			return res.send(
				`All copies of ${bookToRemove.title} removed from cart`
			);
		else return res.send(`No copies of ${bookToRemove.title} in cart!`);
	} catch (err) {
		next(err);
	}
};

const clearCart = async (req, res, next) => {
	let { userId } = req.query;
	try {
		let cart = await Cart.findOne({
			where: {
				UserId: userId,
				status: 'Active',
			},
			include: {
				model: Books,
			},
		});
		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

		await cart.setBooks([]);
		res.status(200).send('Cart has been emptied');
	} catch (err) {
		next(err);
	}
};

const checkoutCart = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let arrayPromises = [];
		let user = await User.findByPk(userId);
		let oldCart = await Cart.findOne({
			where: {
				UserId: userId,
				status: 'Active',
			},
			include: {
				model: Books,
			},
		});
		let totalPrice = oldCart.Books.map((book) => book.price).reduce(
			(previousValue, currentValue) => previousValue + currentValue
		);

		//RESTAMOS EL STOCK / CHECKEAMOS SI HAY STOCK
		let books = oldCart.Books.map((book) => book.id);
		let newStock = oldCart.Books.map(
			(book) => book.stock - book.Cart_Books.amount
		);
		if (!newStock.every((stock) => stock > -1))
			return res
				.status(400)
				.send('A book in the cart does not have enough stock');
		for (let i = 0; i < books.length; i++) {
			arrayPromises.push(
				Books.update(
					{
						stock: newStock[i],
					},
					{
						where: {
							id: books[i],
						},
					}
				)
			);
		}

		arrayPromises.push(
			Cart.update(
				{
					status: 'Disabled',
					totalPrice: totalPrice.toFixed(2),
				},
				{
					where: {
						UserId: userId,
					},
				}
			)
		);

		let newCart = await Cart.create();
		arrayPromises.push(newCart.setUser(user));

		await Promise.all(arrayPromises);
		res.status(200).send(oldCart.id);
	} catch (err) {
		next(err);
	}
};

const bulkAdd = async (req, res, next) => {
	//funcion para cuando un user esta deslogeado se logea se giardan libros
	let { bookObjects, userId } = req.body;
	let arrayPromises = [];
	try {
		bookObjects = bookObjects.sort((a, b) => {
			return a.id - b.id;
		});

		let bookIds = bookObjects.map((book) => {
			return book.id;
		});

		//Need models from db
		let modelFetch = await Books.findAll({
			where: {
				id: {
					[Op.in]: bookIds,
				},
			},
		});

		let cart = await Cart.findOne({
			where: {
				UserId: userId,
				status: 'Active',
			},
			include: {
				model: Books,
			},
		});

		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

		let repeatedBookCheck = cart.Books.filter((book) =>
			bookIds.includes(book.id)
		);
		let repeatedBookIds = repeatedBookCheck.map((book) => book.id);

		for (let i = 0; i < bookObjects.length; i++) {
			if (
				repeatedBookCheck.length > 0 &&
				repeatedBookIds.includes(bookObjects[i].id)
			) {
				arrayPromises.push(
					Cart_Books.update(
						{
							amount:
								repeatedBookCheck[i].Cart_Books.amount +
								bookObjects[i].amount,
						},
						{
							where: {
								CartId: cart.id,
								BookId: bookIds[i],
							},
						}
					)
				);
			}
			if (
				bookObjects[i].amount > 1 &&
				!repeatedBookIds.includes(bookObjects[i].id)
			) {
				await cart.addBook(modelFetch[i]);
				arrayPromises.push(
					Cart_Books.update(
						{
							amount: bookObjects[i].amount,
						},
						{
							where: {
								CartId: cart.id,
								BookId: bookObjects[i].id,
							},
						}
					)
				);
			} else {
				await cart.addBook(modelFetch[i]);
			}
		}
		await Promise.all(arrayPromises);
		res.status(200).send('Bulk addition was completed successfully!');
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getCart,
	getAllCarts,
	addBookToCart,
	removeOneBookFromCart,
	removeAllBooksFromCart,
	clearCart,
	checkoutCart,
	bulkAdd,
};
