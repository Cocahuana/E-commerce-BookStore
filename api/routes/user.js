const express = require('express');
const { Router } = require('express');
const { 
    registerUser,
    userLogin,
    searchUserByUsername,
} = require('../controllers/userControllers');


const router = Router();

router.post('/register', registerUser)

router.post('/login', userLogin)

router.get('/search/:username', searchUserByUsername)


module.exports = router;