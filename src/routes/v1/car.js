const express = require("express");
const { checkAuth } = require("../../middlewares/checkAuth");
const car = require("../../controllers/car");

const router = express.Router();

router.use(checkAuth);

router.post("/", car.create);
router.get("/", car.list);
router.get("/fleet/:flota", car.listByFleet);
router.get("/brand/:marca", car.listByBrand);
router.get("/:id", car.get);
router.patch("/:id", car.update);
router.delete("/:id", car.remove);

module.exports = router;
