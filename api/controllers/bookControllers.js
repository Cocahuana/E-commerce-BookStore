const axios = require('axios')
const {Books} = require('../db')



const getPopularBooks = async (req, res) => {
    var apiData = await axios.get('https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2022-07-19&api-key=ibDJiDwWad3JmgHfVm1ZQo0AgS6hbCMJ');
    var wash = await apiData.data.results.lists[0].books?.map(b => {
        return{
            title: b.title,
            author: b.author,
            description: b.description,
            rating: 5,
            image: b.book_image }
        });
    res.send(wash)
};


const addBooksTodb = async () => {
    var count = await Books.count();
    if(count === 0){
    const info = await axios.get('https://www.googleapis.com/books/v1/volumes?q=the&printType=books&filter=paid-ebooks&maxResults=40')
    const bookVolume = await info.data.items.map(b => {
        const add = Books.findOrCreate({
            where:
            {title: b.volumeInfo.title,
            authors: b.volumeInfo.authors?.join(','),
            description: b.volumeInfo.description,
        }   
        });
    });
    }
    return
};

const addBooksTodb2 = async () => {
    const count2 = Books.count();
    const info = await axios.get('https://www.googleapis.com/books/v1/volumes?q=and&printType=books&filter=paid-ebooks&maxResults=40')
    const bookVolume = await info.data.items.map(b => {
        const add = Books.create({
            title: b.volumeInfo.title,
            authors: b.volumeInfo.authors?.join(','),
            description: b.volumeInfo.description,
            rating: b.volumeInfo.averageRating,
            image: b.volumeInfo.imageLinks.thumbnail,
            preview: b.volumeInfo.previewLink
        });
    });
    return 
};

const addTotalBooks = async(req, res) => {
    var result1 = addBooksTodb(); 
    var result2 = addBooksTodb2(); 
    var total = await Books.findAll({})
    res.send({total})
}



module.exports = {getPopularBooks, addBooksTodb, addTotalBooks}