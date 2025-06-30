const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    location: {
        door_no: String,
        street: String,
        city: String,
        state: String,
        country: String,
        pincode: String
    },

    cuisineType: {
        type: [String]
    },

    hours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String }
    },

    description: {
        type: String,
        maxlength: 1000
    }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema, "restaurants");