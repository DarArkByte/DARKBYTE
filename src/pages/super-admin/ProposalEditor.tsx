import React, { useState } from 'react';
import { FileText, Download, Printer, Save, ArrowLeft, Building, CreditCard, CheckCircle2, Cpu, Code2, Globe, Smartphone, Zap, BookOpen, GraduationCap, Users, ShieldCheck, BarChart3, MessageSquare, LayoutGrid, Award, HardDrive } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:p-0">
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            
            /* ABSOLUTE HIDE: Kill everything except the specific document */
            body > *:not(#proposal-root) {
              display: none !important;
            }
            
            nav, header, aside, .print\\:hidden, #sidebar, #topbar { 
              display: none !important; 
            }

            #proposal-root {
              display: block !important;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              margin: 0;
              padding: 0;
            }

            .page {
              width: 210mm;
              height: 297mm;
              padding: 20mm;
              margin: 0;
              page-break-after: always;
              position: relative;
              box-sizing: border-box;
              background: white !important;
            }

            /* RE-ESTABLISHING BOLD PRINT TYPOGRAPHY */
            h2 { font-size: 32pt !important; color: #1e1b4b !important; font-weight: 900 !important; }
            h3 { font-size: 18pt !important; color: #1e1b4b !important; border-bottom: 2pt solid #1e1b4b; padding-bottom: 5pt; margin-top: 20pt; text-transform: uppercase; font-weight: 900 !important; }
            h4 { font-size: 13pt !important; color: #1e1b4b !important; font-weight: 900 !important; }
            p, td, li { font-size: 11pt !important; line-height: 1.6 !important; color: #1e293b !important; }
            
            .proposal-watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 120pt;
              font-weight: 900;
              color: rgba(30, 27, 75, 0.03);
              white-space: nowrap;
              z-index: 0;
              text-transform: uppercase;
              letter-spacing: 0.5em;
              pointer-events: none;
            }

            .z-10 { position: relative; z-index: 10; }
            
            .stats-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15pt; }
            .feature-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 12pt; }
            
            table { width: 100%; border-collapse: collapse !important; border: 2pt solid #1e1b4b !important; margin-top: 15pt; }
            th { background: #1e1b4b !important; color: white !important; padding: 12pt !important; text-align: left; font-size: 11pt !important; }
            td { padding: 12pt !important; border-bottom: 1pt solid #e2e8f0 !important; font-weight: 700 !important; }
            
            .result-preview { width: 100%; border: 1pt solid #e2e8f0; border-radius: 10pt; }
          }
          
          .document-shadow { box-shadow: 0 0 50px rgba(0,0,0,0.1); }
        `}
      </style>
      
      {/* SCREEN CONTROLS */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 p-6 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/super-admin" className="p-3 bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">HD PROPOSAL ENGINE</h1>
              <div className="flex gap-6 mt-1">
                <button onClick={() => setData({...data, packageTier: 'standard'})} className={`text-[10px] font-black uppercase tracking-widest ${data.packageTier === 'standard' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Standard Hub</button>
                <button onClick={() => setData({...data, packageTier: 'premium'})} className={`text-[10px] font-black uppercase tracking-widest ${data.packageTier === 'premium' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Premium OS</button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <input 
               type="text" 
               placeholder="Target School Name"
               value={data.schoolName}
               onChange={(e) => setData({...data, schoolName: e.target.value})}
               className="bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-sm font-bold w-72 focus:ring-2 focus:ring-indigo-600"
             />
             <button onClick={handlePrint} className="flex items-center gap-3 bg-[#1e1b4b] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              <Printer className="w-5 h-5" /> Generate 2-Page PDF
            </button>
          </div>
        </div>
      </header>

      {/* DOCUMENT ROOT */}
      <div id="proposal-root" className="pt-40 pb-20 print:p-0">
        <div className="mx-auto w-[210mm] document-shadow print:shadow-none">
          
          {/* PAGE 1 */}
          <div className="page">
            <div className="proposal-watermark">DAR-ARK BYTE</div>
            <div className="z-10 space-y-10">
              <header className="flex justify-between items-start border-b-[4pt] border-[#1e1b4b] pb-8">
                <div>
                  <h2 className="text-5xl font-black text-[#1e1b4b] uppercase leading-none">Dar-Ark Byte</h2>
                  <p className="text-[#d946ef] font-black text-xs uppercase tracking-[0.4em] mt-2">The Integrated School Operating System</p>
                  <div className="mt-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
                     Trans Ekulu, Enugu | {data.phone1} | {data.phone2}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-lg uppercase tracking-widest">Strategic Proposal</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{data.date}</p>
                </div>
              </header>

              <section className="space-y-6">
                 <h3 className="text-2xl font-black">Executive Strategy</h3>
                 <p className="text-slate-700 font-medium leading-relaxed">
                   This proposal presents a complete digital transformation for **{data.schoolName || 'Your Institution'}**. We are deploying a **School Operating System (OS)**—unifying administration, learning, and communication into one high-performance ecosystem.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-10 stats-grid">
                    <div className="space-y-3 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                       <h4 className="flex items-center gap-3"><Globe className="w-6 h-6 text-indigo-600" /> Digital Identity</h4>
                       <p className="text-sm text-slate-500 font-medium">Bespoke SEO website, online admissions, and professional brand management.</p>
                    </div>
                    <div className="space-y-3 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                       <h4 className="flex items-center gap-3"><Smartphone className="w-6 h-6 text-indigo-600" /> Unified Access</h4>
                       <p className="text-sm text-slate-500 font-medium">Real-time dashboards for parents and students to monitor performance and results.</p>
                    </div>
                 </div>
              </section>

              {data.packageTier === 'premium' && (
                <section className="bg-[#1e1b4b] p-10 rounded-[40px] text-white shadow-xl">
                  <h4 className="text-white text-xl uppercase tracking-tighter mb-4 font-black flex items-center gap-3">
                    <Cpu className="w-8 h-8 text-[#d946ef]" /> Future-Skills & Innovation
                  </h4>
                  <div className="grid grid-cols-2 gap-8 stats-grid text-sm font-bold uppercase tracking-widest text-slate-300">
                     <p className="border-l-2 border-[#d946ef] pl-4">Coding Mastery (Python & Web)</p>
                     <p className="border-l-2 border-[#d946ef] pl-4">Robotics & AI Engineering</p>
                  </div>
                </section>
              )}

              <section className="space-y-6">
                 <h3 className="text-2xl font-black">Financial Investment</h3>
                 <div className="overflow-hidden rounded-[32px] border-2 border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-8">OS Configuration Package</th>
                          <th className="p-8 text-right">Investment (₦)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-bold">
                         <tr>
                           <td className="p-8">
                              <p className="font-black text-slate-900 text-lg">{data.packageTier === 'premium' ? 'Premium Learning & Robotics OS' : 'Standard School Operating System'}</p>
                              <p className="text-xs text-[#16a34a] uppercase tracking-widest mt-2 italic font-black">✅ ZERO UPFRONT COST — PAY PER STUDENT PER TERM</p>
                           </td>
                           <td className="p-8 text-right font-black text-slate-900 text-2xl">₦{currentFee}</td>
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
            <div className="z-10 space-y-10">
              <section className="space-y-6">
                <h3 className="text-2xl font-black">Operational Infrastructure</h3>
                <div className="grid grid-cols-2 gap-6 feature-grid">
                  {[
                    { title: 'Academic Intelligence', desc: 'Auto computation, grading, and performance analytics.' },
                    { title: 'CBT & Exam System', desc: 'Auto-marking with WAEC/JAMB-style interface.' },
                    { icon: <BookOpen />, title: 'Teacher Productivity', desc: 'Lesson notes and assignment distribution center.' },
                    { title: 'Student Learning Portal', desc: 'Direct dashboards for study materials and exam prep.' },
                    { title: 'Smart Finance & Wallet', desc: 'Cashless payments and revenue monitoring dashboard.' },
                    { title: 'Security & Attendance', desc: 'Digital tracking with automated SMS alerts to parents.' },
                    { title: 'Admission Gateway', desc: 'Online application funnel and enrollment analytics.' },
                    { title: 'Communication Hub', desc: 'SMS, in-app chat, and emergency broadcast system.' },
                    { title: 'Document Generator', desc: 'Transcripts, ID Cards, and Certificates generation.' },
                    { title: 'Multi-Branch Command', desc: 'Centralized control for multiple campuses and branches.' },
                    { title: 'Security & Access Control', desc: 'Granular permissions and secure data backup.' },
                    { title: 'Branding & Customization', desc: 'Full logo integration and custom white-labeling.' },
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                      <div>
                        <p className="font-black text-slate-900 text-[10pt] uppercase leading-tight mb-1">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-2xl font-black">Proof of Output Excellence</h3>
                 <div className="relative rounded-[40px] overflow-hidden border-2 border-slate-100 bg-slate-50 p-10 text-center">
                    <img src={resultTemplateImg} alt="Result Sample" className="w-[65%] mx-auto h-auto rounded-2xl shadow-xl border border-white" />
                    <p className="mt-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Proprietary Academic Output Matrix</p>
                 </div>
              </section>

              <section className="pt-10 border-t-2 border-slate-100">
                 <p className="text-sm font-medium text-slate-700 italic border-l-8 border-indigo-600 pl-6 leading-relaxed mb-8">
                   This system transforms your institution into a **Digital Learning Powerhouse**. By adopting the Dar-Ark Byte OS, you position your school as an unbeatable leader in the modern educational landscape.
                 </p>
                 <div className="flex justify-between items-end">
                    <div>
                      <h3 className="border-none m-0 p-0 text-3xl font-black text-slate-900 tracking-tighter">Dar-Ark Byte OS</h3>
                      <p className="text-xs font-bold text-[#d946ef] uppercase tracking-widest italic mt-1">Innovating Education Through Technology</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Confidential Proposal</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">v4.0 Final OS Build</p>
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
