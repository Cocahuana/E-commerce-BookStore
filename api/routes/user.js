const express = require('express');
const { Router } = require('express');
const { 
    registerUser,
    userLogin,
} = require('../controllers/userControllers');


const router = Router();

router.post('/register', registerUser)

router.post('/login', userLogin)


module.exports = router;