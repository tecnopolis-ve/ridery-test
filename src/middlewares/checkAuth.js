const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const { UnauthorizedError } = require("../errors/appErrors");

const checkAuth = function (req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Token is required!"));
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.jwtKey, (err, user) => {
        if (err) {
            return next(new UnauthorizedError("Unauthorized!"));
        }
        req.user = user;
        next();
    });
};

module.exports = {
    checkAuth,
};
