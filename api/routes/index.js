const express = require('express');
const { Router } = require('express');
const { getPopularBooks, addBooksTodb, addTotalBooks } = require('../controllers/bookControllers') 

/* GET home page. */

const router = Router();
router.get('/popular', getPopularBooks);

router.get('/books', addTotalBooks)



module.exports = router;
