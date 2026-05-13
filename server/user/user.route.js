const express = require("express");
const UserController = require("./user.controller")
const router = express.Router();

router.post(
    "/signup",
    UserController.createNewUser
)

router.post(
    "/signin",
    UserController.authenticateUser
)

module.exports = router;