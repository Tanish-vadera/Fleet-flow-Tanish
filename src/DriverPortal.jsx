import React from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  LogOut, 
  AlertTriangle,
  PhoneCall
} from 'lucide-react';

export default function DriverPortal({ onLogout }) {
  // Mock data for the logged-in driver
  const assignedTask = {
    truckId: "LS-01",
    truckName: "APEX HAULER",
    origin: "Main Hub (Zone A)",
    destination: "Coastal Terminal",
    eta: "16:45",
    status: "On Schedule"
  };

  return (
    <div className="h-screen w-screen bg-[#00d2d3] p-6 font-[cursive] text-black flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[8px_8px_0px_#000] -rotate-1">
          <h1 className="text-3xl font-black italic uppercase leading-none">Driver Portal</h1>
        </div>
        
        <button 
          onClick={onLogout}
          className="bg-black text-white p-4 rounded-2xl border-4 border-white shadow-[6px_6px_0px_#000] active:translate-y-1 transition-all flex items-center gap-2"
        >
          <LogOut size={20} />
          <span className="font-black text-xs uppercase">End Shift</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        
        {/* LEFT COLUMN: VEHICLE FOCUS */}
        <div className="bg-white border-[10px] border-black rounded-[50px] shadow-[15px_15px_0px_#000] p-8 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="w-48 h-48 bg-blue-50 rounded-full border-8 border-black flex items-center justify-center">
              <Truck size={100} className="text-[#3498db]" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-400 border-4 border-black p-3 rounded-full">
              <ShieldCheck size={24} />
            </div>
          </div>
          
          <h2 className="text-5xl font-black italic uppercase leading-tight">{assignedTask.truckName}</h2>
          <div className="flex gap-3 mt-2">
            <span className="bg-black text-white px-4 py-1 rounded-lg font-black text-sm uppercase">
              ID: {assignedTask.truckId}
            </span>
            <span className="bg-green-400 border-2 border-black px-4 py-1 rounded-lg font-black text-sm uppercase">
              Operational
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: MISSION DETAILS */}
        <div className="flex flex-col gap-6">
          
          {/* ROUTE CARD */}
          <div className="bg-[#f1c40f] border-8 border-black rounded-[40px] shadow-[10px_10px_0px_#000] p-8 flex-1">
            <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-4">
              <MapPin size={32} />
              <h3 className="text-3xl font-black uppercase italic">Current Mission</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="font-black uppercase text-xs opacity-50">Pickup</p>
                <p className="text-2xl font-black">{assignedTask.origin}</p>
              </div>
              <div className="w-1 h-8 bg-black ml-2 rounded-full border-2 border-black" />
              <div>
                <p className="font-black uppercase text-xs opacity-50">Dropoff</p>
                <p className="text-2xl font-black">{assignedTask.destination}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center bg-white/30 p-4 rounded-2xl border-4 border-black">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span className="font-black uppercase text-sm">ETA: {assignedTask.eta}</span>
              </div>
              <span className="font-black uppercase text-sm text-green-700">{assignedTask.status}</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white border-8 border-black p-6 rounded-[30px] shadow-[8px_8px_0px_#000] flex flex-col items-center gap-2 active:translate-y-1 transition-all">
              <PhoneCall size={32} />
              <span className="font-black uppercase text-xs">Contact Boss</span>
            </button>
            <button className="bg-red-500 text-white border-8 border-black p-6 rounded-[30px] shadow-[8px_8px_0px_#000] flex flex-col items-center gap-2 active:translate-y-1 transition-all">
              <AlertTriangle size={32} />
              <span className="font-black uppercase text-xs">Breakdown</span>
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="mt-8 bg-black text-white p-4 rounded-2xl flex justify-between items-center border-4 border-white">
         <p className="font-black italic uppercase text-sm tracking-widest">Driver: Thompson, A.</p>
         <div className="flex items-center gap-2">
           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
           <p className="font-black text-[10px] uppercase">GPS Signal Active</p>
         </div>
      </div>
    </div>
  );
}