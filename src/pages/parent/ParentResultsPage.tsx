import React, { useEffect, useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Loader2, FileSpreadsheet, User, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChildProfile {
  uid: string;
  displayName: string;
  class?: string;
}

export default function ParentResultsPage() {
  const { school } = useSchool();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!school?.id) return;
    const fetchKids = async () => {
      // Find students in this school (mock relationship for parents)
      const q = query(collection(db, 'users'), where('schoolId', '==', school.id), where('role', '==', 'student'));
      const snap = await getDocs(q);
      const kids = snap.docs.map(d => ({ uid: d.id, ...d.data() } as ChildProfile));
      setChildren(kids);
      if (kids.length > 0) setSelectedChild(kids[0]);
      setLoading(false);
    };
    fetchKids();
  }, [school?.id]);

  if (loading) return (
    <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>
  );

  return (
    <div className="space-y-8 pb-12 font-sans max-w-5xl mx-auto">
      <header className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-indigo-600" />
            Report Cards
          </h1>
          <p className="text-slate-500 font-medium">View and download your children's published academic results.</p>
        </div>
        
        {children.length > 0 && (
          <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            {children.map(child => (
              <button 
                key={child.uid}
                onClick={() => setSelectedChild(child)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  selectedChild?.uid === child.uid 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-white hover:shadow-sm'
                }`}
              >
                <User className="w-4 h-4" /> {child.displayName}
              </button>
            ))}
          </div>
        )}
      </header>

      {selectedChild ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-black text-slate-900 text-lg sm:text-xl text-center sm:text-left">{selectedChild.displayName}'s Report Card</h2>
            <Link to={`/results/view/${selectedChild.uid}`} className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto">
              <Download className="w-4 h-4" /> Expand & Download
            </Link>
          </div>
          <div className="p-10 flex justify-center bg-slate-50/30 overflow-x-auto min-h-[300px]">
             <div className="text-center py-10 my-auto">
               <FileSpreadsheet className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-slate-700 mb-2">Document Ready</h3>
               <p className="text-slate-500 max-w-md mx-auto mb-6">Click the button above to securely view the full, printable report card for {selectedChild.displayName}.</p>
               <Link to={`/results/view/${selectedChild.uid}`} className="inline-flex items-center gap-2 bg-white border-2 border-indigo-100 text-indigo-600 px-6 py-3 rounded-xl font-bold hover:border-indigo-600 transition-colors">
                  Open Document Viewer
               </Link>
             </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <p className="text-slate-400 font-bold">No students linked to your account.</p>
        </div>
      )}
    </div>
  );
}
