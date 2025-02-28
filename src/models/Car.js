const mongoose = require("mongoose");

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

module.exports = mongoose.model("Car", carSchema);
