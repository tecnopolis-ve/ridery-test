const mongoose = require("mongoose");
const { assignFleet } = require("../utils/assignFleet");

const carSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
            min: 1990,
        },
        fleet: {
            type: String,
            required: true,
            enum: ["Espectacular", "Pickup / Camioneta", "Económico"],
        },
    },
    { timestamps: true }
);

carSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('brand') || this.isModified('model') || this.isModified('year')) {
        this.fleet = assignFleet(this.brand, this.model, this.year);
    }
    next();
});

carSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.brand !== undefined || update.model !== undefined || update.year !== undefined) {
        try {
            const doc = await this.model.findOne(this.getQuery());

            if (doc) {
                const brand = update.brand || doc.brand;
                const model = update.model || doc.model;
                const year = update.year || doc.year;

                update.fleet = assignFleet(brand, model, year);
            }
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("Car", carSchema);