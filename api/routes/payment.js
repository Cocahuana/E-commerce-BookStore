const express = require('express');
const { Router } = require('express');

const router = Router();
const { createPayment } = require('../controllers/paymentControllers');

router.post('/create', createPayment);

module.exports = router;
