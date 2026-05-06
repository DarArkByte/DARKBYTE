import React, { useState } from 'react';
import { FileText, Printer, ArrowLeft, Globe, Smartphone, Cpu, CheckCircle2, BookOpen, Code2, Zap, Rocket, Brain, Award, ShieldAlert, PenLine, Building2, LayoutGrid, Fingerprint, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProposalEditor() {
  const [data, setData] = useState({
    schoolName: '',
    contactPerson: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    phone1: '+234 812 345 6789',
    phone2: '+234 703 123 4567',
    email: 'info@darark.com',
    packageTier: 'premium',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:p-0">
      <style>
        {`
          @media screen {
            .page {
              margin-bottom: 50px !important;
              box-shadow: 0 30px 60px rgba(0,0,0,0.1) !important;
            }
            #proposal-root {
              padding-top: 40px;
              padding-bottom: 100px;
            }
          }

          @media print {
            @page {
              size: A4;
              margin: 0mm;
            }
            
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              visibility: hidden !important;
            }

            body > *:not(#proposal-root), nav, header, aside, .no-print, #topbar, #sidebar { 
              display: none !important; 
            }
            
            #proposal-root, #proposal-root * {
              visibility: visible !important;
            }

            #proposal-root {
              display: block !important;
              position: static !important;
              width: 210mm !important;
              margin: 0 auto !important;
              padding: 0 !important;
              background: white !important;
            }

            .page {
              width: 210mm !important;
              height: 297mm !important;
              margin: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              page-break-after: always !important;
              break-after: page !important;
              box-sizing: border-box !important;
              position: relative !important;
              overflow: hidden !important;
              background: white;
            }
            
            .page:last-child {
              page-break-after: auto !important;
              break-after: auto !important;
            }
          }

          /* DESIGN TOKENS */
          .navy-bg { background: #111827; }
          .accent-blue { background: #3b82f6; }
          .text-navy { color: #111827; }
          .text-slate { color: #64748b; }
          .border-accent { border-left: 6px solid #3b82f6; }
          
          .card-light { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
          .card-blue { background: #eff6ff; border: 1px solid #dbeafe; border-radius: 12px; padding: 24px; }
          .card-green { background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 24px; }
          
          .quote-box { background: #f1f5f9; padding: 40px; border-radius: 8px; font-style: italic; color: #334155; }
          
          .stamp-box {
            width: 120px;
            height: 120px;
            border: 2px dashed #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #94a3b8;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          h1, h2, h3, h4 { font-family: 'Inter', sans-serif; font-weight: 900; letter-spacing: -0.025em; }
        `}
      </style>
      
      {/* SCREEN CONTROLS */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/super-admin" className="p-3 bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Dar-Ark Byte OS Designer</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">High-Fidelity Architectural Deployment</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <input 
               type="text" 
               placeholder="Target School Name"
               value={data.schoolName}
               onChange={(e) => setData({...data, schoolName: e.target.value})}
               className="bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-sm font-bold w-80 focus:ring-2 focus:ring-blue-600 transition-all"
             />
             <button onClick={handlePrint} className="flex items-center gap-3 bg-[#111827] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              <Printer className="w-5 h-5" /> Print Strategic Proposal
            </button>
          </div>
        </div>
      </header>

      {/* DOCUMENT ROOT */}
      <div id="proposal-root" className="pt-48 pb-24 print:p-0">
        <div className="document-preview-container print:shadow-none print:max-w-none print:w-full">
          
          {/* PAGE 1: COVER PAGE (WHITE OPTIMIZED) */}
          <div className="page bg-white p-24 justify-between" style={{ minHeight: '297mm' }}>
             <div className="space-y-24">
                <p className="text-blue-600 font-black text-sm uppercase tracking-[0.4em]">Dar-Ark Byte Solutions</p>
                <div className="space-y-6 text-navy">
                  <h1 className="text-7xl font-black leading-[1.1]">Strategic <br /> Transformation <br /> Proposal</h1>
                  <p className="text-2xl text-slate-400 font-medium italic">Dar-Ark Byte OS v6.0</p>
                </div>
             </div>
             
             <div className="space-y-12 text-navy">
                <div className="border-l-[6px] border-blue-600 pl-10 space-y-2">
                   <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Prepared Exclusively For:</p>
                   <h2 className="text-4xl font-black">{data.schoolName || '[School Name]'}</h2>
                   <p className="text-sm text-slate-500 font-bold italic tracking-tight">Head Office: Trans Ekulu, Enugu, Nigeria</p>
                </div>
                <div className="flex justify-between items-end border-t border-slate-100 pt-10">
                   <p className="text-sm text-slate-400 font-black uppercase tracking-widest">Issue Date: {data.date}</p>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-right">Confidential Strategic Build v7.0</p>
                </div>
             </div>
          </div>

          {/* PAGE 2: EXECUTIVE STRATEGY */}
          <div className="page bg-white p-20 space-y-12">
            <header className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-6">
               <p>Dar-Ark Byte OS | Executive Strategy</p>
               <p>Issue: {data.date}</p>
            </header>

            <div className="quote-box text-center text-xl leading-relaxed">
              "Our mission is to unify school administration, learning, and communication into one high-performance digital ecosystem that drives institutional excellence."
            </div>

            <section className="space-y-8">
               <h3 className="text-3xl text-navy flex items-center gap-4"><span className="w-1.5 h-8 accent-blue inline-block"></span> Core Institutional Identity</h3>
               <div className="grid grid-cols-2 gap-8">
                  <div className="card-light space-y-4">
                     <div className="flex items-center gap-3 text-blue-500 font-black uppercase text-sm">
                        <Globe className="w-5 h-5" /> Digital Identity
                     </div>
                     <p className="text-sm text-slate-600 leading-relaxed font-medium">Custom SEO-optimized website and online admissions funnel to enhance global brand visibility and Google search ranking.</p>
                  </div>
                  <div className="card-light space-y-4">
                     <div className="flex items-center gap-3 text-blue-500 font-black uppercase text-sm">
                        <Smartphone className="w-5 h-5" /> Unified Access
                     </div>
                     <p className="text-sm text-slate-600 leading-relaxed font-medium">Dedicated Parent/Student app dashboard with real-time results, instant alerts, and comprehensive portal access.</p>
                  </div>
               </div>
            </section>

            <section className="space-y-8">
               <h3 className="text-3xl text-navy flex items-center gap-4"><span className="w-1.5 h-8 accent-blue inline-block"></span> The Curriculum Evolution</h3>
               <div className="grid grid-cols-2 gap-8">
                  <div className="card-blue space-y-4">
                     <h4 className="text-blue-600 text-lg uppercase tracking-tight">Robotics & Coding OS</h4>
                     <p className="text-sm text-slate-600 font-medium">Foundations in Python, JavaScript, and Artificial Intelligence coupled with Hardware Engineering tracks.</p>
                  </div>
                  <div className="card-green space-y-4">
                     <h4 className="text-green-600 text-lg uppercase tracking-tight">Global Edge</h4>
                     <p className="text-sm text-slate-600 font-medium">Equipping students with future-ready logic and career-ready software development skills.</p>
                  </div>
               </div>
            </section>

            <section className="space-y-8">
               <h3 className="text-3xl text-navy flex items-center gap-4"><span className="w-1.5 h-8 accent-blue inline-block"></span> Operational Infrastructure</h3>
               <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    { title: 'Academic Intelligence', desc: 'Auto-grading & performance tracking.' },
                    { title: 'Security & SMS', desc: 'Attendance alerts & safety broadcasts.' },
                    { title: 'CBT / Exam System', desc: 'WAEC-standard interface & marking.' },
                    { title: 'Admission Gateway', desc: 'End-to-end digital enrollment.' },
                    { title: 'Teacher Productivity', desc: 'Digital lesson notes & distribution.' },
                    { title: 'Communication Hub', desc: 'In-app chat & emergency systems.' },
                    { title: 'Smart Finance', desc: 'Cashless payments & digital wallets.' },
                    { title: 'Document Lab', desc: 'Automated Transcripts & ID Cards.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-lg space-y-1">
                       <p className="font-black text-navy text-xs uppercase">{item.title}</p>
                       <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* PAGE 3: FINANCIAL FRAMEWORK */}
          <div className="page bg-white p-20 space-y-16">
            <header className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-6">
               <p>Financial Framework | Proprietary Build</p>
               <p>Dar-Ark Byte OS v6.0</p>
            </header>

            <section className="space-y-10">
               <h3 className="text-4xl text-navy flex items-center gap-4"><span className="w-1.5 h-10 accent-blue inline-block"></span> Strategic Investment</h3>
               
               <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-[#111827] text-white text-[10px] uppercase tracking-widest font-black">
                           <th className="p-6">Service Package</th>
                           <th className="p-6">Deployment Details</th>
                           <th className="p-6 text-right">Investment / Student</th>
                        </tr>
                     </thead>
                     <tbody className="text-sm font-bold text-slate-600">
                        <tr className="border-b border-slate-100">
                           <td className="p-6 text-navy">Standard Operating System</td>
                           <td className="p-6 text-xs text-slate-400 italic">Zero Upfront Setup. Pay-as-you-Scale model. Includes all administrative modules.</td>
                           <td className="p-6 text-right text-blue-600 text-lg">₦1,200 <span className="text-[10px] text-slate-400">/ Term</span></td>
                        </tr>
                        <tr className="bg-slate-50">
                           <td className="p-6 text-navy">Premium Robotics & Coding</td>
                           <td className="p-6 text-xs text-slate-400 italic">Complete Technical Deployment. Lab setup assistance and specialized curriculum.</td>
                           <td className="p-6 text-right text-blue-600 text-lg">₦6,000 <span className="text-[10px] text-slate-400">/ Term</span></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </section>

            <section className="space-y-6">
               <h4 className="text-navy text-xl uppercase tracking-tighter">Security & Certification</h4>
               <div className="space-y-4 text-sm text-slate-500 leading-relaxed font-medium italic">
                  <p><span className="font-black text-navy uppercase not-italic mr-2">Confidentiality:</span> This strategy is proprietary. All digital controls and administrative backends are isolated—ensuring absolute data privacy for your institution.</p>
                  <p><span className="font-black text-navy uppercase not-italic mr-2">Certification:</span> Students in the Premium Program receive internationally recognized certificates of proficiency in Coding and Robotics upon completion of the track.</p>
               </div>
            </section>

            <div className="pt-24 flex justify-between items-end">
               <div className="space-y-12">
                  <div className="w-80 border-t border-slate-400 pt-3">
                     <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-1">Authorized School Signature</p>
                     <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Date & Official School Stamp</p>
                  </div>
                  <div className="stamp-box">
                     Stamp Here
                  </div>
               </div>
               
               <div className="space-y-12 text-right">
                  <div className="w-80 border-t border-slate-400 pt-3 inline-block">
                     <p className="text-[10px] font-black text-navy uppercase tracking-widest mb-1">Dar-Ark Byte Authorization</p>
                     <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Verified Digital Executive</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl text-blue-500 font-serif italic">Dar-Ark Byte Solutions</p>
                  </div>
               </div>
            </div>

            <footer className="absolute bottom-12 left-0 right-0 text-center space-y-4">
               <p className="text-[12px] font-black text-navy uppercase tracking-tighter">Innovating Education Through Technology</p>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">© 2026 DAR-ARK BYTE SOLUTIONS | ALL RIGHTS RESERVED</p>
            </footer>
          </div>

        </div>
      </div>
    </div>
  );
}
