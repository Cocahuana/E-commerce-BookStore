// import actions types
// import { GET_ALL_BOOKS } from './actionTypes'
import { Slide } from '@chakra-ui/react';
import axios from 'axios';
import {
	GET_DETAILS,
	GET_BOOKS,
	GET_GENRES,
	FILTER_GENRE,
	FILTER_PRICE,
	FILTER_LANGUAGE,
	FILTER_ONSALE,
	APPLY_FILTERS,
	SORT_ORDER,
	GET_BOOKS_BY_TITLE_OR_AUTHOR,
	RESET_DETAILS,
	LOADING,
	ADD_CART,
	DEL_CART,
	DEL_ALL_CART,
} from './actionTypes';

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
			dispatch({
				type: LOADING,
			});
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
export const getGenres = () => {
	return async function (dispatch) {
		try {
			let result = await axios.get('/genres');
			return dispatch({
				type: GET_GENRES,
				payload: result.data,
			});
		} catch (error) {
			alert(error);
		}
	};
};

export function getBooksByTitleOrAuthor(titleOrAuthor) {
	return async function (dispatch) {
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

export function resetDetails() {
	return {
		type: RESET_DETAILS,
	};
}

//-------------------------------------------------FILTERS---------------------------------------------
export function saveFilterGenre(payload) {
	return { type: FILTER_GENRE, payload };
}
export function saveFilterPrice(payload) {
	return { type: FILTER_PRICE, payload };
}
export function saveFilterLanguage(payload) {
	return { type: FILTER_LANGUAGE, payload };
}
export function saveFilterOnSale(payload) {
	return { type: FILTER_ONSALE, payload };
}
export function applyFilters(payload) {
	console.log('applying filters');
	return { type: APPLY_FILTERS, payload };
}
//------------------------------------------------------------------------------------------------------
//-------------------------------------------------SORTS------------------------------------------------
export function saveOrder(payload) {
	return { type: SORT_ORDER, payload };
}
//------------------------------------------------------------------------------------------------------

// ---------CART------------

export function addToCart(id) {
	return async function (dispatch) {
		try {
			dispatch({
				type: ADD_CART,
				payload: id,
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function delCart(id) {
	return async function (dispatch) {
		try {
			return dispatch({
				type: DEL_CART,
				payload: id,
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function delAllCart() {
	return async function (dispatch) {
		try {
			return dispatch({
				type: DEL_ALL_CART,
			});
		} catch (err) {
			console.log(err);
		}
	};
}
