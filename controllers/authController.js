const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/emailService");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const authController = {
    register: async (req, res) => {
        try {
            // get the details from the request body
            const { name, email, password, role, street, city, state, pincode } = req.body;

            // validate input
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // check if the user already exists
            const user = await User.findOne({ email });

            if (user) {
                if (user.isVerified) {
                    return res.status(400).json({ message: "User already exists" });
                }

                // handling of expired OTP
                if (user.otpExpires < Date.now()) {
                    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                    user.otp = newOtp;
                    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

                    // save the user with new OTP
                    await user.save();

                    // send the new OTP to user
                    await sendEmail(email, "Your new OTP", `Your new OTP code for registration is : ${newOtp}`)

                    // send response to the user for new OTP
                    return res.status(200).json({ message: "OTP has been sent to your email" });
                }
                return res.status(400).json({ message: "Verification pending. Check your email for OTP." })
            }

            // encrypt the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // generate otp for verification
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

            // create a new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role,
                address: {
                    street,
                    city,
                    state,
                    pincode
                },
                otp,
                otpExpires,
                isVerified: false
            })

            // save the user to the database
            await newUser.save();

            // send verification otp via email
            await sendEmail(email, "Your OTP code", `Your verification code for registering in app is : ${otp}`);

            // send response to the user
            res.status(200).json({ message: "OTP sent to your email for verification" });
        }
        catch (error) {
            return res.status(500).json({ message: "Registration failed" })
        }
    },
    verifyOtp: async (req, res) => {
        try {
            // get the email & otp from request body
            const { email, otp } = req.body;

            // check the user exist in database
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // check the user is already verified
            if (user.isVerified) {
                return res.status(400).json({ message: "User already verified" });
            }

            // validate the OTP
            if (user.otp !== otp || user.otpExpires < Date.now()) {
                return res.status(400).json({ message: "Invalid or expired OTP" });
            }

            // clear the otp fields
            user.isVerified = true;
            user.otp = undefined;
            user.otpExpires = undefined;

            // save user to the database
            await user.save();

            // send response to the user
            return res.status(200).json({ message: "User verified and registered successfully" });

        }
        catch (error) {
            return res.status(500).json({ message: "OTP verification failed" });
        }
    },
    login: async (req, res) => {
        try {
            // get the details from the request body
            const { email, password } = req.body;

            // validate input
            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // check if the user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // check if password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // create a JWT token for authorization
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

            // set the token in a cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 3600000
            })

            // send the response to the user
            return res.status(200).json({ message: "Login successful" });
        }
        catch (error) {
            return res.status(500).json({ message: "Login failed" })
        }
    },
    logout: async (req, res) => {
        try {
            // clear the cookie
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            });

            // send the response to the user
            return res.status(200).json({ message: "Logout successful" });
        }
        catch (error) {
            return res.status(500).json({ message: "Logout failed" })
        }
    },
    me: async (req, res) => {
        try {
            const userId = req.userId;

            // find the user by ID
            const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt -isVerified");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // send the response to the user
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to retrieve user" })
        }
    },
}

module.exports = authController;