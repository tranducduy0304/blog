const mongooseDelete = require("mongoose-delete");
const mongoose = require("mongoose");
const { text } = require("express");

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    author: {type: String, unique: true, require: true,},
    title: {type: String, maxlength: 200,require: true,},
    content: {type: String, require: true},
    image: {type: String, require: true,},
    category: {type: String, enum: ['Sport', 'Life', 'Game', 'Health', 'Travel'], require: true,},
    //admin: {type: Boolean, default: "false",require: true}
    }, 
    {timestamps: true}
)

const Blog = mongoose.model("blog", BlogSchema);

module.exports = Blog;