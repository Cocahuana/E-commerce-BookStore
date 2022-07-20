const axios = require('axios');
const { Books } = require('../db');

const arrayId = [
    "p3QQjwEACAAJ",
    "z2hczgEACAAJ",
    "zl13g5uRM4EC",
    "NvNcAAAACAAJ",
    "_gPWjwEACAAJ",
    "q_P7oMO3lC4C",
    "cGj7sgEACAAJ",
    "ucRODwAAQBAJ",
    "g9gtEAAAQBAJ",
    "LQ07DQAAQBAJ",
    //"58iu9yGmjTI",
    "Aey-DwAAQBAJ",
    "2-y-DwAAQBAJ",
    "RZISrgEACAAJ",
    "mgpDSiFDa14C",
    "v3RYPwAACAAJ",
    "W6M3EAAAQBAJ",
    "K4HXDwAAQBAJ",
    "ikxHcAAACAAJ",
    "X8RSzQEACAAJ",
    "e_UvygEACAAJ",
    "iIyHvgEACAAJ",
    //"UbiDrtoFCHI",
    "6ZmMBAAAQBAJ",
    "RO_4ugAACAAJ",
    "FbMHngEACAAJ",
    "-c02AwAAQBAJ",
    "e2HHDwAAQBAJ",
]


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

const addBooksTodb = async () => {
	try {
        var arrayBooks = []; 
        for ( let book of arrayId ) {
		var info = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${book}`
		);  
            arrayBooks.push(info.data);  
        }

        /*var arrayFormat = []; 
        arrayBooks.map(b => {
            arrayFormat.push({
            title: b.volumeInfo.title,
            authors: b.volumeInfo.authors?.join(','),
            description: b.volumeInfo?.description,
            rating: b.volumeInfo?.averageRating,
            image: b.volumeInfo.imageLinks?.thumbnail, 
            preview: b.volumeInfo?.previewLink,})
            
        })*/
        //console.log(arrayFormat)
        var response = arrayBooks.map( async b => {
                await Books.create({
            title: b.volumeInfo.title,
            authors: b.volumeInfo.authors?.join(','),
            description: b.volumeInfo.description,
            rating: b.volumeInfo.averageRating,
            image: b.volumeInfo.imageLinks?.thumbnail, 
            preview: b.volumeInfo.previewLink,
        });
        
        
    });
    /*var response = arrayFormat.map(async m => 
        await Books.create(m) )*/
    return response
    } catch (error) {
        return('Failed to load into Data Base')
    }
    
}



const addTotalBooks = async (req, res, next) => {
	try {
		addBooksTodb();
		var total = await Books.findAll();
        console.log(total)
		res.send(total);
	} catch (error) {
		next(error);
	}
};

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
	addBooksTodb,
	addTotalBooks,
	getBookById,
	deleteBookById,
	postBook,
};
