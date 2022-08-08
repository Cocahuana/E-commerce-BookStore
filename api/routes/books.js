const express = require('express');
const { Router } = require('express');
const {
	getBookById,
	postBook,
	putBook,
	findAllBooks,
	findByAuthorOrTitle,
	postComment,
} = require('../controllers/bookControllers');

const passport = require('passport');

const router = Router();

router.get('/', findAllBooks);

router.get('/book/:id', getBookById);

router.post(
	'/',
	// passport.authenticate('jwt-admin', { session: false }),
	postBook
);

router.put(
	'/:id',
	// passport.authenticate('jwt-admin', { session: false }),
	putBook
);

router.post('/comment', postComment);

router.get('/search', findByAuthorOrTitle);

module.exports = router;
