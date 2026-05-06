import React, { useState } from 'react';
import { FileText, Download, Printer, Save, ArrowLeft, Building, CreditCard, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProposalEditor() {
  const [data, setData] = useState({
    schoolName: '',
    contactPerson: '',
    date: new Date().toLocaleDateString(),
    setupFee: '0',
    annualLicense: '0',
    perStudentFee: '1,200',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-24 font-sans print:p-0 print:m-0 print:bg-white">
      <style>
        {`
          @media print {
            body { background: white !important; }
            .print\\:hidden { display: none !important; }
            .bg-white { box-shadow: none !important; border: none !important; }
            .shadow-2xl { box-shadow: none !important; }
            .rounded-\\[48px\\], .rounded-\\[40px\\] { border-radius: 0 !important; }
            .lg\\:col-span-2 { width: 100% !important; margin: 0 !important; padding: 0 !important; }
            header { border-bottom: 2px solid #1e1b4b !important; }
            .bg-slate-50 { background: #f8fafc !important; border: 1px solid #e2e8f0 !important; }
            table { border: 1px solid #1e1b4b !important; }
            th { background: #1e1b4b !important; color: white !important; -webkit-print-color-adjust: exact; }
          }
        `}
      </style>
      {/* Header - Hidden on Print */}
      <header className="flex items-center justify-between bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/super-admin" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Proposal Architect</h1>
            <p className="text-slate-500 font-bold text-sm">Customize and export your client proposals.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={handlePrint} className="flex items-center gap-2 bg-[#1e1b4b] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20">
            <Printer className="w-4 h-4" /> Export as PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Controls - Hidden on Print */}
        <div className="lg:col-span-1 space-y-6 print:hidden">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Target Institution</label>
                <input 
                  type="text" 
                  value={data.schoolName}
                  onChange={(e) => setData({...data, schoolName: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Contact Person</label>
                <input 
                  type="text" 
                  value={data.contactPerson}
                  onChange={(e) => setData({...data, contactPerson: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Setup Fee (₦)</label>
                  <input 
                    type="text" 
                    value={data.setupFee}
                    onChange={(e) => setData({...data, setupFee: e.target.value})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">License (₦)</label>
                  <input 
                    type="text" 
                    value={data.annualLicense}
                    onChange={(e) => setData({...data, annualLicense: e.target.value})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[40px] text-white">
            <CheckCircle2 className="w-8 h-8 mb-4 text-indigo-300" />
            <h3 className="text-lg font-black mb-2">Live Syncing</h3>
            <p className="text-sm text-indigo-100 font-medium leading-relaxed">Changes are updated in the preview instantly. Use "Ctrl + P" or the Print button to save as PDF.</p>
          </div>
        </div>

        {/* Proposal Preview */}
        <div className="lg:col-span-2 bg-white rounded-[48px] shadow-2xl border border-slate-100 p-16 overflow-hidden relative print:shadow-none print:border-none print:rounded-none print:p-0">
          {/* Watermark/Logo */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-50 rounded-full -mr-40 -mt-40 -z-0 opacity-50" />
          
          <div className="relative z-10 space-y-12">
            <header className="flex justify-between items-start border-b-4 border-[#1e1b4b] pb-10">
              <div>
                <h2 className="text-4xl font-black text-[#1e1b4b] tracking-tighter uppercase">Dar-Ark Byte</h2>
                <p className="text-[#d946ef] font-black text-xs uppercase tracking-[0.3em]">Next-Gen School Intelligence</p>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900">Official Proposal</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.date}</p>
              </div>
            </header>

            <section className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Prepared For:</p>
                <h3 className="text-3xl font-black text-slate-900">
                  {data.schoolName || '_____________________________________'}
                </h3>
                <p className="text-slate-600 font-bold">
                  Attn: {data.contactPerson || '_______________________'}
                </p>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-[32px] space-y-4">
                <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" /> Executive Summary
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  We are pleased to present Dar-Ark Byte, a next-gen School ERP. To support your growth, we offer a <strong>Zero-Upfront Cost</strong> model. We charge no hosting or setup fees; instead, we partner with you on a performance basis: only ₦{data.perStudentFee} per student per term for full access to our ecosystem.
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">Core Deliverables</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: 'Management Suite', desc: 'Full administrative dashboard with multi-role access control.' },
                  { title: 'Smart Finance', desc: 'Automated fee collection, e-wallets, and POS inventory.' },
                  { title: 'Academic Hub', desc: 'CBT exams, automatic result processing, and transcripts.' },
                  { title: 'Security & Gate', desc: 'Visitor tracking and real-time student transport monitoring.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
               <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">Financial Investment</h3>
               <div className="overflow-hidden rounded-[32px] border border-slate-100">
                  <table className="w-full text-left">
                    <thead className="bg-[#1e1b4b] text-white">
                      <tr>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest">Service Item</th>
                        <th className="p-5 text-right text-[10px] font-black uppercase tracking-widest">Investment (₦)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 bg-slate-50/30">
                       <tr>
                         <td className="p-5">
                            <p className="font-black text-slate-900 text-sm">System Deployment & Setup</p>
                            <p className="text-[10px] font-bold text-slate-400">One-time implementation fee</p>
                         </td>
                         <td className="p-5 text-right font-black text-slate-900">₦{data.setupFee}</td>
                       </tr>
                       <tr>
                         <td className="p-5">
                            <p className="font-black text-slate-900 text-sm">Annual Cloud Infrastructure</p>
                            <p className="text-[10px] font-bold text-slate-400">Server maintenance and security updates</p>
                         </td>
                         <td className="p-5 text-right font-black text-slate-900">₦{data.annualLicense}</td>
                       </tr>
                       <tr className="bg-indigo-50/50">
                         <td className="p-5">
                            <p className="font-black text-indigo-900 text-sm">Per-Student Usage</p>
                            <p className="text-[10px] font-bold text-indigo-400">Processing fee per term</p>
                         </td>
                         <td className="p-5 text-right font-black text-indigo-900">₦{data.perStudentFee}</td>
                       </tr>
                    </tbody>
                  </table>
               </div>
            </section>

            <footer className="pt-10 border-t border-slate-100 flex justify-between items-center">
               <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} Dar-Ark Byte Intelligence
               </div>
               <div className="flex gap-4">
                  <div className="h-10 w-10 bg-slate-100 rounded-full" />
                  <div className="h-10 w-10 bg-slate-100 rounded-full" />
               </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
