// import actions types
// import { GET_ALL_BOOKS } from './actionTypes'

import Swal from 'sweetalert2';

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
	RESET_FILTERS,
	LOGIN,
	SIGN_UP,
	SIGN_OUT,
	HIDE_BOOKS,
	CHECK_TOKEN,
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
			let det = await axios.get(`/books/book/${id}`);
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
			var json = await axios.get(`/books/search?input=${titleOrAuthor}`);
			return dispatch({
				type: GET_BOOKS_BY_TITLE_OR_AUTHOR,
				//json.data devuelve lo que nos da la ruta de arriba, ya filtrado por nombre
				payload: { data: json.data, query: titleOrAuthor },
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
//----------------------------------------------ADMIN-----------------------------------------

export const hideBook = () => {
	return async function (dispatch) {
		try {
			let result = await axios.put('/hide');
			return dispatch({
				type: HIDE_BOOKS,
				payload: result.data,
			});
		} catch (error) {
			alert(error);
		}
	};
};

//----------------------------------------------USERS-----------------------------------------

export function userLogin(user) {
	return async function (dispatch) {
		try {
			let resp = await axios.post(`/user/login`, {
				username: user.email,
				password: user.password,
			});
			Swal.fire(
				'Good job!',
				'You have been signed in successfully!',
				'success'
			);
			return dispatch({
				type: LOGIN,
				payload: resp.data,
			});
		} catch (error) {
			// Te lanza un error cuando la autenticacion falló o no es correcta
			// Permaneces en la pagina del sign in
			const err = error;
			if (err.response.status === 404) {
				//Status es el tipo de error y data el send/json del error en el back
				// console.log('status: ' + err.response.status);
				// console.log('data: ' + err.response.data);
				Swal.fire({
					icon: 'error',
					title: `${err.response.status}`,
					text: `${err.response.data}`,
				});
			} else if (err.response.status === 400) {
				//Status es el tipo de error y data el send/json del error en el back
				// console.log('status: ' + err.response.status);
				// console.log('data: ' + err.response.data);
				Swal.fire({
					icon: 'error',
					title: `${err.response.status}`,
					text: `${err.response.data}`,
				});
			}
		}
	};
}

// Aca checkeamos si el estado del token está o no actualizado
export function checkToken() {
	return async function (dispatch) {
		return dispatch({
			type: CHECK_TOKEN,
		});
	};
}

export function userSignUp(user) {
	return async function (dispatch) {
		var result = await axios.post(`/user/register`, {
			username: user.username,
			email: user.email,
			password: user.password,
		});

		return dispatch({
			type: SIGN_UP,
			payload: result.data.username,
		});
	};
}

export function userSignOut() {
	return { type: SIGN_OUT };
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
	return { type: APPLY_FILTERS, payload };
}
export function resetFilters(payload) {
	return { type: RESET_FILTERS, payload };
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
