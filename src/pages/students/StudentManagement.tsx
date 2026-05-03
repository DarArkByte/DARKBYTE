import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Users, UserPlus, Search, Edit2, Trash2, Filter, Loader2, GraduationCap, Printer, Lock, Mail, Phone, MapPin } from 'lucide-react';

interface Student {
  id: string;
  displayName: string;
  class: string;
  admissionNumber: string;
  gender: string;
  username: string;
  pin: string;
}

export default function StudentManagement() {
  const { school } = useSchool();
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', admission: '', gender: 'Male' });
  const [isPrinting, setIsPrinting] = useState(false);

  const fetchData = async () => {
    if (!school?.id) return;
    setLoading(true);
    try {
      const qC = query(collection(db, 'classes'), where('schoolId', '==', school.id));
      const snapC = await getDocs(qC);
      const classesData = snapC.docs.map(d => d.data().name);
      setClasses(classesData);

      const qS = query(collection(db, 'students'), where('schoolId', '==', school.id));
      const snapS = await getDocs(qS);
      const studentsData = snapS.docs.map(d => ({
        id: d.id,
        displayName: d.data().displayName || d.data().name,
        class: d.data().class,
        admissionNumber: d.data().admissionNumber || 'N/A',
        gender: d.data().gender || 'Other',
        username: d.data().username || '',
        pin: d.data().pin || ''
      } as Student));
      setStudents(studentsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [school?.id]);

  const generateUsername = (name: string) => {
    const clean = name.toLowerCase().replace(/\s/g, '');
    return `${clean}${Math.floor(100 + Math.random() * 900)}`;
  };

  const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleAdd = async () => {
    if (!newStudent.name || !newStudent.class || !school?.id) return;
    try {
      const username = generateUsername(newStudent.name);
      const pin = generatePin();
      
      await addDoc(collection(db, 'students'), {
        displayName: newStudent.name,
        class: newStudent.class,
        admissionNumber: newStudent.admission || `REG-${Date.now().toString().slice(-6)}`,
        gender: newStudent.gender,
        username,
        pin,
        schoolId: school.id,
        createdAt: new Date().toISOString()
      });
      setIsAdding(false);
      setNewStudent({ name: '', class: '', admission: '', gender: 'Male' });
      fetchData();
    } catch (err) {
      alert('Failed to register student');
    }
  };

  const filteredStudents = students.filter(s => 
    s.displayName.toLowerCase().includes(search.toLowerCase()) || 
    s.admissionNumber.toLowerCase().includes(search.toLowerCase())
  );

  if (isPrinting) {
    return (
      <div className="bg-white min-h-screen p-10 print:p-0">
         <div className="flex justify-between items-center mb-10 print:hidden">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Identity Card & PIN Generator</h2>
            <div className="flex gap-4">
              <button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2">
                <Printer className="w-5 h-5" /> Print All Cards
              </button>
              <button onClick={() => setIsPrinting(false)} className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black">Close</button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 print:grid-cols-2">
            {filteredStudents.map(student => (
              <div key={student.id} className="w-full max-w-[500px] aspect-[1.6/1] bg-white border-2 border-slate-200 rounded-3xl overflow-hidden relative shadow-xl flex print:shadow-none print:border-slate-300">
                 {/* Left Side: School Branding */}
                 <div className="w-1/3 bg-slate-900 p-6 flex flex-col items-center justify-between text-white relative">
                    <div className="text-center">
                       <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-white/20">
                          <GraduationCap className="w-10 h-10 text-white" />
                       </div>
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight mb-2">{school?.name || 'DAR-ARK BYTE'}</h4>
                    </div>
                    <div className="space-y-2 w-full">
                       <div className="flex items-center gap-2 text-[8px] font-bold text-slate-400">
                          <MapPin className="w-2.5 h-2.5" /> {school?.branding?.identity?.address || 'Abuja, Nigeria'}
                       </div>
                       <div className="flex items-center gap-2 text-[8px] font-bold text-slate-400">
                          <Phone className="w-2.5 h-2.5" /> {school?.branding?.identity?.phone || '+234 000 000 0000'}
                       </div>
                    </div>
                 </div>

                 {/* Right Side: Student Details */}
                 <div className="w-2/3 p-8 relative flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8">
                       <div className="w-24 h-24 bg-slate-100 rounded-2xl border-4 border-white shadow-lg overflow-hidden flex items-center justify-center font-black text-4xl text-slate-300 uppercase">
                          {student.displayName[0]}
                       </div>
                    </div>

                    <div>
                       <div className="mb-6">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Student Name</p>
                          <p className="text-xl font-black text-slate-900 tracking-tighter leading-none">{student.displayName}</p>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Class</p>
                             <p className="text-xs font-black text-slate-800">{student.class}</p>
                          </div>
                          <div>
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Admission ID</p>
                             <p className="text-xs font-black text-slate-800">{student.admissionNumber}</p>
                          </div>
                       </div>
                    </div>

                    {/* PIN Section */}
                    <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-center justify-between">
                       <div>
                          <p className="text-[7px] font-black text-indigo-400 uppercase tracking-widest mb-1">Result Access Portal</p>
                          <div className="flex items-center gap-2">
                             <Lock className="w-3 h-3 text-indigo-600" />
                             <p className="text-lg font-black text-indigo-600 tracking-[0.3em]">{student.pin}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[7px] font-black text-indigo-400 uppercase tracking-widest mb-1">Username</p>
                          <p className="text-[10px] font-black text-slate-900">{student.username}</p>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24 font-sans">
      <header className="relative overflow-hidden rounded-[56px] bg-slate-950 p-10 md:p-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 flex items-center gap-4">
              <GraduationCap className="w-12 h-12 text-emerald-400" />
              STUDENT COMMAND
            </h1>
            <p className="text-slate-400 font-bold text-lg max-w-xl">Zero-friction admissions, identity management, and automated result PINs.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setIsPrinting(true)}
              className="flex items-center justify-center gap-3 bg-slate-800 text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest border border-slate-700 hover:bg-slate-700 transition-all"
            >
              <Printer className="w-5 h-5 text-indigo-400" /> Identity Cards
            </button>
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all shadow-emerald-500/20"
            >
              <UserPlus className="w-5 h-5" /> New Entry
            </button>
          </div>
        </div>
      </header>

      {isAdding && (
        <div className="bg-white p-10 rounded-[56px] shadow-2xl border border-emerald-100 space-y-8">
           <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
              <UserPlus className="w-7 h-7 text-emerald-600" />
              Biometric & Academic Enrollment
           </h3>
           <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Student Name</label>
                 <input 
                    placeholder="Surname Firstname"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-emerald-500"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Class Placement</label>
                 <select 
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-emerald-500"
                 >
                    <option value="">Select Node</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Admission Number</label>
                 <input 
                    placeholder="Auto-Generated if Empty"
                    value={newStudent.admission}
                    onChange={(e) => setNewStudent({...newStudent, admission: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-emerald-500"
                 />
              </div>
              <div className="pt-6">
                 <button onClick={handleAdd} className="w-full h-[64px] bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20">Authorize Admission</button>
              </div>
           </div>
        </div>
      )}

      <div className="bg-white rounded-[56px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center bg-slate-50/30 gap-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Filter student directory..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-8 py-5 bg-white border border-slate-200 rounded-full font-bold text-slate-600"
            />
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                {students.length} Total Nodes
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-emerald-600" /></div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                  <th className="p-10">Student Profile</th>
                  <th className="p-10 text-center">Class Node</th>
                  <th className="p-10 text-center">Auth Details</th>
                  <th className="p-10 text-right">Registry Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.length === 0 ? (
                   <tr><td colSpan={4} className="p-20 text-center text-slate-400 font-bold">No active student records found in this vector.</td></tr>
                ) : (
                  filteredStudents.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="p-10">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center font-black text-2xl relative overflow-hidden">
                             {student.displayName[0]}
                             <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-lg leading-tight">{student.displayName}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{student.gender} • Rank #{idx + 1}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-10 text-center">
                        <span className="bg-indigo-50 text-indigo-600 px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-indigo-100">{student.class}</span>
                      </td>
                      <td className="p-10 text-center">
                         <div className="inline-flex flex-col gap-1 items-center">
                            <span className="text-[10px] font-black text-slate-900 tracking-tighter">{student.username}</span>
                            <span className="text-[12px] font-black text-indigo-600 tracking-[0.2em]">{student.pin}</span>
                         </div>
                      </td>
                      <td className="p-10 text-right">
                        <div className="flex justify-end gap-2">
                           <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                              <Edit2 className="w-5 h-5" />
                           </button>
                           <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                              <Trash2 className="w-5 h-5" />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
