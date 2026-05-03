import React, { useState, useEffect } from 'react';
import { doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useSchool } from '../../hooks/useSchool';
import { ReportCardTheme } from '../../types';
import { Palette, Check, Layout, Sparkles, Trophy, Hash, Ticket, Loader2, UserPlus, Users, ArrowUpRight, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function SchoolAdminDashboard() {
  const { school, refreshSchool } = useSchool();
  const [pins, setPins] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!school?.id) return;
    
    const unsubPins = onSnapshot(
      query(collection(db, 'result_pins'), where('schoolId', '==', school.id)),
      (snapshot) => {
        setPins(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    const unsubAdmissions = onSnapshot(
      query(collection(db, 'admissions'), where('schoolId', '==', school.id)),
      (snapshot) => {
        setAdmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }
    );

    return () => {
      unsubPins();
      unsubAdmissions();
    };
  }, [school?.id]);

  const themes: { id: ReportCardTheme, name: string, icon: any, desc: string, color: string }[] = [
    { 
      id: 'modern', 
      name: 'Modern Minimal', 
      icon: Sparkles, 
      desc: 'Clean, airy, and professional. Perfect for modern campuses.',
      color: 'bg-indigo-600'
    },
    { 
      id: 'elite', 
      name: 'Academic Elite', 
      icon: Trophy, 
      desc: 'Traditional grid layout with prestigious serif typography.',
      color: 'bg-gray-900'
    },
    { 
      id: 'dynamic', 
      name: 'Dynamic Data', 
      icon: Layout, 
      desc: 'Visual-heavy with progress bars and technical indicators.',
      color: 'bg-[#0f172a]'
    }
  ];

  const handleAcceptApplicant = async (app: any) => {
    if (!school) return;
    try {
      await updateDoc(doc(db, 'admissions', app.id), { status: 'accepted' });
      await updateDoc(doc(db, 'schools', school.id), {
        studentsCount: (school as any).studentsCount + 1
      });
      alert(`${app.studentName} has been admitted to the school fleet!`);
    } catch (err) {
      alert('Acceptance failed');
    }
  };

  const handleRejectApplicant = async (id: string) => {
    if (!confirm('Are you sure you want to reject this application?')) return;
    try {
      await updateDoc(doc(db, 'admissions', id), { status: 'rejected' });
    } catch (err) {
      alert('Rejection failed');
    }
  };

  const handleScheduleExam = async (id: string, date: string) => {
    try {
      await updateDoc(doc(db, 'admissions', id), { 
        examDate: date,
        status: 'exam-scheduled'
      });
      alert('Screening Date Locked Successfully!');
    } catch (err) {
      alert('Scheduling failed');
    }
  };

  const updateTheme = async (theme: ReportCardTheme) => {
    if (!school) return;
    try {
      await updateDoc(doc(db, 'schools', school.id), {
        'settings.reportCardTheme': theme
      });
      await refreshSchool();
    } catch (err) {
      console.error('Error updating theme:', err);
    }
  };

  return (
    <div className="space-y-10 pb-24 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[48px] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">School Command Center</h1>
          <p className="text-slate-500 font-bold">Manage admissions, branding, and security protocols.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> {admissions.filter(a => a.status === 'pending').length} New Applications
           </div>
           <div className="bg-indigo-50 text-indigo-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Premium Tier Active
           </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
                      <UserPlus className="w-6 h-6" />
                   </div>
                   <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Admissions Desk</h2>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prospect Screening Matrix</div>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                         <th className="p-10">Applicant Identity</th>
                         <th className="p-10 text-center">Exam Score</th>
                         <th className="p-10 text-center">Screening Status</th>
                         <th className="p-10 text-right">Master Command</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {admissions.length === 0 ? (
                        <tr><td colSpan={4} className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No prospective student applications discovered.</td></tr>
                      ) : (
                        admissions.map(app => (
                          <tr key={app.id} className="hover:bg-slate-50 transition-all group">
                             <td className="p-10">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black">
                                      {app.studentName[0]}
                                   </div>
                                   <div>
                                      <p className="font-black text-slate-900 text-sm">{app.studentName}</p>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{app.targetClass} • {app.parentPhone}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="p-10 text-center">
                                {app.examStatus === 'completed' ? (
                                   <div className="flex flex-col items-center">
                                      <span className={`text-lg font-black ${app.examScore >= 50 ? 'text-emerald-600' : 'text-rose-600'}`}>{app.examScore}%</span>
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">CBT COMPLETED</span>
                                   </div>
                                ) : (
                                   <div className="flex flex-col items-center gap-2">
                                      <input 
                                        type="date" 
                                        value={app.examDate || ''}
                                        onChange={(e) => handleScheduleExam(app.id, e.target.value)}
                                        className="bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase py-2 px-3 focus:ring-2 focus:ring-indigo-600"
                                      />
                                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                                        <Calendar className="w-2.5 h-2.5" /> Set Date
                                      </span>
                                   </div>
                                )}
                             </td>
                             <td className="p-10 text-center">
                                <span className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${
                                   app.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 
                                   app.status === 'rejected' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                   {app.status}
                                </span>
                             </td>
                             <td className="p-10 text-right">
                                {app.status === 'pending' || app.status === 'interview' || app.status === 'exam-scheduled' ? (
                                   <div className="flex justify-end gap-2">
                                      <button onClick={() => handleAcceptApplicant(app)} className="p-3 bg-emerald-100 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                                         <CheckCircle2 className="w-5 h-5" />
                                      </button>
                                      <button onClick={() => handleRejectApplicant(app.id)} className="p-3 bg-rose-100 rounded-xl hover:bg-rose-600 hover:text-white transition-all">
                                         <XCircle className="w-5 h-5" />
                                      </button>
                                   </div>
                                ) : (
                                   <ArrowUpRight className="w-5 h-5 text-slate-200 ml-auto" />
                                )}
                             </td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
             </div>
          </section>

          <section className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-amber-50 p-3 rounded-2xl">
                <Palette className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic Aesthetics</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateTheme(t.id)}
                  className={`relative group p-8 rounded-[32px] border-2 transition-all text-left flex flex-col h-full ${
                    school?.settings?.reportCardTheme === t.id 
                      ? 'border-indigo-600 bg-indigo-50/20' 
                      : 'border-slate-50 hover:border-indigo-200 bg-slate-50/50'
                  }`}
                >
                  {school?.settings?.reportCardTheme === t.id && (
                    <div className="absolute top-4 right-4 bg-indigo-600 rounded-full p-1.5 shadow-lg shadow-indigo-200">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className={`w-14 h-14 ${t.color} rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl group-hover:scale-110 transition-transform`}>
                    <t.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2 uppercase text-sm tracking-tight">{t.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold leading-relaxed flex-1">{t.desc}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                      <Hash className="w-6 h-6" />
                   </div>
                   <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">PIN Usage Matrix</h2>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Result Access Feed</div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                         <th className="p-10">Access PIN</th>
                         <th className="p-10 text-center">Session/Term</th>
                         <th className="p-10 text-center">Usage Progress</th>
                         <th className="p-10 text-right">Security Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {pins.length === 0 ? (
                        <tr><td colSpan={4} className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No security pins found.</td></tr>
                      ) : (
                        pins.map(pin => (
                          <tr key={pin.id} className="hover:bg-slate-50 transition-all group">
                             <td className="p-10">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                      <Ticket className="w-5 h-5" />
                                   </div>
                                   <div>
                                      <p className="font-black text-slate-900 text-sm tracking-[0.2em]">{pin.pin}</p>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pin.serialNumber}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="p-10 text-center">
                                <p className="text-xs font-black text-slate-900">{pin.termId}</p>
                                <p className="text-[10px] font-bold text-slate-400">{pin.sessionId}</p>
                             </td>
                             <td className="p-10 text-center">
                                <div className="space-y-2 w-32 mx-auto">
                                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                      <div className={`h-full ${pin.usageCount >= pin.maxUsage ? 'bg-rose-500' : 'bg-indigo-500'} transition-all`} style={{ width: `${(pin.usageCount / pin.maxUsage) * 100}%` }} />
                                   </div>
                                </div>
                             </td>
                             <td className="p-10 text-right">
                                <span className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${pin.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                   {pin.status}
                                </span>
                             </td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
             </div>
          </section>
        </div>

        <aside className="space-y-8">
           <div className="bg-indigo-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <Sparkles className="w-12 h-12 text-indigo-400 mb-8 bg-white/10 p-3 rounded-2xl" />
              <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase leading-tight">Master Branding Engine</h3>
              <p className="text-indigo-200/80 text-sm font-bold leading-relaxed mb-8">
                Your selected theme instantly updates the Report Cards and Transcripts generated for every student.
              </p>
           </div>
           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Result Configuration</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Show Class Position', key: 'usePositions' },
                   { label: 'Show Academic Average', key: 'showAverage' }
                 ].map((toggle, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{toggle.label}</span>
                      <button 
                        onClick={async () => {
                          if (!school) return;
                          await updateDoc(doc(db, 'schools', school.id), {
                            [`settings.${toggle.key}`]: !(school.settings as any)[toggle.key]
                          });
                          refreshSchool();
                        }}
                        className={`w-12 h-6 rounded-full transition-all relative ${school?.settings?.[toggle.key as keyof typeof school.settings] ? 'bg-emerald-500' : 'bg-slate-200'}`}
                      >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${school?.settings?.[toggle.key as keyof typeof school.settings] ? 'left-7' : 'left-1'}`} />
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
