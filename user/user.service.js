const User = require('./user.model'); // Assuming you have a User model
const jwt = require("jsonwebtoken")
const {
    connectToCouchbase
} = require('../database');
const {
    generateUUID
} = require('../utils');
const { query } = require('express');

require('dotenv').config();

const JSON_KEY = process.env.JSON_KEY;
// Create a new user
async function createUser(userData) {
    try {
        // Map the request body to the user schema
        const { collection } = await connectToCouchbase();
        const data = {
            name: userData.name,
            email: userData.email,
            linkedinId: userData.linkedinurl || userData.linkedinId,
            designation: userData.designation,
            companyName: userData.company || userData.companyName,
            phoneNumber: userData.phone || userData.phoneNumber,
            location: userData.location,
            password: userData.password,
            contacts: []
        }
        userId = generateUUID()
        data.id = userId;
        result =  await collection.insert(userId, data);
        return result
    } catch (error) {
        throw new Error(`Failed to create user ${error}`);
    }
}

// Get a user by ID
async function getUserById(userId) {
    try {
        const { collection } = await connectToCouchbase();
        const result = await collection.get(userId);
        const user = result.content;
        return user;
    } catch (error) {
        throw new Error('Failed to get users');
    }
}

// Update a user by ID
async function updateUser(userId, userData) {
    try {
        const { collection } = await connectToCouchbase();
        const CAS_RESPONSE = await collection.replace(userId,userData);
        console.log("User Updated: ", CAS_RESPONSE.cas.toString());
        return getUserById(userId);
    } catch (error) {
        console.log("Failed to update user: ", error.message);
        throw new Error('Failed to update user');
    }
}

// Delete a user by ID
async function deleteUser(userId) {
    try {
        const { collection } = await connectToCouchbase();
        await collenction.remove(userId);
        return 'User deleted successfully';
    } catch (error) {
        throw new Error('Failed to delete user');
    }
}

async function login(email, password) {
    try {
        const { cluster, collection, bucket, scopeName } = await connectToCouchbase();
        query1 = `SELECT s.* FROM \`${bucket.name}\`.\`${scopeName}\`.\`${collection.name}\` as s WHERE email = '${email}' ORDER BY created_at DESC LIMIT 1`
        console.log(query1)
        const result = await cluster.query(query1)
        console.log(JSON.stringify(result))
        const user = result.rows[0]
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
    getUserById,
    updateUser,
    deleteUser,
    login
};