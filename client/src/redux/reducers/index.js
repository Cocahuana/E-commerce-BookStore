// import actions types
// import { GET_ALL_BOOKS } from '../actions/actionTypes'
import {
	GET_DETAILS,
	GET_BOOKS,
	GET_GENRES,
	FILTER_GENRE,
	FILTER_PRICE,
	FILTER_LANGUAGE,
	FILTER_ONSALE,
	SORT_ORDER,
	APPLY_FILTERS,
	GET_BOOKS_BY_TITLE_OR_AUTHOR,
	RESET_DETAILS,
	ADD_CART,
	DEL_CART,
	DEL_ALL_CART,
	RESET_FILTERS,
	SIGN_UP,
	LOGIN,
	SIGN_OUT,
	CHECK_STATES,
	GET_USERS,
	USER_GET_FAVORITES,
	POST_COMMENT,
	CREATE_BOOK,
	LOGIN_GOOGLE,
	USER_DEL_FAVORITES,
	UPDATE_USER,
	USER_ADD_FAVSTATE,
	GET_CART,
	REMOVE_BOOK_CART_DB,
	CLEAR_CART,
	SEARCH_BOOK,
	HIDE_BOOKS,
	SHOW_BOOKS,
	CHECKOUT_CART,
	BAN_USER,
	FILTERED_ADMIN_BOOKS,
	FILTERED_ADMIN_USER,
	GET_PURCHASED_CART,
	GET_ACTIVE_CART,
	EMPTY_PURCHASED_CART,
	USER_GET_COMMENTS,
	USER_GET_PURCHASES,
	USER_SUBSCRIBE,
	UNBAN_USER,
} from '../actions/actionTypes';

// ------------LocalStorage constants------------
let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
if (!cartFromLocalStorage) {
	cartFromLocalStorage = [];
}

let favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites'));
if (!favoritesFromLocalStorage) {
	favoritesFromLocalStorage = [];
}

let summaryFromLocalStorage = JSON.parse(localStorage.getItem('summary'));
if (!summaryFromLocalStorage) {
	summaryFromLocalStorage = 0;
}

let tokenFromLocalStorage = localStorage.getItem('token');
if (!tokenFromLocalStorage) {
	tokenFromLocalStorage = '';
}
let isSignedInFromLocalStorage = localStorage.getItem('isSignedIn');
if (!isSignedInFromLocalStorage) {
	isSignedInFromLocalStorage = false;
}
let userIdFromLocalStorage = localStorage.getItem('userId');
if (!userIdFromLocalStorage) {
	userIdFromLocalStorage = false;
}
let userRoleFromLocalStorage = localStorage.getItem('userRole');
if (!userRoleFromLocalStorage) {
	userRoleFromLocalStorage = null;
}
let userProfileImageFromLocalStorage = localStorage.getItem('userProfileImage');
if (!userProfileImageFromLocalStorage) {
	userProfileImageFromLocalStorage = '';
}

let userNameFromLocalStorage = localStorage.getItem('userName');
if (!userNameFromLocalStorage) {
	userNameFromLocalStorage = '';
}

let userEmailFromLocalStorage = localStorage.getItem('userEmail');
if (!userEmailFromLocalStorage) {
	userEmailFromLocalStorage = '';
}

// ----------------------------------------------

// initial states

const InitialState = {
	books: [],
	query: '',
	details: {},
	genres: [],
	booksCopy: [],
	booksAutocomplete: [],
	loading: true,
	filters: {
		genres: [],
		rating: '',
		price: [0, 60],
		onsale: false,
		currency: '',
		language: '',
		order: '',
	},
	isBoxChecked: [],
	cart: cartFromLocalStorage,
	summary: summaryFromLocalStorage,
	token: tokenFromLocalStorage,
	registeredUsers: [],
	adminBooks: [],
	adminBooksCopy: [],
	userRole: userRoleFromLocalStorage,
	userId: userIdFromLocalStorage,
	userName: userNameFromLocalStorage,
	userEmail: userEmailFromLocalStorage,
	userProfilePicture: userProfileImageFromLocalStorage,
	subscribed: '',
	allUsers: [],
	allUsersCopy: [],
	isSignedIn: isSignedInFromLocalStorage,
	allFavourites: favoritesFromLocalStorage,
	purchasedCart: [],
	comments: [],
	purchases: [],
};

const rootReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_DETAILS: {
			return {
				...state,
				details: action.payload,
				loading: false,
			};
		}
		case GET_BOOKS: {
			return {
				...state,
				// books: action.payload,
				// booksCopy: action.payload,
				adminBooks: action.payload,
				adminBooksCopy: action.payload,
				loading: false,
			};
		}
		case GET_BOOKS_BY_TITLE_OR_AUTHOR: {
			if (typeof action.payload.data === 'string') {
				return {
					...state,
					books: [],
					query: action.payload.query,
				};
			}
			if (!action.payload.query) {
				return {
					...state,
					booksAutocomplete: action.payload.data,
					booksCopy: action.payload.data,
					books: action.payload.data,
					query: action.payload.query,
					loading: false,
				};
			} else {
				return {
					...state,
					booksCopy: action.payload.data,
					books: action.payload.data,
					query: action.payload.query,
					loading: false,
				};
			}
		}
		case GET_GENRES: {
			return {
				...state,
				genres: action.payload,
			};
		}

		case POST_COMMENT: {
			return {
				...state,
				details: {
					...state.details,
					Comments: [
						...state.details.Comments,
						{
							text: action.payload.comment,
							rating: action.payload.rating,
							BookId: action.payload.bookId,
							UserId: action.payload.userId,
						},
					],
				},
			};
		}
		//---------------------------------------------FILTERS & SORTS------------------------------------------------
		//guardo el filtro pór generos en el estado global
		case FILTER_GENRE:
			return {
				...state,
				filters: {
					...state.filters,
					genres: action.payload,
				},
			};

		//guardo el filtro pór precios en el estado global
		case FILTER_PRICE:
			return {
				...state,
				filters: {
					...state.filters,
					price: action.payload,
				},
			};

		//guardo el filtro pór lenguajes en el estado global
		case FILTER_LANGUAGE:
			return {
				...state,
				filters: {
					...state.filters,
					language: action.payload,
				},
			};

		//guardo el filtro pór ofertas en el estado global
		case FILTER_ONSALE:
			return {
				...state,
				filters: {
					...state.filters,
					onsale: action.payload,
				},
			};

		//guardo el ordenamiento en el estado global
		case SORT_ORDER:
			return {
				...state,
				filters: {
					...state.filters,
					order: action.payload,
				},
			};

		//guardo el filtro pór ofertas en el estado global
		case RESET_FILTERS:
			return {
				...state,
				filters: {
					genres: [],
					rating: '',
					price: [0, 60],
					onsale: false,
					currency: '',
					language: '',
					order: '',
				},
			};

		// Aplico los filtros del estado global (filters)
		case APPLY_FILTERS: {
			//------------------------------------------FILTERS----------------------------------------
			var filteredBooks = state.booksCopy.filter((book) => {
				//variable donde se guardaran los libros que coincidan con todas las condiciones

				//asumo que el libro debe incluirse y si no cumple algun filtro devuelvo false para q sea filtrado (no se incluya en el array)

				//--------Filtro por oferta------------

				if (state.filters.onsale && book.flag !== 'on-sale')
					return false;

				//--------Filtro por moneda------------
				//if (state.filters.currency && state.filters.currency!==book.currency) return false

				//--------Filtro por lenguaje------------
				if (
					state.filters.language &&
					state.filters.language !== book.Languages[0].name
				)
					return false;

				//--------Filtro por precio------------
				if (
					book.price < state.filters.price[0] ||
					book.price > state.filters.price[1]
				)
					return false;

				//--------Filtro por genero------------
				if (state.filters.genres.length) {
					let bookgenres = book.Genres.map((g) => g.name);
					let flag = true;
					state.filters.genres.forEach((filtergenre) => {
						if (!bookgenres.includes(filtergenre)) flag = false;
					});
					if (flag === false) return false;
				}

				return true; //si no se corto la ejecucion en ningun momento es porque se cumplen todos los filtros
			});
			//------------------------------------------SORTS----------------------------------------
			if (state.filters.order) {
				//---------------Sorting Function------------------
				var ordern;
				switch (state.filters.order) {
					case 'highest':
						ordern = function (a, b) {
							if (a.rating < b.rating) {
								return 1;
							}
							if (a.rating > b.rating) {
								return -1;
							}
							return 0;
						};
						break;
					case 'lowest':
						ordern = function (a, b) {
							if (a.rating < b.rating) {
								return -1;
							}
							if (a.rating > b.rating) {
								return 1;
							}
							return 0;
						};
						break;
					default:
						ordern = function (a, b) {
							return 0;
						};
						break;
				}
				//-----------------Applying Sort---------------------
				filteredBooks = filteredBooks.sort(ordern);
			}

			//modifico el estado de los libros reemplazando con los libros filtrados y ordenados
			return {
				...state,
				books: filteredBooks,
			};
		}
		//--------------------------------------------El ADMIN CAPO--------------------------------------------------

		case HIDE_BOOKS: {
			let hidden = state.adminBooks.map((b) => {
				if (b.id === action.payload) {
					return {
						...b,
						stock: 0,
					};
				} else {
					return b;
				}
			});
			return {
				...state,
				adminBooks: hidden,
				adminBooksCopy: hidden,
			};
		}
		case SHOW_BOOKS: {
			let shown = state.adminBooks.map((b) => {
				if (b.id === action.payload) {
					console.log(b.title);
					return {
						...b,
						stock: 50,
					};
				} else {
					return b;
				}
			});
			return {
				...state,
				adminBooks: shown,
				adminBooksCopy: shown,
			};
		}

		//-----------------------------------------------------------------------------------------------------

		case RESET_DETAILS: {
			return {
				...state,
				details: {},
			};
		}

		case ADD_CART:
			let exist = state.cart.filter((el) => el.id === action.payload);
			if (exist.length === 1) return state;
			let newItem = state.booksCopy.find((p) => p.id == action.payload);
			let sum = newItem.price;
			return {
				...state,
				cart: [...state.cart, { ...newItem }],
				summary: state.summary + sum,
			};
		case DEL_CART:
			let itemToDelete = state.cart.find((p) => p.id === action.payload);
			let substr = itemToDelete.price;
			return {
				...state,
				cart: state.cart.filter((p) => p.id !== action.payload),
				summary: state.summary - substr,
			};

		case DEL_ALL_CART:
			return {
				...state,
				cart: [],
				summary: 0,
			};
		case GET_CART: {
			var arrayBooks = action.payload.Books;
			var arrayNuevo = arrayBooks.map((b) => b.price);
			var suma = 0;
			for (let i = 0; i < arrayNuevo.length; i++) {
				suma += arrayNuevo[i];
			}

			var booksLS = JSON.parse(localStorage.getItem('cart'));

			let nuevo = arrayBooks.concat(booksLS);

			console.log(nuevo, 'books');

			return {
				...state,
				cart: arrayBooks,
				summary: suma,
			};
		}

		case CHECKOUT_CART: {
			return {
				...state,
				purchasedCart: {
					Books: state.cart,
					Total: state.summary,
					CartId: action.payload,
				},
				summary: 0,
				cart: [],
			};
		}
		case EMPTY_PURCHASED_CART: {
			return {
				...state,
				purchasedCart: { Books: [], Total: 0, CartId: '' },
			};
		}
		case REMOVE_BOOK_CART_DB: {
			return {
				...state,
			};
		}
		case CLEAR_CART: {
			return {
				...state,
				cart: [],
				summary: 0,
			};
		}
		case GET_PURCHASED_CART: {
			return {
				...state,
				purchasedCart: action.payload,
				loading: false,
			};
		}
		case LOGIN:
			// Signed in, passing token, user role and setting the state "isSignedIn" with value true

			localStorage.setItem('userId', action.payload.id);
			localStorage.setItem('isSignedIn', true);
			localStorage.setItem('userName', action.payload.username);
			localStorage.setItem('userEmail', action.payload.email);
			localStorage.setItem(
				'userProfileImage',
				action.payload.profile_picture
			);

			// localStorage.setItem('token', token);
			// localStorage.setItem('userRole', userRole);
			return {
				...state,
				token: action.payload.token,
				userRole: action.payload.status,
				userId: action.payload.id,
				userName: action.payload.username,
				userEmail: action.payload.email,
				userProfilePicture: action.payload.profile_picture,
				isSignedIn: true,
				registeredUsers: [],
				subscribed: action.payload.subscribed,
			};
		case LOGIN_GOOGLE:
			localStorage.setItem('userId', action.payload.id);
			localStorage.setItem('isSignedIn', true);
			localStorage.setItem('userName', action.payload.username);
			localStorage.setItem('userEmail', action.payload.email);
			localStorage.setItem(
				'userProfileImage',
				action.payload.profile_picture
			);
			return {
				...state,
				token: action.payload.token,
				userRole: action.payload.status,
				userId: action.payload.id,
				userName: action.payload.username,
				userEmail: action.payload.email,
				userProfilePicture: action.payload.profile_picture,
				isSignedIn: true,
				subscribed: action.payload.subscribed,
			};

		case UPDATE_USER:
			localStorage.setItem(
				'userProfileImage',
				action.payload.profile_picture
			);
			return {
				...state,
				userId: action.payload.id,
				userName: action.payload.username,
				userEmail: action.payload.email,
				userProfilePicture: action.payload.profile_picture,
			};
		case CHECK_STATES:
			return {
				...state,
			};
		case SIGN_UP:
			return {
				...state,
				registeredUsers: action.payload,
				// tal vez lo podemos usar para mostrar los usuarios registrados en admin dashboard
			};
		case SIGN_OUT:
			// We clear the whole localStorage and set isSignedIn false, and the token as an empty string
			localStorage.setItem('cart', JSON.stringify([]));
			localStorage.setItem('isSignedIn', false);
			localStorage.setItem('userId', null);
			localStorage.setItem('userRole', null);
			localStorage.setItem('userEmail', null);
			localStorage.setItem('summary', 0);
			localStorage.removeItem('token');

			return {
				...state,
				token: '',
				isSignedIn: false,
				userId: null,
				cart: [],
				summary: 0,
				userRole: null,
				userEmail: null,
				subscribed: 'Unsubscribed',
			};
		case USER_GET_COMMENTS:
			return {
				...state,
				comments: action.payload,
			};
		case USER_GET_PURCHASES:
			return {
				...state,
				purchases: action.payload,
			};
		case USER_GET_FAVORITES:
			let favoriteBooks = [];
			let booksIds = action.payload;

			favoriteBooks = state.booksCopy.filter((e) =>
				booksIds.includes(e.id)
			);

			// localStorage.setItem('favorites', favoriteBooks);
			return {
				...state,
				allFavourites: favoriteBooks,
			};
		case USER_ADD_FAVSTATE:
			let existsFav = state.allFavourites.filter(
				(el) => el.id === action.payload
			);
			if (existsFav.length === 1) return state;
			let favBook = state.booksCopy.find((p) => p.id === action.payload);
			return {
				...state,
				allFavourites: [...state.allFavourites, { ...favBook }],
			};
		case USER_DEL_FAVORITES:
			// localStorage.removeItem('favorites');
			return {
				...state,
				allFavourites: state.allFavourites.filter(
					(p) => p.id !== action.payload
				),
			};
		case GET_USERS:
			return {
				...state,
				allUsers: action.payload,
				allUsersCopy: action.payload,
			};
		case BAN_USER:
			return {
				...state,
				allUsers: state.allUsers.map((u) => {
					if (u.id === action.payload)
						return {
							...u,
							status: 'Banned',
						};
					return u;
				}),
			};
		case UNBAN_USER:
			let removedUnban = state.allUsers.filter(
				(e) => e.id !== action.payload.id
			);
			return {
				...state,
				allUsers: [action.payload, ...removedUnban],
			};

		case USER_SUBSCRIBE: {
			return {
				...state,
				subscribed: 'Subscribed',
			};
		}
		case FILTERED_ADMIN_BOOKS:
			let filteredBooksSearch = [];
			state.adminBooks = state.adminBooksCopy;

			if (action.payload === '') {
				filteredBooksSearch = state.adminBooks;
			} else {
				state.adminBooks.map((e) => {
					if (
						e.title
							.toLowerCase()
							.includes(action.payload.toLowerCase())
					) {
						filteredBooksSearch.push(e);
					}
				});
			}
			return {
				...state,
				adminBooks: filteredBooksSearch,
			};
		case FILTERED_ADMIN_USER:
			let filteredUserSearch = [];
			state.allUsers = state.allUsersCopy;

			if (action.payload === '') {
				filteredUserSearch = state.allUsers;
			} else {
				state.allUsers.map((e) => {
					if (
						e.username
							.toLowerCase()
							.includes(action.payload.toLowerCase())
					) {
						filteredUserSearch.push(e);
					}
				});
			}
			return {
				...state,
				allUsers: filteredUserSearch,
			};
		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
