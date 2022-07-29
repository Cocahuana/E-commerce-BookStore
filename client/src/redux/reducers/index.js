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
	CHECK_TOKEN,
	GET_USERS,
	USER_GET_FAVORITES,
} from '../actions/actionTypes';

// ------------LocalStorage constants------------
let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
if (!cartFromLocalStorage) {
	cartFromLocalStorage = [];
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
if (!tokenFromLocalStorage) {
	isSignedInFromLocalStorage = false;
}

// ----------------------------------------------

// initial states

const InitialState = {
	books: [],
	query: '',
	details: {},
	genres: [],
	booksCopy: [],
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
	userRole: null,
	allUsers: [],
	isSignedIn: isSignedInFromLocalStorage,
};

const rootReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_DETAILS: {
			return {
				...state,
				details: action.payload,
			};
		}
		case GET_BOOKS: {
			return {
				...state,
				books: action.payload,
				booksCopy: action.payload,
				adminBooks: action.payload,
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
			return {
				...state,
				booksCopy: action.payload.data,
				books: action.payload.data,
				query: action.payload.query,
			};
		}
		case GET_GENRES: {
			return {
				...state,
				genres: action.payload,
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
				if (state.filters.onsale && !book.flag === 'on-sale')
					return false;

				//--------Filtro por moneda------------
				//if (state.filters.currency && state.filters.currency!==book.currency) return false

				//--------Filtro por lenguaje------------
				if (
					state.filters.language &&
					state.filters.language !== book.language
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
			let newItem = state.booksCopy.find((p) => p.id === action.payload);
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
		case LOGIN:
			// Signed in, passing token, user role and setting the state "isSignedIn" with value true
			localStorage.setItem('isSignedIn', true);
			return {
				...state,
				token: action.payload.token,
				userRole: action.payload.status,
				isSignedIn: true,
			};
		// Aca checkeamos si el estado del token está o no actualizado
		case CHECK_TOKEN:
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
			localStorage.setItem('userRole', null);
			localStorage.removeItem('token');
			return {
				...state,
				token: '',
				isSignedIn: false,
				cart: [],
				summary: 0,
				userRole: null,
			};
		case USER_GET_FAVORITES:
			let favoriteBooks = [];
			let booksIds = action.payload;

			favoriteBooks = state.booksCopy.filter((e) =>
				booksIds.includes(e.id)
			);

			return {
				...state,
				books: favoriteBooks,
			};

		case GET_USERS:
			return {
				...state,
				allUsers: action.payload,
			};

		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
