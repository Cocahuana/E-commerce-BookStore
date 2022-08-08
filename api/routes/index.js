const express = require('express');
const { Router } = require('express');
const bookRoutes = require('./books');
const userRoutes = require('./user');
const adminRoutes = require('./admin');
const cartRoutes = require('./cart');
const mailRoutes = require('./mail');
const paymentRoutes = require('./payment');
const { allGenres } = require('../controllers/bookControllers');
const passport = require('passport');
//AUTHENTICATION
//passport.authenticate('jwt-auth', {session: false})

//AUTHORIZATION
//passport.authenticate('jwt-admin', {session: false})
//passport.authenticate('jwt-banned', {session: false})

/* GET home page. */

const router = Router();

router.use('/books', bookRoutes);

router.get('/genres', allGenres);

router.use('/user', userRoutes);

router.use(
	'/admin',
	// passport.authenticate('jwt-admin', { session: false }),
	adminRoutes
);

router.use('/cart', cartRoutes);

router.use('/mail', mailRoutes);

router.use('/payment', paymentRoutes);

module.exports = router;
