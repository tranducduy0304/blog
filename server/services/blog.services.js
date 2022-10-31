const User = require("../models/User.model");
const Blog = require("../models/Blog.model");
const bcrypt = require("bcrypt");
const errMessages = require("../const/err-messages.const");
const userConst = require("../const/user.const");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { parse } = require("dotenv");
const cookieParser = require("cookie-parser");
const { schema } = require("../models/Blog.model");
const { getAllBlogs } = require("../controllers/blog.controller");

require('dotenv').config();

const blogServices = {
    // CREATE A BLOG
    createBlog: (data) => {
        const blog = new Blog(data);
        blog.save()
        return blog;
    },

    // LIST ALL BLOGS
    getAllBlogs: async() => {
        return await Blog.find({}).select("author, title");
    },

    // DELETE
    deleteBlog: async(id) => {
        return await Blog.findByIdAndDelete(id).select('id author title')

    },

    // UPDATE
    updateBlog: async(id, data) => {
        return await Blog.findByIdAndUpdate(id, data)
    }
}

module.exports = blogServices;