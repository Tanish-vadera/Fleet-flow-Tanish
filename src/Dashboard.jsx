import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei';
import { 
  Globe, ChevronLeft, ChevronRight, Shield, PlusCircle, 
  Navigation, Wrench, Fuel, ShieldCheck, BarChart3, 
  Bell, Search, X, Activity, LogOut
} from 'lucide-react';

const animationStyles = `
  @keyframes custom-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes custom-pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
  @keyframes logo-glow { 0%, 100% { filter: drop-shadow(0 0 5px #f1c40f); } 50% { filter: drop-shadow(0 0 15px #f1c40f); } }
  .animate-custom-bounce { animation: custom-bounce 1s infinite; }
  .animate-custom-pulse { animation: custom-pulse 1.5s infinite; }
  .logo-highlight { animation: logo-glow 2s infinite; }
`;

function HangarVehicle({ color, hp }) {
  return (
    <group position={[0, -1, 0]}>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[7, 7.2, 1.2, 64]} />
        <meshStandardMaterial color="#111" metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[6.8, 6.8, 0.1, 64]} />
        <meshStandardMaterial color={hp < 30 ? "#ff4757" : "#00d2d3"} emissive={hp < 30 ? "#ff4757" : "#00d2d3"} emissiveIntensity={1} />
      </mesh>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <group scale={[1.5, 1.5, 1.5]} position={[0, 1.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[4, 2.2, 8]} />
            <meshStandardMaterial color={color || "#3498db"} metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.2, 1.8]}>
            <boxGeometry args={[3.8, 1.8, 3.5]} />
            <meshStandardMaterial color="#000" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function Dashboard({ fleet = [], alerts = [], onLogout }) {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlerts, setShowAlerts] = useState(false);

  const currentVehicle = fleet[idx] || fleet[0];
  
  // A vehicle has a notify state if it appears in the alerts array
  const hasNotify = alerts.some(a => a.id === currentVehicle.id);

  const handleSearch = (val) => {
    setSearchQuery(val);
    if (!val) return;
    const found = fleet.findIndex(v => 
      v.id.toUpperCase().includes(val.toUpperCase()) || 
      v.name.toUpperCase().includes(val.toUpperCase())
    );
    if (found !== -1) setIdx(found);
  };

  if (!fleet || fleet.length === 0) {
    return (
      <div className="h-screen w-screen bg-[#FF9F43] flex items-center justify-center font-black text-4xl italic text-white">
        SYNCING ASSETS...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#FF9F43] font-[cursive] text-black">
      <style>{animationStyles}</style>
      
      {/* TOP HUD */}
      <div className="absolute top-0 inset-x-0 p-8 flex justify-between items-start z-[150]">
        <div className="flex gap-6 items-center">
          <div className="bg-black border-[6px] border-white p-6 rounded-[40px] shadow-[10px_10px_0px_#000] -rotate-1 logo-highlight transition-transform hover:scale-105">
            <div className="flex items-center gap-3 text-[#f1c40f]">
              <Globe size={24} strokeWidth={3} className="animate-spin-slow"/>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-white">LOGISPHERE</span>
            </div>
            <h1 className="text-5xl font-black italic uppercase leading-none text-white tracking-tighter">COMMAND</h1>
          </div>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setShowAlerts(!showAlerts)}
              className={`relative p-5 rounded-3xl border-8 border-black shadow-[8px_8px_0px_#000] transition-all active:translate-y-1 ${alerts.length > 0 ? 'bg-red-500 text-white animate-bounce' : 'bg-white'}`}
            >
              <Bell size={28} strokeWidth={3} />
              {alerts.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] px-2 py-0.5 rounded-full border-2 border-white">{alerts.length}</span>}
            </button>

            <button 
              onClick={onLogout}
              className="bg-white border-4 border-black p-3 rounded-2xl shadow-[4px_4px_0px_#000] hover:bg-red-500 hover:text-white transition-colors group flex items-center justify-center"
              title="Logout"
            >
              <LogOut size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 flex items-center">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              placeholder="JUMP TO ID..." 
              className="bg-white border-4 border-black p-4 pl-12 pr-12 rounded-2xl font-black uppercase text-sm shadow-[6px_6px_0px_#000] outline-none w-[250px] focus:w-[320px] transition-all"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate('/analytics')} className="bg-white border-[6px] border-black p-4 rounded-3xl shadow-[6px_6px_0px_#000] hover:scale-110 transition-all group">
            <BarChart3 className="text-purple-600 group-hover:rotate-12 transition-transform" size={32}/>
          </button>
          <button onClick={() => navigate('/drivers')} className="bg-[#ff7675] border-[6px] border-black p-4 rounded-3xl shadow-[6px_6px_0px_#000] flex items-center gap-4 hover:scale-105 transition-all text-white">
            <ShieldCheck size={32}/>
            <div className="text-left hidden md:block">
              <p className="text-[10px] font-black uppercase leading-none opacity-80">Safety Hub</p>
              <span className="text-xl font-black italic uppercase">DRIVERS</span>
            </div>
          </button>
        </div>
      </div>

      {/* NOTIFICATION DRAWER (RE-ADDED) */}
      {showAlerts && (
        <div className="absolute right-8 top-32 w-80 z-[200] animate-in fade-in slide-in-from-right-10">
          <div className="bg-black text-white p-4 rounded-t-3xl border-x-8 border-t-8 border-white flex justify-between items-center">
            <h3 className="font-black italic uppercase text-xl">System Alerts</h3>
            <X size={20} className="cursor-pointer" onClick={() => setShowAlerts(false)} />
          </div>
          <div className="bg-white border-8 border-black rounded-b-3xl p-4 shadow-[10px_10px_0px_#000] max-h-[60vh] overflow-y-auto space-y-3">
            {alerts.length === 0 ? (
              <p className="text-center py-10 font-black opacity-30 uppercase text-xs">Systems Nominal</p>
            ) : (
              alerts.map((alert, i) => (
                <div key={i} className="p-4 rounded-2xl border-4 border-black shadow-[4px_4px_0px_#000] bg-orange-50 transition-all hover:bg-white">
                  <div className="flex justify-between mb-1">
                    <span className="text-[8px] font-black bg-black text-white px-2 py-0.5 rounded uppercase">{alert.type}</span>
                    <span className="text-[8px] font-black opacity-30">{alert.time}</span>
                  </div>
                  <p className="font-black text-xs leading-tight uppercase mb-2">{alert.msg}</p>
                  <button onClick={() => navigate(alert.path)} className="w-full bg-yellow-400 border-2 border-black py-1 rounded-lg font-black text-[9px] uppercase shadow-[2px_2px_0px_#000]">RESOLVE ISSUE →</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 3D HANGAR */}
      <div className="absolute inset-0 z-10">
        <Canvas shadows camera={{ position: [20, 15, 25], fov: 35 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <HangarVehicle color={currentVehicle.color} hp={currentVehicle.hp} />
            <ContactShadows position={[0, -1.1, 0]} opacity={0.6} scale={20} blur={2.5} far={10} />
            <OrbitControls autoRotate={!showAlerts} enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* NAVIGATION ARROWS */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-10 z-[120] pointer-events-none">
        <button onClick={() => setIdx(p => (p - 1 + fleet.length) % fleet.length)} className="pointer-events-auto bg-white border-8 border-black p-5 rounded-full shadow-[8px_8px_0px_#000] active:translate-y-1 hover:scale-110 transition-all"><ChevronLeft size={48} strokeWidth={4}/></button>
        <button onClick={() => setIdx(p => (p + 1) % fleet.length)} className="pointer-events-auto bg-white border-8 border-black p-5 rounded-full shadow-[8px_8px_0px_#000] active:translate-y-1 hover:scale-110 transition-all"><ChevronRight size={48} strokeWidth={4}/></button>
      </div>

      {/* BOTTOM HUD */}
      <div className="absolute bottom-0 inset-x-0 p-10 flex justify-between items-end z-[100]">
        <div className="bg-white border-[10px] border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000] w-[450px]">
          <div className="mb-6">
            <h2 className="text-4xl font-black italic uppercase leading-none">{currentVehicle.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-[10px] font-black opacity-40 uppercase">ID: {currentVehicle.id}</p>
              <span className={`px-3 py-0.5 rounded-full border-2 border-black font-black text-[9px] uppercase ${currentVehicle.status === 'In Shop' ? 'bg-red-500 text-white' : 'bg-green-400'}`}>
                {currentVehicle.status}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-100 border-4 border-black p-3 rounded-2xl relative">
              <Shield size={20}/>
              <div className="flex-1 h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                <div className={`h-full ${currentVehicle.hp < 30 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${currentVehicle.hp || 0}%` }} />
              </div>
              {/* This button pulses if the vehicle has an alert */}
              <button onClick={() => navigate('/maintenance')} className={`border-4 border-black p-2 rounded-lg transition-all ${hasNotify ? 'bg-red-500 text-white animate-custom-pulse' : 'bg-yellow-400'}`}>
                <Wrench size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate('/dispatch')} className="bg-[#6c5ce7] border-[10px] border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000] text-white font-black italic text-2xl uppercase flex items-center gap-4 hover:scale-105 active:translate-y-2"><Navigation size={28}/> DISPATCH</button>
          <button onClick={() => navigate('/register')} className="bg-[#FF4757] border-[10px] border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000] text-white font-black italic text-2xl uppercase flex items-center gap-4 hover:scale-105 active:translate-y-2"><PlusCircle size={28}/> REGISTER</button>
        </div>
      </div>
    </div>
  );
}