const carService = require("../services/car");

async function create(req, res, next) {
    try {
        const { brand, model, year } = req.body;
        const result = await carService.create({ brand, model, year });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {
        const { page, limit, sort } = req.query;
        const result = await carService.list({ page, limit, sort });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function listByFleet(req, res, next) {
    try {
        const { page, limit, sort } = req.query;
        const result = await carService.listByFleet({
            flota: req.params.flota,
            page,
            limit,
            sort,
        });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function listByBrand(req, res, next) {
    try {
        const { page, limit, sort } = req.query;
        const result = await carService.listByBrand({
            marca: req.params.marca,
            page,
            limit,
            sort,
        });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        const { id } = req.params;
        const result = await carService.get({ id });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const { brand, model, year, ...rest } = req.body;
        const result = await carService.update({
            id,
            brand,
            model,
            year,
            ...rest,
        });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const result = await carService.remove({ id });
        return res.json({ deleted: !!result });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    list,
    listByFleet,
    listByBrand,
    get,
    update,
    remove,
};
