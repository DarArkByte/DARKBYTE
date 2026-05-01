/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc, setDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { Result, UserProfile, Class, Subject } from '../../types';
import { Save, AlertCircle, ChevronLeft, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentScore {
  studentId: string;
  name: string;
  ca1: string;
  ca2: string;
  exam: string;
  total: number;
  grade: string;
  status: string;
}

export default function ResultEntry() {
  const { classId, subjectId } = useParams();
  const { userProfile } = useAuth();
  const { school } = useSchool();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [scores, setScores] = useState<StudentScore[]>([]);
  const [cls, setCls] = useState<Class | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [sessionId] = useState('2025-2026');
  const [termId] = useState('term-1');
  const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const calculateGrade = (total: number) => {
    if (!school?.settings?.gradingSystem) return '';
    const grade = school.settings.gradingSystem.find(g => total >= g.min && total <= g.max);
    return grade ? grade.label : 'F';
  };

  const loadData = async () => {
    if (!school?.id || !classId || !subjectId) return;
    
    try {
      setLoading(true);
      
      // Load Class and Subject details
      const [clsSnap, subSnap] = await Promise.all([
        getDoc(doc(db, 'schools', school.id, 'classes', classId)),
        getDoc(doc(db, 'schools', school.id, 'subjects', subjectId))
      ]);
      
      setCls({ id: clsSnap.id, ...clsSnap.data() } as Class);
      setSubject({ id: subSnap.id, ...subSnap.data() } as Subject);

      // Load Students in this class
      const studentsQuery = query(collection(db, 'users'), where('schoolId', '==', school.id), where('role', '==', 'student'));
      const studentsSnap = await getDocs(studentsQuery);
      const studentsList = studentsSnap.docs.map(d => ({ uid: d.id, ...d.data() } as UserProfile));

      // Load existing results
      const resultsRef = collection(db, 'schools', school.id, 'results');
      const resultsQuery = query(
        resultsRef, 
        where('classId', '==', classId), 
        where('subjectId', '==', subjectId),
        where('sessionId', '==', sessionId),
        where('termId', '==', termId)
      );
      const resultsSnap = await getDocs(resultsQuery);
      const existingResults = resultsSnap.docs.reduce((acc, d) => {
        const data = d.data() as Result;
        acc[data.studentId] = data;
        return acc;
      }, {} as Record<string, Result>);

      // Map scores
      const initialScores: StudentScore[] = studentsList.map(s => {
        const r = existingResults[s.uid];
        return {
          studentId: s.uid,
          name: s.displayName,
          ca1: r ? String(r.ca1) : '',
          ca2: r ? String(r.ca2) : '',
          exam: r ? String(r.exam) : '',
          total: r ? r.total : 0,
          grade: r ? r.grade : '',
          status: r ? r.status : 'draft'
        };
      });

      setScores(initialScores);
    } catch (error) {
      console.error('Error loading result entry data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [school?.id, classId, subjectId]);

  const updateScore = (studentId: string, field: 'ca1' | 'ca2' | 'exam', value: string) => {
    // Basic validation: only numbers
    if (value !== '' && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100)) return;

    setScores(prev => prev.map(s => {
      if (s.studentId !== studentId) return s;
      
      const newScore = { ...s, [field]: value };
      const c1 = Number(newScore.ca1) || 0;
      const c2 = Number(newScore.ca2) || 0;
      const ex = Number(newScore.exam) || 0;
      
      newScore.total = c1 + c2 + ex;
      newScore.grade = calculateGrade(newScore.total);
      
      return newScore;
    }));
  };

  const handleSave = async () => {
    if (!school?.id || !userProfile?.uid) return;
    
    setSaving(true);
    setMsg(null);
    try {
      const batch = writeBatch(db);
      
      for (const s of scores) {
        // Skip if everything empty
        if (s.ca1 === '' && s.ca2 === '' && s.exam === '') continue;

        const resultId = `${s.studentId}-${subjectId}-${sessionId}-${termId}`;
        const ref = doc(db, 'schools', school.id, 'results', resultId);
        
        batch.set(ref, {
          id: resultId,
          schoolId: school.id,
          studentId: s.studentId,
          subjectId: subjectId,
          classId: classId,
          sessionId,
          termId,
          ca1: Number(s.ca1) || 0,
          ca2: Number(s.ca2) || 0,
          exam: Number(s.exam) || 0,
          total: s.total,
          grade: s.grade,
          status: 'draft', // Saved as draft
          teacherId: userProfile.uid,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
      
      await batch.commit();
      setMsg({ type: 'success', text: 'All results saved successfully as draft.' });
    } catch (err: any) {
      setMsg({ type: 'error', text: 'Error saving results: ' + err.message });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 5000);
    }
  };

  if (loading) return <div className="h-64 flex items-center justify-center">
    <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
  </div>;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-all border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-sans font-bold text-gray-900 tracking-tight">Enter Scores: {subject?.name}</h1>
            <p className="text-gray-500 font-medium font-sans uppercase text-xs tracking-widest mt-1">
              Class: {cls?.name} • Term: {termId} • Session: {sessionId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
          >
            Print Sheet
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            {saving ? <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" /> : <Save className="w-5 h-5" />}
            Save Progress
          </button>
        </div>
      </div>

      <AnimatePresence>
        {msg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl border flex items-center gap-3 font-sans font-medium text-sm ${
              msg.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
            }`}
          >
            {msg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest">Student Name</th>
              <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest text-center">CA 1 (20)</th>
              <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest text-center">CA 2 (20)</th>
              <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest text-center">Exam (60)</th>
              <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest text-center">Total (100)</th>
              <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest text-center">Grade</th>
              <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, idx) => (
              <tr key={s.studentId} className={`group border-b border-gray-50 last:border-0 hover:bg-gray-50/20 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/10'}`}>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-indigo-50 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-600">
                      {idx + 1}
                    </div>
                    <span className="font-sans font-bold text-gray-900">{s.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <input
                    type="text"
                    value={s.ca1}
                    onChange={(e) => updateScore(s.studentId, 'ca1', e.target.value)}
                    className="w-16 h-10 border-2 border-gray-100 rounded-xl text-center font-sans font-bold text-gray-700 focus:border-indigo-300 focus:outline-none transition-all"
                    placeholder="0"
                  />
                </td>
                <td className="px-6 py-5">
                  <input
                    type="text"
                    value={s.ca2}
                    onChange={(e) => updateScore(s.studentId, 'ca2', e.target.value)}
                    className="w-16 h-10 border-2 border-gray-100 rounded-xl text-center font-sans font-bold text-gray-700 focus:border-indigo-300 focus:outline-none transition-all"
                    placeholder="0"
                  />
                </td>
                <td className="px-6 py-5">
                  <input
                    type="text"
                    value={s.exam}
                    onChange={(e) => updateScore(s.studentId, 'exam', e.target.value)}
                    className="w-16 h-10 border-2 border-gray-100 rounded-xl text-center font-sans font-bold text-gray-700 focus:border-indigo-300 focus:outline-none transition-all"
                    placeholder="0"
                  />
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl font-sans font-bold ${
                    s.total >= 75 ? 'bg-emerald-50 text-emerald-600' : 
                    s.total >= 40 ? 'bg-indigo-50 text-indigo-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {s.total}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="font-sans font-black text-lg text-gray-900">{s.grade}</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full inline-block ${
                    s.status === 'draft' ? 'bg-gray-100 text-gray-500' :
                    s.status === 'published' ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {s.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4">
        <Info className="text-indigo-600 w-6 h-6 shrink-0 mt-0.5" />
        <div className="text-sm font-sans font-medium text-indigo-800 leading-relaxed">
          <p className="font-bold mb-1">Teacher Instructions:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Ensure all scores are within the defined maximums (CA1: 20, CA2: 20, Exam: 60).</li>
            <li>Click "Save Progress" frequently to prevent data loss.</li>
            <li>Results are saved as <strong>Draft</strong>. Only the School Admin can publish them to parents.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
