const express = require("express");
const { createRestaurant, getAllRestaurants, getRestaurantById, deleteRestaurantById } = require("../controllers/restaurantController");
const { isAuthenticated, allowRoles } = require("../middlewares/auth");

const restaurantRouter = express.Router();

restaurantRouter.post("/", isAuthenticated, allowRoles(["admin"]), createRestaurant);
restaurantRouter.get("/", getAllRestaurants);
restaurantRouter.get("/:id", getRestaurantById);
restaurantRouter.delete("/:id", isAuthenticated, allowRoles(["admin"]), deleteRestaurantById);

module.exports = restaurantRouter;