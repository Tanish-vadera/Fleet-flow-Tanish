import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, Pipette, Weight, Save } from 'lucide-react';

function PreviewModel({ color }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow scale={[1.2, 1.2, 1.2]}>
        <boxGeometry args={[4, 2.2, 8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        <mesh position={[0, 1.2, 2]}>
          <boxGeometry args={[3.8, 1.8, 3.5]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function RegisterVehiclePage({ onSave, fleetLength }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    color: '#00d2d3',
    cap: ''
  });

  const handleSave = () => {
    if (!form.name) return alert("Enter a name!");
    
    const newAsset = {
      id: `LS-0${fleetLength + 1}`,
      name: form.name.toUpperCase(),
      color: form.color,
      hp: 100,
      util: 0,
      cap: form.cap || 0
    };

    onSave(newAsset);
    navigate('/dashboard');
  };

  return (
    <div className="h-screen w-screen bg-[#f1c40f] font-[cursive] p-12 overflow-hidden flex flex-col relative">
      <div className="flex justify-between items-center mb-10 z-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-black text-white px-8 py-4 rounded-[25px] font-black text-xl flex items-center gap-3 shadow-[8px_8px_0px_#fff]"
        >
          <ArrowLeft strokeWidth={4} /> CANCEL
        </button>
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[10px_10px_0px_#000]">
          <h1 className="text-4xl font-black italic uppercase text-red-500">ASSET INTAKE</h1>
        </div>
      </div>

      <div className="flex gap-10 flex-1 z-10">
        <div className="w-1/2 bg-white border-[10px] border-black p-10 rounded-[60px] shadow-[20px_20px_0px_#000] space-y-8">
          <div>
            <label className="flex items-center gap-2 font-black uppercase mb-2"><Truck size={18}/> Model Name</label>
            <input 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              placeholder="e.g. TITAN-V8"
              className="w-full border-8 border-black p-5 rounded-3xl font-black text-2xl uppercase outline-none focus:bg-yellow-50"
            />
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <label className="flex items-center gap-2 font-black uppercase mb-2"><Weight size={18}/> Capacity (KG)</label>
              <input 
                type="number"
                value={form.cap}
                onChange={(e) => setForm({...form, cap: e.target.value})}
                placeholder="0000"
                className="w-full border-8 border-black p-5 rounded-3xl font-black text-2xl outline-none"
              />
            </div>
            <div className="w-32">
              <label className="flex items-center gap-2 font-black uppercase mb-2"><Pipette size={18}/> Hue</label>
              <input 
                type="color" 
                value={form.color}
                onChange={(e) => setForm({...form, color: e.target.value})}
                className="w-full h-[84px] border-8 border-black rounded-3xl cursor-pointer bg-white p-2"
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-[#1DD1A1] border-8 border-black p-8 rounded-[40px] font-black text-4xl italic uppercase shadow-[10px_10px_0px_#000] hover:scale-[1.02] active:translate-y-2 transition-all flex items-center justify-center gap-4"
          >
            <Save size={40}/> SAVE TO FLEET
          </button>
        </div>

        <div className="flex-1 bg-black border-[10px] border-white rounded-[60px] shadow-[20px_20px_0px_#000] relative">
          <div className="absolute top-8 left-8 z-20">
            <h3 className="text-white font-black text-5xl italic uppercase tracking-tighter">
              {form.name || 'AWAITING NAME'}
            </h3>
          </div>
          <Canvas shadows camera={{ position: [10, 5, 10], fov: 40 }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.5}>
                <PreviewModel color={form.color} />
              </Stage>
              <OrbitControls autoRotate enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}