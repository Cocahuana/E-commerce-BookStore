const axios = require('axios');
const db = require('../db');
const { Books } = require('../db');
const { Op } = require('sequelize');

const arrayId = [
	'p3QQjwEACAAJ',
	'z2hczgEACAAJ',
	'zl13g5uRM4EC',
	'NvNcAAAACAAJ',
	'_gPWjwEACAAJ',
	'q_P7oMO3lC4C',
	'cGj7sgEACAAJ',
	'ucRODwAAQBAJ',
	'g9gtEAAAQBAJ',
	'LQ07DQAAQBAJ',
	//"58iu9yGmjTI",
	'Aey-DwAAQBAJ',
	'2-y-DwAAQBAJ',
	'RZISrgEACAAJ',
	'mgpDSiFDa14C',
	'v3RYPwAACAAJ',
	'W6M3EAAAQBAJ',
	'K4HXDwAAQBAJ',
	'ikxHcAAACAAJ',
	'X8RSzQEACAAJ',
	'e_UvygEACAAJ',
	'iIyHvgEACAAJ',
	//"UbiDrtoFCHI",
	'6ZmMBAAAQBAJ',
	'RO_4ugAACAAJ',
	'FbMHngEACAAJ',
	'-c02AwAAQBAJ',
	'e2HHDwAAQBAJ',
];

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

//const addBooksTodb = async () => {
//        var arrayBooks = [];
//        for ( let book of arrayId ) {
//		var info = await axios.get(
//            `https://www.googleapis.com/books/v1/volumes/${book}`
//		);
//           arrayBooks.push(info.data);
//        }
//
//      /*var arrayFormat = [];
//      arrayBooks.map(b => {
//          arrayFormat.push({
//          title: b.volumeInfo.title,
//          authors: b.volumeInfo.authors?.join(','),
//         description: b.volumeInfo?.description,
//          rating: b.volumeInfo?.averageRating,
//          image: b.volumeInfo.imageLinks?.thumbnail,
//          preview: b.volumeInfo?.previewLink,})
//
//      })*/
//      //console.log(arrayFormat)
//      var response = arrayBooks.map( async b => {
//              await Books.create({
//          title: b.volumeInfo.title,
//         authors: b.volumeInfo.authors?.join(','),
//        description: b.volumeInfo.description,
//       rating: b.volumeInfo.averageRating,
//          image: b.volumeInfo.imageLinks?.thumbnail,
//         preview: b.volumeInfo.previewLink,
//      });

//    });
/*var response = arrayFormat.map(async m => 
        await Books.create(m) )*/
//  return response

//}

const findAllBooks = async (req, res, next) => {
	try {
		var result = await Books.findAll();
		res.send(result);
	} catch (e) {
		next(e);
	}
};

/*const addTotalBooks = async (req, res, next) => {
	try {
		addBooksTodb();
		var total = await Books.findAll();
        console.log(total)
		res.send(total);
	} catch (error) {
		next(error);
	}
};*/

const getBookById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const book = await Books.findByPk(parseInt(id));
		res.send({ book });
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
		next(e);
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
			});
			console.log(resp);
			if (resp.length) {
				res.json(resp);
			} else {
				res.send('Could not find matching books');
			}
		}
	} catch (e) {
		next(e);
	}
};

module.exports = {
	getPopularBooks,
	getBookById,
	deleteBookById,
	postBook,
	findAllBooks,
	findByAuthorOrTitle,
	putBook,
};
