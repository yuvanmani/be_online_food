const express = require("express");
const { createMenuItem, getAllMenuItems, getMenuItemById, updateMenuItemById, deleteMenuItemById } = require("../controllers/menuItemController");
const { isAuthenticated, allowRoles } = require("../middlewares/auth");

const menuItemRouter = express.Router();

menuItemRouter.post("/", isAuthenticated, allowRoles(["manager", "admin"]), createMenuItem);
menuItemRouter.get("/", getAllMenuItems);
menuItemRouter.get("/:id", getMenuItemById);
menuItemRouter.put("/:id", isAuthenticated, allowRoles(["manager", "admin"]), updateMenuItemById);
menuItemRouter.delete("/:id", isAuthenticated, allowRoles(["manager", "admin"]), deleteMenuItemById);

module.exports = menuItemRouter;