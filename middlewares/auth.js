const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

const auth = {
    isAuthenticated: async (req, res, next) => {
        try {
            // get the token from the request cookies
            const token = req.cookies.token;

            // verify token 
            const decoded = jwt.verify(token, JWT_SECRET);

            // get the userId from the decoded
            req.userId = decoded.id;

            // call the next middleware
            next();

        }
        catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    },
    allowRoles: (roles) => {
        return async (req, res, next) => {
            if (!req.userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // get the userId from the request
            const userId = req.userId;

            // get the user from the database
            const user = await User.findById(userId);

            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // check the user has the required role
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        }
    }
}

module.exports = auth;