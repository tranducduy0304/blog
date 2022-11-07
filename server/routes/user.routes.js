const express = require('express');
const userController = require('../controllers/user.controller');
const middleware = require('../authentication/authentication');
const validate = require('express-validation');

const router = express.Router();

// GET ALL USERS
router.get("/", middleware.verifyToken, middleware.verifyTokenAndAdminAuth, userController.allUser);

// DELETE USER
router.delete("/delete/:id", [middleware.verifyToken,  middleware.verifyTokenAndAdminAuth], userController.deleteUser);

// UPDATE USER
router.put("/update/:id", [middleware.verifyToken,  middleware.verifyTokenAndAdminAuth], userController.updateUser);

module.exports = router;