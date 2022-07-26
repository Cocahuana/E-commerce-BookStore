// import actions types
// import { GET_ALL_BOOKS } from '../actions/actionTypes'
import { filter } from '@chakra-ui/react';
import {
	GET_DETAILS,
	GET_BOOKS,
	GET_GENRES,
	FILTER_GENRE,
	FILTER_PRICE,
	FILTER_LANGUAGE,
	FILTER_ONSALE,
	APPLY_FILTERS,
	ORDER_RATING,
	GET_BOOKS_BY_TITLE_OR_AUTHOR,
	RESET_DETAILS,
	LOADING,
	ADD_CART,
	DEL_CART,
	DEL_ALL_CART,
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

// ----------------------------------------------

// initial states

const InitialState = {
	books: [],
	details: {},
	genres: [],
	booksCopy: [],
	loading: true,
	filters: {
		genres: [],
		rating: '',
		price: [0, 2000],
		onsale: false,
		currency: '',
		language: '',
	},
	isBoxChecked: [],
	cart: cartFromLocalStorage,
	summary: summaryFromLocalStorage,
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
				loading: false,
			};
		}
		case GET_BOOKS_BY_TITLE_OR_AUTHOR: {
			if (typeof action.payload === 'string') {
				return {
					...state,
					books: [],
				};
			}
			return {
				...state,
				books: action.payload,
			};
		}
		case GET_GENRES: {
			return {
				...state,
				genres: action.payload,
			};
		}
		//---------------------------------------------FILTERS------------------------------------------------
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

		// Aplico los filtros del estado global (filters)
		case APPLY_FILTERS: {
			var filteredBooks = state.books.filter((book) => {
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
				if (!state.filters.genres.length) {
					let bookgenres = book.genres.map((g) => g.name);
					state.filters.genres.forEach((filtergenre) => {
						if (!bookgenres.includes(filtergenre)) return false;
					});
				}

				return true; //si no se corto la ejecucion en ningun momento es porque se cumplen todos los filtros
			});

			console.log('reducer', filteredBooks);

			//modifico el estado de los libros reemplazando con los libros filtrados
			return {
				...state,
				books: filteredBooks,
			};
		}
		//-----------------------------------------------------------------------------------------------------
		//----------------------------------------------SORTS--------------------------------------------------
		case ORDER_RATING:
			var ordern;
			switch (action.payload) {
				case 'highToLow':
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
				case 'lowToHi':
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
					break;
			}
			return {
				...state,
				books: [...state.books.sort(ordern)],
			};
		case RESET_DETAILS: {
			return {
				...state,
				details: {},
			};
		}
		//-----------------------------------------------------------------------------------------------------

		case ADD_CART:
			let exist = state.cart.filter((el) => el.id === action.payload);
			if (exist.length === 1) return state;
			let newItem = state.books.find((p) => p.id === action.payload);
			let sum = newItem.price;
			console.log('sum', sum);
			console.log('summary', state.summary);
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

		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
