import React from 'react';
import { School, UserProfile, Result, ReportCardTheme } from '../../types';
import { Award, Target, TrendingUp, Calendar, Hash, BarChart3, Star } from 'lucide-react';

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

  // Dummy Creche data if using observational theme
  const crecheMetrics = [
    { name: 'Identifies Colors', eval: 'Consistently' },
    { name: 'Plays well with others', eval: 'Sometimes' },
    { name: 'Follows basic instructions', eval: 'Consistently' },
    { name: 'Shows curiosity', eval: 'Consistently' },
    { name: 'Expresses needs clearly', eval: 'Rarely' },
  ];

  // Render logic based on Theme
  if (isCreche) {
    return (
      <div className="bg-amber-50 p-8 rounded-3xl border-4 border-amber-200 print:bg-white print:border-2">
        <div className="text-center mb-8 border-b-2 border-amber-200 pb-6">
          <Star className="w-12 h-12 text-amber-500 mx-auto mb-2" />
          <h1 className="text-3xl font-black text-amber-900">{school.name}</h1>
          <h2 className="text-xl font-bold text-amber-700">Early Years Observation Report</h2>
          <div className="mt-4 flex justify-center gap-4 text-amber-800 font-bold">
            <span>Name: {student.displayName}</span>
            <span>|</span>
            <span>Term: {term}</span>
          </div>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {crecheMetrics.map((m, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <span className="font-bold text-amber-900 text-lg">{m.name}</span>
              <span className={`px-4 py-2 rounded-full font-black text-sm ${
                m.eval === 'Consistently' ? 'bg-emerald-100 text-emerald-700' :
                m.eval === 'Sometimes' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
              }`}>{m.eval}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-2xl border border-amber-200">
          <p className="font-bold text-amber-900 mb-2">Teacher's Remark:</p>
          <p className="text-amber-800 italic">"An absolute joy to have in class. Very inquisitive and learning fast!"</p>
        </div>
      </div>
    );
  }

  // STANDARD NUMERICAL REPORT CARD (Handles Nigerian, International, Elite, Minimalist)
  const isNigerian = theme === 'nigerian-standard';
  const isElite = theme === 'elite-private';
  const isMinimal = theme === 'minimalist';

  return (
    <div className={`p-10 rounded-xl bg-white shadow-xl ${
      isNigerian ? 'border-4 border-green-700 font-serif' : 
      isElite ? 'border border-gray-200 bg-gradient-to-b from-slate-50 to-white' : 
      isMinimal ? 'border-none shadow-none' : 'border-t-8 border-indigo-600'
    } print:shadow-none print:m-0`}>
      
      {/* Header */}
      <div className={`flex items-center justify-between border-b-2 pb-6 mb-8 ${isNigerian ? 'border-green-800' : 'border-gray-200'}`}>
        <div className="flex-1">
          <h1 className={`text-4xl font-black uppercase ${isNigerian ? 'text-green-800 tracking-widest' : 'text-gray-900 tracking-tight'}`}>
            {school.name}
          </h1>
          <p className={`mt-2 ${isNigerian ? 'text-green-700 font-bold' : 'text-gray-500'}`}>Official Academic Transcript • {session} Session</p>
        </div>
        <div className="text-right">
          <div className={`text-xl font-black ${isElite ? 'text-indigo-900' : 'text-gray-900'}`}>{student.displayName}</div>
          <div className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-1">Student ID: {student.uid.slice(0,8)}</div>
          <div className="mt-2 inline-block bg-gray-100 px-3 py-1 rounded-md font-bold text-gray-700">{term}</div>
        </div>
      </div>

      {/* Analytics Summary (Elite / International) */}
      {!isMinimal && !isNigerian && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Target className="w-5 h-5 text-indigo-500 mb-2" />
            <div className="text-xs font-bold text-slate-500 uppercase">Term Average</div>
            <div className="text-2xl font-black text-slate-900">84.5%</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Award className="w-5 h-5 text-emerald-500 mb-2" />
            <div className="text-xs font-bold text-slate-500 uppercase">Class Position</div>
            <div className="text-2xl font-black text-slate-900">3rd <span className="text-sm text-slate-500">/ 45</span></div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <TrendingUp className="w-5 h-5 text-blue-500 mb-2" />
            <div className="text-xs font-bold text-slate-500 uppercase">Historical Trend</div>
            <div className="text-sm font-black text-emerald-600 mt-1">+2.4% vs Last Term</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Calendar className="w-5 h-5 text-amber-500 mb-2" />
            <div className="text-xs font-bold text-slate-500 uppercase">Attendance</div>
            <div className="text-2xl font-black text-slate-900">98%</div>
          </div>
        </div>
      )}

      {/* Nigerian Standard Layout Specifics */}
      {isNigerian && (
        <div className="flex justify-between mb-6 text-sm font-bold text-green-900 border border-green-200 p-4 bg-green-50">
          <div>Next Term Begins: 12th Jan, 2027</div>
          <div>Total Days Present: 65 / 68</div>
          <div>Class Average: 62.4%</div>
        </div>
      )}

      {/* The Mark Sheet */}
      <table className="w-full text-left mb-8">
        <thead>
          <tr className={`${isNigerian ? 'bg-green-800 text-white' : isElite ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-700'}`}>
            <th className="p-3 font-bold">Subject</th>
            <th className="p-3 font-bold text-center">CA</th>
            <th className="p-3 font-bold text-center">Exam</th>
            <th className="p-3 font-bold text-center">Term Total</th>
            {isThirdTerm && (
              <>
                <th className="p-3 font-bold text-center bg-black/20">1st Term</th>
                <th className="p-3 font-bold text-center bg-black/20">2nd Term</th>
                <th className="p-3 font-bold text-center bg-black/40">Annual Avg</th>
              </>
            )}
            <th className="p-3 font-bold text-center">Grade</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {results.map((res, idx) => (
            <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="p-3 font-bold text-gray-900">{res.subject.name}</td>
              <td className="p-3 text-center text-gray-600">{res.ca1 + res.ca2}</td>
              <td className="p-3 text-center text-gray-600">{res.exam}</td>
              <td className="p-3 text-center font-black text-gray-900">{res.total}</td>
              {isThirdTerm && (
                <>
                  <td className="p-3 text-center text-gray-500">75</td>
                  <td className="p-3 text-center text-gray-500">80</td>
                  <td className="p-3 text-center font-black text-indigo-700">{(res.total + 75 + 80) / 3 | 0}</td>
                </>
              )}
              <td className="p-3 text-center font-black">{res.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nigerian Psychomotor Domain */}
      {isNigerian && (
        <div className="grid grid-cols-2 gap-8 mb-8">
          <table className="w-full border border-green-200 text-sm">
            <thead className="bg-green-100 text-green-900">
              <tr><th className="p-2 text-left">Affective Domain</th><th className="p-2">Rating (1-5)</th></tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border-b">Punctuality</td><td className="p-2 border-b text-center font-bold">5</td></tr>
              <tr><td className="p-2 border-b">Neatness</td><td className="p-2 border-b text-center font-bold">4</td></tr>
              <tr><td className="p-2">Politeness</td><td className="p-2 text-center font-bold">5</td></tr>
            </tbody>
          </table>
          <table className="w-full border border-green-200 text-sm">
            <thead className="bg-green-100 text-green-900">
              <tr><th className="p-2 text-left">Psychomotor Skills</th><th className="p-2">Rating (1-5)</th></tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border-b">Handwriting</td><td className="p-2 border-b text-center font-bold">4</td></tr>
              <tr><td className="p-2 border-b">Sports</td><td className="p-2 border-b text-center font-bold">5</td></tr>
              <tr><td className="p-2">Public Speaking</td><td className="p-2 text-center font-bold">4</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Signatures & Remarks */}
      <div className={`mt-8 grid md:grid-cols-2 gap-8 ${isMinimal ? 'border-t border-gray-200 pt-8' : 'bg-gray-50 p-6 rounded-xl'}`}>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Form Master's Report</p>
          <p className="font-medium text-gray-900 italic">"An outstanding term. Shows extreme dedication to sciences."</p>
          <div className="mt-6 border-t border-gray-300 w-48 pt-2">
            <span className="text-xs font-bold text-gray-500">Sign & Date</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Principal's Remark</p>
          <p className="font-medium text-gray-900 italic">"Excellent result. Keep the flag flying!"</p>
          <div className="mt-6 border-t border-gray-300 w-48 pt-2">
            <span className="text-xs font-bold text-gray-500">Principal's Signature</span>
          </div>
        </div>
      </div>

    </div>
  );
}
