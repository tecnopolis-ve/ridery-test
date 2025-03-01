function normalizeString(str) {
    if (!str) return "";
    return str.trim().replace(/\s+/g, " ").toLowerCase();
}

const fleetRules = [
    {
        brand: "chevrolet",
        models: ["aveo", "optra"],
        minYear: 2018,
        fleetName: "Espectacular",
    },
    {
        brand: "toyota",
        models: ["hilux", "fortuner", "prado"],
        minYear: 2015,
        fleetName: "Pickup / Camioneta",
    },
];

function assignFleet(brand, model, year) {
    // 1. Normalización
    const normalizedBrand = normalizeString(brand);
    const normalizedModel = normalizeString(model);

    // 2. Búsqueda en reglas
    for (const rule of fleetRules) {
        if (
            normalizedBrand === rule.brand &&
            rule.models.includes(normalizedModel) &&
            year >= rule.minYear
        ) {
            return rule.fleetName;
        }
    }

    return "Económico";
}

module.exports = { assignFleet };
