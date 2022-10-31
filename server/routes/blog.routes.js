const express = require('express');
const blogController = require('../controllers/blog.controller');
const {validate} = require('express-validation');
const { adminAuth, userAuth } = require("../auth/jwt.auth");

const router = express.Router();

// CREATE A BLOG
router.post("/create", blogController.createBlog);

// LIST ALL BLOGS
router.get("/all-blogs", blogController.getAllBlogs);

// DELETE BLOG
router.delete("/delete/:id", blogController.deleteBlog);

// UPDATE BLOG
router.put("/update/:id", blogController.updateBlog);

module.exports = router;