import React, { createContext, useContext, useState, type ReactNode } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadContextType {
  file: File | null;
  progress: number;
  status: UploadStatus;
  error: string | null;
  setFile: (file: File | null) => void;
  setError: (error: string | null) => void;
  startUpload: () => void;
  resetUpload: () => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [file, setFileState] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const setFile = (newFile: File | null) => {
    setFileState(newFile);
    if (!newFile) {
      setProgress(0);
      setStatus('idle');
      setError(null);
    }
  };

  const startUpload = () => {
    if (!file) return;
    
    setStatus('uploading');
    setProgress(0);
    setError(null);

    // Simulated upload logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('success');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetUpload = () => {
    setFile(null);
  };

  return (
    <UploadContext.Provider value={{ 
      file, 
      progress, 
      status, 
      error, 
      setFile, 
      setError, 
      startUpload, 
      resetUpload 
    }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};
