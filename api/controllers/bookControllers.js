const axios = require('axios');
const db = require('../db');
const { Books, Genre, Language } = require('../db');
const { Op } = require('sequelize');

const getPopularBooks = async (req, res, next) => {
	try {
		var apiData = await axios.get(
			'https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2022-07-19&api-key=ibDJiDwWad3JmgHfVm1ZQo0AgS6hbCMJ'
		);
		var wash = await apiData.data.results.lists[0].books?.map((b) => {
			return {
				title: b.title,
				author: b.author,
				description: b.description,
			};
		});
		res.send(wash);
	} catch (error) {
		next(error);
	}
};

const findAllBooks = async (req, res, next) => {
	try {
		var result = await Books.findAll({
			include: [
				{
					model: Genre,
					through: { attributes: [] },
				},
				{
					model: Language,
					through: { attributes: [] },
				},
			],
		});
		res.send(result);
	} catch (e) {
		next(e);
	}
};

const getBookById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const book = await Books.findByPk(parseInt(id));
		res.send(book);
	} catch (error) {
		next(error);
	}
};

const deleteBookById = async (req, res, next) => {
	const { id } = req.params;
	try {
		let book = await Books.findByPk(parseInt(id));

		await book.destroy();
		res.status(200).send('Libro eliminado!');
	} catch (error) {
		next(error);
	}
};

const postBook = async (req, res, next) => {
	let { title, authors, description, rating, image, preview } = req.body;
	if (title.length === 0)
		return res.status(400).json('Title should be longer');
	try {
		await Books.create({
			title: title,
			authors: authors?.join(','),
			description: description,
			rating: rating,
			image: image,
			preview: preview,
		});
		res.send('libro creado!');
	} catch (error) {
		next(error);
	}
};

const putBook = async (req, res, next) => {
	let {
		id,
		title,
		authors,
		price,
		description,
		image,
		previewLink,
		flag,
		currency,
	} = req.body;
	try {
		let currentBook = await Books.findByPk(id);
		if (currentBook) {
			await Books.update(
				{
					title: title ? title : currentBook.title,
					authors: authors ? authors : currentBook.authors,
					price: price ? price : currentBook.price,
					description: description
						? description
						: currentBook.description,
					image: image ? image : currentBook.image,
					previewLink: previewLink
						? previewLink
						: currentBook.previewLink,
					flag: flag ? flag : currentBook.flag,
					currency: currency ? currency : currentBook.currency,
				},
				{
					where: { id: id },
				}
			);
			res.status(200).send(
				`${title ? title : currentBook.title} has been updated`
			);
		} else {
			res.status(400).send(`Book with id ${id} not found`);
		}
	} catch (e) {
		res.status(404).send(e);
	}
};

const findByAuthorOrTitle = async (req, res, next) => {
	try {
		var { input } = req.query;
		input = `%${input}%`;
		if (input) {
			var resp = await Books.findAll({
				where: {
					[Op.or]: [
						{ title: { [Op.iLike]: input } },
						{ authors: { [Op.iLike]: input } },
					],
				},
				include: [
					{
						model: Genre,
						through: { attributes: [] },
					},
					{
						model: Language,
						through: { attributes: [] },
					},
				],
			});
			if (resp.length) {
				res.json(resp);
			} else {
				res.send('Could not find matching books');
			}
		}
	} catch (e) {
		res.status(404).send(e);
	}
};

const allGenres = async (req, res, next) => {
	try {
		var respuesta = await Genre.findAll({
			attributes: ['name'],
		});
		res.json(respuesta);
	} catch (e) {
		res.status(404).send(e);
	}
};

module.exports = {
	getPopularBooks,
	getBookById,
	deleteBookById,
	postBook,
	putBook,
	findByAuthorOrTitle,
	findAllBooks,
	allGenres,
};
