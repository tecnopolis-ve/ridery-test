const { assignFleet } = require("../utils/assignFleet");
const carRepository = require("../repositories/car");
const { NotFoundError } = require("../errors/appErrors");

async function create({ brand, model, year }) {
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

async function list({ page = 1, limit = 10, sort = "-createdAt" }) {
    try {
        page = Math.max(1, parseInt(page) || 1);
        limit = Math.max(1, Math.min(100, parseInt(limit) || 10));
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

async function listByFleet({
    flota,
    page = 1,
    limit = 10,
    sort = "-createdAt",
}) {
    try {
        if (!flota) {
            throw new Error("Flota is required");
        }

        page = Math.max(1, parseInt(page) || 1);
        limit = Math.max(1, Math.min(100, parseInt(limit) || 10));
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

async function listByBrand({
    marca,
    page = 1,
    limit = 10,
    sort = "-createdAt",
}) {
    try {
        if (!marca) {
            throw new Error("Marca is required");
        }

        page = Math.max(1, parseInt(page) || 1);
        limit = Math.max(1, Math.min(100, parseInt(limit) || 10));
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

async function get({ id }) {
    try {
        if (!id) {
            throw new Error("ID is required");
        }

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

async function update({ id, brand, model, year, ...rest }) {
    try {
        if (!id) {
            throw new Error("ID is required");
        }

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

async function remove({ id }) {
    try {
        if (!id) {
            throw new Error("ID is required");
        }

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
    create,
    list,
    listByFleet,
    listByBrand,
    get,
    update,
    remove,
};
