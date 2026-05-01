/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { Class, Subject } from '../../types';
import { Link } from 'react-router-dom';
import { Users, BookOpen, ChevronRight, Play, ClipboardList } from 'lucide-react';
import { setupDemoData } from '../../services/demoService';

export default function TeacherDashboard() {
  const { userProfile } = useAuth();
  const { school } = useSchool();
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!school?.id) return;
    
    try {
      setLoading(true);
      // Try to setup demo data if first time
      await setupDemoData(userProfile!);

      const classesSnap = await getDocs(collection(db, 'schools', school.id, 'classes'));
      setClasses(classesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Class)));

      const subjectsSnap = await getDocs(collection(db, 'schools', school.id, 'subjects'));
      setSubjects(subjectsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Subject)));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [school?.id]);

  if (loading) return <div className="h-64 flex items-center justify-center">
    <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
  </div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-sans font-bold text-gray-900 mb-2">Welcome Back, {userProfile?.displayName?.split(' ')[0]}!</h1>
        <p className="text-gray-500 font-medium font-sans">Manage your classes and process results effectively.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <StatsCard title="Assigned Classes" value={classes.length} icon={<Users />} color="bg-indigo-600" />
        <StatsCard title="Total Subjects" value={subjects.length} icon={<BookOpen />} color="bg-emerald-600" />
        <StatsCard title="Students Pending Results" value={12} icon={<ChevronRight />} color="bg-amber-600" />
      </div>

      <div className="grid xl:grid-cols-2 gap-8">
        {/* Classes List */}
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-sans font-bold text-gray-900">Your Classes</h2>
            <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {classes.map(cls => (
              <div key={cls.id} className="group p-5 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-indigo-100 transition-all flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-gray-900">{cls.name}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Class Teacher</p>
                </div>
                <div className="flex items-center gap-2">
                  {subjects.map(sub => (
                    <Link
                      key={sub.id}
                      to={`/teacher/results/entry/${cls.id}/${sub.id}`}
                      className="p-2 bg-white rounded-xl border border-gray-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-2 text-xs font-bold px-4"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-sans font-bold text-gray-900 mb-8">Recent Result Entry</h2>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <ClipboardList className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-sans font-medium text-gray-600">
                    You updated results for <span className="font-bold text-gray-900">Mathematics</span> in <span className="font-bold text-gray-900">SS1 A</span>
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, color }: { title: string, value: number, icon: any, color: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-6">
      <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-sans font-bold text-gray-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-sans font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
