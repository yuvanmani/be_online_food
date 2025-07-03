const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  restaurantId: String,
  restaurantName: String,
  menuItemName: String,
  totalAmount: Number,
  quantity: Number
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "orders");