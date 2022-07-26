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
	SAVE_CHECKED,
	ADD_CART,
	DEL_CART,
	DEL_ALL_CART,
} from '../actions/actionTypes';

// initial states

const InitialState = {
	books: [],
	details: {},
	genres: [],
	booksCopy: [],
	loading: true,
	isBoxChecked: [],
	cart: [],
	summary: 0,
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

		case SAVE_CHECKED:
			return {
				...state,
				isBoxChecked: action.payload,
			};

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
			};

		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
