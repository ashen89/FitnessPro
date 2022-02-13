const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const usersController = require("../controllers/usersController");

router.route('/register')
    .get(usersController.newForm)
    .post(catchAsync(usersController.create));

router.route('/login')
    .get(usersController.loginForm)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), usersController.login);

router.get("/logout", usersController.logout);

module.exports = router;
