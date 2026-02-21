import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, Hash, Weight, Gauge, Save, Pipette } from 'lucide-react';

function PreviewModel({ color }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow scale={[0.8, 0.8, 0.8]}>
        <boxGeometry args={[4, 2.2, 8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        {/* Cab */}
        <mesh position={[0, 1.2, 2]}>
          <boxGeometry args={[3.8, 1.8, 3.5]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function RegisterVehiclePage({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    capacity: '',
    odo: '',
    color: '#00d2d3'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-screen w-screen bg-[#f1c40f] font-[cursive] overflow-hidden flex flex-col relative p-12">
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(90deg, #000 0, #000 2px, transparent 0, transparent 40px)' }} />

      {/* HEADER */}
      <div className="flex justify-between items-center z-50 mb-10">
        <button 
          onClick={onBack}
          className="bg-black text-white px-8 py-4 rounded-[25px] font-black text-xl uppercase flex items-center gap-3 shadow-[8px_8px_0px_#fff] hover:scale-105 active:translate-y-2 transition-all"
        >
          <ArrowLeft strokeWidth={4} /> EXIT TO HANGAR
        </button>
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[10px_10px_0px_#000] -rotate-1">
          <h1 className="text-5xl font-black italic uppercase leading-none tracking-tighter text-red-500">NEW ASSET INTAKE</h1>
        </div>
      </div>

      <div className="flex gap-12 flex-1 z-10 overflow-hidden">
        {/* LEFT: FORM SECTION */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="w-1/2 bg-white border-[10px] border-black p-12 rounded-[60px] shadow-[20px_20px_0px_#000] overflow-y-auto custom-scrollbar"
        >
          <div className="grid grid-cols-1 gap-8">
            {/* NAME */}
            <div className="relative">
              <label className="flex items-center gap-2 font-black uppercase mb-2 text-sm"><Truck size={16}/> Model Name</label>
              <input 
                name="name" onChange={handleChange} placeholder="e.g. TITAN-V8"
                className="w-full border-8 border-black p-5 rounded-3xl font-black text-2xl uppercase placeholder:opacity-30 outline-none focus:bg-yellow-50"
              />
            </div>

            {/* PLATE & COLOR */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="flex items-center gap-2 font-black uppercase mb-2 text-sm"><Hash size={16}/> License Plate</label>
                <input 
                  name="plate" onChange={handleChange} placeholder="LOGI-001"
                  className="w-full border-8 border-black p-5 rounded-3xl font-black text-2xl uppercase outline-none focus:bg-yellow-50"
                />
              </div>
              <div className="w-32">
                <label className="flex items-center gap-2 font-black uppercase mb-2 text-sm"><Pipette size={16}/> Hue</label>
                <input 
                  type="color" name="color" value={formData.color} onChange={handleChange}
                  className="w-full h-[84px] border-8 border-black rounded-3xl cursor-pointer bg-white p-2"
                />
              </div>
            </div>

            {/* STATS */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="flex items-center gap-2 font-black uppercase mb-2 text-sm"><Weight size={16}/> Capacity (KG)</label>
                <input 
                  name="capacity" type="number" onChange={handleChange}
                  className="w-full border-8 border-black p-5 rounded-3xl font-black text-2xl outline-none focus:bg-yellow-50"
                />
              </div>
              <div className="flex-1">
                <label className="flex items-center gap-2 font-black uppercase mb-2 text-sm"><Gauge size={16}/> Current Odo (KM)</label>
                <input 
                  name="odo" type="number" onChange={handleChange}
                  className="w-full border-8 border-black p-5 rounded-3xl font-black text-2xl outline-none focus:bg-yellow-50"
                />
              </div>
            </div>

            <button className="w-full bg-[#1DD1A1] border-8 border-black p-8 rounded-[40px] font-black text-4xl italic uppercase shadow-[10px_10px_0px_#000] mt-4 hover:scale-[1.02] active:translate-y-2 transition-all flex items-center justify-center gap-4">
               <Save size={40} strokeWidth={3}/> SAVE TO FLEET
            </button>
          </div>
        </motion.div>

        {/* RIGHT: LIVE 3D PREVIEW */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="flex-1 bg-black border-[10px] border-[#fff] rounded-[60px] shadow-[20px_20px_0px_#000] relative group"
        >
          <div className="absolute top-8 left-8 z-20">
            <p className="text-white font-black italic text-2xl uppercase opacity-50">Live Asset Preview</p>
            <h3 className="text-white font-black text-5xl italic uppercase tracking-tighter">
              {formData.name || 'UNNAMED UNIT'}
            </h3>
          </div>
          
          <Canvas shadows camera={{ position: [10, 5, 10], fov: 40 }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.5} contactShadow={false}>
                <PreviewModel color={formData.color} />
              </Stage>
              <OrbitControls autoRotate enableZoom={false} />
            </Suspense>
          </Canvas>

          <div className="absolute bottom-8 right-8 text-white text-right">
            <p className="font-black text-xl italic">{formData.plate || 'XX-000-XX'}</p>
            <p className="text-[10px] font-black uppercase opacity-50">Digital Twin Synchronized</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}