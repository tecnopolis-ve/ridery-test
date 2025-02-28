const express = require("express");
const router = express.Router();

const publicRoutes = require("./public");
const userRoutes = require("./user");
const authRoutes = require("./auth");
const meRoutes = require("./me");

router.use("/", publicRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/me", meRoutes);

module.exports = router;
