import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton.tsx';
import { 
  Zap, 
  FileText, 
  Loader2, 
  Sparkles, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useUpload } from '../context/UploadContext.tsx';

const LiveIntelligencePanel: React.FC = () => {
  const { file, progress } = useUpload();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     const timer = setTimeout(() => setIsLoading(false), 1500);
     return () => clearTimeout(timer);
  }, []);

  // Mock historical activity
  const recentDocs = [
    { name: 'Tax_Report.pdf', status: 'Completed', progress: 100 },
    { name: 'Contract_Draft.png', status: 'Analyzing', progress: 85 },
    { name: 'Quarterly_Review.pdf', status: 'Completed', progress: 100 },
  ];

  if (isLoading) {
    return <SidebarLoadingState />;
  }

  return (
    <aside className="w-80 border-l border-white/[0.05] bg-[#0A0A0C]/40 backdrop-blur-2xl flex flex-col h-full overflow-hidden">
      {/* Plan Usage Widget */}
      <div className="p-6 border-b border-white/[0.05]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            Plan Usage
          </h3>
          <span className="text-[10px] font-black text-neutral-400">PRO PLAN</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-xl font-black text-white italic">12<span className="text-neutral-600 text-sm not-italic ml-1">/ 50</span></span>
            <span className="text-[10px] font-bold text-purple-400 uppercase">Uploads Used</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '24%' }}
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full neon-glow-purple"
            />
          </div>
          <p className="text-[9px] text-neutral-500 leading-relaxed uppercase font-bold">
            Next cycle: <span className="text-neutral-300">12 Days</span>
          </p>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500">Live Activity</h3>
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
        </div>

        <div className="space-y-4">
          {/* Current Live Upload */}
          {file && (
            <motion.div 
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl relative overflow-hidden group"
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                   <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{file.name}</p>
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">{progress}% mapping</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Historical Items */}
          {recentDocs.map((doc, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] p-2 -mx-2 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-200 truncate max-w-[120px]">{doc.name}</p>
                  <p className="text-[9px] text-neutral-500 uppercase font-black">{doc.status}</p>
                </div>
              </div>
              <div className="text-right">
                {doc.status === 'Analyzing' ? (
                  <span className="text-[10px] font-mono font-bold text-teal-400">{doc.progress}%</span>
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-500/50" />
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-2 border border-white/5 rounded-xl text-[10px] font-bold text-neutral-500 hover:text-neutral-300 hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
          VIEW FULL HISTORY
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* AI Quick Insights Box */}
      <div className="p-6 mt-auto">
        <div className="p-5 glass-panel rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-50" />
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white/90">Quick Insights</h4>
          </div>

          <div className="space-y-3 relative z-10">
             {!file ? (
               <p className="text-[10px] text-neutral-500 leading-relaxed italic">
                 "Select a document node in the upload center to generate a neural summary."
               </p>
             ) : (
               <div className="space-y-2">
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden animate-pulse">
                   <div className="h-full bg-indigo-500/20 w-3/4" />
                 </div>
                 <div className="h-1.5 w-2/3 bg-white/5 rounded-full overflow-hidden animate-pulse">
                   <div className="h-full bg-indigo-500/20 w-1/2" />
                 </div>
                 <p className="text-[10px] text-indigo-400 font-bold animate-pulse">
                   Neural Engine is synthesizing data...
                 </p>
               </div>
             )}
          </div>
        </div>
      </div>
    </aside>
  );
};

// Sidebar Skeleton Loading Layout
const SidebarLoadingState = () => (
  <aside className="w-80 border-l border-white/[0.05] bg-[#0A0A0C]/40 backdrop-blur-2xl flex flex-col h-full overflow-hidden">
    <div className="p-6 border-b border-white/[0.05] space-y-6">
      <div className="flex justify-between">
        <Skeleton width="80px" height="12px" />
        <Skeleton width="40px" height="12px" />
      </div>
      <div className="space-y-3">
        <Skeleton width="100px" height="32px" />
        <Skeleton width="100%" height="8px" />
        <Skeleton width="120px" height="10px" />
      </div>
    </div>
    
    <div className="flex-1 p-6 space-y-6">
      <div className="flex justify-between">
        <Skeleton width="100px" height="14px" />
        <Skeleton variant="circle" width="8px" height="8px" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton width="32px" height="32px" variant="rect" />
              <div className="space-y-2">
                <Skeleton width="100px" height="10px" />
                <Skeleton width="60px" height="8px" />
              </div>
            </div>
            <Skeleton width="14px" height="14px" variant="circle" />
          </div>
        ))}
      </div>
    </div>

    <div className="p-6 mt-auto">
      <Skeleton width="100%" height="120px" variant="rect" />
    </div>
  </aside>
);

export default LiveIntelligencePanel;
