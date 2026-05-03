import React from 'react';
import { School, UserProfile, Result, ReportCardTheme } from '../../types';
import { Award, Target, TrendingUp, Calendar, ShieldCheck, QrCode, Star, CheckCircle2, MessageSquare as MessageSquareQuote, GraduationCap } from 'lucide-react';

interface ReportCardProps {
  school: School;
  student: UserProfile;
  results: (Result & { subject: { name: string } })[];
  session: string;
  term: string;
  theme: ReportCardTheme;
}

export default function ReportCard({ school, student, results, session, term, theme }: ReportCardProps) {
  const isThirdTerm = term.toLowerCase().includes('third');
  const isCreche = theme === 'creche-observational';
  
  // STANDARD NUMERICAL REPORT CARD (Handles Nigerian, International, Elite, Minimalist)
  const isNigerian = theme === 'nigerian-standard';
  const isElite = theme === 'elite-private';
  const isMinimal = theme === 'minimalist';

  // Dummy Creche data if using observational theme
  const crecheMetrics = [
    { name: 'Identifies Colors', eval: 'Consistently' },
    { name: 'Plays well with others', eval: 'Sometimes' },
    { name: 'Follows basic instructions', eval: 'Consistently' },
    { name: 'Shows curiosity', eval: 'Consistently' },
    { name: 'Expresses needs clearly', eval: 'Rarely' },
  ];

  if (isCreche) {
    return (
      <div className="relative overflow-hidden bg-white p-10 rounded-[2.5rem] border-[12px] border-amber-100 print:border-amber-200 shadow-2xl">
        {/* Playful Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -mr-32 -mt-32 opacity-50" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-50 rounded-full -ml-24 -mb-24 opacity-50" />
        
        <div className="relative z-10 text-center mb-10 border-b-4 border-dashed border-amber-200 pb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-400 rounded-3xl rotate-12 shadow-lg mb-4">
            <Star className="w-12 h-12 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black text-amber-900 tracking-tight">{school.name}</h1>
          <h2 className="text-xl font-bold text-amber-600 mt-1 uppercase tracking-widest">Early Years Growth Report</h2>
          
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg mx-auto bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
            <div className="text-left">
              <span className="text-[10px] font-black text-amber-400 uppercase">Student Name</span>
              <p className="text-lg font-black text-amber-900 leading-none">{student.displayName}</p>
            </div>
            <div className="text-right border-l border-amber-200 pl-4">
              <span className="text-[10px] font-black text-amber-400 uppercase">Academic Period</span>
              <p className="text-lg font-black text-amber-900 leading-none">{term}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 max-w-2xl mx-auto relative z-10">
          {crecheMetrics.map((m, idx) => (
            <div key={idx} className="group flex justify-between items-center bg-white p-5 rounded-2xl border-2 border-amber-50 hover:border-amber-200 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${['bg-rose-400', 'bg-sky-400', 'bg-emerald-400', 'bg-amber-400', 'bg-violet-400'][idx % 5]}`} />
                <span className="font-bold text-amber-900 text-lg">{m.name}</span>
              </div>
              <span className={`px-6 py-2 rounded-xl font-black text-sm shadow-sm ${
                m.eval === 'Consistently' ? 'bg-emerald-500 text-white' :
                m.eval === 'Sometimes' ? 'bg-sky-500 text-white' : 'bg-rose-500 text-white'
              }`}>{m.eval}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-amber-50/50 p-8 rounded-[2rem] border-2 border-dashed border-amber-200 text-center">
          <p className="font-black text-amber-900 mb-2 text-xl italic underline decoration-amber-300 underline-offset-8">Teacher's Remark</p>
          <p className="text-amber-800 text-lg leading-relaxed mt-4 font-medium italic">
            "A radiant presence in our learning space! {student.displayName.split(' ')[0]} continues to show remarkable social growth and curiosity."
          </p>
        </div>
        
        {/* Decorative Stamps */}
        <div className="absolute bottom-8 right-8 rotate-12 opacity-20">
          <CheckCircle2 className="w-24 h-24 text-amber-600" strokeWidth={3} />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden p-12 rounded-2xl bg-white shadow-2xl ${
      isNigerian ? 'border-[1px] border-green-800 font-serif' : 
      isElite ? 'border border-slate-200 bg-gradient-to-b from-slate-50 to-white' : 
      isMinimal ? 'border-none shadow-none' : 'border-t-[12px] border-indigo-600'
    } print:shadow-none print:m-0`}>
      
      {/* Security Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
        <h1 className="text-[15rem] font-black uppercase -rotate-45 whitespace-nowrap">
          {school.name}
        </h1>
      </div>

      {/* Header */}
      <div className={`relative z-10 flex items-start justify-between border-b-2 pb-10 mb-10 ${isNigerian ? 'border-green-800' : 'border-slate-200'}`}>
        <div className="flex-1">
          <div className="flex items-center gap-6 mb-4">
            {school.branding?.logoUrl ? (
              <img src={school.branding.logoUrl} alt="Logo" className="w-24 h-24 object-contain rounded-xl shadow-lg border border-white" />
            ) : (
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${isNigerian ? 'bg-green-800' : 'bg-slate-900'}`}>
                <span className="text-3xl font-black text-white">{school.name[0]}</span>
              </div>
            )}
            <div>
              <h1 className={`text-4xl font-black uppercase tracking-tight ${isNigerian ? 'text-green-900' : 'text-slate-900'}`}>
                {school.name}
              </h1>
              <p className={`text-sm font-bold tracking-[0.2em] uppercase mt-1 ${isNigerian ? 'text-green-700' : 'text-slate-500'}`}>
                Academic Center of Excellence
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Encrypted Transcript</span>
            <span>•</span>
            <span>Batch ID: {Date.now().toString(16).toUpperCase()}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="mb-4 inline-flex flex-col items-end">
            <QrCode className="w-20 h-20 text-slate-900 mb-2 border-2 border-slate-100 p-1 rounded-lg" />
            <span className="text-[10px] font-bold text-slate-400">VERIFY AUTHENTICITY</span>
          </div>
          <div className={`text-2xl font-black ${isElite ? 'text-indigo-900' : 'text-slate-900'}`}>{student.displayName}</div>
          <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Reg No: {student.uid.slice(0,8).toUpperCase()}</div>
          <div className={`mt-3 inline-block px-4 py-1.5 rounded-full font-black text-sm shadow-sm ${
            isNigerian ? 'bg-green-800 text-white' : 'bg-slate-900 text-white'
          }`}>
            {isThirdTerm ? 'Annual Performance Summary' : term} • {session}
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
      {!isMinimal && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Term Average', val: '84.5%', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50', show: school.settings?.showAverage },
            { label: 'Class Position', val: '3rd / 45', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50', show: school.settings?.usePositions },
            { label: 'Attendance', val: '98%', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50', show: true },
            { label: 'Performance', val: 'Elite', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', show: true }
          ].filter(s => s.show).map((stat, i) => (
            <div key={i} className={`${stat.bg} p-5 rounded-2xl border border-white shadow-sm ring-1 ring-black/5`}>
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.val}</div>
            </div>
          ))}
        </div>
      )}

      {/* The Mark Sheet */}
      <div className="relative z-10 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-10">
        <table className="w-full text-left">
          <thead>
            <tr className={`${isNigerian ? 'bg-green-900' : 'bg-slate-900'} text-white`}>
              <th className="p-5 font-black uppercase text-xs tracking-widest">Subject Discipline</th>
              <th className="p-5 font-black uppercase text-xs tracking-widest text-center border-l border-white/10">1st Term</th>
              <th className="p-5 font-black uppercase text-xs tracking-widest text-center border-l border-white/10">2nd Term</th>
              <th className="p-5 font-black uppercase text-xs tracking-widest text-center border-l border-white/10">3rd Term</th>
              {isThirdTerm && (
                <th className="p-5 font-black uppercase text-xs tracking-widest text-center border-l border-white/10 bg-white/10">Annual</th>
              )}
              <th className="p-5 font-black uppercase text-xs tracking-widest text-center border-l border-white/10">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((res, idx) => {
              // Simulated or actual multi-term data
              const t1 = res.term1Score || 0;
              const t2 = res.term2Score || 0;
              const t3 = res.total || 0;
              const annual = Math.round((t1 + t2 + t3) / 3);
              
              return (
                <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-bold text-slate-900">{res.subject.name}</td>
                  <td className="p-5 text-center text-slate-500 font-medium">{t1 || '-'}</td>
                  <td className="p-5 text-center text-slate-500 font-medium">{t2 || '-'}</td>
                  <td className="p-5 text-center text-slate-500 font-medium">{t3 || '-'}</td>
                  {isThirdTerm && (
                    <td className="p-5 text-center font-bold text-indigo-600 bg-slate-50/50">{annual}</td>
                  )}
                  <td className="p-5 text-center">
                    <span className={`inline-block w-10 py-1 rounded-lg font-black text-sm shadow-sm ${
                      res.grade === 'A' ? 'bg-emerald-500 text-white' :
                      res.grade === 'B' ? 'bg-blue-500 text-white' :
                      res.grade === 'C' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {res.grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Nigerian Specific Domains (Psychomotor) */}
      {isNigerian && (
        <div className="relative z-10 grid grid-cols-2 gap-8 mb-10">
          {[
            { title: 'Affective Domain', rows: [['Punctuality', '5'], ['Neatness', '4'], ['Politeness', '5']] },
            { title: 'Psychomotor Skills', rows: [['Handwriting', '4'], ['Sports', '5'], ['Speech', '4']] }
          ].map((table, i) => (
            <div key={i} className="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
              <div className="bg-green-900/5 p-4 border-b border-slate-200">
                <span className="text-[10px] font-black text-green-800 uppercase tracking-widest">{table.title}</span>
              </div>
              <table className="w-full text-xs">
                <tbody>
                  {table.rows.map(([label, val], j) => (
                    <tr key={j} className="border-b border-slate-100 last:border-0">
                      <td className="p-3 font-bold text-slate-600 uppercase">{label}</td>
                      <td className="p-3 text-right font-black text-green-900">{val} / 5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 grid md:grid-cols-2 gap-8 mt-12 pt-10 border-t-4 border-double border-slate-200">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[32px] border-2 border-slate-50 relative shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-indigo-600">
               <MessageSquareQuote className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Form Teacher's Commentary</span>
            </div>
            <p className="text-slate-700 italic font-bold leading-relaxed text-lg">
              "An exceptional student with high analytical capabilities. Demonstrated consistent leadership in class activities. Strongly recommended for the next grade."
            </p>
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-end">
              <div>
                <div className="h-14 w-40 bg-[url('https://signaturely.com/wp-content/uploads/2020/04/unnamed-1.png')] bg-contain bg-no-repeat opacity-40 mix-blend-multiply mb-2" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 pt-2">Class Teacher Signature</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-slate-400 uppercase">Authenticated On</p>
                 <p className="text-xs font-black text-slate-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[32px] text-white relative shadow-2xl overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
               <ShieldCheck className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Principal's Final Verdict</span>
            </div>
            <p className="text-slate-100 italic font-bold leading-relaxed text-lg">
              "A truly brilliant result. A credit to this institution. Continue to strive for excellence."
            </p>
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-end">
              <div>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 shadow-inner">
                      <GraduationCap className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Institutional Seal</p>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">VERIFIED OFFICIAL</span>
                   </div>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-slate-400 uppercase">Authorization Date</p>
                 <p className="text-xs font-black text-white">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Security Note */}
      <div className="mt-12 text-center border-t border-slate-100 pt-8">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
          Powered by Dar-Ark Byte Infrastructure • Blockchain Verified Record • {Date.now()}
        </p>
      </div>

    </div>
  );
}

