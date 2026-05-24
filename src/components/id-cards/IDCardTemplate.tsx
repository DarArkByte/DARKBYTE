import React from 'react';
import { School, UserProfile } from '../../types';

interface IDCardTemplateProps {
  student: UserProfile;
  school: School;
  classInfo: string;
}

export default function IDCardTemplate({ student, school, classInfo }: IDCardTemplateProps) {
  // Use the standard CR80 size aspect ratio (landscape) -> ~ 3.375" x 2.125"
  return (
    <div 
      className="relative w-[340px] h-[214px] rounded-xl overflow-hidden shadow-md bg-white border border-slate-200 shrink-0"
      style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
    >
      {/* Background Graphic */}
      <div 
        className="absolute top-0 left-0 w-full h-1/2 opacity-10"
        style={{ backgroundColor: school.branding.primaryColor }}
      />
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full -mt-16 -mr-16"
        style={{ backgroundColor: school.branding.primaryColor }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 p-3 relative z-10 border-b border-slate-100">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-xl shrink-0"
          style={{ backgroundColor: school.branding.primaryColor }}
        >
          {school.name[0]}
        </div>
        <div className="leading-tight">
          <h2 className="font-black text-[14px] text-slate-900 uppercase">{school.name}</h2>
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{school.branding.identity?.motto || 'Education is Power'}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex p-3 gap-4 relative z-10">
        <div className="w-20 h-24 bg-slate-100 border-2 border-white shadow-sm rounded-lg flex items-center justify-center overflow-hidden shrink-0">
          <span className="text-slate-300 font-bold text-xs uppercase text-center">Photo<br/>Missing</span>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-black text-lg text-slate-900 uppercase leading-none mb-1">{student.displayName}</h3>
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3">{student.role} • {classInfo}</p>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="w-12 text-[8px] font-black text-slate-400 uppercase tracking-widest">ID No:</span>
              <span className="text-[9px] font-bold text-slate-800">{student.uid.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex items-center">
              <span className="w-12 text-[8px] font-black text-slate-400 uppercase tracking-widest">Blood:</span>
              <span className="text-[9px] font-bold text-slate-800">{student.bloodGroup || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Barcode (Mock) */}
      <div 
        className="absolute bottom-0 left-0 w-full p-2 flex justify-between items-center"
        style={{ backgroundColor: school.branding.primaryColor }}
      >
        <p className="text-[7px] text-white/80 font-bold uppercase tracking-widest">Valid until: July 2027</p>
        
        {/* Mock Barcode Block */}
        <div className="bg-white px-2 py-0.5 rounded flex gap-[1px]">
           {[...Array(15)].map((_, i) => (
             <div key={i} className={`h-4 bg-black ${i % 3 === 0 ? 'w-1' : 'w-0.5'}`} />
           ))}
        </div>
      </div>
    </div>
  );
}
