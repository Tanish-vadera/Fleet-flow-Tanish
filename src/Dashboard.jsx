import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment, Stage } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronLeft, ChevronRight, AlertTriangle, Activity, MapPin, Shield, PlusCircle, Package, ArrowLeft, Truck, Hash, Weight, Save, Pipette, Settings } from 'lucide-react';

function HangarVehicle({ color, hp, isPreview = false }) {
  const scale = isPreview ? 0.9 : 1.5;
  return (
    <group position={[0, 0, 0]}>
      {!isPreview && (
        <>
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[7, 7.2, 1.2, 64]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[6.8, 6.8, 0.1, 64]} />
            <meshStandardMaterial color={hp < 30 ? "#ff4757" : "#00d2d3"} emissive={hp < 30 ? "#ff4757" : "#00d2d3"} emissiveIntensity={1} />
          </mesh>
        </>
      )}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <group scale={[scale, scale, scale]} position={[0, isPreview ? 0 : 1.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[4, 2.2, 8]} />
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.2, 1.8]}>
            <boxGeometry args={[3.8, 1.8, 3.5]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          {[[-2.1, -1.1, 2.5], [2.1, -1.1, 2.5], [-2.1, -1.1, -2.5], [2.1, -1.1, -2.5]].map((pos, i) => (
            <group key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
              <mesh><cylinderGeometry args={[1, 1, 0.8, 32]} /><meshStandardMaterial color="#000" /></mesh>
              <mesh position={[0, 0.45, 0]}><cylinderGeometry args={[0.6, 0.6, 0.1, 16]} /><meshStandardMaterial color="#fff" /></mesh>
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
}

export default function LogiSphereApp() {
  const [view, setView] = useState('dashboard');
  const [idx, setIdx] = useState(0);
  const [fleet, setFleet] = useState([
    { id: 'LS-01', name: 'APEX HAULER', color: '#3498db', hp: 95, util: 82, pending: 12, onTrip: 4, cap: 5000 },
    { id: 'LS-02', name: 'NEON SPRINT', color: '#ff4757', hp: 15, util: 45, pending: 3, onTrip: 1, cap: 1200 }
  ]);

  const [form, setForm] = useState({ name: '', plate: '', cap: '', color: '#00d2d3' });

  const currentVehicle = fleet[idx];

  const handleAddAsset = () => {
    const newAsset = {
      id: `LS-0${fleet.length + 1}`,
      name: form.name || "NEW_UNIT",
      color: form.color,
      hp: 100,
      util: 0,
      pending: 0,
      onTrip: 0,
      cap: form.cap || 0
    };
    setFleet([...fleet, newAsset]);
    setIdx(fleet.length);
    setView('dashboard');
    setForm({ name: '', plate: '', cap: '', color: '#00d2d3' });
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#FF9F43]">
      <AnimatePresence mode="wait">
        {view === 'dashboard' ? (
          <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full relative">
            
            {/* TOP NAVIGATION */}
            <div className="absolute top-0 inset-x-0 p-8 flex justify-between items-start z-[100] pointer-events-none font-[cursive]">
              <div className="bg-white border-[8px] border-black p-5 rounded-[35px] shadow-[8px_8px_0px_#000] -rotate-2 pointer-events-auto">
                <div className="flex items-center gap-2 text-blue-600"><Globe size={20} strokeWidth={4} /><span className="text-xs font-black uppercase">LOGISPHERE</span></div>
                <h1 className="text-4xl font-black italic uppercase leading-none">COMMAND</h1>
              </div>
              <div className="flex gap-4 pointer-events-auto">
                <div className="bg-white border-[6px] border-black p-4 rounded-3xl shadow-[6px_6px_0px_#000] flex items-center gap-4">
                  <Activity className="text-blue-600"/><span className="text-xl font-black italic">{currentVehicle.util}%</span>
                </div>
              </div>
            </div>

            {/* NEW MAINTENANCE ALERT SIDEBAR */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 pointer-events-none">
              <AnimatePresence>
                {currentVehicle.hp < 30 && (
                  <motion.div 
                    initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}
                    className="bg-red-500 border-8 border-black p-6 rounded-[35px] shadow-[8px_8px_0px_#000] text-white w-64 pointer-events-auto flex flex-col items-center gap-2 text-center"
                  >
                    <AlertTriangle size={48} className="animate-bounce" strokeWidth={3} />
                    <h3 className="text-2xl font-black italic uppercase italic leading-none">MAINTENANCE ALERT</h3>
                    <p className="text-[10px] font-black uppercase opacity-80">Critical Health Detected</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="bg-white border-8 border-black p-6 rounded-[35px] shadow-[8px_8px_0px_#000] w-64 pointer-events-auto">
                <p className="text-xs font-black uppercase border-b-2 border-black pb-2 mb-2">Fleet Summary</p>
                <div className="flex justify-between font-black italic text-xl">
                  <span>TOTAL</span><span>{fleet.length} Units</span>
                </div>
              </div>
            </div>

            {/* 3D VIEW */}
            <div className="absolute inset-0 z-10">
              <Canvas shadows camera={{ position: [20, 15, 25], fov: 35 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={1} /><Environment preset="city" />
                  <HangarVehicle color={currentVehicle.color} hp={currentVehicle.hp} />
                  <ContactShadows position={[0, -0.1, 0]} opacity={0.6} scale={20} blur={2.5} far={10} />
                  <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
                </Suspense>
              </Canvas>
            </div>

            {/* ARROWS */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 z-[110] pointer-events-none">
              <button onClick={() => setIdx(p => (p - 1 + fleet.length) % fleet.length)} className="pointer-events-auto bg-white border-8 border-black p-4 rounded-full shadow-[6px_6px_0px_#000] hover:scale-110 active:translate-y-1 transition-all"><ChevronLeft size={36}/></button>
              <button onClick={() => setIdx(p => (p + 1) % fleet.length)} className="pointer-events-auto bg-white border-8 border-black p-4 rounded-full shadow-[6px_6px_0px_#000] hover:scale-110 active:translate-y-1 transition-all"><ChevronRight size={36}/></button>
            </div>

            {/* BOTTOM HUD */}
            <div className="absolute bottom-0 inset-x-0 p-10 flex justify-between items-end z-[100] pointer-events-none font-[cursive]">
              <div className="bg-white border-[10px] border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000] w-[380px] pointer-events-auto">
                <h2 className="text-4xl font-black italic uppercase mb-2 tracking-tighter">{currentVehicle.name}</h2>
                <p className="text-xs font-black opacity-40 uppercase mb-4 tracking-widest">Cap: {currentVehicle.cap} KG / ID: {currentVehicle.id}</p>
                <div className="flex items-center gap-4 bg-gray-100 border-4 border-black p-3 rounded-2xl">
                  <Shield size={20}/><div className="flex-1 h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                    <div className={`h-full ${currentVehicle.hp < 30 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${currentVehicle.hp}%` }} />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setView('register')} 
                className="bg-[#FF4757] border-[10px] border-black p-8 rounded-[45px] shadow-[12px_12px_0px_#000] text-white font-black italic text-3xl uppercase pointer-events-auto hover:scale-105 active:translate-y-2 transition-all flex items-center gap-4"
              >
                <PlusCircle size={32} strokeWidth={4}/> REGISTER ASSET
              </button>
            </div>
          </motion.div>
        ) : (
          /* --- REGISTER PAGE --- */
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="absolute inset-0 bg-[#f1c40f] z-[200] p-12 flex flex-col font-[cursive]"
          >
            <div className="flex justify-between items-center mb-10">
              <button onClick={() => setView('dashboard')} className="bg-black text-white px-8 py-4 rounded-[25px] font-black text-xl flex items-center gap-3 shadow-[8px_8px_0px_#fff]">
                <ArrowLeft strokeWidth={4} /> EXIT
              </button>
              <h1 className="bg-white border-8 border-black p-4 rounded-[30px] text-4xl font-black italic uppercase text-red-500">ASSET INTAKE</h1>
            </div>

            <div className="flex gap-10 flex-1 overflow-hidden">
              <div className="w-1/2 bg-white border-[10px] border-black p-10 rounded-[50px] shadow-[15px_15px_0px_#000] space-y-6 overflow-y-auto">
                {/* LIVE UPDATING INPUTS */}
                <div><label className="block font-black uppercase text-xs mb-2">Vehicle Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border-4 border-black p-4 rounded-2xl font-black text-xl outline-none focus:bg-yellow-50"/></div>
                
                <div className="flex gap-4">
                  <div className="flex-1"><label className="block font-black uppercase text-xs mb-2">Plate</label>
                  <input value={form.plate} onChange={e => setForm({...form, plate: e.target.value})} className="w-full border-4 border-black p-4 rounded-2xl font-black text-xl outline-none"/></div>
                  <div className="w-24"><label className="block font-black uppercase text-xs mb-2">Color</label>
                  <input type="color" value={form.color} onChange={e => setForm({...form, color: e.target.value})} className="w-full h-16 border-4 border-black rounded-2xl cursor-pointer bg-white p-1"/></div>
                </div>

                <div><label className="block font-black uppercase text-xs mb-2">Max Capacity (KG)</label>
                <input value={form.cap} type="number" onChange={e => setForm({...form, cap: e.target.value})} className="w-full border-4 border-black p-4 rounded-2xl font-black text-xl outline-none"/></div>

                <button onClick={handleAddAsset} className="w-full bg-[#1DD1A1] border-8 border-black p-6 rounded-3xl font-black text-3xl italic uppercase shadow-[8px_8px_0px_#000] active:translate-y-1">SAVE ASSET</button>
              </div>

              {/* LIVE 3D PREVIEW BLOCK */}
              <div className="flex-1 bg-black border-[10px] border-white rounded-[50px] shadow-[15px_15px_0px_#000] relative overflow-hidden">
                 <div className="absolute top-8 left-8 z-30 pointer-events-none">
                    <p className="text-white opacity-40 text-xs font-black uppercase">Live Link Active</p>
                    <h3 className="text-white text-4xl font-black italic uppercase tracking-tighter">{form.name || 'AWAITING_NAME'}</h3>
                 </div>
                 <Canvas shadows camera={{ position: [12, 8, 12], fov: 40 }}>
                    <Suspense fallback={null}>
                       <Stage environment="city" intensity={0.5} contactShadow={false}>
                          <HangarVehicle color={form.color} isPreview />
                       </Stage>
                       <OrbitControls autoRotate enableZoom={false} />
                    </Suspense>
                 </Canvas>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}