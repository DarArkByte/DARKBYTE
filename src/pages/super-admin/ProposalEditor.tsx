import React, { useState } from 'react';
import { FileText, Download, Printer, Save, ArrowLeft, Building, CreditCard, CheckCircle2, Cpu, Code2, Globe, Smartphone, Zap, BookOpen, GraduationCap, Users, ShieldCheck, BarChart3, MessageSquare } from 'lucide-react';
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
              margin: 12mm;
            }
            
            body { 
              background: white !important; 
              color: #000 !important;
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important;
            }

            .print\\:hidden { display: none !important; }
            
            h2 { font-size: 26pt !important; line-height: 1.1 !important; color: #1e1b4b !important; }
            h3 { font-size: 16pt !important; color: #1e1b4b !important; margin-top: 15pt !important; border-bottom: 1.5pt solid #1e1b4b; padding-bottom: 3pt; text-transform: uppercase; }
            h4 { font-size: 11pt !important; color: #1e1b4b !important; font-weight: 900 !important; }
            p, td, li { font-size: 9pt !important; line-height: 1.4 !important; color: #334155 !important; }
            .font-black { font-weight: 900 !important; }
            
            .proposal-watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 90pt;
              font-weight: 900;
              color: rgba(30, 27, 75, 0.03);
              white-space: nowrap;
              z-index: -1;
              text-transform: uppercase;
              letter-spacing: 0.5em;
            }

            .letterhead-border { border-bottom: 3pt solid #1e1b4b !important; }
            .bg-slate-50 { background: #f8fafc !important; border: 0.5pt solid #e2e8f0 !important; border-radius: 12pt !important; }
            .bg-indigo-50\\/30 { background: #f5f3ff !important; border: 0.5pt solid #ddd6fe !important; border-radius: 12pt !important; }
            
            table { width: 100%; border-collapse: collapse !important; border: 1pt solid #1e1b4b !important; }
            th { background: #1e1b4b !important; color: white !important; padding: 8pt !important; text-align: left; font-size: 8pt !important; text-transform: uppercase; }
            td { padding: 8pt !important; border-bottom: 0.5pt solid #e2e8f0 !important; }
            
            .page-break { page-break-before: always; }
            .card-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 12pt; }
            .feature-grid { display: grid; grid-template-cols: 1fr 1fr 1fr; gap: 10pt; }
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
              <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Nuclear Upgrade v3.0</h1>
              <div className="flex gap-4">
                <button onClick={() => setData({...data, packageTier: 'standard'})} className={`text-[10px] font-black uppercase tracking-widest ${data.packageTier === 'standard' ? 'text-indigo-600' : 'text-slate-400'}`}>Standard Hub</button>
                <button onClick={() => setData({...data, packageTier: 'premium'})} className={`text-[10px] font-black uppercase tracking-widest ${data.packageTier === 'premium' ? 'text-indigo-600' : 'text-slate-400'}`}>Premium OS</button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <input 
               type="text" 
               placeholder="School Name"
               value={data.schoolName}
               onChange={(e) => setData({...data, schoolName: e.target.value})}
               className="bg-slate-50 border-none rounded-lg p-2 text-xs font-bold w-48 focus:ring-2 focus:ring-indigo-600"
             />
             <button onClick={handlePrint} className="flex items-center gap-2 bg-[#1e1b4b] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
              <Printer className="w-4 h-4" /> Print HD OS Proposal
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 print:p-0">
        <div className="max-w-[210mm] mx-auto document-preview print:shadow-none print:rounded-none">
          <div className="relative p-16 print:p-0 overflow-hidden">
            <div className="proposal-watermark hidden print:block">DAR-ARK BYTE</div>
            
            <div className="relative z-10 space-y-8">
              {/* LETTERHEAD */}
              <header className="flex justify-between items-start border-b-[3pt] border-[#1e1b4b] pb-8 letterhead-border">
                <div>
                  <h2 className="text-5xl font-black text-[#1e1b4b] tracking-tighter uppercase leading-tight">Dar-Ark Byte</h2>
                  <p className="text-[#d946ef] font-black text-[10px] uppercase tracking-[0.4em]">Integrated School Operating System</p>
                  <div className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                     Trans Ekulu, Enugu <br />
                     {data.phone1} | {data.phone2} <br />
                     {data.email}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-base uppercase tracking-widest border-b-2 border-indigo-600 pb-1 inline-block">Official OS Proposal</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{data.date}</p>
                </div>
              </header>

              <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 uppercase border-none m-0 p-0 tracking-widest">The All-In-One School Operating System</h3>
              </div>

              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Strategic Partner:</p>
                <h4 className="text-3xl font-black text-slate-900">{data.schoolName || '_____________________________________'}</h4>
              </div>

              {/* PAGE 1: THE STRATEGY */}
              <section className="space-y-6">
                <h3 className="text-lg font-black text-[#1e1b4b]">1. Digital Identity & Learning Portals</h3>
                <p className="text-slate-600 font-medium text-xs leading-relaxed">
                  We are not just providing software; we are deploying a **School Operating System (OS)**. 
                  This transformation unifies your website, learning portals, and management into one high-performance ecosystem.
                </p>
                
                <div className="grid grid-cols-2 gap-6 card-grid">
                   <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 space-y-2">
                      <h4 className="flex items-center gap-2 uppercase tracking-tighter"><Globe className="w-4 h-4 text-indigo-600" /> School Global Identity</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Bespoke, SEO-optimized website with integrated Online Admissions and high-fidelity branding.</p>
                   </div>
                   <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 space-y-2">
                      <h4 className="flex items-center gap-2 uppercase tracking-tighter"><GraduationCap className="w-4 h-4 text-indigo-600" /> Student Learning Portal</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Direct dashboards for students to access lesson notes, assignments, and study materials 24/7.</p>
                   </div>
                </div>
              </section>

              {/* PRODUCTIVITY & CBT */}
              <section className="space-y-6">
                <div className="grid grid-cols-2 gap-6 card-grid">
                   <div className="p-6 border-l-4 border-indigo-600 bg-white shadow-sm space-y-2">
                      <h4 className="flex items-center gap-2 uppercase tracking-tighter"><BookOpen className="w-4 h-4 text-indigo-600" /> Teacher Productivity Suite</h4>
                      <ul className="text-[9px] text-slate-500 space-y-1 list-disc pl-4 font-bold">
                        <li>Lesson Note Upload & Management</li>
                        <li>Assignment Distribution & Homework Tracking</li>
                        <li>Auto-Marking Engine for Quizzes</li>
                      </ul>
                   </div>
                   <div className="p-6 border-l-4 border-[#d946ef] bg-white shadow-sm space-y-2">
                      <h4 className="flex items-center gap-2 uppercase tracking-tighter"><Zap className="w-4 h-4 text-[#d946ef]" /> Advanced CBT Exam Engine</h4>
                      <ul className="text-[9px] text-slate-500 space-y-1 list-disc pl-4 font-bold">
                        <li>JAMB/WAEC Style Practice Interface</li>
                        <li>Online Examinations with Auto-Grading</li>
                        <li>Instant High-Resolution Results</li>
                      </ul>
                   </div>
                </div>
              </section>

              {/* PAGE 2: CORE INFRASTRUCTURE */}
              <section className="space-y-6 page-break pt-12">
                <h3 className="text-lg font-black text-[#1e1b4b]">2. The Unbeatable System Ecosystem</h3>
                <div className="grid grid-cols-3 gap-6 feature-grid">
                  {[
                    { icon: <BarChart3 className="w-4 h-4"/>, title: 'Owner Analytics', desc: 'Revenue tracking, attendance trends, and conversion data for school owners.' },
                    { icon: <MessageSquare className="w-4 h-4"/>, title: 'Communication Hub', desc: 'SMS + In-app messaging and teacher-parent controlled chat.' },
                    { icon: <ShieldCheck className="w-4 h-4"/>, title: 'Role-Based Security', desc: 'Granular permissions for Admins, Teachers, Parents, and Students.' },
                    { icon: <Building className="w-4 h-4"/>, title: 'Multi-Branch Command', desc: 'Manage multiple campuses and branches from a single unified hub.' },
                    { icon: <CreditCard className="w-4 h-4"/>, title: 'Smart Finance', desc: 'Cashless e-wallets and automated term-end fee invoicing.' },
                    { icon: <FileText className="w-4 h-4"/>, title: 'Document Lab', desc: 'Auto-generation of Transcripts, ID Cards, and Graduation Certificates.' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-2">
                      <div className="text-indigo-600">{item.icon}</div>
                      <p className="font-black text-slate-900 text-[10px] uppercase tracking-tight">{item.title}</p>
                      <p className="text-[9px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FUTURE SKILLS (IF PREMIUM) */}
              {data.packageTier === 'premium' && (
                <section className="space-y-4 bg-[#1e1b4b] p-8 rounded-[32px] text-white">
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter border-white/20 m-0 pb-2">Future-Skills OS Integration 🤖💻</h3>
                  <div className="grid grid-cols-2 gap-8 card-grid">
                    <div className="space-y-2">
                      <p className="font-black text-[#d946ef] text-[10px] uppercase tracking-widest">Coding Mastery</p>
                      <p className="text-[10px] text-slate-300 leading-relaxed">Full-stack software development tracks integrated into the school timetable.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-black text-[#d946ef] text-[10px] uppercase tracking-widest">Robotics & AI</p>
                      <p className="text-[10px] text-slate-300 leading-relaxed">Hardware engineering and AI logic fundamentals using international kits.</p>
                    </div>
                  </div>
                </section>
              )}

              {/* FINANCIALS */}
              <section className="space-y-4 page-break pt-12">
                 <h3 className="text-lg font-black text-[#1e1b4b]">Investment & Licensing</h3>
                 <div className="overflow-hidden rounded-[24px] border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-5">OS Package Description</th>
                          <th className="p-5 text-right">Investment (₦)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-bold">
                         <tr className="border-b border-slate-100">
                           <td className="p-6">
                              <p className="font-black text-slate-900 text-sm">{data.packageTier === 'premium' ? 'Premium Learning & Robotics OS' : 'Standard School Operating System'}</p>
                              <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Zero Upfront Cost — Per-Student Usage Fee</p>
                           </td>
                           <td className="p-6 text-right font-black text-slate-900 text-base">₦{currentFee}</td>
                         </tr>
                      </tbody>
                    </table>
                 </div>
              </section>

              {/* PROOF OF EXCELLENCE */}
              <section className="space-y-6">
                 <h3 className="text-lg font-black text-[#1e1b4b]">Proof of Output Excellence</h3>
                 <div className="relative rounded-[32px] overflow-hidden border-2 border-slate-100 bg-slate-50 p-8 text-center">
                    <img src={resultTemplateImg} alt="Result Template" className="w-full h-auto rounded-xl shadow-sm border border-slate-200" />
                    <p className="mt-4 text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">High-Fidelity Automated Academic Output</p>
                 </div>
              </section>

              {/* CONCLUSION */}
              <section className="space-y-6 pt-6 border-t border-slate-100">
                 <p className="text-xs font-medium text-slate-700 leading-relaxed italic border-l-4 border-indigo-600 pl-4">
                   This system transforms your institution from a physical school into a **Digital Learning Powerhouse**. By adopting the Dar-Ark Byte OS, you position your school as an unbeatable leader in the 21st-century educational landscape.
                 </p>
                 <div className="flex justify-between items-end">
                    <div>
                      <p className="font-black text-slate-900 uppercase tracking-tighter text-xl">Dar-Ark Byte OS</p>
                      <p className="text-[10px] font-bold text-[#d946ef] uppercase tracking-widest italic">The Future of School Operations</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Confidential Corporate Strategy</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">v3.0 Production Build</p>
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
