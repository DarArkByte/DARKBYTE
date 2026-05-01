/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useSchool } from '../../hooks/useSchool';
import { Result, UserProfile, Subject } from '../../types';
import ReportCard from '../../components/results/ReportCard';
import { Download, Share2, Printer } from 'lucide-react';

export default function ResultView() {
  const { studentId } = useParams();
  const { school, loading: schoolLoading } = useSchool();
  const [results, setResults] = useState<(Result & { subject: Subject })[]>([]);
  const [student, setStudent] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [session] = useState('2025/2026');
  const [term] = useState('First Term');

  const loadData = async () => {
    if (!school?.id || !studentId) return;

    try {
      setLoading(true);
      
      // Load Student
      const studentSnap = await getDoc(doc(db, 'users', studentId));
      if (studentSnap.exists()) {
        setStudent({ uid: studentSnap.id, ...studentSnap.data() } as UserProfile);
      }

      // Load Results
      const resultsRef = collection(db, 'schools', school.id, 'results');
      const q = query(resultsRef, where('studentId', '==', studentId), where('status', '==', 'published'));
      const resultsSnap = await getDocs(q);
      
      // Load Subjects and Combine
      const subjectsSnap = await getDocs(collection(db, 'schools', school.id, 'subjects'));
      const subjectMap = subjectsSnap.docs.reduce((acc, d) => {
        acc[d.id] = { id: d.id, ...d.data() } as Subject;
        return acc;
      }, {} as Record<string, Subject>);

      const combinedResults = resultsSnap.docs.map(d => {
        const data = d.data() as Result;
        return {
          ...data,
          subject: subjectMap[data.subjectId] || { id: data.subjectId, name: 'Unknown Subject', schoolId: school.id }
        };
      });

      setResults(combinedResults);
    } catch (error) {
      console.error('Error loading result view:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [school?.id, studentId]);

  if (loading || schoolLoading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full" />
    </div>
  );

  if (!student || results.length === 0) return (
    <div className="max-w-7xl mx-auto p-12 text-center">
       <h1 className="text-2xl font-bold text-gray-900 mb-4">Report Card Not Available</h1>
       <p className="text-gray-500">Results might not be published yet, or the student doesn't exist.</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100 no-print">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Official Verified Copy</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => window.print()}
             className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
           >
             <Printer className="w-4 h-4" /> Print
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
             <Download className="w-4 h-4" /> Download PDF
           </button>
           <button className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600">
             <Share2 className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="print:shadow-none print:border-0">
        <ReportCard 
          school={school}
          student={student}
          results={results}
          session={session}
          term={term}
          theme={school.settings?.reportCardTheme || 'modern'}
        />
      </div>

      <div className="mt-12 text-center text-gray-400 text-xs no-print">
        <p>© 2026 Dar-Ark Byte Security Infrastructure. All rights reserved.</p>
        <p className="mt-1 italic">Generated on {new Date().toLocaleString()}</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .max-w-5xl { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
        }
      `}} />
    </div>
  );
}
