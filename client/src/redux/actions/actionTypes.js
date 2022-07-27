import axios from 'axios';
// Export all actions types

// export const GET_ALL_BOOKS = 'GET_ALL_BOOKS';

// -------------GET BOOKS-------------
export const GET_DETAILS = 'GET_DETAILS';
export const GET_BOOKS = 'GET_BOOKS';
export const GET_GENRES = 'GET_GENRES';
export const GET_BOOKS_BY_TITLE_OR_AUTHOR = 'GET_BOOKS_BY_TITLE_OR_AUTHOR';
export const RESET_DETAILS = 'RESET_DETAILS';

// -------------FILTER/SORT-------------
export const FILTER_GENRE = 'FILTER_GENRE';
export const FILTER_PRICE = 'FILTER_PRICE';
export const FILTER_LANGUAGE = 'FILTER_LANGUAGE';
export const FILTER_ONSALE = 'FILTER_ONSALE';
export const SORT_ORDER = 'SORT_ORDER';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const RESET_FILTERS = 'RESET_FILTERS';

// -------------LOADING-------------
export const LOADING = 'LOADING';

// -------------CART-------------
export const ADD_CART = 'ADD_CART';
export const DEL_CART = 'DEL_CART';
export const DEL_ALL_CART = 'DEL_ALL_CART';

//------------USER---------------
export const LOGIN = 'LOGIN'
export const SIGN_UP = 'SIGN_UP'
