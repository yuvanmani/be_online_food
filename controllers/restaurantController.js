const Restaurant = require("../models/restaurant");

const restaurantController = {
    createRestaurant: async (req, res) => {
        try {
            // get the userId from request
            const manager = req.userId;

            // get the restaurant details from the request body
            const { name, cuisineType, hours, description } = req.body;
            const { door_no, street, city, state, country, pincode } = req.body.location;

            // check the restaurant already exists
            const restaurant = await Restaurant.findOne({ name });

            if (restaurant) {
                return res.status(400).json({ message: "Restaurant already exists" });
            }

            // create a new restaurant
            const newRestaurant = new Restaurant({
                name, manager, cuisineType, hours, description,
                location: { door_no, street, city, state, country, pincode }
            })

            // save the restaurant to the database
            await newRestaurant.save();

            // send response to the user
            return res.status(201).json({ message: "Restaurant created successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: "Error creating restaurant" });
        }
    },
    getAllRestaurants: async (req, res) => {
        try {
            // get all the restaurants from the database
            const restaurants = await Restaurant.find().select("-__v -createdAt -updatedAt");

            // send the response with all the restaurant details
            return res.status(200).json(restaurants);
        }
        catch (error) {
            return res.status(500).json({ message: "Error getting all restaurants" });
        }
    },
    getRestaurantById: async (req, res) => {
        try {
            // get the restaurant id from request params
            const { id } = req.params;

            // check the restaurant exists in the database
            const restaurant = await Restaurant.findById(id).select("-__v -createdAt -updatedAt");

            if (!restaurant) {
                return res.status(404).json({ message: "Restaurant not found" });
            }

            // send the response to the user
            return res.status(200).json(restaurant);
        }
        catch (error) {
            return res.status(500).json({ message: "Error get company by ID" });
        }
    },
    deleteRestaurantById: async (req, res) => {
        try {
            // get the restaurant id from request params
            const { id } = req.params;

            // check the restaurant exists in the database
            const restaurant = await Restaurant.findById(id);

            if (!restaurant) {
                return res.status(404).json({ message: "Restaurant not found" });
            }

            // delete the restaurant from the database
            await Restaurant.findByIdAndDelete(id);

            // send the response to the user
            return res.status(200).json({ message: "Restaurant deleted" });
        }
        catch (error) {
            return res.status(500).json({ message: "Error deleting company" });
        }
    }
}

module.exports = restaurantController;