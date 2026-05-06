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
            }

            .print\\:hidden { display: none !important; }
            
            h2 { font-size: 24pt !important; line-height: 1.1 !important; color: #1e1b4b !important; }
            h3 { font-size: 14pt !important; color: #1e1b4b !important; margin-top: 12pt !important; border-bottom: 2pt solid #1e1b4b; padding-bottom: 2pt; text-transform: uppercase; letter-spacing: 0.05em; }
            h4 { font-size: 10pt !important; color: #1e1b4b !important; font-weight: 900 !important; }
            p, td, li { font-size: 8.5pt !important; line-height: 1.3 !important; color: #334155 !important; }
            .font-black { font-weight: 900 !important; }
            
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

            .letterhead-border { border-bottom: 3pt solid #1e1b4b !important; }
            .bg-slate-50 { background: #f8fafc !important; border: 0.5pt solid #e2e8f0 !important; }
            
            table { width: 100%; border-collapse: collapse !important; border: 1pt solid #1e1b4b !important; }
            th { background: #1e1b4b !important; color: white !important; padding: 6pt !important; text-align: left; font-size: 8pt !important; text-transform: uppercase; }
            td { padding: 6pt !important; border-bottom: 0.5pt solid #e2e8f0 !important; }
            
            .page-break { page-break-before: always; }
            .grid-14 { display: grid; grid-template-cols: 1fr 1fr; gap: 8pt; }
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
            <div>
              <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">MASTER OS PROPOSAL v4.0</h1>
              <div className="flex gap-4 text-[10px] font-black uppercase">
                <button onClick={() => setData({...data, packageTier: 'standard'})} className={data.packageTier === 'standard' ? 'text-indigo-600' : 'text-slate-400'}>Standard</button>
                <button onClick={() => setData({...data, packageTier: 'premium'})} className={data.packageTier === 'premium' ? 'text-indigo-600' : 'text-slate-400'}>Premium</button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <input 
               type="text" 
               placeholder="Strategic Partner Name"
               value={data.schoolName}
               onChange={(e) => setData({...data, schoolName: e.target.value})}
               className="bg-slate-50 border-none rounded-lg p-2 text-xs font-bold w-64 focus:ring-2 focus:ring-indigo-600"
             />
             <button onClick={handlePrint} className="flex items-center gap-2 bg-[#1e1b4b] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
              <Printer className="w-4 h-4" /> Print Final Master Proposal
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 print:p-0">
        <div className="max-w-[210mm] mx-auto document-preview print:shadow-none print:rounded-none">
          <div className="relative p-16 print:p-0 overflow-hidden">
            <div className="proposal-watermark hidden print:block">DAR-ARK BYTE</div>
            
            <div className="relative z-10 space-y-8">
              {/* PAGE 1: EXECUTIVE PRESENTATION */}
              <header className="flex justify-between items-start border-b-[3pt] border-[#1e1b4b] pb-6 letterhead-border">
                <div>
                  <h2 className="text-4xl font-black text-[#1e1b4b] tracking-tighter uppercase leading-tight">Dar-Ark Byte</h2>
                  <p className="text-[#d946ef] font-black text-[9px] uppercase tracking-[0.4em]">All-in-One School Operating System</p>
                  <div className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                     Trans Ekulu, Enugu | {data.phone1} | {data.phone2}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-sm uppercase tracking-widest border-b-2 border-indigo-600 pb-1 inline-block">Strategic Transformation Proposal</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{data.date}</p>
                </div>
              </header>

              <section className="space-y-4">
                 <h3 className="text-lg font-black text-[#1e1b4b]">🏛️ Executive Overview</h3>
                 <p className="text-slate-600 font-medium text-xs leading-relaxed">
                   This proposal presents a complete digital transformation system designed to modernize school operations, enhance academic delivery, and position your institution as a leader in 21st-century education. 
                   Our platform is not just a management tool—it is a fully integrated **School Operating System**, combining administration, learning, communication, and financial management into one seamless ecosystem.
                 </p>
              </section>

              <div className="grid grid-cols-2 gap-8">
                 <section className="space-y-4">
                    <h4 className="flex items-center gap-2 uppercase tracking-tighter border-l-4 border-indigo-600 pl-3">🌐 Digital Identity</h4>
                    <ul className="text-[9px] text-slate-500 space-y-1 list-disc pl-4 font-bold uppercase tracking-tight">
                       <li>Bespoke SEO-Optimized Website</li>
                       <li>Online Admissions & Enrollment</li>
                       <li>Professional Brand Showcasing</li>
                    </ul>
                 </section>
                 <section className="space-y-4">
                    <h4 className="flex items-center gap-2 uppercase tracking-tighter border-l-4 border-[#d946ef] pl-3">📱 Mobile Ecosystem</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="font-black text-slate-900 text-[8px] uppercase">For Parents:</p>
                          <p className="text-[8px] text-slate-500">Real-time results, attendance monitoring, and instant updates.</p>
                       </div>
                       <div>
                          <p className="font-black text-slate-900 text-[8px] uppercase">For Students:</p>
                          <p className="text-[8px] text-slate-500">Learning dashboards, assignments, and CBT practice tools.</p>
                       </div>
                    </div>
                 </section>
              </div>

              {data.packageTier === 'premium' && (
                <section className="bg-[#1e1b4b] p-6 rounded-[24px] text-white">
                  <h4 className="flex items-center gap-2 text-white uppercase tracking-tighter mb-2 font-black">🎓 Future-Skills & Innovation 🤖💻</h4>
                  <div className="grid grid-cols-3 gap-4 text-[9px] font-bold uppercase tracking-widest">
                     <p className="text-slate-300 border-l border-white/20 pl-3">Coding Mastery (Python/Web)</p>
                     <p className="text-slate-300 border-l border-white/20 pl-3">Robotics & Automation</p>
                     <p className="text-slate-300 border-l border-white/20 pl-3">Artificial Intelligence Logic</p>
                  </div>
                </section>
              )}

              {/* PAGE 2: THE 14 CORE SYSTEMS */}
              <section className="space-y-6 page-break pt-12">
                <h3 className="text-lg font-black text-[#1e1b4b]">📊 Operational Infrastructure: The 14 Core Systems</h3>
                <div className="grid-14">
                  {[
                    { id: '1', title: 'Academic Intelligence', desc: 'Auto computation, grading, analytics, and CA tracking.' },
                    { id: '2', title: 'CBT & Exam System', desc: 'Auto-marking platform with WAEC/JAMB practice interface.' },
                    { id: '3', title: 'Teacher Productivity', desc: 'Lesson note management and assignment distribution tools.' },
                    { id: '4', title: 'Student Learning Portal', desc: 'Dedicated dashboards for study materials and exam prep.' },
                    { id: '5', title: 'Smart Finance & Wallet', desc: 'Cashless payments, digital wallets, and revenue monitoring.' },
                    { id: '6', title: 'Security & Attendance', desc: 'Digital tracking for staff/students with automated SMS alerts.' },
                    { id: '7', title: 'Admin Command Center', desc: 'Payroll, leave management, and staff evaluation tools.' },
                    { id: '8', title: 'Admission Gateway', desc: 'Online application funnel and enrollment analytics.' },
                    { id: '9', title: 'Communication Hub', desc: 'SMS, in-app messaging, and emergency broadcast systems.' },
                    { id: '10', title: 'Analytics Dashboard', desc: 'Student performance trends and revenue insights.' },
                    { id: '11', title: 'Document Generator', desc: 'Auto-generation of Transcripts, ID Cards, and Certificates.' },
                    { id: '12', title: 'Branch Management', desc: 'Centralized control for multiple campuses and branches.' },
                    { id: '13', title: 'Security & Access Control', desc: 'Granular role-based permissions and secure data backup.' },
                    { id: '14', title: 'Branding & Customization', desc: 'Full logo integration and custom domain white-labeling.' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex gap-3">
                      <span className="font-black text-indigo-600 text-[10px] shrink-0">{item.id}.</span>
                      <div>
                        <p className="font-black text-slate-900 text-[9px] uppercase tracking-tight">{item.title}</p>
                        <p className="text-[8px] text-slate-500 font-medium leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FINANCIALS */}
              <section className="space-y-4">
                 <h3 className="text-lg font-black text-[#1e1b4b]">💰 Financial Investment</h3>
                 <div className="overflow-hidden rounded-[20px] border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-4">Package Configuration</th>
                          <th className="p-4 text-right">Investment (₦)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-bold">
                         <tr className="border-b border-slate-100">
                           <td className="p-5">
                              <p className="font-black text-slate-900 text-xs">{data.packageTier === 'premium' ? 'Premium Learning & Robotics OS' : 'Standard School Operating System'}</p>
                              <p className="text-[8px] text-[#16a34a] uppercase tracking-widest mt-1 italic">✅ ZERO UPFRONT COST — Usage Based Licensing</p>
                           </td>
                           <td className="p-5 text-right font-black text-slate-900 text-sm">₦{currentFee} per student</td>
                         </tr>
                      </tbody>
                    </table>
                 </div>
              </section>

              {/* PAGE 3: OUTPUT & CONCLUSION */}
              <section className="space-y-6 page-break pt-12">
                 <h3 className="text-lg font-black text-[#1e1b4b]">🖼️ Proof of Output Excellence</h3>
                 <div className="relative rounded-[32px] overflow-hidden border-2 border-slate-100 bg-slate-50 p-8 text-center">
                    <img src={resultTemplateImg} alt="Result Template" className="w-full h-auto rounded-xl shadow-md border border-slate-200 mb-2" />
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">High-Fidelity Automated Academic Output Matrix</p>
                 </div>
              </section>

              {/* STRATEGIC OUTCOME */}
              <section className="space-y-4 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                 <h4 className="text-center text-slate-900 font-black uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">Strategic Business Outcome</h4>
                 <div className="grid grid-cols-2 gap-6">
                    {[
                      'Greater Operational Efficiency',
                      'Improved Academic Performance Tracking',
                      'Higher Parent & Student Engagement',
                      'New Revenue & Growth Opportunities',
                    ].map((outcome, i) => (
                      <p key={i} className="flex items-center gap-2 text-[9px] font-black text-indigo-900">
                        <CheckCircle2 className="w-3 h-3 text-indigo-600" /> {outcome}
                      </p>
                    ))}
                 </div>
              </section>

              <section className="pt-10 border-t border-slate-100 flex justify-between items-end">
                 <div>
                    <h3 className="border-none m-0 p-0 text-xl font-black text-slate-900 tracking-tighter">Dar-Ark Byte OS</h3>
                    <p className="text-[9px] font-bold text-[#d946ef] uppercase tracking-widest italic">Innovating Education Through Technology</p>
                 </div>
                 <div className="text-right space-y-1">
                    <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest border-t border-slate-100 pt-2">Confidential Corporate Proposal</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">v4.0 Final OS Build</p>
                 </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
