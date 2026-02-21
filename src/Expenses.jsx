import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Fuel, DollarSign, Calendar, Save } from 'lucide-react';

export default function Expenses() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    liters: '',
    cost: '',
    date: new Date().toISOString().split('T')[0]
  });

  return (
    <div className="h-screen w-screen bg-[#00d2d3] font-[cursive] p-12 flex flex-col items-center justify-center text-black">
      <div className="bg-white border-[10px] border-black p-10 rounded-[60px] shadow-[20px_20px_0px_#000] w-[500px]">
        <div className="flex items-center gap-4 mb-8 text-orange-500">
          <Fuel size={40} />
          <h1 className="text-4xl font-black italic uppercase text-black">FUEL LOG</h1>
        </div>
        <div className="space-y-6">
          <input 
            type="number" 
            placeholder="LITERS" 
            className="w-full border-4 border-black p-4 rounded-2xl font-black text-2xl outline-none"
            value={formData.liters}
            onChange={(e) => setFormData({...formData, liters: e.target.value})}
          />
          <input 
            type="number" 
            placeholder="COST ($)" 
            className="w-full border-4 border-black p-4 rounded-2xl font-black text-2xl outline-none"
            value={formData.cost}
            onChange={(e) => setFormData({...formData, cost: e.target.value})}
          />
          <button 
            onClick={() => { alert('Saved!'); navigate('/dashboard'); }}
            className="w-full bg-yellow-400 border-4 border-black p-4 rounded-2xl font-black uppercase text-xl shadow-[4px_4px_0px_#000]"
          >
            SUBMIT LOG
          </button>
        </div>
      </div>
    </div>
  );
}