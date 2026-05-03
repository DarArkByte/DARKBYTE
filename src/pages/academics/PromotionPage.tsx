import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { FastForward, CheckCircle2, AlertTriangle, Users, Loader2, ArrowRight } from 'lucide-react';

interface ClassNode {
  id: string;
  name: string;
}

interface StudentNode {
  id: string;
  name: string;
  classId: string;
}

export default function PromotionPage() {
  const { school } = useSchool();
  const [classes, setClasses] = useState<ClassNode[]>([]);
  const [sourceClass, setSourceClass] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [students, setStudents] = useState<StudentNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [promoting, setPromoting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!school?.id) return;
    const fetchClasses = async () => {
      const q = query(collection(db, 'classes'), where('schoolId', '==', school.id));
      const snapshot = await getDocs(q);
      setClasses(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
    };
    fetchClasses();
  }, [school?.id]);

  const fetchStudents = async () => {
    if (!sourceClass) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'students'), where('schoolId', '==', school?.id), where('classId', '==', sourceClass));
      const snapshot = await getDocs(q);
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().displayName || doc.data().name, classId: doc.data().classId })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async () => {
    if (!targetClass || students.length === 0) return;
    if (!confirm(`Are you sure you want to promote ${students.length} students to ${classes.find(c => c.id === targetClass)?.name}?`)) return;

    setPromoting(true);
    try {
      for (const student of students) {
        await updateDoc(doc(db, 'students', student.id), {
          classId: targetClass,
          promotedAt: serverTimestamp(),
          previousClassId: sourceClass
        });
      }
      setSuccess(true);
      setStudents([]);
      setSourceClass('');
      setTargetClass('');
    } catch (err) {
      alert('Promotion failed');
    } finally {
      setPromoting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[40px] bg-indigo-900 p-10 text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
            <FastForward className="w-10 h-10 text-indigo-400" />
            Session Promotion Engine
          </h1>
          <p className="text-indigo-200 font-medium">Batch move students to their next academic level.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Promotion Logic</h2>
            
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Source Class (Current)</label>
              <select 
                value={sourceClass} 
                onChange={(e) => setSourceClass(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600"
              >
                <option value="">Select Class...</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <button 
              onClick={fetchStudents}
              disabled={!sourceClass || loading}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Load Students'}
            </button>

            <div className="pt-6 border-t border-gray-50">
               <ArrowRight className="w-8 h-8 text-indigo-100 mx-auto mb-4" />
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Target Class (Next Level)</label>
              <select 
                value={targetClass} 
                onChange={(e) => setTargetClass(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600"
              >
                <option value="">Select Class...</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <button 
              onClick={handlePromote}
              disabled={!targetClass || students.length === 0 || promoting}
              className="w-full py-5 bg-[#d946ef] text-white font-black rounded-2xl shadow-xl shadow-magenta-500/20 flex items-center justify-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
            >
              {promoting ? <Loader2 className="animate-spin w-5 h-5" /> : 'Execute Batch Promotion'}
            </button>
          </div>

          <div className="bg-amber-50 p-8 rounded-[40px] border border-amber-100">
             <AlertTriangle className="text-amber-600 w-8 h-8 mb-4" />
             <h3 className="font-black text-amber-900 mb-2">Safe Execution Mode</h3>
             <p className="text-sm text-amber-700 font-medium">Batch promotion will update student profiles and store their previous class history for archival purposes.</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden h-full min-h-[600px] flex flex-col">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Student Review List</h2>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-4 py-1.5 rounded-full">{students.length} Candidates</span>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">Promotion Successful!</h2>
                  <p className="text-gray-500 max-w-sm">All selected students have been migrated to their new academic level.</p>
                  <button onClick={() => setSuccess(false)} className="text-indigo-600 font-black uppercase text-xs tracking-widest mt-4">New Promotion Run</button>
                </div>
              ) : students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map(s => (
                    <div key={s.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black">{s.name[0]}</div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{s.name}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-300">
                  <Users className="w-16 h-16 mb-4 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-xs">Load students to begin review</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
