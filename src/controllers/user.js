const userService = require("../services/user");

async function create(req, res, next) {
    try {
        const result = await userService.create(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
};
