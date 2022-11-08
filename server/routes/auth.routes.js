const express = require('express');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require("../authentication/authentication");
const userMiddleware = require('../middleware/user.middeware');
const validate = require('express-validation');



const router = express.Router();

// REGISTER
router.post("/register", [userMiddleware.checkDuplicateUsername, userMiddleware.checkDuplicatePhoneNumber], authController.register);

// LOGIN
router.post("/login", authController.login);

// LOGOUT 
router.post("/logout", verifyToken, authController.logOut)

module.exports = router;