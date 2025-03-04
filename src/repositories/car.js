const Car = require("../models/Car");

const carRepository = {
    list(filter = {}, options = {}) {
        return Car.find(filter, null, options);
    },
    get(filter) {
        if (!filter || Object.keys(filter).length === 0) {
            return Promise.resolve(null);
        }
        return Car.findOne(filter);
    },
    getById(id) {
        return Car.findById(id);
    },
    create(data) {
        return Car.create(data);
    },
    updateById(id, data, options = {}) {
        return Car.findByIdAndUpdate(id, data, { new: true, ...options });
    },
    deleteById(id) {
        return Car.findByIdAndDelete(id);
    },
};

module.exports = carRepository;
