const express = require('express');
const { Router } = require('express');
const { orderConfirmation, userCreated, newsletterUpdate, newOffers, passwordRecovery, specificOffer } = require("../controllers/mailControllers")

const router = Router();

router.put("/order", orderConfirmation);

router.put("/signup", userCreated);

router.put("/subscribe", newsletterUpdate);

router.put("/password", passwordRecovery);

router.put("/offers", newOffers);

router.put("/favorites", specificOffer);

module.exports = router;