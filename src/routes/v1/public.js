const express = require("express");
const public = require("../../controllers/public");

const router = express.Router();

router.get("/", public.health);

module.exports = router;
