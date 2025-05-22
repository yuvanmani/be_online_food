const MenuItem = require("../models/menuItem");
const Restaurant = require("../models/restaurant");

const menuItemController = {
    createMenuItem: async (req, res) => {
        try {
            // get the details from the request body
            const { restaurantId, category, name, description, price } = req.body;

            const restaurant = await Restaurant.findById(restaurantId);
            const restaurantName = restaurant.name;

            if (!restaurant) {
                return res.status(404).json({ message: "Restaurant not found" });
            }

            // check the menu item exists in the database
            const menuItem = await MenuItem.findOne({ name, restaurantId });

            if (menuItem) {
                return res.status(400).json({ message: "Menu item already exists" });
            }

            // create a new menu item
            const newMenuItem = new MenuItem({
                restaurantId, restaurantName, category, name, description, price
            });

            // save the menu item to the database
            await newMenuItem.save();

            // send response to the user
            return res.status(201).json({ message: "Menu item created successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: "Create menu item failed" });
        }
    },
    getAllMenuItems: async (req, res) => {
        try {
            // get all the menu items from the database
            const menuItems = await MenuItem.find().select("-__v -createdAt -updatedAt");

            // check menu items is not empty
            if (menuItems.length === 0) {
                return res.status(200).json({ message: "No more menu items added in the restaurant" });
            }

            // send response with menu items details
            return res.status(200).json(menuItems);
        }
        catch (error) {
            return res.status(500).json({ message: "Get all menu items failed" });
        }
    },
    getMenuItemById: async (req, res) => {
        try {
            // get the id from the request params
            const { id } = req.params;

            // find the menu item by id in the database
            const menuItem = await MenuItem.findById(id).select("-__v -createdAt -updatedAt");

            // check the menu item in the database
            if (!menuItem) {
                return res.status(404).json({ message: "Menu item not found" });
            }

            // send the menu item via response
            return res.status(200).json(menuItem);
        }
        catch (error) {
            return res.status(500).json({ message: "Get menu item by ID failed" });
        }
    },
    updateMenuItemById: async (req, res) => {
        try {
            // get the id from the request params
            const { id } = req.params;

            // get the update details from the request body
            const { restaurantId, category, name, description, price } = req.body;

            // update the details
            const menuItem = await MenuItem.findByIdAndUpdate(id, { restaurantId, category, name, description, price }, { new: true }).select("-__v -createdAt -updatedAt");

            if (!menuItem) {
                return res.status(404).json({ message: "Menu item not found" });
            }

            // send the updated result in response
            return res.status(200).json(menuItem);
        }
        catch (error) {
            return res.status(500).json({ message: "Update menu item by ID failed" });
        }
    },
    deleteMenuItemById: async (req, res) => {
        try {
            // get the id from the request params
            const { id } = req.params;

            // find the menu item by Id
            const menuItem = await MenuItem.findById(id);

            if (!menuItem) {
                return res.status(404).json({ message: "Menu item not found" });
            }

            // delete the menu item from the database
            await MenuItem.findByIdAndDelete(id);

            // send response
            return res.status(200).json({ message: "Menu item deleted" });
        }
        catch (error) {
            return res.status(500).json({ message: "Delete menu item by ID failed" });
        }
    }
}

module.exports = menuItemController;