const User = require("../models/User.model");

require('dotenv').config();
    
const userServices = {
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