const User = require('./user.model'); // Assuming you have a User model

// Create a new user
async function createUser(userData) {
    try {
        const newUser = new User(userData);
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

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};