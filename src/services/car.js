const { assignFleet } = require("../utils/assignFleet");
const carRepository = require("../repositories/car");
const { NotFoundError } = require("../errors/appErrors");

async function createCar({ brand, model, year }) {
    try {
        const fleet = assignFleet(brand, model, year);
        const created = await carRepository.create({
            brand,
            model,
            year,
            fleet,
        });

        return {
            success: true,
            data: created,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function listCars({ page = 1, limit = 10, sort = "-createdAt" }) {
    try {
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;
        const items = await carRepository.list({}, { skip, limit, sort });

        return {
            success: true,
            data: items,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function listCarsByFleet({
    flota,
    page = 1,
    limit = 10,
    sort = "-createdAt",
}) {
    try {
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;
        const items = await carRepository.list(
            { fleet: flota },
            { skip, limit, sort }
        );

        return {
            success: true,
            data: items,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function listCarsByBrand({
    marca,
    page = 1,
    limit = 10,
    sort = "-createdAt",
}) {
    try {
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;
        const items = await carRepository.list(
            { brand: marca },
            { skip, limit, sort }
        );

        return {
            success: true,
            data: items,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getCarById({ id }) {
    try {
        const found = await carRepository.getById(id);
        if (!found) {
            throw new NotFoundError("Car not found");
        }

        return {
            success: true,
            data: found,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateCar({ id, brand, model, year, ...rest }) {
    try {
        if (brand && model && year) {
            rest.fleet = assignFleet(brand, model, year);
        }

        const updated = await carRepository.updateById(id, {
            brand,
            model,
            year,
            ...rest,
        });

        if (!updated) {
            throw new NotFoundError("Car not found");
        }

        return {
            success: true,
            data: updated,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function removeCar({ id }) {
    try {
        const removed = await carRepository.deleteById(id);

        if (!removed) {
            throw new NotFoundError("Car not found");
        }

        return {
            success: true,
            message: "Car deleted",
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createCar,
    listCars,
    listCarsByFleet,
    listCarsByBrand,
    getCarById,
    updateCar,
    removeCar,
};
