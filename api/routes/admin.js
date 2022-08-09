const express = require('express');
const { Router } = require('express');
const passport = require("passport");
const { banUser, unbanUser, upgradeToAdmin, hideBook, showBook, deleteComment, getAllOrders } = require("../controllers/adminControllers");

const router = Router();

router.put("/ban", banUser);

router.put("/unban", unbanUser);

router.put("/upgrade", upgradeToAdmin);

router.put("/hide", hideBook);

router.put("/show", showBook)

router.put("/comment", deleteComment);

router.get("/orders", getAllOrders);

module.exports = router;