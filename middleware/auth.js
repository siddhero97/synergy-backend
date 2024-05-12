require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JSON_KEY;


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'Authorization header missing'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            error: 'Invalid or expired token'
        });
    }
};

module.exports = {
    authenticateToken
};