// import actions types
// import { GET_ALL_BOOKS } from '../actions/actionTypes'
import { filter } from '@chakra-ui/react';
import {
	GET_DETAILS,
	GET_BOOKS,
	GET_GENRES,
	FILTER_GENRE,
	ORDER_RATING,
	GET_BOOKS_BY_TITLE_OR_AUTHOR,
	RESET_DETAILS,
	FILTER_SLIDE,
	LOADING,
	FILTER_GENRES,
} from '../actions/actionTypes';

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
		case FILTER_GENRES:
			return {
				...state,
				filters: {
					...state.filters,
					genres: action.payload,
				},
			};

		case APPLY_FILTERS: {
			// Aplico los filtros del estado global (filters)
			var filteredBooks = state.booksCopy.filter((book) => { //variable donde se guardaran los libros que coincidan con todas las condiciones
				
				var flag = true //asumo que el libro debe incluirse y si no cumple algun filtro cambio la flag para q sea filtrado
				
				//--------Filtro por oferta------------
				if (state.filters.onsale && !book.flag==='on-sale') return false

				//--------Filtro por moneda------------
				if (state.filters.currency && state.filters.currency!==book.currency) return false

				//--------Filtro por lenguaje------------
				if (state.filters.language && state.filters.language!==book.language) return false 
				
				//--------Filtro por genero------------
				if (!state.filters.genres.length) {
					let bookgenres = book.genres.map(g=>g.name)
					state.filters.genres.forEach(filtergenre => {
						if (!bookgenres.includes(filtergenre)) return false
					})
				}
				
				//--------Filtro por precio------------
				if (book.price<state.filters.price[0] || book.price>state.filters.price[1]) return false

			});
		}
		//-----------------------------------------------------------------------------------------------------
		case FILTER_GENRE: {
			let filteredBooks = [];

			if (action.payload.length > 0) {
				for (let i = 0; i < state.booksCopy.length; i++) {
					let flag = false;
					let cont = 0;
					for (let j = 0; j < action.payload.length; j++) {
						if (
							state.booksCopy[i].Genres.map(
								(e) => e.name
							).includes(action.payload[j])
						) {
							cont += 1;
						}
						if (cont === action.payload.length) {
							flag = true;
						}
					}
					if (flag) {
						filteredBooks.push(state.booksCopy[i]);
					}
				}
			} else {
				filteredBooks = [...state.booksCopy];
			}

			return {
				...state,
				books: filteredBooks,
			};
		}
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

		case FILTER_SLIDE:
			let price = [];
			price = state.booksCopy.filter(
				(value) =>
					value.price >= action.payload[0] &&
					value.price <= action.payload[1]
			);
			return {
				...state,
				books: [...price],
			};

		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
