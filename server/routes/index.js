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
        return res.status(500).send("Something broken!")
    });

    app.use((req, res, next) => { 
        res.status(404).send("Sorry can't find that!")
    });
}

module.exports = route;