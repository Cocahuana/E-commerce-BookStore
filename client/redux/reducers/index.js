// import actions types
// import { GET_ALL_BOOKS } from '../actions/actionTypes'
// initial states

const InitialState = {
	books: [],
};

const rootReducer = (state = InitialState, action) => {
	switch (action.type) {
		// case GET_ALL_BOOKS: {
		//     return {
		//         ...state,
		//         books: action.payload
		//     }
		// }
		default: {
			state;
		}
	}
};

export default rootReducer
