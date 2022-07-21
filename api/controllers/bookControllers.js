const axios = require('axios');
const db = require('../db');
const { Books } = require('../db');

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
	'6ZmMBAAAQBAJ',
	'RO_4ugAACAAJ',
	'FbMHngEACAAJ',
	'-c02AwAAQBAJ',
	'e2HHDwAAQBAJ',
	'M3LIDAAAQBAJ',
	'-v22DQAAQBAJ',
	'njs6CQAAQBAJ',
	'2zgRDXFWkm8C',
	'Mjw6CQAAQBAJ',
	'TOeUCgAAQBAJ',
	'VDs6CQAAQBAJ',
	'oTw6CQAAQBAJ',
	/*'ob2gAAAACAAJ',
	'9ltqtwAACAAJ',
	'64BlswEACAAJ',
	'0z0uDwAAQBAJ',
	'8jxKBQAAQBAJ',
	'mgpDSiFDa14C',
	'v3RYPwAACAAJ',
	'zDzDAQAACAAJ',
	/*'VjzZDgAAQBAJ',
	'YusWxawixKgC',
	'smmZAAAACAAJ',
	'EWlGvgEACAAJ',
	'kCbuswEACAAJ',
	'cGj7sgEACAAJ',
	'PRcRkAEACAAJ',
	'oaSqSQAACAAJ',
	'tzClSQAACAAJ',
	'FCSSuQAACAAJ',
	'4zfgHAAACAAJ',
	'gTuroAEACAAJ',
	'rAZqzgEACAAJ',
	'VA4GoQEACAAJ',
	'RD-WQwAACAAJ',
	'AsCgoAEACAAJ',
	'ChO7oAEACAAJ',
	'URaLAAAACAAJ',
	'dhP_rQEACAAJ',
	'FZuYvwEACAAJ',
	'Y3OypwAACAAJ',
	'qQkFogEACAAJ',
	'2euKXB-3_aoC',
	'-1oJMQAACAAJ',
	'NUTODwAAQBAJ',
	'B4zIAgAAQBAJ',
	'zUPODwAAQBAJ',
	'lpTaDwAAQBAJ',
	'AmNDDwAAQBAJ',
	'GJqVBgAAQBAJ',
	'nIKWngEACAAJ',
	'1tLPDwAAQBAJ',
	'P8ZXcgAACAAJ',
	'99-UPwAACAAJ',
	'2Lm4t09OWi0C',
	'WEjqwAEACAAJ',
	'9zhEBQAAQBAJ',
	'8t5GVWLo_eEC',
	'-3KNtgAACAAJ',*/
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

<<<<<<< HEAD
//}
=======
const findAllBooks = async (req, res, next) => {
	try {
		var result = await Books.findAll()
		res.send(result)
	} catch(e) {
		next(e) 
	}
}

>>>>>>> 269818adf8ad487a679b790bc3cd461d0d9a3697

/*const addTotalBooks = async (req, res, next) => {
	try {
		addBooksTodb();
		var total = await Books.findAll();
		console.log(total);
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

module.exports = {
	getPopularBooks,
	getBookById,
	deleteBookById,
	postBook,
	findAllBooks
};
