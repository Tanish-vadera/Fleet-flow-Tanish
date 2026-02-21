const Vehicle = require("../models/Vehicle");

// Add vehicle
exports.addVehicle = async (req,res)=>{
  try{
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  }catch(err){
    res.status(400).json({error:err.message});
  }
};

// Get all vehicles
exports.getVehicles = async (req,res)=>{
  const vehicles = await Vehicle.find();
  res.json(vehicles);
};

// Update status
exports.updateStatus = async (req,res)=>{
  const vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    {status:req.body.status},
    {new:true}
  );
  res.json(vehicle);
};