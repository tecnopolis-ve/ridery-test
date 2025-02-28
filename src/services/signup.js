const bcrypt = require("bcrypt");
const { generateRandPassword } = require("../utils/utils");
const userRepository = require("../repositories/user");
const { CustomValidationError } = require("../errors/appErrors");

async function signup(payload) {
    try {
        const { name, lastName } = payload;
        const password = generateRandPassword(14);
        const saltedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name,
            lastName,
            password: saltedPassword,
        };

        const newUser = await userRepository.create(userData);

        if (!newUser) {
            throw new CustomValidationError("User registration failed");
        }

        return {
            success: true,
            message: "User successfully registered",
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    signup,
};
