import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei';
import { Globe, ChevronLeft, ChevronRight, AlertTriangle, Activity, Shield, PlusCircle, Navigation, Wrench, Fuel } from 'lucide-react';

const animationStyles = `
  @keyframes custom-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes custom-pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
  .animate-custom-bounce { animation: custom-bounce 1s infinite; }
  .animate-custom-pulse { animation: custom-pulse 1.5s infinite; }
`;

function HangarVehicle({ color, hp }) {
  return (
    <group position={[0, 0, 0]}>
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
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
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

export default function Dashboard({ fleet }) {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  
  // Track notifications per vehicle ID
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentId = fleet[idx]?.id;
      setNotifications(prev => ({ ...prev, [currentId]: true }));
    }, 4000); 

    return () => clearTimeout(timer);
  }, [idx, fleet]);

  if (!fleet || fleet.length === 0) return <div>Loading...</div>;
  const currentVehicle = fleet[idx];
  const hasNotify = notifications[currentVehicle.id];

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#FF9F43] font-[cursive]">
      <style>{animationStyles}</style>
      
      {/* TOP HUD */}
      <div className="absolute top-0 inset-x-0 p-8 flex justify-between items-start z-[100]">
        <div className="bg-white border-[8px] border-black p-5 rounded-[35px] shadow-[8px_8px_0px_#000] -rotate-2">
          <div className="flex items-center gap-2 text-blue-600"><Globe size={20}/><span className="text-[10px] font-black uppercase">LOGISPHERE</span></div>
          <h1 className="text-4xl font-black italic uppercase leading-none">COMMAND</h1>
        </div>
        <div className="bg-white border-[6px] border-black p-4 rounded-3xl shadow-[6px_6px_0px_#000] flex items-center gap-4">
          <Activity className="text-blue-600"/><span className="text-xl font-black italic">{currentVehicle.util}% UTIL</span>
        </div>
      </div>

      {/* 3D HANGAR */}
      <div className="absolute inset-0 z-10">
        <Canvas shadows camera={{ position: [20, 15, 25], fov: 35 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <HangarVehicle color={currentVehicle.color} hp={currentVehicle.hp} />
            <ContactShadows position={[0, -0.1, 0]} opacity={0.6} scale={20} blur={2.5} far={10} />
            <OrbitControls autoRotate enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* RESTORED NAV ARROWS */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-10 z-[120] pointer-events-none">
        <button 
          onClick={() => setIdx(p => (p - 1 + fleet.length) % fleet.length)} 
          className="pointer-events-auto bg-white border-8 border-black p-5 rounded-full shadow-[8px_8px_0px_#000] active:translate-y-1 hover:scale-110 transition-all"
        >
          <ChevronLeft size={48} strokeWidth={4}/>
        </button>
        <button 
          onClick={() => setIdx(p => (p + 1) % fleet.length)} 
          className="pointer-events-auto bg-white border-8 border-black p-5 rounded-full shadow-[8px_8px_0px_#000] active:translate-y-1 hover:scale-110 transition-all"
        >
          <ChevronRight size={48} strokeWidth={4}/>
        </button>
      </div>

      {/* BOTTOM HUD */}
      <div className="absolute bottom-0 inset-x-0 p-10 flex justify-between items-end z-[100]">
        <div className="bg-white border-[10px] border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000] w-[450px]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-4xl font-black italic uppercase leading-none">{currentVehicle.name}</h2>
              <p className="text-[10px] font-black opacity-40 uppercase mt-1">ID: {currentVehicle.id} • {currentVehicle.cap} KG</p>
            </div>
            <span className={`px-4 py-1 rounded-full border-4 border-black font-black text-xs uppercase ${currentVehicle.status === 'In Shop' ? 'bg-red-500 text-white' : 'bg-green-400'}`}>
              {currentVehicle.status || 'Available'}
            </span>
          </div>
          
          <div className="space-y-4">
            {/* HP BAR */}
            <div className="flex items-center gap-4 bg-gray-100 border-4 border-black p-3 rounded-2xl relative">
              <Shield size={20}/>
              <div className="flex-1 h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                <div className={`h-full ${currentVehicle.hp < 30 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${currentVehicle.hp}%` }} />
              </div>
              <div className="relative">
                {hasNotify && (
                  <div className="absolute -top-16 -left-10 bg-black text-white text-[10px] font-black p-3 rounded-xl animate-custom-bounce z-[200] shadow-[4px_4px_0px_#ff4757]">
                    SERVICE!
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
                  </div>
                )}
                <button 
                  onClick={() => navigate('/maintenance')}
                  className={`border-4 border-black p-2 rounded-lg transition-all ${hasNotify ? 'bg-red-500 text-white animate-custom-pulse' : 'bg-yellow-400'}`}
                >
                  <Wrench size={18} className={hasNotify ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* FUEL BAR (NEW) */}
            <div className="flex items-center gap-4 bg-gray-100 border-4 border-black p-3 rounded-2xl">
              <Fuel size={20}/>
              <div className="flex-1 h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                <div className="h-full bg-orange-400" style={{ width: '65%' }} />
              </div>
              <p className="font-black text-xs">65%</p>
            </div>
          </div>
        </div>

        {/* MAIN BUTTONS */}
        <div className="flex gap-4">
          <button onClick={() => navigate('/dispatch')} className="bg-[#6c5ce7] border-[10px] border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000] text-white font-black italic text-2xl uppercase flex items-center gap-4 hover:scale-105 active:translate-y-2"><Navigation size={28}/> DISPATCH</button>
          <button onClick={() => navigate('/register')} className="bg-[#FF4757] border-[10px] border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000] text-white font-black italic text-2xl uppercase flex items-center gap-4 hover:scale-105 active:translate-y-2"><PlusCircle size={28}/> REGISTER</button>
        </div>
      </div>
    </div>
  );
}