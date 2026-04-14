import React, { useRef } from 'react';
import { Upload, FileIcon, FileText, X, CheckCircle, AlertCircle, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UPLOAD_CONFIG } from '../constants/config.ts';
import { useUpload } from '../context/UploadContext.tsx';

const FileUpload: React.FC = () => {
  const { 
    file, 
    progress, 
    status, 
    error, 
    setFile, 
    setError, 
    startUpload, 
    resetUpload 
  } = useUpload();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (selectedFile: File) => {
    if (!UPLOAD_CONFIG.ALLOWED_TYPES.includes(selectedFile.type)) {
      setError(`Unsupported Media. Only ${UPLOAD_CONFIG.SUPPORTED_FORMATS_DESC} allowed.`);
      return false;
    }
    if (selectedFile.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      setError(`File weight exceeded. Threshold is ${UPLOAD_CONFIG.MAX_FILE_SIZE_LABEL}.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-indigo-500', 'bg-indigo-500/10', 'scale-[1.01]');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-500/10', 'scale-[1.01]');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-500/10', 'scale-[1.01]');
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="
              relative group cursor-pointer
              border-2 border-dashed border-white/10 bg-white/[0.02] 
              rounded-[2.5rem] p-16 flex flex-col items-center justify-center gap-6
              transition-all duration-500 ease-out hover:border-indigo-500/50 hover:bg-white/[0.04]
            "
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept={UPLOAD_CONFIG.ALLOWED_EXTENSIONS.join(',')}
            />
            
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-20 h-20 rounded-3xl bg-neutral-800 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-500"
            >
              <Upload className="w-8 h-8" />
            </motion.div>

            <div className="text-center">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Neural Document Entry
              </h3>
              <p className="text-sm text-neutral-500 mt-2 font-medium">
                Drag files to the node or <span className="text-indigo-400 font-bold underline underline-offset-4 decoration-2">select locally</span>
              </p>
            </div>

            <div className="flex gap-2 mt-2">
              {UPLOAD_CONFIG.ALLOWED_EXTENSIONS.map(ext => (
                <span key={ext} className="text-[10px] font-black uppercase text-neutral-600 border border-white/5 bg-white/[0.02] px-3 py-1 rounded-full">
                  {ext.slice(1)}
                </span>
              ))}
            </div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/10 rounded-tl-lg"></div>
            <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-white/10 rounded-tr-lg"></div>
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-white/10 rounded-bl-lg"></div>
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/10 rounded-br-lg"></div>
          </motion.div>
        ) : (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-[3rem] p-10 relative overflow-hidden"
          >
            {/* Holographic Scanning Animation during Upload */}
            {status === 'uploading' && (
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan"></div>
                <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"></div>
              </div>
            )}

            <div className="flex items-start justify-between relative z-20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-2xl relative">
                  <FileText className="w-8 h-8" />
                  {status === 'success' && (
                     <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center text-[#0A0A0C]">
                        <CheckCircle className="w-4 h-4" />
                     </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xl font-bold text-white truncate max-w-sm">
                    {file.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-bold text-neutral-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{formatSize(file.size)}</span>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{file.type.split('/')[1]} CORE</span>
                  </div>
                </div>
              </div>
              
              {status !== 'uploading' && (
                <button 
                  onClick={resetUpload}
                  className="p-2 hover:bg-white/10 rounded-xl text-neutral-500 hover:text-white transition-all group"
                  title="Remove from stack"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
              )}
            </div>

            <div className="mt-10 space-y-4 relative z-20">
              {(status === 'uploading' || progress > 0) && (
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${status === 'success' ? 'text-teal-400' : 'text-indigo-400'}`}>
                        {status === 'success' ? 'Analysis Complete' : 'Neural Processing'}
                      </span>
                      <h5 className="text-sm font-bold text-neutral-300 mt-1">
                        {status === 'success' ? 'Metadata updated successfully' : 'Analyzing document structure...'}
                      </h5>
                    </div>
                    <span className="text-2xl font-black text-white/80 font-mono tracking-tighter">{progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden shadow-inner border border-white-[0.05] p-[2px]">
                    <motion.div 
                      className="bg-indigo-500 h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 40, damping: 20 }}
                    />
                  </div>
                </div>
              )}

              {status === 'idle' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startUpload}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 group"
                >
                  <Zap className="w-5 h-5 fill-white" />
                  INITIATE ANALYSIS
                </motion.button>
              )}

              {status === 'uploading' && (
                <button
                  disabled
                  className="w-full bg-white/5 text-neutral-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 cursor-not-allowed border border-white/5"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  NEURAL MAPPING...
                </button>
              )}

              {status === 'success' && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={resetUpload}
                    className="border border-white/10 hover:bg-white/5 text-neutral-300 font-bold py-4 rounded-2xl transition-all"
                  >
                    DISMISS
                  </button>
                  <button
                    className="bg-teal-500 hover:bg-teal-400 text-[#0A0A0C] font-black py-4 rounded-2xl shadow-xl shadow-teal-500/20 transition-all"
                  >
                    VIEW INSIGHTS
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-4 text-rose-400 text-sm font-bold bg-rose-400/10 p-5 mt-6 rounded-[2rem] border border-rose-400/20 glass-panel"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-400 text-[#0A0A0C] flex items-center justify-center shrink-0 shadow-lg shadow-rose-400/20">
              <AlertCircle className="w-5 h-5" />
            </div>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
