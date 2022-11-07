const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const errMessages = require("../const/err-messages.const");
const userConst = require("../const/user.const");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const authServices = {
    // HASH PASSWORD
    hashPassword: async(password) => {
        // Generate salt to hash password
        const salt = await bcrypt.genSalt(userConst.SALT_VALUE);
        // Set user password to hashed password
        password = await bcrypt.hash(password, salt)
        return password;
    },
    
    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            // { expiresIn: "24h" }
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

    // REGISTER
    register: async(data) => {
        const user = new User(data);
        user.password = await authServices.hashPassword(user.password);
            user.save();
            return user;
    },

    // LOGIN
    login: async(username, password) => {
        const user = await User.findOne({ username: username});
        
        if (user) {
            const admin = user.admin;
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const accessToken = authServices.generateAccessToken(user);
                const refreshToken = authServices.generateRefreshToken(user);
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
}

module.exports = authServices;