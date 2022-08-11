// import actions types
// import { GET_ALL_BOOKS } from './actionTypes'

import Swal from 'sweetalert2';

import axios from 'axios';
import {
	//---------
	GET_DETAILS,
	GET_BOOKS,
	GET_GENRES,
	GET_BOOKS_BY_TITLE_OR_AUTHOR,
	RESET_DETAILS,
	HIDE_BOOKS,
	SHOW_BOOKS,
	FILTERED_ADMIN_BOOKS,
	FILTERED_ADMIN_USER,
	//----------
	FILTER_GENRE,
	FILTER_PRICE,
	FILTER_LANGUAGE,
	FILTER_ONSALE,
	APPLY_FILTERS,
	SORT_ORDER,
	RESET_FILTERS,
	//------------
	LOADING,
	//-------------
	ADD_CART,
	DEL_CART,
	DEL_ALL_CART,
	GET_CART,
	REMOVE_BOOK_CART_DB,
	CLEAR_CART,
	CHECKOUT_CART,
	GET_PURCHASED_CART,
	GET_ACTIVE_CART,
	//-------------
	LOGIN,
	SIGN_UP,
	SIGN_OUT,
	LOGIN_GOOGLE,
	FORGOT_PASSWORD,
	//-------------
	CHECK_STATES,
	//-------------
	GET_USERS,
	USER_GET_FAVORITES,
	POST_COMMENT,
	CREATE_BOOK,
	MODIFY_BOOK,
	USER_DEL_FAVORITES,
	UPDATE_USER,
	USER_ADD_FAVSTATE,
	SEARCH_BOOK,
	UPGRADE_USER,
	BAN_USER,
	EMPTY_PURCHASED_CART,
	USER_GET_COMMENTS,
	USER_GET_PURCHASES,
	RESET_PASSWORD,
	USER_SUBSCRIBE,
	UNBAN_USER,
} from './actionTypes';

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

export function postComment(comment) {
	return async function (dispatch) {
		try {
			await axios.post(`/books/comment`, comment);
			return dispatch({ type: POST_COMMENT, payload: comment });
		} catch (error) {
			console.log(error);
		}
	};
}
//----------------------------------------------ADMIN-----------------------------------------

export function createBook(input, token) {
	console.log('CREATE-BOOK-ACTION', token);
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return async function (dispatch) {
		var json = await axios.post('/books', input, config);
		return dispatch({
			type: CREATE_BOOK,
			payload: json.data,
		});
	};
}
export function modifyBook(payload) {
	// let { token } = payload;
	// const config = {
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };
	return async function (dispatch) {
		console.log(payload);
		var json = await axios.put(`/books/${payload.id}`, payload.input);
	};
}
export function searchBooksByAdmin(titleOrAuthor) {
	return async function (dispatch) {
		try {
			var json = await axios.get(`/books/search?input=${titleOrAuthor}`);
			return dispatch({
				type: SEARCH_BOOK,
				//json.data devuelve lo que nos da la ruta de arriba, ya filtrado por nombre
				payload: { data: json.data, query: titleOrAuthor },
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function hideBook(payload) {
	return async function (dispatch) {
		await axios.put('admin/hide', payload);
		return dispatch({
			type: HIDE_BOOKS,
			payload: payload.bookId,
		});
	};
}
export function showBook(payload) {
	return async function (dispatch) {
		await axios.put('admin/show', payload);
		return dispatch({
			type: SHOW_BOOKS,
			payload: payload.bookId,
		});
	};
}

export function toBanUser(id, token) {
	return async function (dispatch) {
		console.log(token);
		const config = {
			headers: {
				'Content-Type': 'application/json',

				Authorization: `Bearer ${token}`,
			},
		};
		try {
			var userBan = await axios.put(`/admin/ban`, { userId: id }, config);
			// var users = await axios.get(`/user/all`);
			return dispatch({
				type: BAN_USER,
				payload: id,
			});
		} catch (err) {
			console.log(err);
		}
	};
}
export function toUnBanUser(id, token) {
	return async function (dispatch) {
		console.log(token);
		const config = {
			headers: {
				'Content-Type': 'application/json',

				Authorization: `Bearer ${token}`,
			},
		};
		try {
			var userUnBan = await axios.put(
				`/admin/unban`,
				{ userId: id },
				config
			);
			// var users = await axios.get(`/user/all`);
			return dispatch({
				type: UNBAN_USER,
				payload: userUnBan.data,
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function filteredAdminBooks(input) {
	return async function (dispatch) {
		return dispatch({ type: FILTERED_ADMIN_BOOKS, payload: input });
	};
}

export function filteredAdminUsers(input) {
	return async function (dispatch) {
		return dispatch({ type: FILTERED_ADMIN_USER, payload: input });
	};
}

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

export function addGoogleUser(currentUser) {
	//con esta action me creo un usuario en la db y me loggea al mismo tiempo (soy crack lo se)

	return async function (dispatch) {
		try {
			if (currentUser !== null && currentUser.hasOwnProperty('email')) {
				var addToDb = await axios.post(`/user/google`, {
					username: currentUser.displayName,
					email: currentUser.email,
					profile_picture: currentUser.photoURL,
				});

				/*let login = await axios.post(`/user/login`, {
				username: currentUser.displayName,
				//password: currentUser.uid, //le puse como pw uid porq es unico segun cada usuario de google. (fuck cibersecurity)
				//pero como coincide el email con el uid puse ese valor como pw. podemos ver de usar otro maybe
				//igual en la db la pw aparece hasheada
			});
			console.log('Soy login: ' + Object.keys(currentUser));*/
				console.log(addToDb.data, 'lo q me trae ruta');
				return dispatch({
					type: LOGIN_GOOGLE,
					payload: addToDb.data,
				});
			}
		} catch (error) {
			console.log(error);
			/*(err.response.status === 404) {
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
			}*/
		}
	};
}

export function updateUser(propsToUpdate) {
	return async function (dispatch) {
		var updatedUser = await axios.put(`/user/update`, propsToUpdate);
		return dispatch({
			type: UPDATE_USER,
			payload: updatedUser.data,
		});
	};
}

// Aca checkeamos si el estado del token está o no actualizado
export function checkStates() {
	return async function (dispatch) {
		return dispatch({
			type: CHECK_STATES,
		});
	};
}

export function userSignUp(user) {
	return async function (dispatch) {
		try {
			var result = await axios.post(`/user/register`, {
				email: user.email,
				username: user.username,
				password: user.password,
			});
			dispatch(sendWelcomeEmail(user.email));
			return dispatch({
				type: SIGN_UP,
				payload: result.data,
			});
		} catch (error) {
			// alert(error.response.data);
			Swal.fire('Sign Up Failed!', error.response.data, 'warning');
		}
	};
}

export function userSignOut() {
	return { type: SIGN_OUT };
}

export function getAllUsers() {
	return async function (dispatch) {
		var users = await axios.get(`/user/all`);
		return dispatch({
			type: GET_USERS,
			payload: users.data,
		});
	};
}
export function userAddFavorite(userId, bookId) {
	return async function () {
		return await axios.put('/user/favorites', {
			idUser: userId,
			idBook: bookId,
		});
	};
}

export function userDeleteFavorite(userId, bookId) {
	return async function () {
		return await axios.delete('/user/favorites', {
			data: {
				idUser: userId,
				idBook: bookId,
			},
		});
	};
}

export function userGetFavorite(userId) {
	return async function (dispatch) {
		var favorites = await axios.get(`/user/favorites/${userId}`);
		return dispatch({ type: USER_GET_FAVORITES, payload: favorites.data });
	};
}
export function userAddFavState(payload) {
	return { type: USER_ADD_FAVSTATE, payload };
}

export function userDelFavorite(payload) {
	return { type: USER_DEL_FAVORITES, payload };
}

export function userGetComments(userId) {
	return async function (dispatch) {
		var comments = await axios.get(`/user/comments/${userId}`);
		return dispatch({ type: USER_GET_COMMENTS, payload: comments.data });
	};
}
export function userGetPurchases(userId) {
	return async function (dispatch) {
		var purchases = await axios.get(`/cart/all?userId=${userId}`);
		return dispatch({ type: USER_GET_PURCHASES, payload: purchases.data });
	};
}

export function forgotPass(email) {
	return async function (dispatch) {
		try {
			let resp = await axios.put('/mail/password', {
				email: email.email,
			});
			return dispatch({
				type: FORGOT_PASSWORD,
				payload: resp.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function resetPassword(userId, password) {
	return async function (dispatch) {
		try {
			let resp = await axios.put('/user/password', {
				userId,
				password,
			});
			return dispatch({
				type: RESET_PASSWORD,
				payload: resp.data,
			});
		} catch (error) {
			console.log(error);
		}
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

// -----------------------------------------------CART-------------------------------------------------------

export function addToCart(id, idUser) {
	return async function (dispatch) {
		try {
			const adding = axios.post(`/cart/`, {
				userId: idUser, //me llega de estado del componente
				bookId: id, //me llega de params
			});

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

export function getCart(userId) {
	return async function (dispatch) {
		let cart = await axios.get(`/cart?userId=${userId}`);
		return dispatch({ type: GET_CART, payload: cart.data });
	};
}

export function removeOneBookFromCart(bookId, userId) {
	return async function (dispatch) {
		let deleteBooks = await axios.put(
			`/cart?bookId=${bookId}&userId=${userId}`
		); //double query
		console.log(deleteBooks); //quiero q me traiga libro a eliminar
		return dispatch({
			type: REMOVE_BOOK_CART_DB,
			payload: deleteBooks,
		});
	};
}

export function clearCart(userId) {
	return async function (dispatch) {
		let clearAll = await axios.put(`/cart/clear?userId=${userId}`);
		return dispatch({
			type: CLEAR_CART,
		});
	};
}
export function checkoutCart(userId, token) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return async function (dispatch) {
		let checkoutCartId = await axios.put(
			`/cart/checkout/`,
			{ userId },
			config
		);
		return dispatch({
			type: CHECKOUT_CART,
			payload: checkoutCartId.data,
		});
	};
}

export function getPurchasedCart(userId) {
	return async function (dispatch) {
		let allUserCarts = await axios.get(`/cart/all?userId=${userId}`);
		return dispatch({
			type: GET_PURCHASED_CART,
			payload: allUserCarts.data,
		});
	};
}
export function emptyPurchasedCart() {
	return async function (dispatch) {
		return dispatch({
			type: EMPTY_PURCHASED_CART,
		});
	};
}

export function upgradeToAdmin(userId, token) {
	console.log(token);
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return async function (dispatch) {
		await axios.put(`/admin/upgrade`, { userId }, config);
		var users = await axios.get(`/user/all`);
		return dispatch({
			type: GET_USERS,
			payload: users.data,
		});
	};
}

export function sendConfirmation(userId, cartId) {
	return async function (dispatch) {
		let response = await axios.put(`/mail/order`, { userId, cartId });
	};
}

export function sendWelcomeEmail(email) {
	return async function (dispatch) {
		let resp = await axios.put(`/mail/signup`, { email });
	};
}

export function changeSubscribeStatus(email) {
	console.log(email, 'email');
	return async function (dispatch) {
		let answer = await axios.put(`/user/subscription`, email);

		if (!answer.includes()) await axios.put(`/mail/subscribe`, email);
		return dispatch({
			type: USER_SUBSCRIBE,
		});
	};
}
