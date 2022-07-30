const express = require('express');
const { Router } = require('express');
const bookRoutes = require("./books");
const userRoutes = require("./user");
const adminRoutes = require("./admin");
const cartRoutes = require("./cart");
const {	allGenres } = require("../controllers/bookControllers");
const passport = require('passport');
//AUTHENTICATION
//passport.authenticate('jwt-auth', {session: false})

//AUTHORIZATION
//passport.authenticate('jwt-admin', {session: false})
//passport.authenticate('jwt-banned', {session: false})

/* GET home page. */

const router = Router();

router.use("/books", bookRoutes);

router.use("/user", userRoutes);

router.use("/admin", passport.authenticate('jwt-admin', {session: false}), adminRoutes);

router.get('/genres', allGenres);

router.use("/cart", cartRoutes);

module.exports = router;
