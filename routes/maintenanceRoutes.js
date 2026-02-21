const express = require("express");
const router = express.Router();
const {addMaintenance} = require("../controllers/maintenanceController");

router.post("/",addMaintenance);

module.exports = router;