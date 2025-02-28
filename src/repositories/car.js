const Car = require("../models/Car");

const carRepository = {
  list(filter = {}, options = {}) {
    return Car.find(filter, null, options);
  },
  getById(id) {
    return Car.findById(id);
  },
  create(data) {
    return Car.create(data);
  },
  updateById(id, data) {
    return Car.findByIdAndUpdate(id, data, { new: true });
  },
  deleteById(id) {
    return Car.findByIdAndDelete(id);
  },
};

module.exports = carRepository;
