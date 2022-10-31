const Blog = require('../models/Blog.model');
const { Request, Response} = require('express');
const blogServices = require('../services/blog.services');

require('dotenv').config();

const blogController = {
    // CREATE 
    createBlog: (req, res) => {
        try {
            const blog = blogServices.createBlog(req.body);
            return res.json({
                method: 'POST',
                status: 'success',
                description: 'Create a new blog',
                data: blog
            })
        } catch(err) {
            res.status(400).json({
                'message': 'Blog cannot be created!',
                'err': err.message
            })
        }
    },

    // LIST ALL BLOGS
    getAllBlogs: async(req, res) => {
        try {
            const blog = await blogServices.getAllBlogs();
            return res.json({
                method: 'GET',
                status: 'success',
                description: 'List all blog',
                data: blog
            })
        } catch(err) {
            res.status(400).json({
                'message': 'Error occured!',
                'err': err.message
            })
        }
    },

    // DELETE
    deleteBlog: async(req, res) => {
        try {
            const blog = await blogServices.deleteBlog(req.params.id);

            return res.json({
                method: 'DELETE',
                status: 'success',
                data: blog
            });
        } catch (error) {
            res.status(400).json("ERROR: " + error);
        }
    },

    // UPDATE
    updateBlog: async(req, res) => {
        try{
            const blog = await blogServices.updateBlog(req.params.id, req.body);
            return res.json({
                method: 'DELETE',
                status: 'success',
                data: blog
            });
        } catch (error) {
            res.status(400).json("ERROR: " + error);
        }
    }

    
}

module.exports = blogController;

