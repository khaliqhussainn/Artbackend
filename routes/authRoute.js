const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authenticate = require("../middleware/authenticate");

// Regular auth routes
router.post('/signup', authController.register);
router.post('/signin', authController.login);

// Special route for creating an admin user
// This is a custom route that extends the controller functionality
router.post('/create-admin', async (req, res) => {
    try {
        // Get the userService directly
        const userService = require("../service/userService");
        const jwtProvider = require("../config/jwtProvider");
        const cartService = require("../service/cartService");
        
        // Create admin user with forced ADMIN role
        const adminData = {
            ...req.body,
            role: "ADMIN" // Force the role to be ADMIN
        };
        
        const user = await userService.createUser(adminData);
        const jwt = jwtProvider.generateToken(user._id);
        
        // Create cart for the admin user (if needed)
        await cartService.createCart(user);
        
        return res.status(200).send({ 
            jwt, 
            message: "Admin user created successfully", 
            userId: user._id 
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// Protected route to verify if a user is an admin
router.get('/verify-admin', authenticate, async (req, res) => {
    try {
        // The authenticate middleware should attach the user to req
        const user = req.user;
        
        if (user.role !== "ADMIN") {
            return res.status(403).send({ message: "Access denied: User is not an admin" });
        }
        
        return res.status(200).send({ 
            message: "User verified as admin",
            userId: user._id,
            role: user.role
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

module.exports = router;