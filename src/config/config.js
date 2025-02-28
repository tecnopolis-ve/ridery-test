const dotenv = require("dotenv");

dotenv.config({
    path: process.env.NODE_ENV === "prod" ? ".env" : ".env.local",
});

const environment = process.env.NODE_ENV || "dev";

module.exports = {
    env: environment,
    port: parseInt(process.env.PORT) || 3000,
    jwtKey: process.env.JWT_TOKEN_KEY,
    jwtRefreshKey: process.env.JWT_REFRESH_TOKEN_KEY,
    sessionToken: process.env.SESSION_TOKEN,
    tokenExpires: 60 * (process.env.MAX_SESSION_TIMEOUT || 15)* 24 * 60,
    refreshTokenExpires: 60 * (process.env.MAX_REFRESH_TIMEOUT || 60),
    refreshTokenExtendedExpires:
        60 * (process.env.MAX_REFRESH_EXTENDED_TIMEOUT || 60) * 24 * 60, // 24 horas * 60 días
    defaultExpiration: 60 * (parseInt(process.env.EXPIRATION_TIMEOUT) || 15),
    mongohost: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@riderytest.r1hah.mongodb.net/?retryWrites=true&w=majority&appName=riderytest`,
};
