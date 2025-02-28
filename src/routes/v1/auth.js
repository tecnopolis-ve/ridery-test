const express = require("express");
const auth = require('../../controllers/auth');

const router = express.Router();

router.post("/", auth.login);
router.post("/refresh", auth.refresh);

module.exports = router;
