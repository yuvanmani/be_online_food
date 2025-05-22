const express = require("express");
const { getUser, getAllusers, getUserById, deleteUserById } = require("../controllers/userController");
const { isAuthenticated, allowRoles } = require("../middlewares/auth");

const userRouter = express.Router();

// user routes
userRouter.get("/profile",isAuthenticated, getUser);

// admin routes
userRouter.get("/", isAuthenticated, allowRoles(["admin"]), getAllusers);
userRouter.get("/:id", isAuthenticated, allowRoles(["admin"]), getUserById);
userRouter.delete("/:id", isAuthenticated, allowRoles(["admin"]), deleteUserById);

module.exports = userRouter;