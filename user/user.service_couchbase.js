const {
    User,
    USER_MODEL_NAME
} = require('./user.model'); // Assuming you have a User model
const {
    connectToCouchbase
} = require('../database_couchbase');

const {
    generateUUID
} = require('../utils');



// Create a new user;
async function createUser(userData) {
    try {
        const { collection } = await connectToCouchbase();
        userId = generateUUID()
        userData.id = userId;
        result =  await collection.insert(userId, userData);
        return result
    } catch (error) {
        throw new Error(`Failed to create user ${error}`);
    }
}

// Get user by id
async function getUserbyId(userId) {
    try {
        const { collection } = await connectToCouchbase();
        const user = await collection.get(userId)
        return user;
    } catch (error) {
        throw new Error('Failed to get users');
    }
}


// Update a user by ID
async function updateUser(userId, userData) {
    try {
        const { collection } = await connectToCouchbase();
        const updatedUser = await collection.replace(userId,userData)
        return updatedUser;
    } catch (error) {
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

module.exports = {
    createUser,
    getUserbyId,
    updateUser,
    deleteUser,
};