import React, { useState } from 'react';
import { FileText, Download, Printer, Save, ArrowLeft, Building, CreditCard, CheckCircle2, Cpu, Code2, Globe, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import resultTemplateImg from '../../assets/branding/result_template.png';

export default function ProposalEditor() {
  const [data, setData] = useState({
    schoolName: '',
    contactPerson: '',
    date: new Date().toLocaleDateString(),
    phone1: '+234 812 345 6789',
    phone2: '+234 703 123 4567',
    email: 'info@darark.com',
    setupFee: '0',
    annualLicense: '0',
    perStudentFee: '1,200',
    packageTier: 'standard', // standard or premium
  });

  const handlePrint = () => {
    window.print();
  };

  const currentFee = data.packageTier === 'premium' ? '6,000' : data.perStudentFee;

  return (
    <div className="min-h-screen bg-slate-50 font-sans print:bg-white">
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 15mm;
            }
            
            body { 
              background: white !important; 
              color: #000 !important;
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important;
            }

            .print\\:hidden { display: none !important; }
            
            /* Sharp Typography for Print */
            h2 { font-size: 28pt !important; line-height: 1.1 !important; color: #1e1b4b !important; }
            h3 { font-size: 18pt !important; color: #1e1b4b !important; margin-top: 20pt !important; }
            p, td, li { font-size: 10pt !important; line-height: 1.5 !important; color: #334155 !important; }
            .font-black { font-weight: 900 !important; }
            
            .proposal-watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 100pt;
              font-weight: 900;
              color: rgba(30, 27, 75, 0.04);
              white-space: nowrap;
              z-index: -1;
              text-transform: uppercase;
              letter-spacing: 0.5em;
            }

            .letterhead-border { border-bottom: 3pt solid #1e1b4b !important; }
            .bg-slate-50 { background: #f8fafc !important; border: 0.5pt solid #e2e8f0 !important; }
            .bg-indigo-50\\/30 { background: #f5f3ff !important; border: 0.5pt solid #ddd6fe !important; }
            
            table { width: 100%; border-collapse: collapse !important; border: 1pt solid #1e1b4b !important; }
            th { background: #1e1b4b !important; color: white !important; padding: 10pt !important; text-align: left; font-size: 9pt !important; text-transform: uppercase; }
            td { padding: 10pt !important; border-bottom: 0.5pt solid #e2e8f0 !important; }
            
            .page-break { page-break-before: always; }
            
            /* Force images to be high quality */
            img { image-rendering: auto; max-width: 100%; }
            
            .card-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15pt; }
          }
          
          /* Screen Only Styles */
          .screen-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
          .document-preview { background: white; border-radius: 2rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); }
        `}
      </style>
      
      {/* TOOLBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 p-4 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/super-admin" className="p-2 bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">Proposal Architect</h1>
              <div className="flex gap-4">
                <button onClick={() => setData({...data, packageTier: 'standard'})} className={`text-[10px] font-black uppercase tracking-widest ${data.packageTier === 'standard' ? 'text-indigo-600' : 'text-slate-400'}`}>Standard</button>
                <button onClick={() => setData({...data, packageTier: 'premium'})} className={`text-[10px] font-black uppercase tracking-widest ${data.packageTier === 'premium' ? 'text-indigo-600' : 'text-slate-400'}`}>Premium</button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <input 
                  type="text" 
                  placeholder="School Name"
                  value={data.schoolName}
                  onChange={(e) => setData({...data, schoolName: e.target.value})}
                  className="bg-slate-50 border-none rounded-lg p-2 text-xs font-bold w-48 focus:ring-2 focus:ring-indigo-600"
                />
             </div>
             <button onClick={handlePrint} className="flex items-center gap-2 bg-[#1e1b4b] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-indigo-500/20">
              <Printer className="w-4 h-4" /> Print HD Document
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 print:p-0">
        <div className="max-w-[210mm] mx-auto document-preview print:shadow-none print:rounded-none">
          <div className="relative p-16 print:p-0 overflow-hidden min-h-[297mm]">
            <div className="proposal-watermark hidden print:block">DAR-ARK BYTE</div>
            
            <div className="relative z-10 space-y-12">
              {/* LETTERHEAD */}
              <header className="flex justify-between items-start border-b-[3pt] border-[#1e1b4b] pb-10 letterhead-border">
                <div>
                  <h2 className="text-5xl font-black text-[#1e1b4b] tracking-tighter uppercase leading-tight">Dar-Ark Byte</h2>
                  <p className="text-[#d946ef] font-black text-xs uppercase tracking-[0.3em]">Intelligence For Modern Schools</p>
                  <div className="mt-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                     Trans Ekulu, Enugu <br />
                     {data.phone1} | {data.phone2} <br />
                     {data.email}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-lg">Official Proposal</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.date}</p>
                  {data.packageTier === 'premium' && (
                    <span className="inline-block mt-2 px-3 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full">Future-Skills Tier</span>
                  )}
                </div>
              </header>

              {/* RECIPIENT */}
              <section className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prepared For:</p>
                  <h3 className="text-4xl font-black text-slate-900 leading-tight">{data.schoolName || '_____________________________________'}</h3>
                </div>
                
                <div className="bg-slate-50 p-10 rounded-[32px] space-y-4 border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> Executive Summary
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    We are presenting Dar-Ark Byte, the ultimate School Intelligence Ecosystem. 
                    {data.packageTier === 'premium' ? (
                      " This Premium Package integrates our world-class ERP with a specialized Coding and Robotics curriculum, equipping every student with industry-ready technical skills."
                    ) : (
                      " Our Zero-Upfront model ensures your school transitions to digital excellence without financial strain, providing premium management tools on a per-term usage basis."
                    )}
                  </p>
                </div>
              </section>

              {/* DIGITAL IDENTITY */}
              <section className="space-y-6">
                <h3 className="text-2xl font-black text-[#1e1b4b] uppercase tracking-tighter flex items-center gap-2">
                  <Globe className="w-7 h-7 text-indigo-600" /> Digital Identity & Mobile Access
                </h3>
                <div className="grid grid-cols-2 gap-8 card-grid">
                   <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-3">
                      <p className="font-black text-indigo-900 text-xs uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#d946ef]" /> Bespoke School Website
                      </p>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        A premium, SEO-optimized web presence for the institution, featuring online admission funnels, digital enrollment, and a dynamic news/gallery engine to attract global interest.
                      </p>
                   </div>
                   <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-3">
                      <p className="font-black text-indigo-900 text-xs uppercase tracking-widest flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#d946ef]" /> The Parent Mobile App
                      </p>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Instant mobile access for parents to track attendance, pay fees, and monitor student performance in real-time via our high-speed Progressive Web App (PWA) infrastructure.
                      </p>
                   </div>
                </div>
              </section>

              {/* ROBOTICS SECTION (IF PREMIUM) */}
              {data.packageTier === 'premium' && (
                <section className="space-y-6 bg-indigo-50/30 p-10 rounded-[40px] border border-indigo-100">
                  <h3 className="text-2xl font-black text-indigo-900 uppercase tracking-tighter flex items-center gap-2">
                    <Cpu className="w-7 h-7 text-indigo-600" /> Coding & Robotics Integration
                  </h3>
                  <div className="grid grid-cols-2 gap-10 card-grid">
                    <div className="space-y-3">
                      <p className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2"><Code2 className="w-5 h-5 text-[#d946ef]" /> Modern Coding</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Python, JavaScript, and Web Development tracks designed to build real-world software engineering logic in students.</p>
                    </div>
                    <div className="space-y-3">
                      <p className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2"><Cpu className="w-5 h-5 text-[#d946ef]" /> Robotics & AI</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Hands-on hardware programming, circuit design, and AI logic fundamentals using industry-standard development kits.</p>
                    </div>
                  </div>
                </section>
              )}

              {/* PLATFORM BREAKDOWN */}
              <section className="space-y-8 page-break pt-16">
                <h3 className="text-2xl font-black text-[#1e1b4b] uppercase tracking-tighter border-b-2 border-slate-100 pb-4">Platform Ecosystem Breakdown</h3>
                <div className="grid grid-cols-2 gap-12 card-grid">
                  {[
                    { title: 'Academic Intelligence', desc: 'Automated result processing with specialized Student Weakness Analysis.' },
                    { title: 'Smart Finance & Wallet', desc: 'Cashless school ecosystem with integrated parent e-wallets.' },
                    { title: 'Security & Attendance', desc: 'Real-time attendance with instant mobile alerts to parents.' },
                    { title: 'Administrative Command', desc: 'Centralized staff payroll, role-based access, and command tools.' },
                    { title: 'Admission Gateway', desc: 'Hybrid digital/physical admission funnel with status tracking.' },
                    { title: 'Parent Experience', desc: 'Mobile-first portals for high-frequency performance tracking.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                        <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm mb-1 uppercase tracking-tight">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FINANCIALS */}
              <section className="space-y-6 pt-8">
                 <h3 className="text-2xl font-black text-[#1e1b4b] uppercase tracking-tighter">Financial Investment</h3>
                 <div className="overflow-hidden rounded-[32px] border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-6">Service Item Description</th>
                          <th className="p-6 text-right">Investment (₦)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                         <tr className={data.packageTier === 'premium' ? 'bg-indigo-50/20' : ''}>
                           <td className="p-8">
                              <p className="font-black text-slate-900 text-base">
                                {data.packageTier === 'premium' ? 'Premium Robotics & Coding Bundle' : 'Standard ERP Usage Fee'}
                              </p>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                                {data.packageTier === 'premium' ? 'Includes Full ERP + School Website + Parent App + Lab Sessions' : 'Per-Student processing fee per term'}
                              </p>
                           </td>
                           <td className="p-8 text-right font-black text-slate-900 text-lg">₦{currentFee}</td>
                         </tr>
                      </tbody>
                    </table>
                 </div>
              </section>

              {/* RESULT PREVIEW */}
              <section className="space-y-6 page-break pt-16">
                 <h3 className="text-2xl font-black text-[#1e1b4b] uppercase tracking-tighter">Sample Academic Output</h3>
                 <div className="relative rounded-[40px] overflow-hidden border-2 border-slate-100 bg-slate-50 p-10">
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-200">
                      <img src={resultTemplateImg} alt="Result Template" className="w-full h-auto" />
                    </div>
                    <p className="mt-6 text-[11px] text-slate-400 font-black uppercase tracking-[0.3em] text-center">Proprietary High-Fidelity Automated Result Matrix</p>
                 </div>
              </section>

              {/* FOOTER */}
              <footer className="pt-20 border-t border-slate-100 flex justify-between items-center text-slate-400">
                 <div className="text-xs font-black uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Dar-Ark Byte Intelligence
                 </div>
                 <div className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Confidential Corporate Proposal
                 </div>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
