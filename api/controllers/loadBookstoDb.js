const { Op } = require('sequelize');
const { Books, Language, Genre } = require('../db');
const { books } = require('../controllers/hardcoded_books.json');
const { genres } = require('../controllers/hardcoded_genres.json');
const { languages } = require('../controllers/hardcoded_languages.json');

const loadBooks = async (req, res, next) => {
	let infoCheck = await Books.findAll();
	if (infoCheck.length === 0) {
		await Books.bulkCreate(books);
		await Genre.bulkCreate(genres);
		await Language.bulkCreate(languages);
		let genreNames = genres.map((genre) => {
			return genre.name;
		});
		let booksToAssociate;
		let genreBooks;
		let genresToAssociate;
		let arrayPromises = [];
		for (let i in genreNames) {
			genreBooks = books.map((book) =>
				book.genre.includes(genreNames[i]) ? book.title : null
			);

			booksToAssociate = await Books.findAll({
				where: {
					title: {
						[Op.in]: genreBooks,
					},
				},
			});

			genresToAssociate = await Genre.findOne({
				where: {
					name: genreNames[i],
				},
			});

			arrayPromises.push(genresToAssociate.addBooks(booksToAssociate));
		}

		let languageNames = languages.map((language) => {
			return language.name;
		});
		let languagesToAssociate;
		let languageBooks;
		for (let i in languageNames) {
			languageBooks = books.map((book) =>
				book.language === languageNames[i] ? book.title : null
			);
			booksToAssociate = await Books.findAll({
				where: {
					title: {
						[Op.in]: languageBooks,
					},
				},
			});

			languagesToAssociate = await Language.findOne({
				where: {
					name: languageNames[i],
				},
			});

			arrayPromises.push(languagesToAssociate.addBooks(booksToAssociate));
		}
		await Promise.all(arrayPromises);
	}
};

module.exports = { loadBooks };
