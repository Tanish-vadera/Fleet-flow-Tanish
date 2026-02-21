import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Wrench, 
  Package, 
  Navigation, 
  Zap, 
  ShieldAlert, 
  LogOut,
  ChevronRight
} from 'lucide-react';

// --- GAME KPI CARD ---
const KPICard = ({ label, value, icon: Icon, color, subtext }) => (
  <motion.div 
    whileHover={{ y: -5, rotate: 1 }}
    className={`bg-white border-8 border-black p-6 rounded-[35px] shadow-[10px_10px_0px_#000] relative overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-20 rounded-bl-full`} />
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 border-4 border-black rounded-2xl ${color}`}>
          <Icon className="text-white w-6 h-6" />
        </div>
        <span className="font-black uppercase text-xs tracking-widest">{label}</span>
      </div>
      <h3 className="text-6xl font-black italic -skew-x-6 mb-1">{value}</h3>
      <p className="text-[10px] font-bold uppercase opacity-60 italic">{subtext}</p>
    </div>
  </motion.div>
);

// --- MISSION SLOT (Active Trip) ---
const MissionSlot = ({ unit, driver, cargo, progress }) => (
  <div className="bg-white border-4 border-black p-4 rounded-[25px] shadow-[6px_6px_0px_#000] flex items-center gap-4">
    <div className="bg-blue-50 border-4 border-black p-3 rounded-2xl">
      <Truck size={32} className="text-[#2980b9]" />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-black italic text-lg uppercase">Unit {unit} • {driver}</h4>
        <span className="text-[10px] font-black bg-yellow-300 px-2 py-0.5 border-2 border-black rounded-lg uppercase">On Mission</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Package size={14} />
        <span className="text-xs font-bold uppercase">{cargo} Load</span>
      </div>
      <div className="h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-[#1DD1A1] border-r-2 border-black"
        />
      </div>
    </div>
    <ChevronRight className="text-black/30" />
  </div>
);

export default function CommandCenter() {
  return (
    <div className="min-h-screen bg-[#FF9F43] p-8 font-[cursive] selection:bg-white selection:text-black">
      
      {/* HUD TOP BAR */}
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        <header className="flex justify-between items-end">
          <div className="bg-white border-8 border-black p-6 rounded-[35px] shadow-[12px_12px_0px_#000] -rotate-1">
            <h1 className="text-5xl font-black italic -rotate-1 leading-none tracking-tighter">
              COMMAND_CENTER.EXE
            </h1>
            <div className="flex gap-2 mt-3">
              <span className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Sector: Global</span>
              <span className="bg-[#1DD1A1] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 border-black">System: Online</span>
            </div>
          </div>

          <button className="bg-[#FF6B6B] text-white border-4 border-black p-4 rounded-2xl shadow-[6px_6px_0px_#000] font-black italic hover:translate-y-1 transition-all flex items-center gap-2">
            <LogOut /> ABORT SESSION
          </button>
        </header>

        {/* KPI GRID (Core Logic Link) */}
        <div className="grid grid-cols-4 gap-6">
          <KPICard label="Active Fleet" value="12" icon={Navigation} color="bg-[#54a0ff]" subtext="Units currently on mission" />
          <KPICard label="In Shop" value="03" icon={Wrench} color="bg-[#FF6B6B]" subtext="Units undergoing repairs" />
          <KPICard label="Utilization" value="84%" icon={Zap} color="bg-[#1DD1A1]" subtext="Fleet deployment efficiency" />
          <KPICard label="Pending" value="09" icon={Package} color="bg-[#fdcb6e]" subtext="Cargo awaiting dispatch" />
        </div>

        {/* WAR MAP & MISSION LOGS */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* NAVIGATION SIDEBAR */}
          <div className="col-span-3 space-y-4">
            {['Dashboard', 'Hangar', 'Dispatch', 'Repairs', 'Human Resources', 'Analytics'].map((tab, i) => (
              <motion.button 
                key={tab}
                whileHover={{ x: 10 }}
                className={`w-full text-left p-5 border-4 border-black rounded-2xl font-black italic uppercase text-lg shadow-[5px_5px_0px_#000] transition-all
                  ${i === 0 ? 'bg-yellow-300 translate-x-4' : 'bg-white hover:bg-blue-50'}`}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* ACTIVE MISSIONS LIST */}
          <div className="col-span-9 bg-blue-50 border-8 border-black rounded-[50px] p-10 shadow-[15px_15px_0px_#000] relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-black italic uppercase flex items-center gap-4 underline decoration-8 decoration-yellow-300">
                  <ShieldAlert className="text-red-500" /> Active Missions
                </h2>
                <div className="flex gap-2">
                   <div className="bg-white border-2 border-black px-4 py-1 rounded-full font-black text-xs uppercase">Sort: Newest</div>
                </div>
              </div>

              <div className="grid gap-6">
                <MissionSlot unit="TRK-902" driver="Commander Alex" cargo="450kg / 500kg" progress={75} />
                <MissionSlot unit="VAN-05" driver="Officer Jordan" cargo="120kg / 200kg" progress={30} />
                <MissionSlot unit="BIK-12" driver="Racer Sam" cargo="15kg / 20kg" progress={95} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}