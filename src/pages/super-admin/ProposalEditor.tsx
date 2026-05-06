import React, { useState } from 'react';
import { FileText, Printer, ArrowLeft, Globe, Smartphone, Cpu, CheckCircle2, BookOpen, Code2, Zap, Rocket, Brain, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProposalEditor() {
  const [data, setData] = useState({
    schoolName: '',
    contactPerson: '',
    date: new Date().toLocaleDateString(),
    phone1: '+234 812 345 6789',
    phone2: '+234 703 123 4567',
    email: 'info@darark.com',
    packageTier: 'premium', // Defaulting to premium for maximum impact
  });

  const handlePrint = () => {
    window.print();
  };

  const currentFee = data.packageTier === 'premium' ? '6,000' : '1,200';

  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:p-0">
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            
            body > *:not(#proposal-root) {
              display: none !important;
            }
            
            #proposal-root {
              display: block !important;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }

            .page {
              width: 210mm;
              height: 297mm;
              padding: 25mm 20mm; /* PROPER MARGINS */
              margin: 0;
              page-break-after: always;
              position: relative;
              box-sizing: border-box;
              background: white !important;
            }

            /* PROFESSIONAL TYPOGRAPHY */
            h2 { font-size: 32pt !important; color: #1e1b4b !important; font-weight: 900 !important; letter-spacing: -1px !important; }
            h3 { font-size: 18pt !important; color: #1e1b4b !important; border-bottom: 2pt solid #1e1b4b; padding-bottom: 8pt; margin-top: 25pt; text-transform: uppercase; font-weight: 900 !important; }
            h4 { font-size: 13pt !important; color: #1e1b4b !important; font-weight: 900 !important; text-transform: uppercase; }
            p, td, li { font-size: 11pt !important; line-height: 1.6 !important; color: #334155 !important; }
            
            .bold-label { font-weight: 900 !important; color: #1e1b4b !important; }
            
            .proposal-watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 100pt;
              font-weight: 900;
              color: rgba(30, 27, 75, 0.025);
              white-space: nowrap;
              z-index: 0;
              text-transform: uppercase;
              letter-spacing: 0.5em;
              pointer-events: none;
            }

            .z-10 { position: relative; z-index: 10; }
            
            .stats-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20pt; }
            .feature-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15pt; }
            
            table { width: 100%; border-collapse: collapse !important; border: 2pt solid #1e1b4b !important; margin-top: 20pt; }
            th { background: #1e1b4b !important; color: white !important; padding: 12pt !important; text-align: left; font-size: 11pt !important; text-transform: uppercase; }
            td { padding: 12pt !important; border-bottom: 1pt solid #e2e8f0 !important; font-weight: 700 !important; }
          }
          
          .document-preview-container { max-width: 210mm; margin: 0 auto; background: white; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.15); border-radius: 0.5rem; overflow: hidden; }
        `}
      </style>
      
      {/* SCREEN CONTROLS */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 p-6 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/super-admin" className="p-3 bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Dar-Ark Byte OS Engine</h1>
              <div className="flex gap-6 mt-1">
                <button onClick={() => setData({...data, packageTier: 'standard'})} className={`text-[10px] font-black uppercase tracking-widest transition-all ${data.packageTier === 'standard' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Standard Mode</button>
                <button onClick={() => setData({...data, packageTier: 'premium'})} className={`text-[10px] font-black uppercase tracking-widest transition-all ${data.packageTier === 'premium' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Premium Mode</button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <input 
               type="text" 
               placeholder="Strategic Partner Name"
               value={data.schoolName}
               onChange={(e) => setData({...data, schoolName: e.target.value})}
               className="bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-sm font-bold w-80 focus:ring-2 focus:ring-indigo-600 transition-all"
             />
             <button onClick={handlePrint} className="flex items-center gap-3 bg-[#1e1b4b] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              <Printer className="w-5 h-5" /> Print Strategic Proposal
            </button>
          </div>
        </div>
      </header>

      {/* DOCUMENT ROOT */}
      <div id="proposal-root" className="pt-48 pb-24 print:p-0">
        <div className="document-preview-container print:shadow-none print:max-w-none print:w-full">
          
          {/* PAGE 1 */}
          <div className="page">
            <div className="proposal-watermark">DAR-ARK BYTE</div>
            <div className="z-10 space-y-12">
              <header className="flex justify-between items-start border-b-[4pt] border-[#1e1b4b] pb-10">
                <div>
                  <h2 className="text-5xl font-black text-[#1e1b4b] uppercase leading-none tracking-tighter">Dar-Ark Byte</h2>
                  <p className="text-[#d946ef] font-black text-sm uppercase tracking-[0.5em] mt-3">The School Operating System</p>
                  <div className="mt-8 text-xs font-bold text-slate-500 uppercase tracking-widest space-y-1">
                     <p>Trans Ekulu, Enugu</p>
                     <p>{data.phone1} | {data.phone2}</p>
                     <p>{data.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-lg uppercase tracking-widest border-b-2 border-indigo-600 pb-1 inline-block">Official Proposal</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{data.date}</p>
                </div>
              </header>

              <section className="space-y-6">
                 <h3 className="text-2xl font-black">Executive Strategy</h3>
                 <p className="text-slate-700 font-medium leading-relaxed">
                   This proposal presents a complete digital transformation strategy for <span className="bold-label">{data.schoolName || 'Your Institution'}</span>. We are deploying a <span className="bold-label">School Operating System (OS)</span>—unifying administration, future-ready learning, and parent-student engagement into one high-performance ecosystem.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-10 stats-grid">
                    <div className="space-y-4 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                       <h4 className="flex items-center gap-3"><Globe className="w-6 h-6 text-indigo-600" /> Digital Identity</h4>
                       <p className="text-sm text-slate-500 font-medium">Professional SEO-optimized school website, integrated online admission funnels, and global brand visibility.</p>
                    </div>
                    <div className="space-y-4 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                       <h4 className="flex items-center gap-3"><Smartphone className="w-6 h-6 text-indigo-600" /> Unified Access</h4>
                       <p className="text-sm text-slate-500 font-medium">Real-time mobile dashboards for parents and students to monitor assignments, attendance, and termly results.</p>
                    </div>
                 </div>
              </section>

              {data.packageTier === 'premium' && (
                <section className="bg-[#1e1b4b] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Cpu className="w-32 h-32" />
                  </div>
                  <h4 className="text-white text-xl uppercase tracking-tighter mb-6 font-black flex items-center gap-4">
                    <Rocket className="w-8 h-8 text-[#d946ef]" /> Future-Skills: Coding & Robotics
                  </h4>
                  <div className="grid grid-cols-2 gap-10 stats-grid">
                     <div className="space-y-3">
                        <p className="font-black text-[#d946ef] text-sm uppercase tracking-widest flex items-center gap-2"><Code2 className="w-4 h-4"/> Coding Mastery</p>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">Python, JavaScript, and Web Development tracks designed for real-world software engineering readiness.</p>
                     </div>
                     <div className="space-y-3">
                        <p className="font-black text-[#d946ef] text-sm uppercase tracking-widest flex items-center gap-2"><Brain className="w-4 h-4"/> Robotics & AI</p>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">Hands-on hardware engineering, automated logic systems, and Artificial Intelligence fundamentals.</p>
                     </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10">
                     <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2">Student Benefits:</p>
                     <p className="text-xs text-slate-400 font-medium italic">Critical Thinking, Early Career Advantage, Global Technical Competitiveness, and Creative Problem Solving.</p>
                  </div>
                </section>
              )}

              <section className="space-y-6">
                 <h3 className="text-2xl font-black">Strategic Investment</h3>
                 <div className="overflow-hidden rounded-[32px] border-2 border-[#1e1b4b]">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-8">OS Configuration Package</th>
                          <th className="p-8 text-right">Investment per Student</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-bold">
                         <tr>
                           <td className="p-8">
                              <p className="font-black text-slate-900 text-xl">{data.packageTier === 'premium' ? 'Premium Learning & Robotics OS' : 'Standard School Operating System'}</p>
                              <p className="text-xs text-[#16a34a] uppercase tracking-widest mt-2 italic font-black flex items-center gap-2">
                                <Award className="w-4 h-4" /> ✅ Zero Upfront Cost — Usage Based
                              </p>
                           </td>
                           <td className="p-8 text-right font-black text-slate-900 text-3xl">₦{currentFee}</td>
                         </tr>
                      </tbody>
                    </table>
                 </div>
              </section>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="page">
            <div className="proposal-watermark">DAR-ARK BYTE</div>
            <div className="z-10 space-y-12">
              <section className="space-y-8">
                <h3 className="text-2xl font-black">Operational Infrastructure</h3>
                <div className="grid grid-cols-2 gap-8 feature-grid">
                  {[
                    { title: 'Academic Intelligence', desc: 'Auto computation, grading, and deep performance analytics.' },
                    { title: 'CBT & Exam System', desc: 'Auto-marking engine with WAEC/JAMB-style testing interface.' },
                    { title: 'Teacher Productivity', desc: 'Centralized lesson note management and homework distribution.' },
                    { title: 'Student Learning Portal', desc: 'Direct dashboards for 24/7 access to study materials.' },
                    { title: 'Smart Finance & Wallet', desc: 'Cashless fee payments and institutional revenue monitoring.' },
                    { title: 'Security & Attendance', desc: 'Digital tracking with automated SMS alerts for parent peace-of-mind.' },
                    { title: 'Admission Gateway', desc: 'Complete digital funnel from application to enrollment tracking.' },
                    { title: 'Communication Hub', desc: 'Omni-channel SMS, in-app chat, and emergency broadcasts.' },
                    { title: 'Document Generator', desc: 'Instant generation of Transcripts, ID Cards, and Certificates.' },
                    { title: 'Multi-Branch Command', desc: 'Unified control hub for institutions with multiple campuses.' },
                    { title: 'Security & Access Control', desc: 'Granular permissions and enterprise-grade data security.' },
                    { title: 'Branding & Customization', desc: 'Full school identity integration and white-label deployment.' },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-[24px] flex gap-5">
                      <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                      <div>
                        <p className="font-black text-slate-900 text-[11pt] uppercase leading-tight mb-2 tracking-tight">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pt-20 border-t-[4pt] border-[#1e1b4b]">
                 <p className="text-base font-medium text-slate-700 italic border-l-[10px] border-[#d946ef] pl-8 leading-relaxed mb-12">
                   This system transforms your institution into a <span className="bold-label text-slate-900">Digital Learning Powerhouse</span>. By adopting the Dar-Ark Byte OS, you position your school as an unbeatable leader in the modern educational landscape.
                 </p>
                 <div className="flex justify-between items-end">
                    <div>
                      <h3 className="border-none m-0 p-0 text-4xl font-black text-slate-900 tracking-tighter">Dar-Ark Byte OS</h3>
                      <p className="text-sm font-bold text-[#d946ef] uppercase tracking-widest italic mt-2">Innovating Education Through Technology</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Confidential Strategy Proposal</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">v4.0 Optimized Production Build</p>
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
