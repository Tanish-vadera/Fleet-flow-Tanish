import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Wrench, CheckCircle2, History, AlertCircle } from 'lucide-react';

export default function Maintenance({ fleet, setFleetStatus }) {
  const navigate = useNavigate();
  
  // Guard clause to prevent white screen if fleet isn't loaded
  if (!fleet) return <div className="h-screen bg-black text-white flex items-center justify-center">INITIALIZING DEPOT...</div>;

  return (
    <div className="h-screen w-screen bg-[#1DD1A1] font-[cursive] p-12 overflow-hidden flex flex-col relative text-black">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate('/dashboard')} className="bg-black text-white px-8 py-4 rounded-[25px] font-black text-xl flex items-center gap-3 shadow-[8px_8px_0px_#fff]">
          <ArrowLeft strokeWidth={4} /> HANGAR
        </button>
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[10px_10px_0px_#000]">
          <h1 className="text-4xl font-black italic uppercase">SERVICE DEPOT</h1>
        </div>
      </div>

      <div className="flex gap-10 flex-1 overflow-hidden">
        <div className="w-1/2 bg-white border-[10px] border-black p-8 rounded-[60px] shadow-[20px_20px_0px_#000] flex flex-col">
          <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
            <Settings /> ACTIVE ASSETS
          </h2>
          
          <div className="space-y-4 overflow-y-auto pr-2">
            {fleet.map((vehicle) => (
              <div key={vehicle.id} className="border-4 border-black p-4 rounded-3xl flex justify-between items-center bg-gray-50">
                <div>
                  <p className="font-black text-xl italic">{vehicle.name}</p>
                  <p className="text-[10px] font-black opacity-50 uppercase">{vehicle.id} • HP: {vehicle.hp}%</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1 rounded-full border-2 border-black font-black text-xs uppercase ${vehicle.status === 'In Shop' ? 'bg-red-500 text-white' : 'bg-green-400'}`}>
                    {vehicle.status || 'Available'}
                  </span>
                  <button 
                    onClick={() => setFleetStatus(vehicle.id, vehicle.status === 'In Shop' ? 'Available' : 'In Shop')}
                    className={`p-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_#000] active:translate-y-1 transition-all ${vehicle.status === 'In Shop' ? 'bg-blue-400' : 'bg-yellow-400'}`}
                  >
                    {vehicle.status === 'In Shop' ? <CheckCircle2 size={20}/> : <Wrench size={20}/>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-black border-[10px] border-white rounded-[60px] shadow-[20px_20px_0px_#000] p-10 flex flex-col">
          <div className="flex items-center gap-4 text-white mb-8">
            <History size={32} className="text-[#1DD1A1]"/>
            <h3 className="text-3xl font-black italic uppercase">LOG REPAIR</h3>
          </div>
          <div className="space-y-6">
            <button className="w-full bg-[#1DD1A1] border-4 border-white p-6 rounded-[30px] font-black text-2xl uppercase italic shadow-[0px_8px_0px_#fff]">
              COMMIT TO LOGBOOK
            </button>
          </div>
          <div className="mt-auto bg-white/10 p-6 rounded-3xl border-2 border-dashed border-white/20">
            <div className="flex items-center gap-3 text-white/60">
              <AlertCircle size={18}/>
              <p className="text-[10px] font-black uppercase">Auto-Logic: Flagging as "In Shop" prevents dispatch.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}