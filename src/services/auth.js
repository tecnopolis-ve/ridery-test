const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const userRepository = require("../repositories/user");
const {
    CustomValidationError,
    NotFoundError,
    UnauthorizedError,
} = require("../errors/appErrors");

const {
    jwtKey,
    jwtRefreshKey,
    tokenExpires,
    refreshTokenExpires,
    refreshTokenExtendedExpires,
} = config;

async function login({ phone, password }) {
    try {
        const user = await userRepository
            .get({ phone, active: true })
            .select("+password");

        if (!user) {
            throw new NotFoundError("User not found or inactive");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new UnauthorizedError("Incorrect password");
        }

        const authUser = user.toObject();
        delete authUser.password;

        const tokenPayload = { ...authUser };

        const token = jwt.sign(tokenPayload, jwtKey, {
            expiresIn: tokenExpires,
        });
        const refreshToken = jwt.sign(tokenPayload, jwtRefreshKey, {
            expiresIn: refreshTokenExtendedExpires,
        });

        return {
            success: true,
            message: "Login successful!",
            data: { token, refreshToken },
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function refresh({ refreshToken }) {
    try {
        let verified;
        try {
            verified = jwt.verify(refreshToken, jwtRefreshKey);
        } catch (err) {
            throw new UnauthorizedError("Invalid refresh token");
        }

        const user = await userRepository.get({
            _id: verified.id,
            active: true,
        });

        if (!user) {
            throw new NotFoundError("User not found or inactive");
        }

        const authUser = user.toObject();
        delete authUser.password;

        const tokenPayload = { ...authUser };

        const newToken = jwt.sign(tokenPayload, jwtKey, {
            expiresIn: tokenExpires,
        });
        const newRefreshToken = jwt.sign(tokenPayload, jwtRefreshKey, {
            expiresIn: refreshTokenExpires,
        });

        return {
            success: true,
            data: { token: newToken, refreshToken: newRefreshToken },
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getUserIdFromToken(token) {
    try {
        const verified = jwt.verify(token, jwtKey);

        if (!verified || !verified.id) {
            throw new CustomValidationError("Token inválido");
        }

        return { success: true, data: verified.id };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    login,
    refresh,
    getUserIdFromToken,
};
