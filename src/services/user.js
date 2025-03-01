const bcrypt = require("bcrypt");
const { generateRandPassword } = require("../utils/utils");
const userRepository = require("../repositories/user");
const { CustomValidationError, NotFoundError } = require("../errors/appErrors");

async function create(payload) {
    try {
        const { password } = payload;
        const saltedPassword = await bcrypt.hash(password, 10);
        const userData = { ...payload, password: saltedPassword };
        const newUser = await userRepository.create(userData);

        if (!newUser) {
            throw new CustomValidationError("User creation failed");
        }

        return {
            success: true,
            message: "User successfully created",
            data: newUser,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function list({ page = 1, limit = 10, sort = "-createdAt" }) {
    try {
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;
        const users = await userRepository.list({}, { skip, limit, sort });

        return {
            success: true,
            data: users,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function get({ id }) {
    try {
        const user = await userRepository.get({ _id: id });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return {
            success: true,
            data: user,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function update({ id, ...payload }) {
    try {
        const updatedUser = await userRepository.update({ _id: id }, payload);

        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }

        return {
            success: true,
            message: "User successfully updated",
            data: updatedUser,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    create,
    list,
    get,
    update,
};
