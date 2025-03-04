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
            enum: ["Espectacular", "Pickup / Camioneta", "Económico"],
            default: "Económico"
        },
    },
    { timestamps: true }
);

carSchema.pre('save', function (next) {
    if (this.brand && this.model && this.year) {
        this.fleet = assignFleet(this.brand, this.model, this.year);
    }
    next();
});

carSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const updateData = update.$set || update;

    try {
        if (updateData.brand !== undefined || updateData.model !== undefined || updateData.year !== undefined) {
            const doc = await this.model.findOne(this.getQuery());
            if (doc) {
                const brand = updateData.brand !== undefined ? updateData.brand : doc.brand;
                const model = updateData.model !== undefined ? updateData.model : doc.model;
                const year = updateData.year !== undefined ? updateData.year : doc.year;
                const calculatedFleet = assignFleet(brand, model, year);

                if (update.$set) {
                    update.$set.fleet = calculatedFleet;
                } else {
                    update.fleet = calculatedFleet;
                }
            }
        }
    } catch (error) {
        console.error("Error al calcular fleet:", error);
    }
    next();
});

module.exports = mongoose.model("Car", carSchema);