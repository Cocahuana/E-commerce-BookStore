const express = require('express');
const { Router } = require('express');
const {
	registerUser,
	userLogin,
	searchUserByUsername,
	addFavorite,
	getFavorite,
	deleteFavorite,
	searchUserById,
	getAllUsers,
} = require('../controllers/userControllers');

const router = Router();

router.post('/register', registerUser);

router.post('/login', userLogin);

// router.get('/search/:username', searchUserByUsername);

router.get('/search/:id', searchUserById);

router.get('/all', getAllUsers);

router.put('/favorites', addFavorite);

router.get('/favorites/:idUser', getFavorite);

router.delete('/favorites', deleteFavorite);

module.exports = router;
