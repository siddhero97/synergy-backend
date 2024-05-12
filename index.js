// Import required modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./user/user.route');
const contactsRoute = require('./contacts/contacts.route');

const cors = require('cors');

const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.MONGO_URL;

app.use(cors());
// Express middleware to parse JSON bodies
app.use(express.json());
// Can I have a user route?
app.use('/users', userRoute);


// Start the server
app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
    await connectToMongoDB();

});

async function connectToMongoDB() {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}