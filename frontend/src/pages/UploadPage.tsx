import React from 'react';
import FileUpload from '../components/FileUpload.tsx';
import { Info } from 'lucide-react';
import { UPLOAD_CONFIG } from '../constants/config.ts';

const UploadPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
          Upload Documents
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
          Upload PDF or image files for AI-powered analysis. Our system will automatically 
          extract text, analyze sentiment, and summarize key insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Column */}
        <div className="lg:col-span-2 space-y-6">
          <FileUpload />
          
          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6 flex gap-4">
            <div className="mt-1 text-indigo-400">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-indigo-300 mb-1">Processing Tip</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                For best results with images, ensure text is clear and well-lit. 
                Handwritten notes may have lower accuracy than printed documents.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">Supported Formats</h3>
            <ul className="space-y-3">
              {UPLOAD_CONFIG.ALLOWED_EXTENSIONS.map((ext) => (
                <li key={ext} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-300">
                    {ext === '.pdf' ? 'PDF Documents' : ext.replace('.', '').toUpperCase() + ' Images'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-500 border border-neutral-700">
                    {ext}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">Privacy & Security</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Your documents are encrypted during transfer and stored securely. 
              Sensitive data is processed using private AI models to ensure confidentiality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
