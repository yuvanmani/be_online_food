const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    restaurantName: String,
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("MenuItem", menuItemSchema, "menuItems");