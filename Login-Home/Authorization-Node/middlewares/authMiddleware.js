// middleware.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)

    if (!token) {
        // If no token is present, redirect to login
        return res.redirect('/users/login');
    }

    jwt.verify(token, 'yourSecretKey', (err, user) => {
        if (err) {
            // If token verification fails, redirect to login
            return res.redirect('/users/login');
        }

        // If token is valid, set user object on request and call next middleware
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken
};
