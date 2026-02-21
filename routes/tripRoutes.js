const express = require("express");
const router = express.Router();
const { createTrip } = require("../controllers/tripController");

router.post("/", createTrip);

module.exports = router;