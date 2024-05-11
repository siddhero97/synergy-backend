const jwt = require('jsonwebtoken');

// Secret key for JWT signing
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

/**
 * @description Middleware function to authenticate requests with JWT
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, return a 401 Unauthorized error
    if (!token) {
        return res.status(401).json({
            error: 'Access denied. No token provided.'
        });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // If the token is invalid, return a 403 Forbidden error
            return res.status(403).json({
                error: 'Invalid token'
            });
        }

        // If the token is valid, set the decoded payload on the request object
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;