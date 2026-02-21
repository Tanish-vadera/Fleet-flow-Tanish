const express = require("express");
const router = express.Router();
const {addVehicle,getVehicles,updateStatus} = require("../controllers/vehicleController");

router.post("/",addVehicle);
router.get("/",getVehicles);
router.put("/:id",updateStatus);

module.exports = router;