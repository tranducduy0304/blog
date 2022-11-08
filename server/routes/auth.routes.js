const express = require('express');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require("../authentication/authentication");
const userMiddleware = require('../middleware/user.middeware');
const userValidation = require('../validation/user.validation');
const {validate} = require('express-validation');



const router = express.Router();

// REGISTER
router.post("/register", [validate(userValidation.createValidation, {keyByField: true}, {}), userMiddleware.checkDuplicateUsername, userMiddleware.checkDuplicatePhoneNumber, userMiddleware.checkDuplicateEmail], authController.register);

// LOGIN
router.post("/login", authController.login);

// LOGOUT 
router.post("/logout", verifyToken, authController.logOut)

module.exports = router;