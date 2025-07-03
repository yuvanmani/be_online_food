const express = require("express");
const authRouter = require("./routes/authRoutes");
const logger = require("./utils/logger");
const cookieParser = require("cookie-parser");
const errorRoute = require("./utils/errorRoute");
const userRouter = require("./routes/userRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const menuItemRouter = require("./routes/menuItemRoutes");
const orderRouter = require("./routes/orderRoutes");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "https://fe-online-food-delivery-system.netlify.app",
    credentials: true
}))

// middleware to parse cookies
app.use(cookieParser());

// middleware to parse JSON request bodies
app.use(express.json());

// middleware to log requests
app.use(logger);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/menuItems", menuItemRouter);
app.use("/api/v1/orders", orderRouter);

// middleware to handle 404 errors
app.use(errorRoute);

module.exports = app;