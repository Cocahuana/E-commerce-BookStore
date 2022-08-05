const express = require('express');
const { Router } = require('express');
const {
	getCart,
	getAllCarts,
	addBookToCart,
	removeOneBookFromCart,
	removeAllBooksFromCart,
	clearCart,
	checkoutCart,
	bulkAdd,
} = require('../controllers/cartControllers');
const passport = require('passport');

const router = Router();

router.get('/', getCart);

router.get('/all', getAllCarts);

router.post('/', addBookToCart);

router.put('/', removeOneBookFromCart);

router.put('/all', removeAllBooksFromCart);

router.put('/clear', clearCart);

router.put(
	'/checkout',
	passport.authenticate('jwt-auth', { session: false }),
	checkoutCart
);
//,

router.post('/bulk', bulkAdd);

module.exports = router;
