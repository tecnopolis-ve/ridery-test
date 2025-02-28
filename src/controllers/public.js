const openService = require("../services/public");

const health = (req, res, next) => {
    try {
        const result = openService.health();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    health,
};
