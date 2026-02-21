const Maintenance = require("../models/Maintenance");
const Vehicle = require("../models/Vehicle");

exports.addMaintenance = async (req, res) => {
  try {
    const record = await Maintenance.create(req.body);

    await Vehicle.findByIdAndUpdate(req.body.vehicleId, {
      status: "In Shop",
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};