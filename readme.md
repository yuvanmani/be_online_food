# Online Food Delivery System

## Description

This is a online food delivery system application using MERN stack (MongoDB, Express.js, React.js, Node.js.). It allows users(customers) to do some activities like search for food items, restaurants & order for food, making payments, tracking order and etc. This application provides a user-friendly interface and a well-structured backend to handle various functionalities.

## Features

- User(customer) authentication (register, login, logout)
- Search for food & restaurant functionality
- Posting & management of menuItems & restaurants
- Order placing functionality
- Order management
- Payment methods

## Model Structures

## User Model

- name
- email
- password
- role (user, manager, admin)
- address

## Restaurant Model

- name
- manager
- location
- cuisineType
- working hours
- description

## MenuItem Model

- restaurantId
- restaurantName
- menu category
- name
- description
- price

## Order Model
- userId
- restaurantId
- items : menuItemId, quantity
- total amount

#####

### End Points

/auth
    - POST "/register" - Register a new user
    - POST "/verifyotp" - OTP verification for registering new user
    - POST "/login" - Login a user
    - POST "/logout" - Logout a user
    - GET "/me" - Get user profile

/users
    - GET "/profile" - Get user profile
    - GET "/" - Get all users (admin only)
    - GET "/:id" - Get a user by Id (admin only)
    - DELETE "/:id" - Delete a user by Id (admin only)

/restaurants
    - POST "/" - Create a new restaurant (manager & admin only)
    - GET "/" - Get all restaurants
    - GET "/:id" - Get a restaurant by Id
    - DELETE "/:id" - Delete a restaurant by Id (manager & admin only)

/menuItems
    - POST "/" - Create a menuItem (manager & admin only)
    - GET "/" - Get all menuItems
    - GET "/:id" - Get a menuItem by Id
    - PUT "/:id" - Update a menuItem by Id (manager & admin only)
    - DELETE "/:id" - Delete a menuItem by Id (manager & admin only)

/orders
    - POST "/" - Place a new order (user, manager, admin only)
    - GET "/" - Get all orders (manager & admin only)
    - GET "/:id" - Get a order by Id (manager & admin only)
    - PUT "/:id" - Update a order by Id (manager & admin only)
    - DELETE "/:id" - Delete a order by Id (manager & admin only)

