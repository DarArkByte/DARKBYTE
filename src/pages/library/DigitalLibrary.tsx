import React, { useState } from 'react';
import { Book, Search, Download, QrCode, Globe, Clock, FileText, Plus, Loader2 } from 'lucide-react';

export default function DigitalLibrary() {
  const [search, setSearch] = useState('');
  
  const books = [
    { title: 'Essential Mathematics for Senior Secondary', category: 'Mathematics', author: 'A.J. Smith', year: '2023', type: 'PDF' },
    { title: 'New Oxford English Course', category: 'English', author: 'Oxford Press', year: '2022', type: 'eBook' },
    { title: 'Comprehensive Physics', category: 'Science', author: 'Nelson P.', year: '2024', type: 'PDF' },
    { title: 'Modern Biology for West Africa', category: 'Biology', author: 'Roberts S.', year: '2021', type: 'PDF' },
  ];

  return (
    <div className="space-y-10 pb-24 font-sans">
      <header className="relative overflow-hidden rounded-[56px] bg-gradient-to-br from-blue-900 to-indigo-900 p-10 md:p-16 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 flex items-center gap-4">
              <Book className="w-10 h-10 text-blue-400" />
              DIGITAL NEXUS LIBRARY
            </h1>
            <p className="text-blue-100 font-bold text-lg max-w-xl">Scan QR codes on physical books to unlock digital study guides and resources.</p>
          </div>
          <button className="flex items-center gap-3 bg-white text-blue-900 px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
            <Plus className="w-5 h-5" /> Catalog New Book
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
           <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4">
              <Search className="w-6 h-6 text-slate-400" />
              <input 
                placeholder="Search the digital catalog..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none font-bold text-lg focus:ring-0 w-full"
              />
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              {books.map((book, i) => (
                <div key={i} className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                   <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                         <FileText className="w-8 h-8" />
                      </div>
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all">
                         <QrCode className="w-6 h-6" />
                      </button>
                   </div>
                   <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{book.title}</h3>
                   <p className="text-slate-500 font-bold text-sm mb-6">By {book.author}</p>
                   
                   <div className="flex items-center justify-between">
                      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest">{book.category}</span>
                      <button className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                         <Download className="w-4 h-4" /> Download Digital Guide
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#1e1b4b] p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
              <QrCode className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-black mb-4 tracking-tighter">QR Asset Tracker</h3>
              <p className="text-slate-400 text-sm font-medium mb-8">Generate unique QR stickers for your physical library collection.</p>
              <button className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 transition-all">
                 Generate QR Batch
              </button>
           </div>

           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Recent Downloads</h4>
              <div className="space-y-6">
                 {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400"><Clock className="w-5 h-5" /></div>
                       <div>
                          <p className="font-black text-slate-900 text-xs">Phyton Basics v2.1</p>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">2 hours ago</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
