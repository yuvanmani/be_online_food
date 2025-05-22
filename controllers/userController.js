const User = require("../models/user");

const userController = {
    getUser: async (req, res) => {
        try {
            const userId = req.userId;

            // get the user from the database
            const user = await User.findById(userId).select("-password -__v -createdAt -isVerified -updatedAt");

            // check the user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // send response to the user
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    getAllusers: async (req, res) => {
        try {
            // get all users from the database
            const users = await User.find().select("-password -__v -createdAt -isVerified -updatedAt")

            if (!users || users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }

            // send response
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    getUserById: async (req, res) => {
        try {
            // get user id from the request params
            const { id } = req.params;

            // find the user by id in the database
            const user = await User.findById(id).select("-password -__v -createdAt -updatedAt -isVerified");

            // check the user in the database
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // send response to the user
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteUserById: async (req, res) => {
        try {
            // get user id from the request params
            const { id } = req.params;

            // find the user by id in the database
            const user = await User.findById(id);

            // check the user in the database
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // delete the user by id
            await User.findByIdAndDelete(id);

            // send response to the user
            return res.status(200).json({ message: "User deleted" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = userController;