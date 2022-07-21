const express = require('express');
const { Router } = require('express');
const {
	getPopularBooks,
	getBookById,
	deleteBookById,
	postBook,
	findAllBooks,
} = require('../controllers/bookControllers');

/* GET home page. */

const router = Router();
router.get('/popular', getPopularBooks);

router.get('/books', findAllBooks);

router.get('/books/:id', getBookById);

router.delete('/books/:id', deleteBookById);

router.post('/books', postBook);

module.exports = router;
