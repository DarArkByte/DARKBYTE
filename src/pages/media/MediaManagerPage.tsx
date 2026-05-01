import React, { useState } from 'react';
import { Folder, File, Image as ImageIcon, UploadCloud, Search, MoreVertical, Trash2, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { MediaItem } from '../../types';

export default function MediaManagerPage() {
  const [search, setSearch] = useState('');

  // Dummy data
  const files: MediaItem[] = [
    { id: '1', schoolId: 's1', title: 'JSS 1 Mathematics Syllabus', url: '#', type: 'document', uploadedBy: 'Admin', createdAt: '2026-05-01' },
    { id: '2', schoolId: 's1', title: 'School Logo High-Res', url: '#', type: 'image', uploadedBy: 'Admin', createdAt: '2026-04-20' },
    { id: '3', schoolId: 's1', title: 'PTA Meeting Minutes', url: '#', type: 'document', uploadedBy: 'Admin', createdAt: '2026-04-15' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <Folder className="w-8 h-8" />
              Media Manager
            </h1>
            <p className="text-cyan-100 font-medium">Centralized repository for documents, syllabuses, and school assets.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-cyan-700 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit">
            <UploadCloud className="w-5 h-5" />
            Upload File
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-gray-700 shadow-sm"
            />
          </div>
        </div>

        {/* Files Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={file.id}
                className="group relative border border-gray-100 rounded-2xl p-4 hover:border-cyan-200 hover:shadow-lg transition-all cursor-pointer bg-white"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-white shadow-sm border border-gray-100 rounded-lg text-gray-400 hover:text-rose-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center ${file.type === 'image' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                   {file.type === 'image' ? <ImageIcon className="w-8 h-8" /> : <File className="w-8 h-8" />}
                </div>
                
                <h3 className="font-bold text-gray-900 text-sm mb-1 truncate pr-8">{file.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{file.createdAt}</span>
                  <button className="text-cyan-600 hover:bg-cyan-50 p-1.5 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
