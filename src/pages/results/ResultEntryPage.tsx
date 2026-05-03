import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { ClipboardList, Upload, Download, Save, Users, FileSpreadsheet, CheckCircle, Loader2 } from 'lucide-react';

interface ResultEntry {
  id: string;
  studentName: string;
  ca1: string;
  ca2: string;
  exam: string;
}

export default function ResultEntryPage() {
  const { school } = useSchool();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [classes, setClasses] = useState<{id: string, name: string}[]>([]);
  const [entries, setEntries] = useState<ResultEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!school?.id) return;
      const q = query(collection(db, 'classes'), where('schoolId', '==', school.id));
      const snap = await getDocs(q);
      const clsData = snap.docs.map(d => ({ id: d.id, name: d.data().name }));
      setClasses(clsData);
      if (clsData.length > 0) setSelectedClass(clsData[0].name);
    };
    fetchClasses();
  }, [school?.id]);

  useEffect(() => {
    const fetchStudentsAndMarks = async () => {
      if (!school?.id || !selectedClass) return;
      setLoading(true);
      try {
        const q = query(collection(db, 'students'), where('schoolId', '==', school.id), where('class', '==', selectedClass));
        const snap = await getDocs(q);
        const students = snap.docs.map(d => ({ id: d.id, name: d.data().displayName || d.data().name }));

        // Fetch existing results for this subject/class
        const rQ = query(collection(db, 'results'), where('schoolId', '==', school.id), where('class', '==', selectedClass), where('subject', '==', selectedSubject));
        const rSnap = await getDocs(rQ);
        const marksMap = new Map();
        rSnap.forEach(d => marksMap.set(d.data().studentId, d.data()));

        const newEntries = students.map(s => {
          const m = marksMap.get(s.id) || {};
          return {
            id: s.id,
            studentName: s.name,
            ca1: m.ca1 || '',
            ca2: m.ca2 || '',
            exam: m.exam || ''
          };
        });
        setEntries(newEntries);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentsAndMarks();
  }, [school?.id, selectedClass, selectedSubject]);

  const handleInputChange = (id: string, field: keyof ResultEntry, value: string) => {
    if (value !== '' && isNaN(Number(value))) return;
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSave = async () => {
    if (!school?.id || entries.length === 0) return;
    setSaving(true);
    try {
      for (const entry of entries) {
        const resultId = `${entry.id}_${selectedSubject}_term1`; // Term-based ID
        await setDoc(doc(db, 'results', resultId), {
          studentId: entry.id,
          schoolId: school.id,
          class: selectedClass,
          subject: selectedSubject,
          ca1: entry.ca1,
          ca2: entry.ca2,
          exam: entry.exam,
          total: Number(entry.ca1 || 0) + Number(entry.ca2 || 0) + Number(entry.exam || 0),
          status: 'ready',
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
      alert('Results Synchronized Successfully!');
    } catch (err) {
      alert('Sync Failed');
    } finally {
      setSaving(false);
    }
  };

  const calculateTotal = (entry: ResultEntry) => Number(entry.ca1 || 0) + Number(entry.ca2 || 0) + Number(entry.exam || 0);

  const getGrade = (total: number) => {
    if (total >= 70) return { grade: 'A', color: 'text-emerald-600' };
    if (total >= 60) return { grade: 'B', color: 'text-blue-600' };
    if (total >= 50) return { grade: 'C', color: 'text-amber-600' };
    if (total >= 40) return { grade: 'D', color: 'text-orange-600' };
    return { grade: 'F', color: 'text-rose-600' };
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#1e1b4b] to-indigo-700 p-10 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 flex items-center gap-4">
              <FileSpreadsheet className="w-10 h-10 text-[#facc15]" />
              MARKS ENTRY CORE
            </h1>
            <p className="text-blue-100 font-bold text-lg max-w-xl">Input assessment scores and generate real-time academic analytics.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest backdrop-blur-md transition-all border border-white/10">
              <Download className="w-4 h-4" /> Template
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-[56px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center bg-slate-50/30 gap-8">
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <div className="bg-indigo-600 text-white p-5 rounded-[32px] shadow-xl shadow-indigo-500/20">
              <Users className="w-7 h-7" />
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Academic Level</p>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-transparent font-black text-slate-900 border-none p-0 focus:ring-0 cursor-pointer text-xl"
                >
                  {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="w-px bg-slate-200 h-12" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject Node</p>
                <select 
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-transparent font-black text-slate-900 border-none p-0 focus:ring-0 cursor-pointer text-xl"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English Language">English Language</option>
                  <option value="Basic Science">Basic Science</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-4 bg-[#1e1b4b] text-white font-black px-12 py-5 rounded-3xl hover:bg-[#d946ef] shadow-2xl transition-all w-full lg:w-auto justify-center disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? 'SYNCING...' : 'COMMIT MARKS'}
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Pulling Student Records...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                  <th className="p-8 pl-10">Student Identity</th>
                  <th className="p-8 text-center">CA 1 (20)</th>
                  <th className="p-8 text-center">CA 2 (20)</th>
                  <th className="p-8 text-center border-r border-slate-50">Exam (60)</th>
                  <th className="p-8 text-center bg-indigo-50/30">Composite</th>
                  <th className="p-8 pr-10 text-center bg-indigo-50/30">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-20 text-center text-slate-400 font-bold">No students found in this class node.</td>
                  </tr>
                ) : (
                  entries.map((entry) => {
                    const total = calculateTotal(entry);
                    const { grade, color } = getGrade(total);
                    return (
                      <tr key={entry.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="p-8 pl-10">
                          <p className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{entry.studentName}</p>
                        </td>
                        <td className="p-8">
                          <input 
                            type="text" 
                            value={entry.ca1}
                            onChange={(e) => handleInputChange(entry.id, 'ca1', e.target.value)}
                            className="w-full text-center bg-slate-50 border border-slate-100 rounded-2xl py-4 font-black text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all"
                          />
                        </td>
                        <td className="p-8">
                          <input 
                            type="text" 
                            value={entry.ca2}
                            onChange={(e) => handleInputChange(entry.id, 'ca2', e.target.value)}
                            className="w-full text-center bg-slate-50 border border-slate-100 rounded-2xl py-4 font-black text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all"
                          />
                        </td>
                        <td className="p-8 border-r border-slate-50">
                          <input 
                            type="text" 
                            value={entry.exam}
                            onChange={(e) => handleInputChange(entry.id, 'exam', e.target.value)}
                            className="w-full text-center bg-indigo-50/50 border border-indigo-100 rounded-2xl py-4 font-black text-indigo-900 focus:ring-4 focus:ring-indigo-200 focus:bg-white transition-all"
                          />
                        </td>
                        <td className="p-8 bg-slate-50/30 text-center">
                          <span className="text-2xl font-black text-slate-900">{total}</span>
                        </td>
                        <td className="p-8 pr-10 bg-slate-50/30 text-center">
                          <span className={`inline-flex font-black text-xl w-12 h-12 items-center justify-center rounded-2xl bg-white shadow-sm ${total > 0 ? color : 'text-slate-300'}`}>
                            {total > 0 ? grade : '-'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
