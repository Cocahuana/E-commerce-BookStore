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
const passport = require('passport') 


const router = Router();

router.get('/', findAllBooks);

router.get('/:id', /*passport.authenticate('jwt', {session: false}),*/ getBookById);

router.delete('/:id', deleteBookById);

router.post('/', postBook);

router.put('/', putBook);

router.get('/search', findByAuthorOrTitle);


module.exports = router;