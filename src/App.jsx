import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import RegisterVehiclePage from './RegisterVehiclePage';
import Dispatch from './Dispatch';
import Maintenance from './Maintenance';

export default function App() {
  const [fleet, setFleet] = useState([
    { id: 'LS-01', name: 'APEX HAULER', color: '#3498db', hp: 95, util: 82, cap: 5000, status: 'Available' },
    { id: 'LS-02', name: 'NEON SPRINT', color: '#ff4757', hp: 15, util: 45, cap: 1200, status: 'In Shop' }
  ]);

  const addVehicle = (newVehicle) => {
    setFleet((prev) => [...prev, { ...newVehicle, status: 'Available' }]);
  };

  const updateVehicleStatus = (id, newStatus) => {
    setFleet((prev) => 
      prev.map(v => v.id === id ? { ...v, status: newStatus } : v)
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard fleet={fleet} />} />
        <Route path="/register" element={<RegisterVehiclePage onSave={addVehicle} fleetLength={fleet.length} />} />
        <Route path="/dispatch" element={<Dispatch fleet={fleet} />} />
        <Route path="/drivers" element={<DriverManagement />} />
        <Route 
          path="/maintenance" 
          element={<Maintenance fleet={fleet} setFleetStatus={updateVehicleStatus} />} 
        />
      </Routes>
    </Router>
  );
}