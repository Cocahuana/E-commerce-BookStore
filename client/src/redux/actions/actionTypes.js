// Export all actions types

// export const GET_ALL_BOOKS = 'GET_ALL_BOOKS';

// -------------GET BOOKS-------------
export const GET_DETAILS = 'GET_DETAILS';
export const GET_BOOKS = 'GET_BOOKS';
export const GET_GENRES = 'GET_GENRES';
export const GET_BOOKS_BY_TITLE_OR_AUTHOR = 'GET_BOOKS_BY_TITLE_OR_AUTHOR';
export const RESET_DETAILS = 'RESET_DETAILS';
export const GET_USERS = 'GET_USERS';
export const POST_COMMENT = 'POST_COMMENT';

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

// -------------Utils-------------
// Lo bueno de check states es que podes hacer un destructuring
// en useEffect que escuche cambios en el estado que vos necesites,
// no hay de que ;) -- Ezui
export const CHECK_STATES = 'CHECK_STATES';

// -------------CART-------------
export const ADD_CART = 'ADD_CART';
export const DEL_CART = 'DEL_CART';
export const DEL_ALL_CART = 'DEL_ALL_CART';
export const GET_CART = 'GET_CART';
export const REMOVE_BOOK_CART_DB = 'REMOVE_CART_DB';
export const CLEAR_CART = 'CLEAR_CART';
export const CHECKOUT_CART = 'CHECKOUT_CART';
export const EMPTY_PURCHASED_CART = 'EMPTY_PURCHASED_CART';
export const GET_PURCHASED_CART = 'GET_PURCHASED_CART';
export const GET_ACTIVE_CART = 'GET_ACTIVE_CART';

//------------USER---------------
export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const USER_GET_FAVORITES = 'USER_GET_FAVORITES';
export const USER_GET_COMMENTS = 'USER_GET_COMMENTS';
export const USER_GET_PURCHASES = 'USER_GET_PURCHASES';
export const USER_DEL_FAVORITES = 'USER_DEL_FAVORITES';
export const USER_ADD_FAVSTATE = 'USER_ADD_FAVSTATE';
export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';
export const UPDATE_USER = 'UPDATE_USER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const USER_SUBSCRIBE = 'USER_SUBSCRIBE';

//------------ADMIN---------------
export const CREATE_BOOK = 'CREATE_BOOK';
export const MODIFY_BOOK = 'CREATE_BOOK';
export const SEARCH_BOOK = 'SEARCH_BOOK';
export const HIDE_BOOKS = 'HIDE_BOOKS';
export const SHOW_BOOKS = 'SHOW_BOOKS';
export const UPGRADE_USER = 'UPGRADE_USER';
export const BAN_USER = 'BAN_USER';
export const UNBAN_USER = 'UNBAN_USER';
export const FILTERED_ADMIN_BOOKS = 'FILTERED_ADMIN_BOOKS';
export const FILTERED_ADMIN_USER = 'FILTERED_ADMIN_USER';
