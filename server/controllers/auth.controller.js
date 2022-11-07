const  User = require("../models/User.model");
const authServices = require("../services/auth.services");
const {Request, Response} = require('express');

require('dotenv').config();

let refreshTokens = [];

const authController = {
    // REGISTER
    register: async (req, res) => {
        try { 
            const user = await authServices.register(req.body);
            return res.json({
                method: 'POST',
                status: 'success',
                description: 'Create a new user',
                data: user
            })
            
            }catch (err) {
                res.status(401).json({
                    message: "User not successfull created.",
                    err: err.message,
            })
        }
    },
    
    // LOGIN
    login: async (req, res) => {
        try {
            const user = await authServices.login(req.body.username, req.body.password);
            // STORE REFRESH TOKEN IN COOKIE
            res.cookie("refreshToken", user["refresh-token"], {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            return res.json({
                method: 'POST',
                status: 'success',
                data:{ 
                    'message': user.message,
                    'admin': user.isAdmin,
                    'access-token': user["access-token"],
            }
            });
        } catch (error) {
            res.status(400).json("ERROR: " + error);
        }
    },

    //I have a problems with it, I wwil try to handle it sooon.
    
    //REQUEST REFRESH TOKEN
    // requestRefreshToken: async(req, res) => {
    //     // Take refresh token from users cookie
    //     const refreshToken = await req.cookies.refreshToken;
    //     if (!refreshToken) return res.status(401).json("You're not authenticated");
    //     // if (!refreshTokens.includes(refreshToken)) {
    //     //     return res.status(400).json("Refresh token is not valid")
    //     // }
    //     jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         // console.log(refreshTokens)
    //         refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    //         // Create new access token and refresh token
    //         const newAccessToken = userServices.generateAccessToken(user);
    //         const newRefreshToken = userServices.generateRefreshToken(user);
    //         refreshTokens.push(newRefreshToken)
    //         refreshTokens.push(refreshToken);
    //         res.cookie("refreshToken", newRefreshToken, {
    //             httpOnly: true,
    //             secure: false,
    //             path: "/",
    //             sameSite: "strict",
    //         });
    //         res.status(200).json({accessToken: newAccessToken});
    //     })
    // },

    // LOGOUT
    logOut: async (req, res) => {
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.clearCookie('refreshToken');
        res.status(200).json("Logged out successfully!");
    }
}

module.exports = authController;
