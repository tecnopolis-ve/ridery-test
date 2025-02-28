const express = require("express");
const { checkAuth } = require("../../middlewares/checkAuth");
const user = require('../../controllers/me');

const router = express.Router();

router.use(checkAuth);

router.get("/", user.me);
router.patch("/profile", user.update);

module.exports = router;
