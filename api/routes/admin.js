const express = require('express');
const { Router } = require('express');
const passport = require("passport");
const { banUser, upgradeToAdmin, hideBook } = require("../controllers/adminControllers");

const router = Router();

router.put("/ban", passport.authenticate('jwt-admin', {session: false}), banUser);

router.put("/upgrade", passport.authenticate('jwt-admin', {session: false}), upgradeToAdmin);

router.put("/hide", passport.authenticate('jwt-admin', {session: false}), hideBook);

module.exports = router;