import React, { useState } from 'react';
import { FileText, Printer, ArrowLeft, Globe, Smartphone, Cpu, CheckCircle2, BookOpen, Code2, Zap, Rocket, Brain, Award, ShieldAlert, PenLine, Building2 } from 'lucide-react';
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
    packageTier: 'premium',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:p-0">
      <style>
        {`
          /* SCREEN ONLY PREVIEW STYLING */
          @media screen {
            .page {
              margin-bottom: 40px !important;
              box-shadow: 0 10px 40px rgba(0,0,0,0.1) !important;
              border-radius: 4px;
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
            
            /* ABSOLUTE ISOLATION: Remove everything else from the DOM view */
            body > *:not(#proposal-root), nav, header, aside, .no-print, #topbar, #sidebar { 
              display: none !important; 
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
              padding: 40mm 30mm !important; /* ULTRA SAFE MARGINS */
              margin: 0 !important;
              display: block !important;
              page-break-after: always !important;
              break-after: page !important;
              box-sizing: border-box !important;
              background: white !important;
              position: relative !important;
              overflow: visible !important;
            }
            
            .page:last-child {
              page-break-after: auto !important;
              break-after: auto !important;
            }

            /* RE-ESTABLISHING TYPOGRAPHY WEIGHTS */
            h2 { font-size: 36pt !important; color: #1e1b4b !important; font-weight: 900 !important; line-height: 1.1 !important; }
            h3 { font-size: 18pt !important; color: #1e1b4b !important; border-bottom: 2pt solid #1e1b4b !important; padding-bottom: 8pt !important; }
            p, td, li { font-size: 11pt !important; color: #334155 !important; }
            
            .premium-highlight { color: #d946ef !important; font-weight: 900 !important; }
          }
          
          .document-preview-container { max-width: 210mm; margin: 0 auto; background: white; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.15); }
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
              <h1 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Investor Proposal Architect</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">v6.0 High-Fidelity Build</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <input 
               type="text" 
               placeholder="Target Institution Name"
               value={data.schoolName}
               onChange={(e) => setData({...data, schoolName: e.target.value})}
               className="bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-sm font-bold w-80 focus:ring-2 focus:ring-indigo-600 transition-all"
             />
             <button onClick={handlePrint} className="flex items-center gap-3 bg-[#1e1b4b] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              <Printer className="w-5 h-5" /> Generate Multi-Page PDF
            </button>
          </div>
        </div>
      </header>

      {/* DOCUMENT ROOT */}
      <div id="proposal-root" className="pt-48 pb-24 print:p-0">
        <div className="document-preview-container print:shadow-none print:max-w-none print:w-full">
          
          {/* PAGE 1: TITLE PAGE */}
          <div className="page flex flex-col justify-between" style={{ minHeight: '297mm' }}>
             <div className="space-y-4">
                <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.6em]">Dar-Ark Byte OS</p>
                <h2 className="text-6xl font-black text-slate-900 leading-none">Strategic <br /> Transformation <br /> Proposal</h2>
             </div>
             
             <div className="space-y-12">
                <div className="space-y-2 border-l-[12px] border-[#d946ef] pl-10">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Prepared Exclusively For:</p>
                   <h3 className="border-none m-0 p-0 text-4xl font-black text-slate-900 tracking-tighter">{data.schoolName || '[School Name]'}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-10">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Head Office</p>
                      <p className="text-sm font-bold text-slate-900">Trans Ekulu, Enugu, Nigeria</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Issue Date</p>
                      <p className="text-sm font-bold text-slate-900">{data.date}</p>
                   </div>
                </div>
             </div>
             
             <div className="pt-10 border-t border-slate-100 flex justify-between items-center">
                <div className="flex gap-4">
                   <Building2 className="w-10 h-10 text-slate-200" />
                   <p className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest leading-tight">Innovating Education <br /> Through Technology</p>
                </div>
                <p className="text-[9pt] font-black text-slate-900 uppercase tracking-widest">Confidential Build v6.0</p>
             </div>
          </div>

          {/* PAGE 2: EXECUTIVE SUMMARY */}
          <div className="page">
            <div className="space-y-12">
              <header className="flex justify-between items-center border-b-[6pt] border-[#1e1b4b] pb-8">
                <h2 className="text-4xl font-black uppercase">Executive Strategy</h2>
                <div className="text-right space-y-1">
                   <p className="text-[10pt] font-black text-indigo-600 uppercase tracking-widest">{data.schoolName}</p>
                   <p className="text-[9pt] font-bold text-slate-400">{data.date}</p>
                </div>
              </header>

              <p className="text-slate-700 font-medium leading-relaxed text-lg italic border-l-8 border-indigo-600 pl-8">
                "Our mission is to unify school administration, learning, and communication into one high-performance digital ecosystem that drives institutional excellence."
              </p>

              <div className="grid grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <h3 className="text-xl font-black">🌐 Digital Identity</h3>
                    <ul className="space-y-3 font-bold text-slate-500">
                       <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Custom SEO Website</li>
                       <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Online Admissions</li>
                       <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Brand Visibility</li>
                       <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Google Search Edge</li>
                    </ul>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-xl font-black">📱 Unified Access</h3>
                    <ul className="space-y-3 font-bold text-slate-500">
                       <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Parent App Dashboard</li>
                       <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Real-time Results</li>
                       <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Student Portals</li>
                       <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Instant Alerts</li>
                    </ul>
                 </div>
              </div>

              <section className="bg-[#1e1b4b] p-12 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                   <Rocket className="w-40 h-40" />
                </div>
                <h4 className="text-white text-2xl uppercase tracking-tighter mb-6 font-black flex items-center gap-4 italic">
                  <Cpu className="w-10 h-10 text-[#d946ef]" /> Robotics & Coding OS
                </h4>
                <div className="grid grid-cols-2 gap-12">
                   <div className="space-y-2">
                      <p className="premium-highlight text-sm uppercase tracking-widest">The Curriculum</p>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">Python, JavaScript, Artificial Intelligence foundations, and Hardware engineering tracks.</p>
                   </div>
                   <div className="space-y-2">
                      <p className="premium-highlight text-sm uppercase tracking-widest">Global Edge</p>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">Equipping students with future-ready logic and career-ready software skills.</p>
                   </div>
                </div>
              </section>
            </div>
          </div>

          {/* PAGE 3: INFRASTRUCTURE & INVESTMENT */}
          <div className="page">
            <div className="space-y-12">
              <h3 className="text-2xl font-black">Operational Infrastructure</h3>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { title: 'Academic Intelligence', desc: 'Auto grading and deep performance tracking.' },
                  { title: 'CBT / Exam System', desc: 'Auto-marking with WAEC interface.' },
                  { title: 'Teacher Productivity', desc: 'Lesson note and assignment distribution.' },
                  { title: 'Smart Finance', desc: 'Cashless fee payments and wallets.' },
                  { title: 'Security & SMS', desc: 'Automated attendance and safety alerts.' },
                  { title: 'Admission Gateway', desc: 'Full digital enrollment funnel.' },
                  { title: 'Communication Hub', desc: 'In-app chat and emergency broadcast.' },
                  { title: 'Analytics Dashboard', desc: 'Financial and performance trends.' },
                  { title: 'Document Lab', desc: 'Transcripts, ID Cards, and Certificates.' },
                  { title: 'Multi-Campus Hub', desc: 'Centralized control for all branches.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                    <div>
                      <p className="font-black text-slate-900 text-[10pt] uppercase mb-1 tracking-tight">{item.title}</p>
                      <p className="text-[9pt] text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <section className="space-y-8 pt-10">
                 <h3 className="text-2xl font-black">Strategic Investment</h3>
                 <div className="overflow-hidden rounded-[32px] border-[3pt] border-[#1e1b4b]">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-8">Service Package</th>
                          <th className="p-8 text-right">Investment per Student</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-bold">
                         <tr className="border-b-2 border-slate-100">
                           <td className="p-8">
                              <p className="font-black text-slate-900 text-xl tracking-tighter italic">Standard School Operating System</p>
                              <p className="text-[8pt] text-[#16a34a] uppercase tracking-widest mt-2 italic font-black">✅ Zero Upfront Setup — Per Term Pay-as-you-Scale</p>
                           </td>
                           <td className="p-8 text-right font-black text-slate-900 text-4xl tracking-tighter">₦1,200</td>
                         </tr>
                         <tr className="bg-slate-50">
                           <td className="p-8">
                              <p className="font-black text-indigo-900 text-xl tracking-tighter italic">Premium Robotics & Coding Integration</p>
                              <p className="text-[8pt] text-indigo-600 uppercase tracking-widest mt-2 italic font-black">✅ Complete Future-Ready Technical Deployment</p>
                           </td>
                           <td className="p-8 text-right font-black text-indigo-900 text-4xl tracking-tighter">₦6,000</td>
                         </tr>
                      </tbody>
                    </table>
                 </div>
              </section>
            </div>
          </div>

          {/* PAGE 4: PROOF & AUTHORIZATION */}
          <div className="page flex flex-col justify-between">
            <div className="space-y-12">
              <section className="space-y-6">
                 <h3 className="text-2xl font-black">Proof of Output Excellence</h3>
                 <div className="relative rounded-[48px] overflow-hidden border-2 border-slate-100 bg-slate-50 p-10 text-center">
                    <img src={resultTemplateImg} alt="Result Sample" className="w-[60%] mx-auto h-auto rounded-2xl shadow-2xl border border-white mb-6" />
                    <p className="text-[10pt] text-slate-400 font-black uppercase tracking-[0.5em]">Proprietary Academic Architecture</p>
                 </div>
              </section>

              <section className="grid grid-cols-2 gap-12 pt-10 border-t border-slate-100">
                 <div className="space-y-4">
                    <h4 className="flex items-center gap-3 font-black text-slate-900"><ShieldAlert className="w-5 h-5 text-amber-500" /> Confidentiality</h4>
                    <p className="text-[9.5pt] text-slate-500 font-medium leading-relaxed italic">
                      This strategy is proprietary. All digital controls and administrative backends are isolated—ensuring absolute data privacy for your institution.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <h4 className="flex items-center gap-3 font-black text-slate-900"><Award className="w-5 h-5 text-indigo-600" /> Certification</h4>
                    <p className="text-[9.5pt] text-slate-500 font-medium leading-relaxed italic">
                      Students in the Premium Program receive internationally recognized certificates of proficiency in Coding and Robotics.
                    </p>
                 </div>
              </section>
            </div>

            <section className="space-y-10">
               <div className="flex justify-between items-start">
                  <div className="signature-box">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Authorized School Signature</p>
                     <p className="text-xs font-bold text-slate-300 italic">Date & Stamp</p>
                  </div>
                  <div className="signature-box border-indigo-600">
                     <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Dar-Ark Byte Authorization</p>
                     <p className="text-xs font-bold text-slate-900 font-sans tracking-tight">Verified Digital Executive</p>
                  </div>
               </div>
               
               <div className="pt-10 border-t-[6pt] border-[#1e1b4b] flex justify-between items-end">
                  <div>
                    <h3 className="border-none m-0 p-0 text-4xl font-black text-slate-900 tracking-tighter leading-none italic">Dar-Ark Byte OS</h3>
                    <p className="premium-highlight text-sm uppercase tracking-widest italic mt-3">Innovating Education Through Technology</p>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 DAR-ARK BYTE SOLUTIONS</p>
               </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
