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
//AUTHENTICATION
//passport.authenticate('jwt-auth', {session: false})

//AUTHORIZATION
//passport.authenticate('jwt-admin', {session: false})
//passport.authenticate('jwt-banned', {session: false})


const router = Router();

router.get('/', findAllBooks);

router.get('/book/:id', getBookById);

router.delete('/:id', deleteBookById);

router.post('/', postBook);

router.put('/', putBook);

router.get('/search', findByAuthorOrTitle);


module.exports = router;