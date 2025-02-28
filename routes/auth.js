const express = require("express");
const { checkAuth } = require("../middlewares/checkAuth");
const auth = require('../controllers/auth');

const router = express.Router();

router.post("/", auth.login);

module.exports = router;
