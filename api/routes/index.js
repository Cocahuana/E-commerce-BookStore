const express = require('express');
const { Router } = require('express');
const {
	getPopularBooks,
	addBooksTodb,
	addTotalBooks,
	getBookById,
} = require('../controllers/bookControllers');

/* GET home page. */

const router = Router();
router.get('/popular', getPopularBooks);

router.get('/books', addTotalBooks);

router.get('/books/:id', getBookById);

module.exports = router;
