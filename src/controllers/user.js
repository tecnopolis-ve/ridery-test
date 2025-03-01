const userService = require("../services/user");

async function create(req, res, next) {
    try {
        const result = await userService.create(req.body);
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {
        const { page, limit, sort } = req.query;
        const result = await userService.list({ page, limit, sort });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        const { id } = req.params;
        const result = await userService.get({ id });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const result = await userService.update({ id, ...req.body });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    list,
    get,
    update,
};
