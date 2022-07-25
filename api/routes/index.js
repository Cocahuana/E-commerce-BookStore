const express = require('express');
const { Router } = require('express');
const {
	getPopularBooks,
	getBookById,
	deleteBookById,
	postBook,
	putBook,
	findAllBooks,
	findByAuthorOrTitle,
	allGenres,
} = require('../controllers/bookControllers');
const { registerUser } = require('../controllers/userControllers');

/* GET home page. */

const router = Router();

//router.get('/popular', getPopularBooks);

router.get('/books', findAllBooks);

router.get('/books/:id', getBookById);

router.delete('/books/:id', deleteBookById);

router.post('/books', postBook);

router.put('/books', putBook);

router.get('/search', findByAuthorOrTitle);

// router.get('/books', findAllBooks);

router.get('/genres', allGenres);

router.post('/register', registerUser)

module.exports = router;
