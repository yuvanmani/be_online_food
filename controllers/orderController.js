const Order = require("../models/order");
const MenuItem = require("../models/menuItem");

const orderController = {
    createOrder: async (req, res) => {
        try {
            // get the userId from the authentication
            const userId = req.userId;

            // get the items details from the request body
            const { menuId, quantity } = req.body;

            if (!menuId || quantity < 1) {
                return res.status(400).json({ message: "No items in order" });
            }

            // fetch the menu item from the database
            const menuItem = await MenuItem.find({ _id: { $in: menuId } });

            // find the name of the ordered menu item
            const menuItemName = menuItem[0].name;

            if (!menuItem || menuItem.length <= 0) {
                return res.status(404).json({ message: "Menu items not found" });
            }

            // check all items belong to the same restaurant
            const restaurantId = menuItem[0].restaurantId;

            // if all item from same restaurant get the restaurant name from menu item
            const restaurantName = menuItem[0].restaurantName;

            // calculate the total amount of ordered items
            const totalAmount = menuItem[0].price * quantity;

            // create the new order
            const newOrder = new Order({
                userId,
                restaurantId,
                restaurantName,
                menuItemName,
                totalAmount,
                quantity
            });
            console.log(newOrder)
            // save the order in the database
            await newOrder.save();

            // send response to the user
            return res.status(201).json({ message: "Order placed successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: "Order creation failed" });
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().select("-__v -createdAt -updatedAt");

            res.status(200).json(orders);
        }
        catch (error) {
            return res.status(500).json({ message: "Get all orders failed" });
        }
    },
    getOrdersByUserId: async (req, res) => {
        try {
            const userId = req.userId;

            const userOrders = await Order.find({ userId: userId }).select("-__v -createdAt -updatedAt");

            res.status(200).json(userOrders);
        }
        catch (error) {
            return res.status(500).json({ message: "Get order by user id failed" });
        }
    },
    getOrderById: async (req, res) => {
        try {
            // get the id from the request params
            const { id } = req.params;

            // get the order from the database by using id
            const order = await Order.findById(id)
                .populate({ path: "userId", select: "-__v -password -createdAt -updatedAt -role -isVerified" })
                .populate({ path: "restaurantId", select: "-__v -createdAt -updatedAt -owner -hours -cuisineType -description" })
                .populate({ path: "items.menuItemId", select: "-restaurantId -restaurantName -category -description -createdAt -updatedAt -__v -_id" })
                .select("-__v -createdAt -updatedAt");

            // check the order is exists
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            // return the response to the user
            return res.status(200).json(order);
        }
        catch (error) {
            return res.status(500).json({ message: "Get order by Id failed" });
        }
    },
    updateOrderById: async (req, res) => {
        try {
            // get the id from the request params
            const { id } = req.params;

            // get the update details from the request body
            const { items } = req.body;

            // fetch the menu items from the database to calculate total amount
            const menuItemIds = items.map(item => item.menuItemId);
            const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

            // calculate the total amount for the updated order
            const totalAmount = items.reduce((acc, item) => {
                const menuItem = menuItems.find(menuItem => menuItem._id.toString() === item.menuItemId);
                if (!menuItem) {
                    return res.status(400).json({ message: `Invalid menuItemId: ${item.menuItemId}` });

                }
                return acc + menuItem.price * item.quantity;
            }, 0);

            // update the details
            const order = await Order.findByIdAndUpdate(id, { items, totalAmount }, { new: true })
                .populate({ path: "userId", select: "-__v -password -createdAt -updatedAt -role -isVerified" })
                .populate({ path: "restaurantId", select: "-__v -createdAt -updatedAt -owner -hours -cuisineType -description" })
                .populate({ path: "items.menuItemId", select: "-restaurantId -restaurantName -category -description -createdAt -updatedAt -__v -_id" })
                .select("-__v -createdAt -updatedAt");

            if (!order) {
                return res.status(404).json("Order not found");
            }
            console.log(order)
            // send the updated result in response
            return res.status(200).json(order);
        }
        catch (error) {
            return res.status(500).json({ message: "Update order by Id failed" });
        }
    },
    deleteOrderById: async (req, res) => {
        try {
            // get the id from the request params
            const { id } = req.params;

            // find the order by id
            const order = await Order.findById(id);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            // delete the order from the database
            await Order.findByIdAndDelete(id);

            // send the response 
            return res.status(200).json({ message: "Order has been deleted" });
        }
        catch (error) {
            return res.status(500).json({ message: "Error deleting order" });
        }
    },
    getOrderByUserId: async (req, res) => {
        try {
            res.status(200).json({ message: "get order by user success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Get order by user Id failed" });
        }
    },
    getOrderByRestaurantId: async (req, res) => {
        try {
            res.status(200).json({ message: "get order by restaurant success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Get order by restaurant Id failed" });
        }
    }
}

module.exports = orderController;