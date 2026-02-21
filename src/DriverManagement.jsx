import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, ShieldCheck, ShieldAlert, Award, Calendar, Search } from 'lucide-react';

export default function DriverManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Driver Data based on your PRD
  const [drivers, setDrivers] = useState([
    { id: 'D-101', name: 'Alex Thompson', license: 'Van', expiry: '2025-12-01', score: 98, status: 'On Duty' },
    { id: 'D-102', name: 'Sarah Miller', license: 'Truck', expiry: '2023-10-15', score: 85, status: 'Suspended' },
    { id: 'D-103', name: 'Mike Ross', license: 'Bike', expiry: '2026-05-20', score: 92, status: 'Off Duty' },
    { id: 'D-104', name: 'Elena Fisher', license: 'Truck', expiry: '2024-01-10', score: 78, status: 'On Duty' }
  ]);

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <div className="h-screen w-screen bg-[#ff7675] font-[cursive] p-12 overflow-hidden flex flex-col relative text-black">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate('/dashboard')} className="bg-black text-white px-8 py-4 rounded-[25px] font-black text-xl flex items-center gap-3 shadow-[8px_8px_0px_#fff]">
          <ArrowLeft strokeWidth={4} /> HANGAR
        </button>
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[10px_10px_0px_#000]">
          <h1 className="text-4xl font-black italic uppercase text-[#d63031]">SAFETY COMMAND</h1>
        </div>
      </div>

      <div className="flex gap-10 flex-1 overflow-hidden">
        {/* DRIVER LIST */}
        <div className="flex-1 bg-white border-[10px] border-black p-8 rounded-[60px] shadow-[20px_20px_0px_#000] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
              <input 
                type="text" 
                placeholder="SEARCH DRIVER NAME..." 
                className="w-full border-4 border-black p-4 pl-12 rounded-2xl font-black outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-black text-white p-4 rounded-2xl hover:scale-105 transition-transform">
              <UserPlus />
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto pr-2">
            {drivers
              .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((driver) => {
                const expired = isExpired(driver.expiry);
                return (
                  <div key={driver.id} className="border-4 border-black p-5 rounded-3xl flex justify-between items-center hover:bg-red-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full border-4 border-black flex items-center justify-center font-black text-xl ${expired ? 'bg-gray-300' : 'bg-yellow-400'}`}>
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-black text-2xl italic leading-none">{driver.name}</h3>
                        <p className="text-[10px] font-black opacity-40 uppercase">{driver.id} • {driver.license} CLASS</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-[10px] font-black opacity-40 uppercase mb-1">Safety Score</p>
                        <div className="flex items-center gap-1 font-black text-xl">
                          <Award size={18} className="text-yellow-500" /> {driver.score}
                        </div>
                      </div>

                      <div className="w-40">
                        <p className="text-[10px] font-black opacity-40 uppercase mb-1">License Expiry</p>
                        <div className={`flex items-center gap-2 font-black text-xs px-3 py-1 rounded-lg border-2 border-black ${expired ? 'bg-red-500 text-white animate-pulse' : 'bg-green-100'}`}>
                          <Calendar size={14} /> {driver.expiry}
                        </div>
                      </div>

                      <div className={`px-4 py-2 rounded-xl border-4 border-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] ${driver.status === 'Suspended' ? 'bg-black text-white' : 'bg-white'}`}>
                        {driver.status}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* COMPLIANCE LOGIC PREVIEW */}
        <div className="w-1/3 bg-black border-[10px] border-white rounded-[60px] shadow-[20px_20px_0px_#000] p-10 flex flex-col justify-center text-center">
          <div className="mb-8">
            <ShieldCheck size={80} className="text-green-400 mx-auto mb-4" />
            <h2 className="text-white text-3xl font-black italic uppercase">Rule-Based Blocking</h2>
          </div>
          <div className="space-y-4 text-left">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 flex gap-3 items-start">
              <ShieldAlert className="text-red-500 shrink-0" />
              <p className="text-white/80 text-xs font-black uppercase leading-tight">System blocks "Sarah Miller" from Dispatch because license expired in 2023.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 flex gap-3 items-start">
              <ShieldAlert className="text-red-500 shrink-0" />
              <p className="text-white/80 text-xs font-black uppercase leading-tight">Drivers with score &lt; 80 are flagged for retraining.</p>
            </div>
          </div>
          
          <button className="mt-10 bg-[#ff7675] border-4 border-white p-5 rounded-[25px] text-white font-black text-xl uppercase italic shadow-[0px_6px_0px_#fff] active:translate-y-1 transition-all">
            AUDIT ALL LOGS
          </button>
        </div>
      </div>
    </div>
  );
}