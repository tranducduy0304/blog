const express = require('express');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require("../authentication/authentication");



const router = express.Router();

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

// LOGOUT 
router.post("/logout", verifyToken, authController.logOut)

module.exports = router;