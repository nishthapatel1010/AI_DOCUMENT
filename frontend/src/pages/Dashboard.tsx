import React, { useState, useEffect } from 'react';
import { useUpload } from '../context/UploadContext.tsx';
import { motion } from 'framer-motion';
import Skeleton from '../components/Skeleton.tsx';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Database, 
  TrendingUp, 
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for sparklines
const generateData = () => [...Array(20)].map((_) => ({ value: Math.floor(Math.random() * 40) + 10 }));

const Dashboard: React.FC = () => {
  const { file, progress, status } = useUpload();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial neural data fetch
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Processed', value: '1,284', trend: '+12.5%', icon: FileText, color: 'text-indigo-400', data: generateData() },
    { label: 'Success Rate', value: '99.2%', trend: '+0.4%', icon: CheckCircle, color: 'text-teal-400', data: generateData() },
    { label: 'Avg Speed', value: '1.8s', trend: '-0.2s', icon: Clock, color: 'text-purple-400', data: generateData() },
    { label: 'Storage', value: '42.8 GB', trend: '+2.1 GB', icon: Database, color: 'text-blue-400', data: generateData() },
  ];

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-neutral-500 mt-2 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            AI engine operating at 98% efficiency
          </p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 glass-panel rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
            Last 24 Hours
          </button>
          <button className="p-2 glass-panel rounded-xl text-neutral-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-[2rem] group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-teal-400 flex items-center gap-1 justify-end">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </span>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">{stat.label}</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{stat.value}</h3>
            
            <div className="h-16 w-full -mb-2 -mx-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stat.data}>
                  <defs>
                    <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={i % 2 === 0 ? '#6366f1' : '#2dd4bf'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={i % 2 === 0 ? '#6366f1' : '#2dd4bf'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke={i % 2 === 0 ? '#6366f1' : '#2dd4bf'} strokeWidth={2} fill={`url(#gradient-${i})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className={`absolute -bottom-10 -right-10 w-24 h-24 blur-[40px] rounded-full opacity-20 transition-opacity group-hover:opacity-40 ${i % 2 === 0 ? 'bg-indigo-500' : 'bg-teal-500'}`}></div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-panel rounded-[2.5rem] p-10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 neon-glow-indigo"></div>
                Live Activity Feed
              </h3>
              <p className="text-sm text-neutral-500 mt-1 ml-5 font-medium">Real-time neural events</p>
            </div>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group">
              View History
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {!file ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-neutral-700" />
              </div>
              <p className="text-neutral-400 max-w-xs leading-relaxed text-sm italic">
                AI Engine is currently idle. Select a node in the <span className="text-indigo-400 font-bold">Upload Center</span> to begin neural analysis.
              </p>
            </div>
          ) : (
            <motion.div layout className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-3xl relative group">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-xl">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-100 group-hover:text-indigo-400">{file.name}</h4>
                    <p className="text-[10px] text-indigo-400/80 uppercase font-black tracking-widest mt-1">Status: {status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white/90 font-mono tracking-tighter">{progress}%</p>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase">Synthesizing...</p>
                </div>
              </div>
              <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5 p-[1px]">
                 <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                 />
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-800 p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl shadow-indigo-600/20"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-black italic tracking-tighter mb-4">Neural Engine v2.4</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-8 font-medium">
              Experience the future of document intelligence. Navigate freely between tabs—our 
              engine maintains state consistency across your entire session.
            </p>
            <button className="mt-10 px-6 py-3 bg-white text-indigo-600 text-xs font-black uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
              Explorer Core
            </button>
          </div>
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-24 -right-24 w-80 h-80 border-[20px] border-white/5 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

// High-fidelity Dashboard Skeleton
const DashboardLoadingState = () => (
  <div className="space-y-10">
    <div className="flex items-end justify-between">
      <div className="space-y-4">
        <Skeleton width="280px" height="40px" />
        <Skeleton width="340px" height="20px" />
      </div>
      <div className="flex gap-4">
        <Skeleton width="120px" height="44px" />
        <Skeleton width="44px" height="44px" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="glass-panel p-6 rounded-[2rem] space-y-6">
          <div className="flex justify-between">
            <Skeleton width="50px" height="50px" variant="rect" />
            <Skeleton width="70px" height="14px" />
          </div>
          <div className="space-y-2">
            <Skeleton width="120px" height="32px" />
            <Skeleton width="100%" height="48px" />
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 glass-panel rounded-[2.5rem] p-10 space-y-10">
        <div className="flex justify-between">
          <Skeleton width="220px" height="28px" />
          <Skeleton width="100px" height="20px" />
        </div>
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <Skeleton variant="circle" width="90px" height="90px" />
          <Skeleton width="280px" height="18px" />
        </div>
      </div>
      <div className="glass-panel rounded-[2.5rem] bg-indigo-900/10 p-10 space-y-8">
         <Skeleton width="180px" height="32px" />
         <Skeleton width="100%" height="80px" />
         <div className="flex justify-center pt-8">
            <Skeleton variant="circle" width="140px" height="140px" />
         </div>
      </div>
    </div>
  </div>
);

export default Dashboard;


