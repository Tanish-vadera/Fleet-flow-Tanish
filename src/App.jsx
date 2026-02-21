import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import DriverPortal from './DriverPortal';
import RegisterVehiclePage from './RegisterVehiclePage';
import Dispatch from './Dispatch';
import Maintenance from './Maintenance';
import DriverManagement from './DriverManagement';
import Expenses from './Expenses';
import Analytics from './Analytics';

export default function App() {
  const [userRole, setUserRole] = useState(null); 
  const [fleet, setFleet] = useState([
    { id: 'LS-01', name: 'APEX HAULER', color: '#3498db', hp: 95, util: 82, cap: 5000, status: 'Available' },
    { id: 'LS-02', name: 'NEON SPRINT', color: '#ff4757', hp: 15, util: 45, cap: 1200, status: 'In Shop' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 'D-101', name: 'Alex Thompson', license: 'Van', expiry: '2025-12-01', score: 98, status: 'Available' }
  ]);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  const getAlerts = () => {
    const alerts = [];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    fleet.forEach(v => {
      if (v.hp < 30) {
        alerts.push({ 
          id: v.id, 
          type: 'CRITICAL', 
          msg: `${v.name} needs urgent repair!`, 
          time: now, 
          path: '/maintenance' 
        });
      }
    });

    drivers.forEach(d => {
      if (new Date(d.expiry) < new Date()) {
        alerts.push({ 
          id: d.id, 
          type: 'WARNING', 
          msg: `Driver ${d.name}'s license EXPIRED!`, 
          time: now, 
          path: '/drivers' 
        });
      }
    });

    return alerts;
  };

  const addVehicle = (v) => setFleet([...fleet, { ...v, status: 'Available' }]);
  const addDriver = (d) => setDrivers([...drivers, d]);
  const updateStatus = (id, s) => setFleet(fleet.map(v => v.id === id ? { ...v, status: s } : v));

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            !userRole ? (
              <LoginPage onLogin={handleLogin} />
            ) : userRole === 'boss' ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/driver-portal" />
            )
          } 
        />

        {/* BOSS ROUTES */}
        <Route 
          path="/dashboard" 
          element={
            userRole === 'boss' ? (
              <Dashboard fleet={fleet} alerts={getAlerts()} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        
        <Route path="/register" element={<RegisterVehiclePage onSave={addVehicle} fleetLength={fleet.length} />} />
        <Route path="/dispatch" element={<Dispatch fleet={fleet} drivers={drivers} />} />
        <Route path="/maintenance" element={<Maintenance fleet={fleet} setFleetStatus={updateStatus} />} />
        <Route path="/drivers" element={<DriverManagement drivers={drivers} onAdd={addDriver} />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* DRIVER ROUTES */}
        <Route 
          path="/driver-portal" 
          element={
            userRole === 'driver' ? (
              <DriverPortal onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}