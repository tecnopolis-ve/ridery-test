const express = require("express");
const { checkAuth } = require("../middlewares/checkAuth");
const admin = require("../controllers/admin");

const router = express.Router();

router.use(checkAuth);

router.get("/dashboard", admin.dashboard);

module.exports = router;