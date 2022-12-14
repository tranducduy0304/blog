const jwt = require("jsonwebtoken");
const User = require("../models/User.model")

const middleware = {
  // VERIFY ACCEPT TOKEN
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
         return res.status(403).json("Token is not valid!")
        }
        req.user = user;
        next()
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },

  // VERIFY TOKEN AND ADMIN 
  verifyTokenAndAdminAuth: (req, res, next) => {
    middleware.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin ) {
          next();
      } else {
        res.status(403).json("You're not allowed to delete other user")
      }
    }) 
  }
}

module.exports = middleware;