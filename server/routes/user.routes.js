const express = require('express');
const userController = require('../controllers/user.controller');
const middleware = require('../middleware/middleware');

const router = express.Router();

// GET ALL USERS
router.get("/", middleware.verifyToken, middleware.verifyTokenAndAdminAuth, userController.allUser);

//DELETE USER
router.delete("/delete/:id", middleware.verifyToken, middleware.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;