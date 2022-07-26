const express = require('express');
const { Router } = require('express');
const {
	getBookById,
	deleteBookById,
	postBook,
	putBook,
	findAllBooks,
	findByAuthorOrTitle,
} = require('../controllers/bookControllers');


const router = Router();

router.get('/', findAllBooks);

router.get('/:id', getBookById);

router.delete('/:id', deleteBookById);

router.post('/', postBook);

router.put('/', putBook);

router.get('/search', findByAuthorOrTitle);


module.exports = router;