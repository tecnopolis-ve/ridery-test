const { NotFoundError } = require("../errors/appErrors");
const userRepository = require("../repositories/user");

async function me(id) {
    try {
        const userData = await userRepository.get({ _id: id });

        if (!userData) {
            throw new NotFoundError("User not found");
        }

        return { success: true, data: userData };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function update(id, userData) {
    try {
        const updatedUser = await userRepository.update({ _id: id }, userData);

        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }

        return {
            success: true,
            message: "User successfully updated",
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    me,
    update,
};
