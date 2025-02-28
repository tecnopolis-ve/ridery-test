const carService = require("../services/car");

async function create(req, res, next) {
    try {
        const { brand, model, year } = req.body;
        const result = await carService.createCar({ brand, model, year });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {
        const { page, limit, sort } = req.query;
        const result = await carService.listCars({ page, limit, sort });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function listByFleet(req, res, next) {
    try {
        const { page, limit, sort } = req.query;
        const result = await carService.listCarsByFleet({
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
        const result = await carService.listCarsByBrand({
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

async function getById(req, res, next) {
    try {
        const { id } = req.params;
        const result = await carService.getCarById({ id });
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const { brand, model, year, ...rest } = req.body;
        const result = await carService.updateCar({
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
        const result = await carService.removeCar({ id });
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
    getById,
    update,
    remove,
};
