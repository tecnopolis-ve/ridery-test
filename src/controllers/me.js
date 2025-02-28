const userService = require("../services/me");
const { getLoggedUserId } = require("../utils/auth");

async function me(req, res, next) {
    try {
        const userData = await getLoggedUserId(req);
        const userId = userData.data;
        const result = await userService.me(userId);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const userData = await getLoggedUserId(req);
        const userId = userData.data;
        const result = await userService.update(userId, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    me,
    update,
};
