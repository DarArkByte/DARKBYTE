import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { FileBarChart, Search, Download, Filter, FileText, ChevronRight, PieChart, Users, Wallet, Target } from 'lucide-react';

export default function ReportsEngine() {
  const { school } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'admin' | 'finance'>('all');

  const categories = [
    { id: 'all', label: 'All Reports', icon: FileBarChart },
    { id: 'academic', label: 'Academic & Performance', icon: PieChart },
    { id: 'admin', label: 'Administrative & Staff', icon: Users },
    { id: 'finance', label: 'Finance & Accounts', icon: Wallet },
  ];

  const reports = [
    { id: 'r1', title: 'Terminal Broadsheet', category: 'academic', desc: 'Comprehensive class-wide result matrix for final term grading.', format: 'PDF/Excel' },
    { id: 'r2', title: 'Student Failure List', category: 'academic', desc: 'Students with averages below the passing threshold.', format: 'PDF' },
    { id: 'r3', title: 'Teacher Performance Index', category: 'academic', desc: 'Average class scores mapped to subject teachers.', format: 'PDF/Excel' },
    { id: 'r4', title: 'Overall Student Demographics', category: 'admin', desc: 'Breakdown of students by age, gender, and class.', format: 'PDF/CSV' },
    { id: 'r5', title: 'Staff Nominal Roll', category: 'admin', desc: 'Complete list of all active staff and roles.', format: 'PDF/Excel' },
    { id: 'r6', title: 'Daily Attendance Summary', category: 'admin', desc: 'Aggregated attendance percentages across all classes.', format: 'PDF' },
    { id: 'r7', title: 'Fee Debtors List', category: 'finance', desc: 'List of students with outstanding fee balances.', format: 'PDF/Excel' },
    { id: 'r8', title: 'Expected Revenue vs Actual', category: 'finance', desc: 'Projected term revenue compared to collected fees.', format: 'PDF' },
  ];

  const filteredReports = reports.filter(r => 
    (activeCategory === 'all' || r.category === activeCategory) &&
    (r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-12">
      <header className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1e1b4b] to-indigo-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d946ef]/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-4 border border-white/10">
              <Target className="w-4 h-4 text-[#d946ef]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Analytics Core</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Reports Engine</h1>
            <p className="text-indigo-200 font-medium">Generate, export, and analyze 40+ dynamic institutional reports.</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0 space-y-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                activeCategory === cat.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3 text-sm">
                <cat.icon className="w-5 h-5" />
                {cat.label}
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 min-h-[500px]">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search report templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all border border-slate-100">
              <Filter className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReports.map(report => (
              <div key={report.id} className="p-6 rounded-3xl border border-slate-100 hover:border-indigo-200 bg-white hover:bg-indigo-50/30 transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                      {report.format}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-lg mb-2">{report.title}</h3>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed mb-6">
                    {report.desc}
                  </p>
                </div>
                
                <button className="flex items-center justify-between w-full p-4 bg-slate-50 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-700 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
                  Generate Report
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {filteredReports.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-20">
                <FileBarChart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-900">No Templates Found</h3>
                <p className="text-slate-500 font-bold mt-2">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
