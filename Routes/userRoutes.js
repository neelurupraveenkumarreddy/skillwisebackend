const express = require("express");
const router = express.Router();

const usersController = require("../Controller/usersController");
//Login User
router.post("/login", usersController.loginUser);

// Create User
router.post("/create", usersController.createUser);

// Edit User
router.put("/edit", usersController.editUser);

// Get all users
router.get("/all", usersController.getAllUsers);

// Get user by ID
router.get("/get/:id", usersController.getUserById);

// Delete user
router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;
