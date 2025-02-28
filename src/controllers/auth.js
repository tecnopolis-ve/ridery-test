const authService = require("../services/auth");

async function login(req, res, next) {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function refresh(req, res, next) {
    try {
        const result = await authService.refresh(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    refresh,
};
