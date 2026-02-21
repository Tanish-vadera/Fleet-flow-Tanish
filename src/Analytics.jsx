import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Zap, BarChart3, PieChart } from 'lucide-react';

export default function Analytics({ fleet, drivers }) {
  const navigate = useNavigate();

  // Mock calculations for the demo
  const totalRevenue = 124500;
  const totalExpenses = 45200;
  const roi = ((totalRevenue - totalExpenses) / totalExpenses * 100).toFixed(1);

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <TrendingUp className="text-green-500"/>, color: 'bg-green-50' },
    { label: 'Fuel Expenses', value: `$${totalExpenses.toLocaleString()}`, icon: <TrendingDown className="text-red-500"/>, color: 'bg-red-50' },
    { label: 'Avg Driver Score', value: '92%', icon: <Zap className="text-yellow-500"/>, color: 'bg-yellow-50' },
    { label: 'Fleet ROI', value: `+${roi}%`, icon: <BarChart3 className="text-blue-500"/>, color: 'bg-blue-50' },
  ];

  return (
    <div className="h-screen w-screen bg-[#a29bfe] font-[cursive] p-12 overflow-hidden flex flex-col relative text-black">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <button onClick={() => navigate('/dashboard')} className="bg-black text-white px-8 py-4 rounded-[25px] font-black text-xl flex items-center gap-3 shadow-[8px_8px_0px_#fff]">
          <ArrowLeft strokeWidth={4} /> HANGAR
        </button>
        <div className="bg-white border-8 border-black p-4 rounded-[30px] shadow-[10px_10px_0px_#000]">
          <h1 className="text-4xl font-black italic uppercase">FINANCIAL RADAR</h1>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className={`${stat.color} border-8 border-black p-6 rounded-[40px] shadow-[10px_10px_0px_#000]`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-white border-4 border-black rounded-xl">{stat.icon}</div>
              <span className="text-[10px] font-black uppercase opacity-40">Monthly</span>
            </div>
            <p className="text-4xl font-black italic">{stat.value}</p>
            <p className="text-xs font-black uppercase opacity-60">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden">
        {/* REVENUE GRAPH PLACEHOLDER */}
        <div className="flex-1 bg-white border-[10px] border-black rounded-[60px] shadow-[20px_20px_0px_#000] p-10 flex flex-col">
          <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
            <BarChart3 /> PERFORMANCE TRENDS
          </h3>
          <div className="flex-1 flex items-end gap-4 pb-4">
            {[40, 70, 45, 90, 65, 80, 95].map((height, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="flex-1 bg-[#6c5ce7] border-4 border-black rounded-t-2xl relative group"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] p-2 rounded hidden group-hover:block whitespace-nowrap">
                  Week {i+1}: ${height}k
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between px-2 font-black text-[10px] opacity-40 uppercase pt-4 border-t-4 border-black">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* TOP PERFORMERS SIDEBAR */}
        <div className="w-[350px] bg-black border-[10px] border-white rounded-[60px] shadow-[20px_20px_0px_#000] p-8 text-white">
          <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2">
            <PieChart className="text-[#a29bfe]"/> EFFICIENCY
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                <span>Fleet Health</span>
                <span>88%</span>
              </div>
              <div className="h-4 bg-white/20 rounded-full border-2 border-white overflow-hidden">
                <div className="h-full bg-green-400 w-[88%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                <span>Fuel Optimization</span>
                <span>62%</span>
              </div>
              <div className="h-4 bg-white/20 rounded-full border-2 border-white overflow-hidden">
                <div className="h-full bg-orange-400 w-[62%]" />
              </div>
            </div>
            <div className="mt-10 p-6 bg-white/10 border-2 border-dashed border-white/30 rounded-3xl">
              <p className="text-[10px] font-black uppercase opacity-60 mb-2">AI Suggestion</p>
              <p className="text-xs font-black italic leading-tight text-[#a29bfe]">
                "Dispatching LS-02 for morning routes could save 12% in fuel costs based on traffic patterns."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}