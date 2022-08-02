const express = require('express');
const { Router } = require('express');
const { orderConfirmation } = require("../controllers/mailControllers")

const router = Router();

router.put("/order", orderConfirmation);

module.exports = router;