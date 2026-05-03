import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { FileText, Download, Printer, Search, User, Award, BookOpen, Loader2 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  regNumber: string;
  classId: string;
}

export default function TranscriptPage() {
  const { school } = useSchool();
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!search || !school?.id) return;
    setSearching(true);
    try {
      const q = query(
        collection(db, 'students'), 
        where('schoolId', '==', school.id),
        where('regNumber', '==', search.toUpperCase())
      );
      const snapshot = await getDocs(q);
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student)));
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const loadTranscript = async (student: Student) => {
    setSelectedStudent(student);
    setLoading(true);
    try {
      // 1. Fetch all historical results for this student
      const q = query(collection(db, 'results'), where('studentId', '==', student.id));
      const snapshot = await getDocs(q);
      const resultsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // 2. Fetch all subjects to get names
      const subSnapshot = await getDocs(query(collection(db, 'subjects'), where('schoolId', '==', school?.id)));
      const subjectsMap = Object.fromEntries(subSnapshot.docs.map(doc => [doc.id, doc.data().name]));

      // 3. Fetch sessions and terms
      const sesSnapshot = await getDocs(query(collection(db, 'sessions'), where('schoolId', '==', school?.id)));
      const sessionsMap = Object.fromEntries(sesSnapshot.docs.map(doc => [doc.id, doc.data().name]));

      const termSnapshot = await getDocs(query(collection(db, 'terms'), where('schoolId', '==', school?.id)));
      const termsMap = Object.fromEntries(termSnapshot.docs.map(doc => [doc.id, doc.data().name]));

      // 4. Group results by session and term
      const grouped: any = {};
      resultsData.forEach((res: any) => {
        const key = `${res.sessionId}_${res.termId}`;
        if (!grouped[key]) {
          grouped[key] = {
            session: sessionsMap[res.sessionId] || 'Unknown Session',
            term: termsMap[res.termId] || 'Unknown Term',
            results: []
          };
        }
        grouped[key].results.push({
          ...res,
          subjectName: subjectsMap[res.subjectId] || 'Unknown Subject'
        });
      });

      setResults(Object.values(grouped).sort((a: any, b: any) => a.session.localeCompare(b.session)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[40px] bg-slate-900 p-10 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <FileText className="w-10 h-10 text-blue-400" />
              Academic Transcript Center
            </h1>
            <p className="text-slate-400 font-medium">Generate multi-year official academic history documents.</p>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  placeholder="Enter Reg Number..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-slate-800 border-none rounded-2xl text-white font-bold focus:ring-2 focus:ring-blue-500"
                />
             </div>
             <button onClick={handleSearch} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-600/20">
                {searching ? <Loader2 className="animate-spin w-4 h-4" /> : 'Find Student'}
             </button>
          </div>
        </div>
      </header>

      {students.length > 0 && !selectedStudent && (
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
           <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Search Results</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map(s => (
                <button 
                  key={s.id} 
                  onClick={() => loadTranscript(s)}
                  className="flex items-center gap-4 p-6 rounded-[32px] bg-gray-50 border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                >
                   <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-blue-600 shadow-sm">
                      <User className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="font-black text-gray-900">{s.name}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.regNumber}</p>
                   </div>
                </button>
              ))}
           </div>
        </div>
      )}

      {selectedStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in zoom-in-95">
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
                 <div className="w-24 h-24 bg-gray-100 rounded-[32px] mx-auto mb-6 flex items-center justify-center text-gray-400">
                    <User className="w-10 h-10" />
                 </div>
                 <h2 className="text-2xl font-black text-gray-900 mb-1">{selectedStudent.name}</h2>
                 <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6">{selectedStudent.regNumber}</p>
                 <div className="flex flex-col gap-2">
                    <button onClick={() => window.print()} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                       <Printer className="w-4 h-4" /> Print Transcript
                    </button>
                    <button className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                       <Download className="w-4 h-4" /> Export PDF
                    </button>
                 </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[40px] text-white">
                 < Award className="w-8 h-8 mb-4 text-indigo-200" />
                 <h3 className="text-lg font-black mb-2">Performance Summary</h3>
                 <p className="text-sm text-indigo-100 font-medium leading-relaxed">Student has completed <strong className="text-white">{results.length} sessions/terms</strong> of academic study.</p>
              </div>
           </div>

           <div className="lg:col-span-3">
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                 <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Academic History Record</h2>
                    <BookOpen className="text-gray-300" />
                 </div>

                 <div className="p-8 space-y-12 flex-1">
                    {loading ? (
                      <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-blue-600" /></div>
                    ) : results.length > 0 ? (
                      <div className="space-y-12">
                         {results.map((group, gIdx) => (
                           <div key={gIdx} className="space-y-6">
                              <div className="flex items-center gap-4">
                                 <div className="h-px bg-gray-100 flex-1" />
                                 <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                    {group.session} • {group.term}
                                 </span>
                                 <div className="h-px bg-gray-100 flex-1" />
                              </div>
                              <div className="overflow-x-auto">
                                 <table className="w-full text-left">
                                    <thead>
                                       <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                          <th className="pb-4">Subject</th>
                                          <th className="pb-4 text-center">CA 1</th>
                                          <th className="pb-4 text-center">CA 2</th>
                                          <th className="pb-4 text-center">Exam</th>
                                          <th className="pb-4 text-center">Total</th>
                                          <th className="pb-4 text-center">Grade</th>
                                       </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                       {group.results.map((res: any, rIdx: number) => (
                                         <tr key={rIdx} className="text-sm">
                                            <td className="py-4 font-bold text-gray-900">{res.subjectName}</td>
                                            <td className="py-4 text-center text-gray-500">{res.ca1}</td>
                                            <td className="py-4 text-center text-gray-500">{res.ca2}</td>
                                            <td className="py-4 text-center text-gray-500">{res.exam}</td>
                                            <td className="py-4 text-center font-black text-gray-900">{res.total}</td>
                                            <td className="py-4 text-center">
                                               <span className="px-3 py-1 rounded-lg bg-slate-100 font-black text-xs">{res.grade}</span>
                                            </td>
                                         </tr>
                                       ))}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                         ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-300 py-20">
                         <FileText className="w-16 h-16 mb-4 opacity-20" />
                         <p className="font-bold uppercase tracking-widest text-xs">No historical records found for this ID</p>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
