import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, FileText, Activity, History, Search, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadPage from './pages/UploadPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import LiveIntelligencePanel from './components/LiveIntelligencePanel.tsx';
// import { useUpload } from './context/UploadContext.tsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.slice(1) || 'dashboard'; // Default to dashboard

  return (
    <div className="flex h-screen bg-[#0A0A0C] text-neutral-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* 1. Sidebar Navigation (Left) */}
      <aside className="w-64 glass-sidebar flex flex-col z-20 shrink-0 hidden xl:flex">
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 90 }}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <Layout className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold tracking-tight text-glow-indigo">DocuAI</span>
              <p className="text-[9px] text-indigo-400 uppercase tracking-[0.2em] font-bold">Intelligent v2</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'dashboard', icon: Activity, label: 'Dashboard', path: '/dashboard' },
            { id: 'upload', icon: FileText, label: 'Upload center', path: '/upload' },
            { id: 'history', icon: History, label: 'Processing history', path: '/history' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                activeTab === item.id 
                  ? 'text-white' 
                  : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-xl"
                />
              )}
              <item.icon className={`w-4 h-4 z-10 ${activeTab === item.id ? 'text-indigo-400' : 'group-hover:text-indigo-300'}`} />
              <span className="text-sm font-medium z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-2xl glass-panel hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 p-[2px]">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-xs font-bold text-white">
                JD
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-neutral-200">John Doe</p>
              <p className="text-[10px] text-indigo-400/70 truncate font-mono">WORKSPACE_PRO</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Body (Center) */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative border-r border-white/[0.05]">
        <header className="h-20 bg-[#0A0A0C]/40 backdrop-blur-md border-b border-white/[0.05] px-10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 font-inter">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-500">
               {activeTab === 'upload' ? 'Neutral Processor' : activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-indigo-400" />
               <input 
                 type="text" 
                 placeholder="Search nodes..." 
                 className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48 transition-all focus:w-64"
               />
            </div>
            <button className="p-2 text-neutral-500 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/history" element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.99, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.01, y: -10 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="flex flex-col items-center justify-center h-full text-neutral-600 border border-dashed border-white/5 rounded-[3rem]"
                >
                  <History className="w-16 h-16 mb-6 opacity-5" />
                  <p className="text-xs font-bold uppercase tracking-widest">Accessing core historical data...</p>
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* 3. Live Intelligence Panel (Right) */}
      <div className="hidden lg:block shrink-0 h-full">
         <LiveIntelligencePanel />
      </div>
    </div>
  );
}

export default App;
