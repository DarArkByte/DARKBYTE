import React, { useState } from 'react';
import { FileText, Printer, ArrowLeft, Globe, Smartphone, Cpu, CheckCircle2, BookOpen, Code2, Zap, Rocket, Brain, Award, ShieldAlert } from 'lucide-react';
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
          @media print {
            @page {
              size: A4;
              margin: 0mm;
            }
            
            /* DYNAMIC BREAK STRATEGY */
            body > *:not(#proposal-root), nav, header, aside, #sidebar, #topbar { 
              display: none !important; 
            }
            
            body, html {
              height: auto !important;
              overflow: visible !important;
            }

            #proposal-root {
              display: block !important;
              width: 210mm !important;
              margin: 0 auto !important;
              padding: 0 !important;
              height: auto !important;
              overflow: visible !important;
            }

            .page {
              width: 210mm !important;
              height: 297mm !important;
              padding: 25mm 20mm !important;
              margin: 0 !important;
              display: block !important;
              page-break-after: always !important;
              break-after: page !important;
              box-sizing: border-box !important;
              background: white !important;
              position: relative !important;
              overflow: visible !important;
            }

            /* RE-ESTABLISHING TYPOGRAPHY WEIGHTS */
            h2 { font-size: 32pt !important; color: #1e1b4b !important; font-weight: 900 !important; }
            h3 { font-size: 18pt !important; color: #1e1b4b !important; border-bottom: 2pt solid #1e1b4b !important; padding-bottom: 6pt !important; }
            h4 { font-size: 11pt !important; color: #1e1b4b !important; font-weight: 900 !important; }
            p, td, li { font-size: 10.5pt !important; color: #334155 !important; }
            
            .premium-text { color: #d946ef !important; font-weight: 900 !important; }
            
            .proposal-watermark {
              position: absolute !important;
              top: 50% !important;
              left: 50% !important;
              transform: translate(-50%, -50%) rotate(-45deg) !important;
              font-size: 100pt !important;
              font-weight: 900 !important;
              color: rgba(30, 27, 75, 0.02) !important;
              z-index: 0 !important;
            }
          }
          
          .document-preview-container { max-width: 210mm; margin: 0 auto; background: white; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.15); }
        `}
      </style>
      
      {/* SCREEN CONTROLS */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 p-6 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/super-admin" className="p-3 bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-black text-slate-900 uppercase italic">Master OS Proposal v5.0</h1>
          </div>
          
          <div className="flex items-center gap-8">
             <input 
               type="text" 
               placeholder="Strategic Partner Name"
               value={data.schoolName}
               onChange={(e) => setData({...data, schoolName: e.target.value})}
               className="bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-sm font-bold w-80 focus:ring-2 focus:ring-indigo-600"
             />
             <button onClick={handlePrint} className="flex items-center gap-3 bg-[#1e1b4b] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              <Printer className="w-5 h-5" /> Print Designed Proposal
            </button>
          </div>
        </div>
      </header>

      {/* DOCUMENT ROOT */}
      <div id="proposal-root" className="pt-48 pb-24 print:p-0">
        <div className="document-preview-container print:shadow-none print:max-w-none print:w-full">
          
          {/* PAGE 1: EXECUTIVE OVERVIEW */}
          <div className="page">
            <div className="proposal-watermark">DAR-ARK BYTE</div>
            <div className="z-10 space-y-10">
              <header className="flex justify-between items-start border-b-[4pt] border-[#1e1b4b] pb-10">
                <div>
                  <h2 className="text-5xl font-black text-[#1e1b4b] uppercase leading-none tracking-tighter">Dar-Ark Byte</h2>
                  <p className="premium-text text-sm uppercase tracking-[0.5em] mt-3">The School Operating System</p>
                  <div className="mt-8 text-[10pt] font-bold text-slate-500 uppercase tracking-widest space-y-1 font-black">
                     <p>Trans Ekulu, Enugu</p>
                     <p>{data.phone1} | {data.phone2}</p>
                     <p>{data.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-lg uppercase tracking-widest border-b-2 border-indigo-600 pb-1 inline-block">Official Proposal</p>
                  <p className="text-[10pt] font-bold text-slate-400 uppercase tracking-widest mt-2">{data.date}</p>
                </div>
              </header>

              <section className="space-y-4">
                 <h3 className="text-2xl font-black">🏛️ Page 1: Executive Overview</h3>
                 <p className="text-slate-700 font-medium leading-relaxed">
                   This proposal introduces a complete digital transformation system designed to modernize school operations, enhance academic delivery, and position your institution as a leader in 21st-century education. 
                   Our platform is a fully integrated **School Operating System**—combining administration, learning, finance, and communication into one seamless ecosystem.
                 </p>
              </section>

              <div className="grid grid-cols-2 gap-10 grid-2">
                 <section className="space-y-4">
                    <h4 className="flex items-center gap-3 border-l-4 border-indigo-600 pl-3">🌐 Digital Identity</h4>
                    <ul className="text-[10pt] text-slate-500 space-y-1 list-disc pl-5 font-bold">
                       <li>Custom SEO-optimized website</li>
                       <li>Online admission & registration</li>
                       <li>Professional brand positioning</li>
                       <li>Improved Google visibility</li>
                    </ul>
                 </section>
                 <section className="space-y-4">
                    <h4 className="flex items-center gap-3 border-l-4 border-indigo-600 pl-3">📱 Unified Access</h4>
                    <div className="grid grid-cols-1 gap-4">
                       <div className="bg-slate-50 p-4 rounded-xl">
                          <p className="font-black text-slate-900 text-[10pt] uppercase mb-1">Parents:</p>
                          <p className="text-[9pt] text-slate-500">Real-time results, attendance monitoring, and instant notifications.</p>
                       </div>
                       <div className="bg-slate-50 p-4 rounded-xl">
                          <p className="font-black text-slate-900 text-[10pt] uppercase mb-1">Students:</p>
                          <p className="text-[9pt] text-slate-500">Personal dashboards, lesson notes, assignments, and CBT tools.</p>
                       </div>
                    </div>
                 </section>
              </div>

              <section className="bg-[#1e1b4b] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                <h4 className="text-white text-xl uppercase tracking-tighter mb-4 font-black flex items-center gap-4">
                  <Rocket className="w-8 h-8 text-[#d946ef]" /> 🎓 Robotics & Coding Program
                </h4>
                <div className="grid grid-cols-2 gap-10 grid-2">
                   <div className="space-y-2">
                      <p className="premium-text text-xs uppercase tracking-widest">Mastery Tracks</p>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">Python, JavaScript & Web Development, Robotics automation, and AI foundations.</p>
                   </div>
                   <div className="space-y-2">
                      <p className="premium-text text-xs uppercase tracking-widest">Student Benefits</p>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">Project-based practical learning, critical thinking, and global technical readiness.</p>
                   </div>
                </div>
              </section>
            </div>
          </div>

          {/* PAGE 2: SYSTEMS & FINANCIALS */}
          <div className="page">
            <div className="proposal-watermark">DAR-ARK BYTE</div>
            <div className="z-10 space-y-10">
              <section className="space-y-6">
                <h3 className="text-2xl font-black">📊 Page 2: System Features & Infrastructure</h3>
                <div className="grid grid-cols-2 gap-8 grid-2">
                  {[
                    { title: 'Academic Intelligence', desc: 'Auto computation, grading, analytics, and CA tracking.' },
                    { title: 'CBT & Examination System', desc: 'Auto-marking with WAEC/JAMB-style testing interface.' },
                    { title: 'Teacher Productivity Suite', desc: 'Lesson note management and assignment distribution.' },
                    { title: 'Student Learning Portal', desc: 'Direct dashboards for study materials and exam prep.' },
                    { title: 'Smart Finance System', desc: 'Cashless fee payments, digital wallets, and revenue tracking.' },
                    { title: 'Attendance & Security', desc: 'Digital tracking for staff/students with automated SMS alerts.' },
                    { title: 'Administrative System', desc: 'Payroll management, staff tracking, and centralized control.' },
                    { title: 'Admission Management', desc: 'Online application funnel and enrollment analytics.' },
                    { title: 'Communication Hub', desc: 'SMS, in-app chat, and emergency broadcast systems.' },
                    { title: 'Analytics Dashboard', desc: 'Student performance trends and revenue insights.' },
                    { title: 'Document Generator', desc: 'Instant generation of Transcripts, ID Cards, and Certificates.' },
                    { title: 'Multi-School Management', desc: 'Centralized hub for institutions with multiple campuses.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-1" />
                      <div>
                        <p className="font-black text-slate-900 text-[10pt] uppercase leading-tight mb-1">{item.title}</p>
                        <p className="text-[9pt] text-slate-500 font-medium leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-2xl font-black">💰 Financial Investment</h3>
                 <div className="overflow-hidden rounded-[32px] border-2 border-[#1e1b4b]">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-6">Service Package</th>
                          <th className="p-6 text-right">Investment per Student (₦)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-bold">
                         <tr className="border-b border-slate-100">
                           <td className="p-6">
                              <p className="font-black text-slate-900">Standard School Management System</p>
                              <p className="text-[8pt] text-[#16a34a] uppercase tracking-widest mt-1 italic font-black">✅ Zero Upfront Cost — Pay-as-you-scale</p>
                           </td>
                           <td className="p-6 text-right font-black text-slate-900 text-xl">₦1,200</td>
                         </tr>
                         <tr className="bg-slate-50">
                           <td className="p-6">
                              <p className="font-black text-indigo-900">Robotics & Coding Program (Premium)</p>
                              <p className="text-[8pt] text-indigo-600 uppercase tracking-widest mt-1 italic font-black">✅ Future-Ready Technical Integration</p>
                           </td>
                           <td className="p-6 text-right font-black text-indigo-900 text-xl">₦6,000</td>
                         </tr>
                      </tbody>
                    </table>
                 </div>
              </section>
            </div>
          </div>

          {/* PAGE 3: PROOF & CONCLUSION */}
          <div className="page">
            <div className="proposal-watermark">DAR-ARK BYTE</div>
            <div className="z-10 space-y-12">
              <section className="space-y-6">
                 <h3 className="text-2xl font-black">🖼️ Page 3: Proof of Excellence</h3>
                 <div className="relative rounded-[40px] overflow-hidden border-2 border-slate-100 bg-slate-50 p-8 text-center">
                    <img src={resultTemplateImg} alt="Result Sample" className="w-[65%] mx-auto h-auto rounded-2xl shadow-xl border border-white mb-4" />
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Proprietary Academic Output Matrix</p>
                 </div>
              </section>

              <section className="space-y-4 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                 <h4 className="flex items-center gap-3 text-slate-900 font-black tracking-widest"><ShieldAlert className="w-5 h-5 text-amber-500" /> Confidentiality Notice</h4>
                 <p className="text-[10pt] text-slate-600 font-medium leading-relaxed">
                   This document is confidential and intended solely for the recipient institution. All internal systems, security protocols, and controls are hidden—only a clean, professional output is presented.
                 </p>
              </section>

              <section className="pt-10 border-t-[4pt] border-[#1e1b4b]">
                 <h3 className="text-2xl font-black border-none m-0 p-0 mb-4">Conclusion</h3>
                 <p className="text-[11pt] font-medium text-slate-700 italic border-l-[10px] border-[#d946ef] pl-8 leading-relaxed mb-10">
                   This solution transforms your institution into a modern, efficient, and technology-driven institution. Positioning your school as an unbeatable leader in the modern educational landscape.
                 </p>
                 <div className="flex justify-between items-end">
                    <div>
                      <h3 className="border-none m-0 p-0 text-3xl font-black text-slate-900 tracking-tighter leading-none">Dar-Ark Byte OS</h3>
                      <p className="premium-text text-xs uppercase tracking-widest italic mt-3">Innovating Education Through Technology</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Confidential Corporate Proposal</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-2">v5.0 Master Build</p>
                    </div>
                 </div>
              </section>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
