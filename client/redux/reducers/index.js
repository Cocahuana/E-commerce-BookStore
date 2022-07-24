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
} from '../actions/actionTypes';

// initial states

const InitialState = {
	books: [],
	details: {},
	genres: [],
	booksCopy: [],
	loading: true,
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
			var newArrFilterCreate = [];

			newArrFilterCreate = state.booksCopy.filter((p) => {
				var flag = false;
				p.Genres.forEach((element) => {
					if (element.name === action.payload) {
						flag = true;
					}
				});
				return flag;
			});

			return {
				...state,
				books: [...newArrFilterCreate],
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
