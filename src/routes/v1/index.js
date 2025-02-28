const express = require("express");
const router = express.Router();

const publicRoutes = require("./public");
const signupRoutes = require("./signup");
const authRoutes = require("./auth");
const meRoutes = require("./me");

router.use("/", publicRoutes);
router.use("/signup", signupRoutes);
router.use("/auth", authRoutes);
router.use("/me", meRoutes);

module.exports = router;
