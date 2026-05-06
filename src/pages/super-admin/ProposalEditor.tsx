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
    <div className="min-h-screen bg-slate-50 font-sans print:bg-white">
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 10mm;
            }
            
            body { 
              background: white !important; 
              color: #000 !important;
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important;
              font-size: 8.5pt !important;
            }

            .print\\:hidden { display: none !important; }
            
            h2 { font-size: 22pt !important; line-height: 1.1 !important; color: #1e1b4b !important; }
            h3 { font-size: 13pt !important; color: #1e1b4b !important; margin-top: 8pt !important; border-bottom: 2pt solid #1e1b4b; padding-bottom: 2pt; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 900 !important; }
            h4 { font-size: 9.5pt !important; color: #1e1b4b !important; font-weight: 900 !important; }
            p, td, li { font-size: 8.5pt !important; line-height: 1.2 !important; color: #334155 !important; }
            
            .proposal-watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 80pt;
              font-weight: 900;
              color: rgba(30, 27, 75, 0.02);
              white-space: nowrap;
              z-index: -1;
              text-transform: uppercase;
              letter-spacing: 0.5em;
            }

            .letterhead-border { border-bottom: 2pt solid #1e1b4b !important; }
            .bg-slate-50 { background: #f8fafc !important; border: 0.5pt solid #e2e8f0 !important; border-radius: 8pt !important; }
            
            table { width: 100%; border-collapse: collapse !important; border: 1pt solid #1e1b4b !important; }
            th { background: #1e1b4b !important; color: white !important; padding: 5pt !important; text-align: left; font-size: 8pt !important; text-transform: uppercase; }
            td { padding: 5pt !important; border-bottom: 0.5pt solid #e2e8f0 !important; }
            
            .page-break { page-break-before: always; }
            .grid-14 { display: grid; grid-template-cols: 1fr 1fr; gap: 6pt; }
            .card-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 8pt; }
          }
          
          .document-preview { background: white; border-radius: 2rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); }
        `}
      </style>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 p-4 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/super-admin" className="p-2 bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-black text-slate-900 uppercase italic">Master OS Proposal (2-Page Cut)</h1>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex gap-4 text-[10px] font-black uppercase mr-4">
                <button onClick={() => setData({...data, packageTier: 'standard'})} className={data.packageTier === 'standard' ? 'text-indigo-600' : 'text-slate-400'}>Standard</button>
                <button onClick={() => setData({...data, packageTier: 'premium'})} className={data.packageTier === 'premium' ? 'text-indigo-600' : 'text-slate-400'}>Premium</button>
             </div>
             <input 
               type="text" 
               placeholder="Strategic Partner Name"
               value={data.schoolName}
               onChange={(e) => setData({...data, schoolName: e.target.value})}
               className="bg-slate-50 border-none rounded-lg p-2 text-xs font-bold w-64 focus:ring-2 focus:ring-indigo-600"
             />
             <button onClick={handlePrint} className="flex items-center gap-2 bg-[#1e1b4b] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">
              <Printer className="w-4 h-4" /> Print 2-Page OS
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 print:p-0">
        <div className="max-w-[210mm] mx-auto document-preview print:shadow-none print:rounded-none">
          <div className="relative p-12 print:p-0 overflow-hidden">
            <div className="proposal-watermark hidden print:block">DAR-ARK BYTE</div>
            
            <div className="relative z-10 space-y-6">
              {/* PAGE 1: STRATEGY & FINANCIALS */}
              <header className="flex justify-between items-start border-b-[2pt] border-[#1e1b4b] pb-4 letterhead-border">
                <div>
                  <h2 className="text-4xl font-black text-[#1e1b4b] tracking-tighter uppercase leading-tight">Dar-Ark Byte</h2>
                  <p className="text-[#d946ef] font-black text-[8pt] uppercase tracking-[0.4em]">All-in-One School Operating System</p>
                  <div className="mt-2 text-[9pt] font-bold text-slate-500 uppercase tracking-widest">
                     Trans Ekulu, Enugu | {data.phone1} | {data.phone2}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-xs uppercase tracking-widest border-b border-indigo-600 pb-1">Corporate OS Proposal</p>
                  <p className="text-[8pt] font-bold text-slate-400 uppercase tracking-widest mt-1">{data.date}</p>
                </div>
              </header>

              <section className="space-y-2">
                 <h3 className="text-lg font-black text-[#1e1b4b]">🏛️ Executive Overview</h3>
                 <p className="text-slate-600 font-medium text-[8.5pt] leading-relaxed">
                   This proposal presents a complete digital transformation system designed to modernize school operations and enhance academic delivery. Our platform is a fully integrated **School Operating System**, combining administration, learning, communication, and finance into one ecosystem.
                 </p>
              </section>

              <div className="grid grid-cols-2 gap-6 card-grid">
                 <div className="space-y-2 border-l-2 border-indigo-600 pl-3">
                    <h4 className="uppercase tracking-tight">🌐 Digital Identity</h4>
                    <p className="text-[8pt] text-slate-500 leading-tight">Bespoke SEO website, online admissions, and professional brand management.</p>
                 </div>
                 <div className="space-y-2 border-l-2 border-[#d946ef] pl-3">
                    <h4 className="uppercase tracking-tight">📱 Parent & Student Mobile Access</h4>
                    <p className="text-[8pt] text-slate-500 leading-tight">Personal dashboards, real-time results, attendance monitoring, and CBT study tools.</p>
                 </div>
              </div>

              {data.packageTier === 'premium' && (
                <section className="bg-[#1e1b4b] p-4 rounded-xl text-white">
                  <h4 className="text-white uppercase tracking-tighter mb-1 font-black">🎓 Future-Skills & Innovation 🤖💻</h4>
                  <div className="grid grid-cols-3 gap-4 text-[8pt] font-bold uppercase tracking-widest">
                     <p className="text-slate-300">Coding Mastery</p>
                     <p className="text-slate-300">Robotics & AI</p>
                     <p className="text-slate-300">Innovation Training</p>
                  </div>
                </section>
              )}

              <section className="space-y-3">
                 <h3 className="text-lg font-black text-[#1e1b4b]">💰 Financial Investment</h3>
                 <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-3">Package Configuration</th>
                          <th className="p-3 text-right">Investment (₦)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-bold">
                         <tr>
                           <td className="p-4">
                              <p className="font-black text-slate-900 text-[9pt]">{data.packageTier === 'premium' ? 'Premium Learning & Robotics OS' : 'Standard School Operating System'}</p>
                              <p className="text-[7.5pt] text-[#16a34a] uppercase tracking-widest mt-1 italic">✅ ZERO UPFRONT COST — Usage Based Licensing</p>
                           </td>
                           <td className="p-4 text-right font-black text-slate-900 text-sm">₦{currentFee} per student</td>
                         </tr>
                      </tbody>
                    </table>
                 </div>
              </section>

              {/* PAGE 2: ECOSYSTEM & OUTPUT */}
              <section className="space-y-4 page-break pt-6">
                <h3 className="text-lg font-black text-[#1e1b4b]">📊 Operational Infrastructure: The 14 Core Systems</h3>
                <div className="grid-14">
                  {[
                    { id: '1', title: 'Academic Intelligence', desc: 'Auto computation, grading, and analytics.' },
                    { id: '2', title: 'CBT & Exam System', desc: 'Auto-marking with WAEC/JAMB interface.' },
                    { id: '3', title: 'Teacher Productivity', desc: 'Lesson notes and assignment distribution.' },
                    { id: '4', title: 'Student Learning Portal', desc: 'Direct dashboards for study and prep.' },
                    { id: '5', title: 'Smart Finance & Wallet', desc: 'Cashless payments and revenue monitoring.' },
                    { id: '6', title: 'Security & Attendance', desc: 'Digital tracking with automated SMS alerts.' },
                    { id: '7', title: 'Admin Command Center', desc: 'Payroll, leave, and staff evaluation tools.' },
                    { id: '8', title: 'Admission Gateway', desc: 'Online application and enrollment analytics.' },
                    { id: '9', title: 'Communication Hub', desc: 'SMS, in-app chat, and emergency broadcast.' },
                    { id: '10', title: 'Analytics Dashboard', desc: 'Performance trends and revenue insights.' },
                    { id: '11', title: 'Document Generator', desc: 'Transcripts, ID Cards, and Certificates.' },
                    { id: '12', title: 'Multi-Branch Management', desc: 'Centralized control for multiple campuses.' },
                    { id: '13', title: 'Security & Access Control', desc: 'Granular permissions and secure data backup.' },
                    { id: '14', title: 'Branding & Customization', desc: 'Full logo integration and custom domains.' },
                  ].map((item, i) => (
                    <div key={i} className="p-2 bg-slate-50/50 border border-slate-100 rounded-lg flex gap-2">
                      <span className="font-black text-indigo-600 text-[9pt] shrink-0">{item.id}.</span>
                      <div>
                        <p className="font-black text-slate-900 text-[8pt] uppercase tracking-tight leading-none">{item.title}</p>
                        <p className="text-[7.5pt] text-slate-500 font-medium leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                 <h3 className="text-lg font-black text-[#1e1b4b]">🖼️ Proof of Output Excellence</h3>
                 <div className="relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50 p-4 text-center">
                    <img src={resultTemplateImg} alt="Result Template" className="w-[60%] mx-auto h-auto rounded shadow-sm border border-slate-200" />
                    <p className="mt-2 text-[7.5pt] text-slate-400 font-black uppercase tracking-[0.2em]">Proprietary Automated Academic Output Matrix</p>
                 </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                 <p className="text-[8pt] font-medium text-slate-700 italic border-l-4 border-indigo-600 pl-4 leading-relaxed">
                   With this system, your school will operate with greater efficiency, improve academic performance tracking, strengthen parent engagement, and stand out as a modern, technology-driven institution.
                 </p>
                 <div className="flex justify-between items-end">
                    <div>
                      <p className="font-black text-slate-900 uppercase tracking-tighter text-lg">Dar-Ark Byte OS</p>
                      <p className="text-[8pt] font-bold text-[#d946ef] uppercase tracking-widest italic">Innovating Education Through Technology</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[8pt] font-black text-slate-900 uppercase tracking-widest">Confidential Strategy Proposal</p>
                       <p className="text-[7.5pt] text-slate-400 font-bold uppercase tracking-widest leading-none">v4.0 Optimized Build</p>
                    </div>
                 </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
