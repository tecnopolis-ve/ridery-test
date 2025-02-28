const express = require("express");
const { checkAuth } = require("../../middlewares/checkAuth");
const user = require('../../controllers/user');

const router = express.Router();

// router.use(checkAuth);

router.post("/", user.create);
router.get("/", user.list);
router.get("/:id", user.get);
router.patch("/:id", user.update);

module.exports = router;
