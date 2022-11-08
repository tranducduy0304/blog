const Blog = require("../models/Blog.model");

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