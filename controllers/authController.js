const authController = {
    register: async (req, res) => {
        try {
            return res.status(200).json({ message: "user register okay" })
        }
        catch (error) {
            return res.status(500).json({ message: "Registration failed" })
        }
    },
    login: async (req, res) => {
        try {
            return res.status(200).json({ message: "user login okay" })
        }
        catch (error) {
            return res.status(500).json({ message: "Login failed" })
        }
    },
    logout: async (req, res) => {
        try {
            return res.status(200).json({ message: "user logout okay" })
        }
        catch (error) {
            return res.status(500).json({ message: "Logout failed" })
        }
    },
    me: async (req, res) => {
        try {
            return res.status(200).json({ message: "user me okay" })
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to retrieve user" })
        }
    },
}

module.exports = authController;