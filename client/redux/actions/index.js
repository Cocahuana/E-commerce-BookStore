// import actions types
// import { GET_ALL_BOOKS } from './actionTypes'
import axios from 'axios';
import { GET_DETAILS } from './actionTypes';
import { GET_BOOKS } from './actionTypes';
import { GET_BOOKS_BY_TITLE_OR_AUTHOR } from './actionTypes';
// const axios = require('axios');

// export const getAllBooks = () => {
//     return async function (dispatch) {
//         dispatch({
//             type: LOADING
//         })
//         let books = await axios.get('/books')
//         return dispatch({ type: GET_ALL_BOOKS, payload: books.data })
//     }
// }

// let objetofalso = {
//     id: 1000,
//     title: "Aguante messi",
//     authors: ["el mati"],
//     description: "soy el matiii",
//     rating: 5,
//     image: "http://books.google.com/books/content?id=TV05BgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
//     preview: null
// }

export const getDetails = (id) => {
	return async function (dispatch) {
		try {
			let det = await axios.get(`/books/${id}`);
			return dispatch({
				type: GET_DETAILS,
				payload: det.data,
			});
		} catch (error) {
			alert(error);
		}
	};
};

export const getBooks = () => {
	return async function (dispatch) {
		try {
			let result = await axios.get('/books');
			return dispatch({
				type: GET_BOOKS,
				payload: result.data,
			});
		} catch (error) {
			alert(error);
		}
	};
};

export function getBooksByTitleOrAuthor(titleOrAuthor) {
	return async function (dispatch) {
		console.log('query= ' + titleOrAuthor);
		try {
			var json = await axios.get(`/search?input=${titleOrAuthor}`);
			return dispatch({
				type: GET_BOOKS_BY_TITLE_OR_AUTHOR,
				//json.data devuelve lo que nos da la ruta de arriba, ya filtrado por nombre
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
