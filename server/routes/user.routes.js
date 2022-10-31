const express = require('express');
const userController = require('../controllers/user.controller');
const {validate} = require('express-validation');
const { adminAuth, userAuth } = require("../auth/jwt.auth");
const middlewareJWT = require('../auth/jwt.auth');

const router = express.Router();

// GET ALL USERS
router.get("/", middlewareJWT.verifyToken, middlewareJWT.verifyTokenAndAdminAuth, userController.allUser);

//DELETE USER
router.delete("/delete/:id", middlewareJWT.verifyToken, middlewareJWT.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;