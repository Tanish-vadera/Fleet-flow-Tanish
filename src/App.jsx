import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ArrowLeft, Fuel, DollarSign, Save, BarChart3, TrendingUp, Zap, Activity } from 'lucide-react';

// Import your existing pages
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import RegisterVehiclePage from './RegisterVehiclePage';
import Dispatch from './Dispatch';
import Maintenance from './Maintenance';
import DriverManagement from './DriverManagement';

// --- PAGE 6: EXPENSES (Built-in) ---
const Expenses = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-[#00d2d3] flex items-center justify-center font-[cursive] p-6">
      <div className="bg-white border-[10px] border-black p-10 rounded-[50px] shadow-[20px_20px_0px_#000] w-full max-w-md">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-orange-100 p-3 rounded-2xl border-4 border-black">
            <Fuel size={32} className="text-orange-500" />
          </div>
          <h1 className="text-4xl font-black italic uppercase">FUEL LOG</h1>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <Activity size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
            <input type="number" placeholder="LITERS" className="w-full border-4 border-black p-4 pl-12 rounded-2xl font-black text-xl outline-none focus:bg-yellow-50" />
          </div>
          <div className="relative">
            <DollarSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
            <input type="number" placeholder="TOTAL COST" className="w-full border-4 border-black p-4 pl-12 rounded-2xl font-black text-xl outline-none focus:bg-yellow-50" />
          </div>
          <button onClick={() => { alert('Log Saved!'); navigate('/dashboard'); }} className="w-full bg-yellow-400 border-4 border-black p-5 rounded-2xl font-black uppercase text-2xl italic shadow-[6px_6px_0px_#000] active:translate-y-1 transition-all">
            SUBMIT ENTRY
          </button>
          <button onClick={() => navigate('/dashboard')} className="w-full text-center font-black uppercase text-sm opacity-40 hover:opacity-100">Cancel</button>
        </div>
      </div>
    </div>
  );
};

// --- PAGE 8: ANALYTICS (Built-in) ---
const Analytics = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-[#a29bfe] p-12 font-[cursive] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <button onClick={() => navigate('/dashboard')} className="bg-black text-white px-8 py-4 rounded-3xl font-black text-xl flex items-center gap-3 shadow-[8px_8px_0px_#fff] active:translate-y-1 transition-all">
          <ArrowLeft strokeWidth={4} /> HANGAR
        </button>
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[10px_10px_0px_#000]">
          <h1 className="text-4xl font-black italic uppercase">FINANCIAL RADAR</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-8 mb-8">
        {[
          { label: 'Revenue', val: '$12.4K', icon: <TrendingUp className="text-green-500"/> },
          { label: 'Efficiency', val: '94%', icon: <Zap className="text-yellow-500"/> },
          { label: 'ROI', val: '+18.2%', icon: <BarChart3 className="text-purple-500"/> }
        ].map((s) => (
          <div key={s.label} className="bg-white border-8 border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000]">
            <div className="bg-gray-100 w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center mb-4">{s.icon}</div>
            <p className="text-5xl font-black italic">{s.val}</p>
            <p className="font-black uppercase opacity-40 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white border-[10px] border-black rounded-[60px] shadow-[20px_20px_0px_#000] p-10">
         <h3 className="text-2xl font-black uppercase mb-6 italic">Performance Trends</h3>
         <div className="h-48 w-full flex items-end gap-4 border-b-8 border-black">
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#6c5ce7] border-4 border-b-0 border-black rounded-t-xl" />
            ))}
         </div>
         <div className="flex justify-between mt-4 font-black uppercase text-xs opacity-40">
           <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
         </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [fleet, setFleet] = useState([
    { id: 'LS-01', name: 'APEX HAULER', color: '#3498db', hp: 95, util: 82, cap: 5000, status: 'Available' },
    { id: 'LS-02', name: 'NEON SPRINT', color: '#ff4757', hp: 15, util: 45, cap: 1200, status: 'In Shop' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 'D-101', name: 'Alex Thompson', license: 'Van', expiry: '2025-12-01', score: 98, status: 'Available' }
  ]);

  const addVehicle = (v) => setFleet([...fleet, { ...v, status: 'Available' }]);
  const addDriver = (d) => setDrivers([...drivers, d]);
  const updateStatus = (id, s) => setFleet(fleet.map(v => v.id === id ? { ...v, status: s } : v));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard fleet={fleet} />} />
        <Route path="/register" element={<RegisterVehiclePage onSave={addVehicle} fleetLength={fleet.length} />} />
        <Route path="/dispatch" element={<Dispatch fleet={fleet} drivers={drivers} />} />
        <Route path="/maintenance" element={<Maintenance fleet={fleet} setFleetStatus={updateStatus} />} />
        <Route path="/drivers" element={<DriverManagement drivers={drivers} onAdd={addDriver} />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}