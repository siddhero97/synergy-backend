// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./user/user.route');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.mongodb_connection_string;

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
        await mongoose.connect(mongodb_connection_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}