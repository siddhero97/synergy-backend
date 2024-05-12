// Import required modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./user/user.route');
const contactRoute = require('./contact/contact.route');


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
app.use('/contacts', contactRoute);


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

app.use((err, req, res, next) => {
    // Log the error
    console.error(err.stack);

    // Set the status code based on the error
    const statusCode = err.statusCode || 500;

    // Respond with the error message
    res.status(statusCode).json({
        error: {
            message: err.message
        }
    });
});