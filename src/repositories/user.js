const User = require("../models/User");

const userRepository = {
    list(filter = {}) {
        return User.find(filter);
    },
    getById(id) {
        return User.findById(id);
    },
    create(data) {
        return User.create(data);
    },
    updateById(id, data) {
        return User.findByIdAndUpdate(id, data, { new: true });
    },
    deleteById(id) {
        return User.findByIdAndDelete(id);
    },
};

module.exports = userRepository;
