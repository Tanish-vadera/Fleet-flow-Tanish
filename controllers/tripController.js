const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");

exports.createTrip = async (req, res) => {
  try {
    const { vehicleId, cargoWeight } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // ⭐ CORE RULE
    if (cargoWeight > vehicle.capacity) {
      return res.status(400).json({ error: "Cargo exceeds vehicle capacity" });
    }

    // Create trip
    const trip = await Trip.create({ vehicleId, cargoWeight });

    // Mark vehicle On Trip
    await Vehicle.findByIdAndUpdate(vehicleId, { status: "On Trip" });

    res.status(201).json(trip);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};