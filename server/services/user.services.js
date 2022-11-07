const User = require("../models/User.model");
// const {ObjectId} = require('mongodb');

require('dotenv').config();
    
const userServices = {
    // GET ALL USER
    getAllUser: async() => {
        return await User.find({}).select('username admin')
    },
    
    // DELETE 
    deleteUser: (id) => { 
        return User.deleteOne({_id: id})
    },

    // UPDATE
    updateUser: (id) => {
        return  User.findOneAndUpdate({_id: id}).select('id username fullname email phone_number adress')
    }
}

module.exports = userServices;