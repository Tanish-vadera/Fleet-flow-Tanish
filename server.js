const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const vehicleRoutes = require("./routes/vehicleRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const tripRoutes = require("./routes/tripRoutes");   // ⭐ ADD THIS

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("FleetFlow backend running");
});

// Routes
app.use("/vehicles", vehicleRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/trips", tripRoutes);        // ⭐ ADD THIS

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});