import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Truck, User, Weight, Activity, CheckCircle, XCircle, MapPin, AlertTriangle } from 'lucide-react';

export default function Dispatch({ fleet }) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    vehicleIdx: 0,
    driver: '',
    cargoWeight: '',
    destination: '', // Added this back to the state
    status: 'DRAFT'
  });

  const [error, setError] = useState('');
  const selectedVehicle = fleet[formData.vehicleIdx] || fleet[0];
  const drivers = ["John Doe", "Sarah Smith", "Mike Ross", "Elena Fisher"];

  const handleDispatch = () => {
    setError('');

    // Validation Check
    if (!formData.driver || !formData.destination || !formData.cargoWeight) {
      setError('ALL FIELDS ARE REQUIRED');
      return;
    }

    // Weight Check
    if (Number(formData.cargoWeight) > selectedVehicle.cap) {
      setError(`OVERWEIGHT! MAX: ${selectedVehicle.cap} KG`);
      return;
    }

    setFormData(prev => ({ ...prev, status: 'DISPATCHED' }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-500';
      case 'DISPATCHED': return 'bg-blue-500';
      case 'COMPLETED': return 'bg-green-500';
      case 'CANCELLED': return 'bg-red-500';
      default: return 'bg-black';
    }
  };

  return (
    <div className="h-screen w-screen bg-[#a29bfe] font-[cursive] p-12 overflow-hidden flex flex-col relative text-black">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate('/dashboard')} className="bg-black text-white px-8 py-4 rounded-[25px] font-black text-xl flex items-center gap-3 shadow-[8px_8px_0px_#fff]">
          <ArrowLeft strokeWidth={4} /> HANGAR
        </button>
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[10px_10px_0px_#000]">
          <h1 className="text-4xl font-black italic uppercase">TRIP DISPATCHER</h1>
        </div>
      </div>

      <div className="flex gap-10 flex-1 overflow-hidden">
        {/* LEFT: FORM */}
        <div className="w-[500px] bg-white border-[10px] border-black p-10 rounded-[60px] shadow-[20px_20px_0px_#000] space-y-5 overflow-y-auto">
          
          <div>
            <label className="flex items-center gap-2 font-black uppercase text-xs mb-1"><Truck size={14}/> Vehicle</label>
            <select className="w-full border-4 border-black p-3 rounded-xl font-black text-lg outline-none" onChange={(e) => setFormData({...formData, vehicleIdx: e.target.value})}>
              {fleet.map((v, i) => <option key={v.id} value={i}>{v.name} ({v.cap} KG)</option>)}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 font-black uppercase text-xs mb-1"><User size={14}/> Driver</label>
            <select className="w-full border-4 border-black p-3 rounded-xl font-black text-lg outline-none" onChange={(e) => setFormData({...formData, driver: e.target.value})}>
              <option value="">SELECT DRIVER...</option>
              {drivers.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 font-black uppercase text-xs mb-1"><MapPin size={14}/> Destination</label>
            <input placeholder="Enter City..." className="w-full border-4 border-black p-3 rounded-xl font-black text-lg outline-none" onChange={(e) => setFormData({...formData, destination: e.target.value})} />
          </div>

          <div>
            <label className="flex items-center gap-2 font-black uppercase text-xs mb-1"><Weight size={14}/> Cargo Weight (KG)</label>
            <input type="number" placeholder="0000" className="w-full border-4 border-black p-3 rounded-xl font-black text-lg outline-none" onChange={(e) => setFormData({...formData, cargoWeight: e.target.value})} />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ y: 10 }} animate={{ y: 0 }} className="bg-red-500 text-white p-3 rounded-xl font-black text-center text-sm flex items-center justify-center gap-2">
                <AlertTriangle size={16}/> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            disabled={formData.status !== 'DRAFT'}
            onClick={handleDispatch}
            className={`w-full border-8 border-black p-5 rounded-[30px] text-white font-black text-2xl italic uppercase shadow-[8px_8px_0px_#000] transition-all flex items-center justify-center gap-4 ${formData.status === 'DRAFT' ? 'bg-[#6c5ce7] active:translate-y-1' : 'bg-gray-400'}`}
          >
            <Send size={28}/> DISPATCH
          </button>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="flex-1 bg-black border-[10px] border-white rounded-[60px] shadow-[20px_20px_0px_#000] p-12 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#a29bfe] font-black uppercase text-xs">Mission Tracking</p>
              <h2 className="text-6xl font-black italic uppercase text-white">{formData.status}</h2>
            </div>
            <div className={`p-4 rounded-full border-4 border-white ${getStatusColor(formData.status)}`}>
              <Activity className="text-white" size={40}/>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border-2 border-white/20 p-6 rounded-3xl">
              <p className="text-white/40 font-black uppercase text-[10px] mb-1">Destination</p>
              <p className="text-white text-3xl font-black italic uppercase">{formData.destination || "---"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 border-2 border-white/20 p-5 rounded-3xl">
                  <p className="text-white/40 font-black uppercase text-[10px] mb-1">Driver</p>
                  <p className="text-white text-xl font-black italic">{formData.driver || "---"}</p>
               </div>
               <div className="bg-white/5 border-2 border-white/20 p-5 rounded-3xl">
                  <p className="text-white/40 font-black uppercase text-[10px] mb-1">Asset</p>
                  <p className="text-white text-xl font-black italic">{selectedVehicle.name}</p>
               </div>
            </div>
          </div>

          {formData.status === 'DISPATCHED' && (
            <div className="flex gap-4">
              <button onClick={() => setFormData({...formData, status: 'COMPLETED'})} className="flex-1 bg-green-500 border-4 border-white p-5 rounded-2xl text-white font-black uppercase">Complete</button>
              <button onClick={() => setFormData({...formData, status: 'CANCELLED'})} className="flex-1 bg-red-500 border-4 border-white p-5 rounded-2xl text-white font-black uppercase">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}