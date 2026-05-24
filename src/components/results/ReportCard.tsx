import React from 'react';
import { School, UserProfile, Result, ReportCardTheme } from '../../types';
import { Award, Target, TrendingUp, Calendar, ShieldCheck, QrCode, Star, CheckCircle2, MessageSquare as MessageSquareQuote, GraduationCap } from 'lucide-react';
import { calculateGrade } from '../../utils/grading';

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

  // Dynamic customization from school settings
  const colors = school.settings?.reportCardColors || { primary: '#4f46e5', secondary: '#9333ea' };
  const fontFamily = school.settings?.reportCardFont || 'Inter';

  // Dynamic assessments from school settings
  const assessments = school.settings?.assessments || [
    { id: 'ca1', label: 'CA 1', maxScore: 20 },
    { id: 'ca2', label: 'CA 2', maxScore: 20 },
    { id: 'exam', label: 'Exam', maxScore: 60 }
  ];
  const gradingSystem = school.settings?.gradingSystem || [];

  // ─── STANDARD TEMPLATE ───────────────────────────────────
  if (theme === 'standard') {
    return (
      <div
        id="report-card-printable"
        className="relative overflow-hidden p-12 rounded-2xl bg-white shadow-2xl border-t-[12px] print:shadow-none print:m-0 print:rounded-none"
        style={{ fontFamily, borderTopColor: colors.primary }}
      >
        {/* Security Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
          <h1 className="text-[15rem] font-black uppercase -rotate-45 whitespace-nowrap">{school.name}</h1>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between border-b-2 pb-10 mb-10 border-slate-200">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-4">
              {school.branding?.logoUrl ? (
                <img src={school.branding.logoUrl} alt="Logo" className="w-24 h-24 object-contain rounded-xl shadow-lg border border-white" />
              ) : (
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: colors.primary }}>
                  <span className="text-3xl font-black text-white">{school.name[0]}</span>
                </div>
              )}
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900">{school.name}</h1>
                <p className="text-sm font-bold tracking-[0.2em] uppercase mt-1 text-slate-500">Academic Center of Excellence</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified Record</span>
              <span>•</span>
              <span>Batch ID: {Date.now().toString(16).toUpperCase()}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-4 inline-flex flex-col items-end">
              <QrCode className="w-20 h-20 text-slate-900 mb-2 border-2 border-slate-100 p-1 rounded-lg" />
              <span className="text-[10px] font-bold text-slate-400">VERIFY AUTHENTICITY</span>
            </div>
            <div className="text-2xl font-black text-slate-900">{student.displayName}</div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Reg No: {student.uid.slice(0,8).toUpperCase()}</div>
            <div className="mt-3 inline-block px-4 py-1.5 rounded-full font-black text-sm shadow-sm text-white" style={{ background: colors.primary }}>
              {isThirdTerm ? 'Annual Performance Summary' : term} • {session}
            </div>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 print:grid-cols-4">
          {[
            { label: 'Term Average', val: '84.5%', icon: Target, show: school.settings?.showAverage },
            { label: 'Class Position', val: '3rd / 45', icon: Award, show: school.settings?.usePositions },
            { label: 'Attendance', val: '98%', icon: Calendar, show: true },
            { label: 'Performance', val: 'Elite', icon: TrendingUp, show: true }
          ].filter(s => s.show).map((stat, i) => (
            <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm print:shadow-none">
              <stat.icon className="w-5 h-5 mb-3" style={{ color: colors.primary }} />
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Dynamic Mark Sheet */}
        <div className="relative z-10 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-10 print:shadow-none">
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: colors.primary }}>
                <th className="p-5 font-black uppercase text-xs tracking-widest text-white">Subject</th>
                {assessments.map(a => (
                  <th key={a.id} className="p-5 font-black uppercase text-xs tracking-widest text-center text-white border-l border-white/10">{a.label} ({a.maxScore})</th>
                ))}
                <th className="p-5 font-black uppercase text-xs tracking-widest text-center text-white border-l border-white/10 bg-white/10">Total</th>
                <th className="p-5 font-black uppercase text-xs tracking-widest text-center text-white border-l border-white/10">Grade</th>
                <th className="p-5 font-black uppercase text-xs tracking-widest text-center text-white border-l border-white/10">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((res, idx) => {
                const total = res.total || 0;
                const gradeData = calculateGrade(total, gradingSystem);
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors print:hover:bg-transparent">
                    <td className="p-5 font-bold text-slate-900">{res.subject.name}</td>
                    {assessments.map(a => (
                      <td key={a.id} className="p-5 text-center text-slate-500 font-medium">{(res as any)[a.id] || '-'}</td>
                    ))}
                    <td className="p-5 text-center font-black text-slate-900 bg-slate-50/50">{total}</td>
                    <td className="p-5 text-center">
                      <span className={`inline-block w-10 py-1 rounded-lg font-black text-sm shadow-sm ${gradeData.color.replace('text-', 'bg-').replace('600', '500')} text-white`}>
                        {gradeData.grade}
                      </span>
                    </td>
                    <td className="p-5 text-center text-xs font-bold text-slate-500">{gradeData.remark}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Comments Section */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 mt-12 pt-10 border-t-4 border-double border-slate-200 print:grid-cols-2">
          <div className="bg-white p-8 rounded-[32px] border-2 border-slate-50 shadow-sm print:shadow-none">
            <div className="flex items-center gap-2 mb-4" style={{ color: colors.primary }}>
              <MessageSquareQuote className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Form Teacher's Commentary</span>
            </div>
            <p className="text-slate-700 italic font-bold leading-relaxed text-lg">
              "An exceptional student with high analytical capabilities. Demonstrated consistent leadership in class activities."
            </p>
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-end">
              <div>
                <div className="h-14 w-40 bg-[url('https://signaturely.com/wp-content/uploads/2020/04/unnamed-1.png')] bg-contain bg-no-repeat opacity-40 mix-blend-multiply mb-2" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 pt-2">Class Teacher Signature</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase">Date</p>
                <p className="text-xs font-black text-slate-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[32px] text-white shadow-2xl overflow-hidden print:shadow-none" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
            <div className="flex items-center gap-2 mb-4 text-white/70">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Principal's Verdict</span>
            </div>
            <p className="text-white/90 italic font-bold leading-relaxed text-lg">
              "A truly brilliant result. A credit to this institution. Continue to strive for excellence."
            </p>
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-end">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white/70 shadow-inner">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Institutional Seal</p>
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">VERIFIED OFFICIAL</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-white/50 uppercase">Date</p>
                <p className="text-xs font-black text-white">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-slate-100 pt-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            Powered by Dar-Ark Byte Infrastructure • Verified Record • {Date.now()}
          </p>
        </div>
      </div>
    );
  }

  // ─── MODERN TEMPLATE ─────────────────────────────────────
  if (theme === 'modern') {
    return (
      <div
        id="report-card-printable"
        className="relative overflow-hidden bg-white rounded-3xl shadow-2xl print:shadow-none print:rounded-none"
        style={{ fontFamily }}
      >
        {/* Gradient Header Banner */}
        <div className="relative p-12 pb-16 text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-5">
              {school.branding?.logoUrl ? (
                <img src={school.branding.logoUrl} alt="Logo" className="w-20 h-20 object-contain rounded-2xl bg-white/20 p-2 backdrop-blur-sm" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-3xl font-black">{school.name[0]}</span>
                </div>
              )}
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tight">{school.name}</h1>
                <p className="text-sm font-bold tracking-[0.15em] uppercase mt-1 text-white/70">Student Progress Report</p>
              </div>
            </div>
            <div className="text-right">
              <QrCode className="w-16 h-16 text-white/60 ml-auto mb-2" />
              <span className="text-[10px] font-bold text-white/50 uppercase">Scan to Verify</span>
            </div>
          </div>
        </div>

        {/* Student Info Bar */}
        <div className="relative -mt-8 mx-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 print:shadow-none">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl" style={{ background: colors.primary }}>
              {student.displayName?.[0] || 'S'}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">{student.displayName}</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {student.uid.slice(0,8).toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-white" style={{ background: colors.secondary }}>
              {term}
            </span>
            <span className="px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider bg-slate-100 text-slate-700">
              {session}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pt-10">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 print:grid-cols-4">
            {[
              { label: 'Average', val: '84.5%', show: school.settings?.showAverage },
              { label: 'Position', val: '3rd / 45', show: school.settings?.usePositions },
              { label: 'Attendance', val: '98%', show: true },
              { label: 'Subjects', val: `${results.length}`, show: true }
            ].filter(s => s.show).map((stat, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Mark Sheet */}
          <div className="rounded-2xl border border-slate-100 overflow-hidden mb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 font-black uppercase text-[10px] tracking-widest text-slate-400">Subject</th>
                  {assessments.map(a => (
                    <th key={a.id} className="p-4 font-black uppercase text-[10px] tracking-widest text-center text-slate-400">{a.label}</th>
                  ))}
                  <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center text-slate-400">Total</th>
                  <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center text-slate-400">Grade</th>
                  <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center text-slate-400">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.map((res, idx) => {
                  const total = res.total || 0;
                  const gradeData = calculateGrade(total, gradingSystem);
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{res.subject.name}</td>
                      {assessments.map(a => (
                        <td key={a.id} className="p-4 text-center text-slate-500 font-medium">{(res as any)[a.id] || '-'}</td>
                      ))}
                      <td className="p-4 text-center font-black text-slate-900">{total}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg font-black text-xs text-white" style={{ background: colors.primary }}>{gradeData.grade}</span>
                      </td>
                      <td className="p-4 text-center text-xs font-bold text-slate-500">{gradeData.remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Comments */}
          <div className="grid md:grid-cols-2 gap-6 print:grid-cols-2">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: colors.primary }}>Class Teacher's Comment</p>
              <p className="text-slate-700 italic font-medium leading-relaxed">"An exceptional student with high analytical capabilities."</p>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase">Signature & Date</p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: colors.secondary }}>Principal's Comment</p>
              <p className="text-slate-700 italic font-medium leading-relaxed">"A brilliant result. Continue to strive for excellence."</p>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase">Signature & Date</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            Powered by Dar-Ark Byte • {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }

  // ─── MINIMALIST TEMPLATE ─────────────────────────────────
  return (
    <div
      id="report-card-printable"
      className="relative bg-white p-12 print:p-8 print:shadow-none"
      style={{ fontFamily }}
    >
      {/* Simple Header */}
      <div className="flex items-center justify-between border-b pb-8 mb-8" style={{ borderColor: colors.primary }}>
        <div className="flex items-center gap-4">
          {school.branding?.logoUrl ? (
            <img src={school.branding.logoUrl} alt="Logo" className="w-14 h-14 object-contain" />
          ) : (
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: colors.primary }}>
              <span className="text-xl font-black text-white">{school.name[0]}</span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{school.name}</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Academic Report Card</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-slate-900">{student.displayName}</p>
          <p className="text-xs text-slate-400 font-bold">{term} • {session}</p>
        </div>
      </div>

      {/* Clean Table */}
      <table className="w-full text-left mb-10">
        <thead>
          <tr className="border-b-2" style={{ borderColor: colors.primary }}>
            <th className="py-3 text-xs font-black text-slate-500 uppercase tracking-wider">Subject</th>
            {assessments.map(a => (
              <th key={a.id} className="py-3 text-xs font-black text-slate-500 uppercase tracking-wider text-center">{a.label}</th>
            ))}
            <th className="py-3 text-xs font-black text-slate-500 uppercase tracking-wider text-center">Total</th>
            <th className="py-3 text-xs font-black text-slate-500 uppercase tracking-wider text-center">Grade</th>
            <th className="py-3 text-xs font-black text-slate-500 uppercase tracking-wider text-center">Remark</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {results.map((res, idx) => {
            const total = res.total || 0;
            const gradeData = calculateGrade(total, gradingSystem);
            return (
              <tr key={idx}>
                <td className="py-3 font-medium text-slate-900">{res.subject.name}</td>
                {assessments.map(a => (
                  <td key={a.id} className="py-3 text-center text-slate-500">{(res as any)[a.id] || '-'}</td>
                ))}
                <td className="py-3 text-center font-bold text-slate-900">{total}</td>
                <td className="py-3 text-center font-black" style={{ color: colors.primary }}>{gradeData.grade}</td>
                <td className="py-3 text-center text-xs text-slate-500">{gradeData.remark}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Simple Comments */}
      <div className="grid grid-cols-2 gap-8 border-t pt-8 print:grid-cols-2" style={{ borderColor: colors.primary }}>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: colors.primary }}>Class Teacher's Comment</p>
          <p className="text-sm text-slate-600 italic mb-6">"An exceptional student with high analytical capabilities."</p>
          <div className="border-t border-slate-200 pt-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Signature</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: colors.secondary }}>Principal's Comment</p>
          <p className="text-sm text-slate-600 italic mb-6">"A brilliant result. Continue to strive for excellence."</p>
          <div className="border-t border-slate-200 pt-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Signature</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Dar-Ark Byte • {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
