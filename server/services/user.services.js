const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const errMessages = require("../const/err-messages.const");
const userConst = require("../const/user.const");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { parse } = require("dotenv");
const cookieParser = require("cookie-parser");

require('dotenv').config();
    
const userServices = {
    hashPassword: async(password) => {
        // Generate salt to hash password
        const salt = await bcrypt.genSalt(userConst.SALT_VALUE);
        // Set user password to hashed password
        password = await bcrypt.hash(password, salt)
        return password;
    },
    
    // REGISTER
    register: async(data) => {
        const user = new User(data);
        user.password = await userServices.hashPassword(user.password);
            user.save();
            return user;
    },
    
    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "20s" }
        );
    },
    
    // GENERATE REFRESH TOKEN 
    generateRefreshToken: (user) => {
        return jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn: "365d" }
        )
    },

    // LOGIN
    login: async(username, password) => {
        const user = await User.findOne({ username: username});
        
        if (user) {
            const admin = user.admin;
            const validPassword =  bcrypt.compare(password, user.password);
            if (validPassword) {
                const accessToken = userServices.generateAccessToken(user);
                const refreshToken = userServices.generateRefreshToken(user);
                // console.log(accessToken, refreshToken)
                return {
                    'username': username, 
                    'isAdmin': admin, 
                    'access-token': accessToken,
                    'refresh-token': refreshToken,
                }
            } else {
                return {'message': errMessages.LOGIN_PASSWORD_FAIL}
            }
        } else {
            return {'message':errMessages.LOGIN_USERNAME_FAIL}
        }
    },
    
    // GET ALL USER
    getAllUser: async() => {
        return await User.find({}).select('username admin')
    },
    
    // DELETE 
    deleteUser: async(id) => {
        return await User.findOneAndDelete({id: id}).select('id username admin')
    },

}

module.exports = userServices;