import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { GraduationCap, FileText, ChevronRight, MessageSquare } from 'lucide-react';

export default function ParentDashboard() {
  const { userProfile } = useAuth();
  const [children, setChildren] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      if (!userProfile?.schoolId) return;
      try {
        const q = query(
          collection(db, 'users'), 
          where('schoolId', '==', userProfile.schoolId),
          where('role', '==', 'student')
        );
        const snap = await getDocs(q);
        setChildren(snap.docs.map(d => ({ uid: d.id, ...d.data() } as UserProfile)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, [userProfile]);

  if (loading) return <div className="animate-pulse flex space-x-4 p-12"><div className="rounded-full bg-gray-200 h-10 w-10"></div><div className="flex-1 space-y-6 py-1"><div className="h-2 bg-gray-200 rounded"></div></div></div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-sans font-bold text-gray-900 mb-2">Welcome, Parent</h1>
        <p className="text-gray-500 font-medium font-sans">Monitor your children's academic progress and performance.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <GraduationCap className="text-indigo-600" />
            My Children
          </h2>
          <div className="space-y-4">
            {children.length === 0 ? (
              <p className="text-gray-400 italic">No children found linked to your account.</p>
            ) : (
              children.map(child => (
                <Link 
                  key={child.uid}
                  to={`/parent/results/view/${child.uid}`}
                  className="flex items-center justify-between p-5 rounded-2xl border border-gray-50 bg-gray-50/30 hover:border-indigo-100 hover:bg-white transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                       {child.displayName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{child.displayName}</h3>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Student</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-xs hover:bg-indigo-100 transition-colors">
                      <MessageSquare className="w-3 h-3" /> Contact Teacher
                    </button>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                      View Report <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="bg-indigo-600 rounded-3xl p-8 text-white">
          <FileText className="w-12 h-12 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Latest Results</h2>
          <p className="text-indigo-100/80 mb-8 leading-relaxed">
            First Term 2025/2026 results have been published for all SS1 classes. Please review and acknowledge your child's performance.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all">
            Download News Letter
          </button>
        </section>
      </div>
    </div>
  );
}
