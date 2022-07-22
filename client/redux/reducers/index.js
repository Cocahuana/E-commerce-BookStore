// import actions types
// import { GET_ALL_BOOKS } from '../actions/actionTypes'
import {
	GET_DETAILS,
	GET_BOOKS,
	GET_BOOKS_BY_TITLE_OR_AUTHOR,
} from '../actions/actionTypes';

// initial states

const InitialState = {
	books: [],
	details: {},
};

const rootReducer = (state = InitialState, action) => {
	switch (action.type) {
		// case GET_ALL_BOOKS: {
		//     return {
		//         ...state,
		//         books: action.payload
		//     }
		// }

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
			};
		}
		case GET_BOOKS_BY_TITLE_OR_AUTHOR: {
			return {
				...state,
				books: action.payload,
			};
		}

		default: {
			return state;
		}
	}
};

export default rootReducer;
