const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const blogRouter = require('./blog.routes')
const express = require('express');
const { model } = require('mongoose');
const { application } = require('express');

function route(app) {
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.use(( err, req, res, next) => {
        console.log(err);
        res.status(500).send("Something broken!")
    });
}

module.exports = route;