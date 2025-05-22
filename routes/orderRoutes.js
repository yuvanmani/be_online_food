const express = require("express");
const { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById } = require("../controllers/orderController");
const { isAuthenticated, allowRoles } = require("../middlewares/auth");

const orderRouter = express.Router();

orderRouter.post("/", isAuthenticated, allowRoles(["user", "manager", "admin"]), createOrder);
orderRouter.get("/", isAuthenticated, allowRoles(["manager", "admin"]), getAllOrders);
orderRouter.get("/:id", isAuthenticated, allowRoles(["manager", "admin"]), getOrderById);
orderRouter.put("/:id", isAuthenticated, allowRoles(["manager", "admin"]), updateOrderById);
orderRouter.delete("/:id", isAuthenticated, allowRoles(["manager", "admin"]), deleteOrderById);

module.exports = orderRouter;