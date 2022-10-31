const  User = require("../models/User.model");
const userServices = require("../services/user.services");

const useController = {

    // GET ALL USERS
    allUser: async (req, res) => {
        try {
            const user = await userServices.getAllUser();
            return res.json({
                method: 'GET',
                status: 'success',
                description: 'List all users',
                data: user
            })
        } catch (error) {
            res.status(400).json("ERROR: " + error);
        }
    },

    // DELETE
    deleteUser: async (req, res) => {
        try {
            const user = await userServices.deleteUser(req.params.id);
            
            return res.json({
                method: 'POST',
                status: 'success',
                data: user
            });
        } catch (error) {
            res.status(400).json("ERROR: " + error);
        }
    }
}

module.exports = useController;
