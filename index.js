// Import required modules
require('dotenv').config();

const express = require('express');
const userRoute = require('./user/user.route');
const database = require('./database_couchbase');

const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors('*'));
// Express middleware to parse JSON bodies
app.use(express.json());
// Can I have a user route?
app.use('/users', userRoute)

// Express middleware to parse JSON bodies
app.use(express.json());
// Can I have a user route?
app.use('/users', userRoute);


// Start the server
app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
});