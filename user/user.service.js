const User = require('./user.model'); // Assuming you have a User model
const jwt = require("jsonwebtoken")
require('dotenv').config();
const JSON_KEY = process.env.JSON_KEY;
// Create a new user
async function createUser(userData) {
    try {
        // Map the request body to the user schema
        const data = {
            name: userData.name,
            email: userData.email,
            linkedinId: userData.linkedinurl || userData.linkedinId,
            designation: userData.designation,
            companyName: userData.company || userData.companyName,
            phoneNumber: userData.phone || userData.phoneNumber,
            location: userData.location,
            password: userData.password
        }
        const newUser = new User(data);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw new Error(`Failed to create user ${error}`);
    }
}

// Get all users
async function getUsers() {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error('Failed to get users');
    }
}

// Get a user by ID
async function getUserById(userId) {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Failed to get user');
    }
}

// Update a user by ID
async function updateUser(userId, userData) {
    try {
        if (userData.password) {
            throw new Error('Password cannot be updated using this method');
        }
        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
            new: true
        });
        return updatedUser;
    } catch (error) {
        throw new Error('Failed to update user');
    }
}

// Delete a user by ID
async function deleteUser(userId) {
    try {
        await User.findByIdAndDelete(userId);
        return 'User deleted successfully';
    } catch (error) {
        throw new Error('Failed to delete user');
    }
}

async function login(email, password) {
    try {
        const user = await User.findOne({
            email
        });
        console.log("user", user)

        if (!user) {
            throw new Error('User not found');
        }
        if (user.password !== password) {
            throw new Error('Wrong Password');
        }
        console.log("user id", user.id, user)
        const token = jwt.sign(user.id, JSON_KEY);
        return token;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login
};