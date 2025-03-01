const User = require("../models/User");

const userRepository = {
    list(filter = {}, options = {}) {
        return User.find(filter, null, options);
    },
    get(filter) {
        if (!filter || Object.keys(filter).length === 0) {
            return Promise.resolve(null);
        }
        return User.findOne(filter);
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
