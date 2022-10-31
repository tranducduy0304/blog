const express = require('express');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require("../middleware/middleware");



const router = express.Router();

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

// REFRESH TOKEN
// router.post("/refresh", authController.requestRefreshToken);

// LOGOUT 
router.post("/logout", verifyToken, authController.logOut)

module.exports = router;