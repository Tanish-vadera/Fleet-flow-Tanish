import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Calendar, Search, X, Save } from 'lucide-react';

export default function DriverManagement({ drivers = [], onAdd }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newDriver, setNewDriver] = useState({
    name: '',
    license: 'Truck',
    expiry: '',
    score: 100,
    status: 'Available'
  });

  const isExpired = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const handleAddDriver = (e) => {
    e.preventDefault();
    if (!onAdd) return; // Safety check
    const id = `D-${Math.floor(100 + Math.random() * 900)}`;
    onAdd({ ...newDriver, id });
    setShowAddModal(false);
    setNewDriver({ name: '', license: 'Truck', expiry: '', score: 100, status: 'Available' });
  };

  return (
    <div className="h-screen w-screen bg-[#ff7675] font-[cursive] p-12 overflow-hidden flex flex-col relative text-black">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate('/dashboard')} className="bg-black text-white px-8 py-4 rounded-[25px] font-black text-xl flex items-center gap-3 shadow-[8px_8px_0px_#fff] active:translate-y-1 transition-all">
          <ArrowLeft strokeWidth={4} /> HANGAR
        </button>
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[10px_10px_0px_#000]">
          <h1 className="text-4xl font-black italic uppercase text-[#d63031]">SAFETY COMMAND</h1>
        </div>
      </div>

      <div className="flex gap-10 flex-1 overflow-hidden">
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
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-black text-white px-6 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-black uppercase"
            >
              <UserPlus /> ADD NEW
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto pr-2">
            {drivers && drivers.length > 0 ? (
              drivers
                .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((driver) => {
                  const expired = isExpired(driver.expiry);
                  return (
                    <div key={driver.id} className="border-4 border-black p-5 rounded-3xl flex justify-between items-center bg-white shadow-[4px_4px_0px_#000]">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full border-4 border-black flex items-center justify-center font-black text-xl ${expired ? 'bg-red-500 text-white' : 'bg-yellow-400'}`}>
                          {driver.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-black text-2xl italic leading-none">{driver.name}</h3>
                          <p className="text-[10px] font-black opacity-40 uppercase tracking-tighter">{driver.id} • {driver.license} CLASS</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 font-black text-xs px-3 py-2 rounded-lg border-2 border-black ${expired ? 'bg-red-500 text-white' : 'bg-green-100'}`}>
                        <Calendar size={14} /> {driver.expiry || 'No Date'}
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="text-center py-20 opacity-30 font-black uppercase text-2xl">No Drivers Found</div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showAddModal && (
        <div className="absolute inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white border-[10px] border-black p-10 rounded-[50px] shadow-[15px_15px_0px_#ff7675] w-full max-w-lg relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6"><X size={32} strokeWidth={4} /></button>
            <h2 className="text-4xl font-black italic uppercase mb-8">NEW RECRUIT</h2>
            <form onSubmit={handleAddDriver} className="space-y-6">
              <input required placeholder="FULL NAME" className="w-full border-4 border-black p-4 rounded-2xl font-black outline-none" value={newDriver.name} onChange={(e) => setNewDriver({...newDriver, name: e.target.value})} />
              <div className="flex gap-4">
                <select className="flex-1 border-4 border-black p-4 rounded-2xl font-black" value={newDriver.license} onChange={(e) => setNewDriver({...newDriver, license: e.target.value})}>
                  <option>Bike</option><option>Van</option><option>Truck</option>
                </select>
                <input type="date" required className="flex-1 border-4 border-black p-4 rounded-2xl font-black" value={newDriver.expiry} onChange={(e) => setNewDriver({...newDriver, expiry: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-[#ff7675] border-[6px] border-black p-6 rounded-3xl text-white font-black text-2xl uppercase italic shadow-[6px_6px_0px_#000] active:translate-y-1 transition-all flex items-center justify-center gap-3">
                <Save strokeWidth={3} /> REGISTER DRIVER
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}