const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    linkedinId: {
        type: String,
        required: true,
        // unique: true
    },
    designation: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    location: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;