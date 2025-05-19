const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "manager", "admin"],
        default: "user"
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    otp: String,
    otpExpires: Date,
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema, "users");