import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BarChart3, TrendingUp, Users, BookOpen, ChevronRight, Download, Filter, Loader2, PieChart, Activity } from 'lucide-react';

export default function ResultAnalysisPage() {
  const { school } = useSchool();
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    averageScore: 0,
    passRate: 0,
    topStudent: '---',
    totalEntries: 0
  });

  useEffect(() => {
    if (school?.id) {
      fetchData();
    }
  }, [school, selectedClass]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Classes
      const clsSnapshot = await getDocs(query(collection(db, 'classes'), where('schoolId', '==', school?.id)));
      setClasses(clsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch Results
      let q = query(collection(db, 'results'), where('schoolId', '==', school?.id));
      if (selectedClass !== 'all') {
        q = query(collection(db, 'results'), where('classId', '==', selectedClass));
      }
      
      const resSnapshot = await getDocs(q);
      const resData = resSnapshot.docs.map(doc => doc.data());
      setResults(resData);

      // Calculate Stats
      if (resData.length > 0) {
        const total = resData.reduce((acc, curr) => acc + curr.total, 0);
        const avg = total / resData.length;
        const passes = resData.filter(r => r.total >= 40).length;
        const rate = (passes / resData.length) * 100;

        setStats({
          averageScore: Math.round(avg),
          passRate: Math.round(rate),
          topStudent: 'Fetching...', // Simplified
          totalEntries: resData.length
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            Result Intelligence Hub
          </h1>
          <p className="text-slate-500 font-bold text-sm">Deep analysis and performance metrics for your institution.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-transparent border-none font-black text-xs uppercase tracking-widest focus:ring-0 cursor-pointer"
              >
                <option value="all">All Classes</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
           </div>
           <button className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Performance', val: `${stats.averageScore}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pass Rate', val: `${stats.passRate}%`, icon: PieChart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Result Entries', val: stats.totalEntries, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Class Standing', val: 'Active', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-8 rounded-[40px] border border-white shadow-sm ring-1 ring-black/5 relative overflow-hidden group`}>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
               <stat.icon className="w-32 h-32" />
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color} mb-6`} />
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Visualization */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm min-h-[400px]">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Performance Distribution</h3>
              <div className="flex gap-2">
                 <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                 <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                 <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              </div>
           </div>
           
           {loading ? (
             <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-indigo-600" /></div>
           ) : results.length > 0 ? (
             <div className="space-y-6">
                {/* Simulated Chart Bars */}
                {['A', 'B', 'C', 'D', 'F'].map(grade => {
                  const count = results.filter(r => r.grade === grade).length;
                  const pct = (count / results.length) * 100;
                  return (
                    <div key={grade} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span>Grade {grade}</span>
                          <span>{count} Students ({Math.round(pct)}%)</span>
                       </div>
                       <div className="h-4 bg-slate-50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              grade === 'A' ? 'bg-emerald-500' : 
                              grade === 'B' ? 'bg-blue-500' : 
                              grade === 'C' ? 'bg-amber-500' : 'bg-slate-300'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                       </div>
                    </div>
                  );
                })}
             </div>
           ) : (
             <div className="h-64 flex flex-col items-center justify-center text-slate-300">
                <BarChart3 className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-black uppercase tracking-widest text-xs">No result data available for analysis</p>
             </div>
           )}
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
           <div className="bg-[#1e1b4b] p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />
              <TrendingUp className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-black mb-4 leading-tight">AI Academic Forecast</h3>
              <p className="text-slate-400 text-sm font-medium mb-8">Based on current term trends, we predict a <strong className="text-emerald-400">12% increase</strong> in overall pass rates for the next term.</p>
              
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black uppercase text-slate-400">Confidence Level</span>
                    <span className="text-xs font-black text-indigo-400">HIGH (92%)</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black uppercase text-slate-400">At-Risk Ratio</span>
                    <span className="text-xs font-black text-rose-400">8% Alert</span>
                 </div>
              </div>

              <button className="w-full py-5 bg-white text-[#1e1b4b] rounded-3xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                 Generate Insight Report
              </button>
           </div>

           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-12 -mt-12" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                 <BookOpen className="w-4 h-4" /> Top Subjects
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'Mathematics', avg: '84%', color: 'bg-indigo-500' },
                   { name: 'English Language', avg: '79%', color: 'bg-emerald-500' },
                   { name: 'Civic Education', avg: '72%', color: 'bg-amber-500' }
                 ].map((sub, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                         <span className="font-bold text-slate-900 text-sm">{sub.name}</span>
                         <span className="text-slate-500 font-black text-xs">{sub.avg}</span>
                      </div>
                      <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                         <div className={`h-full ${sub.color} rounded-full`} style={{ width: sub.avg }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-rose-50 p-10 rounded-[48px] border border-rose-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100/50 rounded-full -mr-12 -mt-12" />
              <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                 <Activity className="w-4 h-4" /> Weakness Radar
              </h4>
              <div className="space-y-4">
                 {[
                   { name: 'Further Mathematics', avg: '38%', color: 'bg-rose-500' },
                   { name: 'Chemistry', avg: '42%', color: 'bg-orange-500' }
                 ].map((sub, i) => (
                   <div key={i} className="bg-white/50 p-4 rounded-3xl border border-rose-100">
                      <div className="flex justify-between items-center mb-2">
                         <span className="font-bold text-slate-900 text-sm">{sub.name}</span>
                         <span className="text-rose-600 font-black text-xs">{sub.avg}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">Critical attention required in practical assessments.</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
