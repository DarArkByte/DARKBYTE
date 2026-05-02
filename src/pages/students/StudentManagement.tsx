import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Users, UserPlus, Search, Edit2, Trash2, Filter, Loader2, GraduationCap } from 'lucide-react';

interface Student {
  id: string;
  displayName: string;
  class: string;
  admissionNumber: string;
  gender: string;
}

export default function StudentManagement() {
  const { school } = useSchool();
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', admission: '', gender: 'Male' });

  const fetchData = async () => {
    if (!school?.id) return;
    setLoading(true);
    try {
      // Fetch Classes for dropdown
      const qC = query(collection(db, 'classes'), where('schoolId', '==', school.id));
      const snapC = await getDocs(qC);
      const classesData = snapC.docs.map(d => d.data().name);
      setClasses(classesData);

      // Fetch Students
      const qS = query(collection(db, 'students'), where('schoolId', '==', school.id));
      const snapS = await getDocs(qS);
      const studentsData = snapS.docs.map(d => ({
        id: d.id,
        displayName: d.data().displayName || d.data().name,
        class: d.data().class,
        admissionNumber: d.data().admissionNumber || 'N/A',
        gender: d.data().gender || 'Other'
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

  const handleAdd = async () => {
    if (!newStudent.name || !newStudent.class || !school?.id) return;
    try {
      await addDoc(collection(db, 'students'), {
        displayName: newStudent.name,
        class: newStudent.class,
        admissionNumber: newStudent.admission,
        gender: newStudent.gender,
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

  return (
    <div className="space-y-10 pb-24 font-sans">
      <header className="relative overflow-hidden rounded-[48px] bg-gradient-to-r from-emerald-600 to-teal-700 p-10 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 flex items-center gap-4">
              <GraduationCap className="w-10 h-10 text-white" />
              STUDENT NEXUS
            </h1>
            <p className="text-emerald-100 font-bold text-lg max-w-xl">Manage your school's most valuable asset: the students.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 bg-white text-emerald-600 px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
          >
            <UserPlus className="w-5 h-5" /> Register Student
          </button>
        </div>
      </header>

      {isAdding && (
        <div className="bg-white p-10 rounded-[56px] shadow-2xl border border-emerald-100 space-y-8">
           <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">New Admission Entry</h3>
           <div className="grid md:grid-cols-4 gap-6">
              <input 
                placeholder="Full Legal Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-emerald-500"
              />
              <select 
                value={newStudent.class}
                onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Class</option>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input 
                placeholder="Admission ID"
                value={newStudent.admission}
                onChange={(e) => setNewStudent({...newStudent, admission: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-emerald-500"
              />
              <button onClick={handleAdd} className="bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all">Submit Entry</button>
           </div>
        </div>
      )}

      <div className="bg-white rounded-[56px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search by name or admission..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-8 py-5 bg-white border border-slate-200 rounded-full font-bold text-slate-600"
            />
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{students.length} Students Records</span>
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
                  <th className="p-10 text-center">Admission ID</th>
                  <th className="p-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.length === 0 ? (
                   <tr><td colSpan={4} className="p-20 text-center text-slate-400 font-bold">No active student records found.</td></tr>
                ) : (
                  filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-all">
                      <td className="p-10">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xl">{student.displayName[0]}</div>
                          <div>
                            <p className="font-black text-slate-900 text-lg">{student.displayName}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{student.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-10 text-center">
                        <span className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-2xl font-black text-xs">{student.class}</span>
                      </td>
                      <td className="p-10 text-center text-slate-600 font-bold">{student.admissionNumber}</td>
                      <td className="p-10 text-right">
                        <button className="p-4 text-slate-300 hover:text-emerald-600 transition-all"><Edit2 className="w-5 h-5" /></button>
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
