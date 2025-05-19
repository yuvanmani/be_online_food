const express = require("express");
const { register, login, logout, me, verifyOtp } = require("../controllers/authController");
const {isAuthenticated} = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/login", login);

// protected routes
authRouter.post("/logout", isAuthenticated, logout);
authRouter.get("/me", isAuthenticated, me);

module.exports = authRouter;