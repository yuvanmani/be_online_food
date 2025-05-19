const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

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
    }
}

module.exports = auth;