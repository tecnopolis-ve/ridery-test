const { getUserIdFromToken } = require("../services/auth");

async function getLoggedUserId(req) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Token de autorización no encontrado");
    }
    return await getUserIdFromToken(token);
}

module.exports = { getLoggedUserId };
