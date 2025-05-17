const express = require("express");
const { register, login, logout, me } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", me);

module.exports = authRouter;