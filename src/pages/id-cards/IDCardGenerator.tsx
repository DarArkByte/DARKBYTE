import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { Printer, Search, CheckSquare, Square, Users, LayoutGrid } from 'lucide-react';
import IDCardTemplate from '../../components/id-cards/IDCardTemplate';
import { UserProfile } from '../../types';

export default function IDCardGenerator() {
  const { school } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Mock Students
  const [students] = useState<UserProfile[]>([
    { uid: 'std1', email: 'john@edu.com', displayName: 'John Doe', role: 'student', schoolId: '1', bloodGroup: 'O+' },
    { uid: 'std2', email: 'jane@edu.com', displayName: 'Jane Smith', role: 'student', schoolId: '1', bloodGroup: 'A-' },
    { uid: 'std3', email: 'alex@edu.com', displayName: 'Alex Brown', role: 'student', schoolId: '1', bloodGroup: 'B+' },
    { uid: 'std4', email: 'sarah@edu.com', displayName: 'Sarah Connor', role: 'student', schoolId: '1', bloodGroup: 'O-' },
    { uid: 'std5', email: 'mike@edu.com', displayName: 'Mike Tyson', role: 'student', schoolId: '1', bloodGroup: 'AB+' },
  ]);

  const filteredStudents = students.filter(s => s.displayName.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map(s => s.uid));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!school) return null;

  return (
    <div className="space-y-8 pb-12 print:p-0 print:space-y-0">
      <header className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1e1b4b] to-indigo-900 p-8 md:p-12 text-white shadow-2xl print:hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-4 border border-white/10">
              <LayoutGrid className="w-4 h-4 text-indigo-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Identity Studio</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">ID Card Generator</h1>
            <p className="text-indigo-200 font-medium">Select students and print bulk identification cards on standard A4 grids.</p>
          </div>
          <button 
            onClick={handlePrint}
            disabled={selectedIds.length === 0}
            className="flex items-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-5 h-5" />
            Print {selectedIds.length} Cards
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 print:hidden">
        {/* Selection Sidebar */}
        <div className="lg:w-80 shrink-0 bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h2 className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-indigo-600" /> Roster
            </h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search roster..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50">
             <button onClick={toggleAll} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600">
               {selectedIds.length === filteredStudents.length ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
               Select All
             </button>
             <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
               {selectedIds.length} Selected
             </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {filteredStudents.map(student => (
              <div 
                key={student.uid}
                onClick={() => toggleSelect(student.uid)}
                className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all ${
                  selectedIds.includes(student.uid) ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                {selectedIds.includes(student.uid) ? (
                  <CheckSquare className="w-5 h-5 text-indigo-600 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-black text-slate-600 shrink-0">
                  {student.displayName[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">{student.displayName}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{student.uid.slice(0,8)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-slate-50 rounded-[32px] border border-slate-200 p-8 flex flex-col h-[600px]">
           <div className="flex justify-between items-center mb-6">
             <h2 className="font-black text-slate-400 uppercase tracking-widest text-sm">Preview Layout (A4 Grid)</h2>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar">
             {selectedIds.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-center">
                 <Printer className="w-16 h-16 text-slate-200 mb-4" />
                 <p className="text-slate-400 font-bold text-lg">No Students Selected</p>
                 <p className="text-slate-400 text-sm font-medium">Select students from the roster to preview their ID cards.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
                 {selectedIds.map(id => {
                   const student = students.find(s => s.uid === id);
                   if (!student) return null;
                   return (
                     <div key={id} className="flex justify-center">
                       <IDCardTemplate student={student} school={school} classInfo="JSS 1" />
                     </div>
                   );
                 })}
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Print View Only */}
      <div className="hidden print:block print:w-[210mm] print:h-[297mm] print:bg-white">
        {/* A4 fits roughly 2 columns and 5 rows of standard CR80 cards. Using grid to enforce this. */}
        <div className="grid grid-cols-2 gap-[10mm] p-[10mm]">
          {selectedIds.map(id => {
            const student = students.find(s => s.uid === id);
            if (!student) return null;
            return <div key={id} className="flex justify-center"><IDCardTemplate student={student} school={school} classInfo="JSS 1" /></div>;
          })}
        </div>
      </div>
    </div>
  );
}
