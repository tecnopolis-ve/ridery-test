const signupService = require("../services/signup");

async function signup(req, res, next) {
    try {
        const result = await signupService.signup(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
};
