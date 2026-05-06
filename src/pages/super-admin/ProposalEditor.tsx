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
            
            h2 { font-size: 28pt !important; line-height: 1.1 !important; color: #1e1b4b !important; }
            h3 { font-size: 18pt !important; color: #1e1b4b !important; margin-top: 20pt !important; border-bottom: 1pt solid #eee; padding-bottom: 5pt; }
            h4 { font-size: 12pt !important; color: #1e1b4b !important; font-weight: 900 !important; }
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
            .bg-slate-50 { background: #f8fafc !important; border: 0.5pt solid #e2e8f0 !important; border-radius: 15pt !important; }
            .bg-indigo-50\\/30 { background: #f5f3ff !important; border: 0.5pt solid #ddd6fe !important; border-radius: 15pt !important; }
            
            table { width: 100%; border-collapse: collapse !important; border: 1pt solid #1e1b4b !important; }
            th { background: #1e1b4b !important; color: white !important; padding: 10pt !important; text-align: left; font-size: 9pt !important; text-transform: uppercase; }
            td { padding: 10pt !important; border-bottom: 0.5pt solid #e2e8f0 !important; }
            
            .page-break { page-break-before: always; }
            .card-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15pt; }
          }
          
          .screen-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
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
              <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">Proposal Architect</h1>
              <div className="flex gap-4">
                <button onClick={() => setData({...data, packageTier: 'standard'})} className={`text-[10px] font-black uppercase tracking-widest ${data.packageTier === 'standard' ? 'text-indigo-600' : 'text-slate-400'}`}>Standard</button>
                <button onClick={() => setData({...data, packageTier: 'premium'})} className={`text-[10px] font-black uppercase tracking-widest ${data.packageTier === 'premium' ? 'text-indigo-600' : 'text-slate-400'}`}>Premium</button>
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
              <Printer className="w-4 h-4" /> Print HD Document
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 print:p-0">
        <div className="max-w-[210mm] mx-auto document-preview print:shadow-none print:rounded-none">
          <div className="relative p-16 print:p-0 overflow-hidden">
            <div className="proposal-watermark hidden print:block">DAR-ARK BYTE</div>
            
            <div className="relative z-10 space-y-10">
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
                  <p className="font-black text-slate-900 text-lg">Official Corporate Proposal</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.date}</p>
                </div>
              </header>

              {/* TITLE */}
              <div className="text-center py-6 border-b border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 uppercase border-none m-0 p-0">Digital Transformation Solution</h3>
              </div>

              {/* RECIPIENT */}
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prepared For:</p>
                <h4 className="text-3xl font-black text-slate-900">{data.schoolName || '_____________________________________'}</h4>
              </div>

              {/* PAGE 1: EXECUTIVE OVERVIEW */}
              <section className="space-y-6">
                <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">1. Executive Overview</h3>
                <p className="text-slate-600 font-medium">
                  This proposal provides a complete digital transformation for your institution—streamlining academic operations, improving parent engagement, and positioning your school as a modern, forward-thinking brand.
                </p>
                
                <div className="grid grid-cols-2 gap-8 card-grid">
                   <div className="space-y-2">
                      <h4 className="flex items-center gap-2 underline">Digital Identity 🌐</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Bespoke, SEO-optimized school website to showcase your brand professionally and enable seamless online admissions.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="flex items-center gap-2 underline">Parent Mobile Access 📱</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Real-time access to student results, attendance tracking, and instant notifications via our Parent App (PWA).</p>
                   </div>
                </div>

                {data.packageTier === 'premium' && (
                  <div className="bg-indigo-50/30 p-8 rounded-[32px] border border-indigo-100 space-y-4">
                    <h4 className="flex items-center gap-2 text-indigo-900 uppercase tracking-tight"><Cpu className="w-5 h-5" /> Future-Skills Integration 🤖💻</h4>
                    <div className="grid grid-cols-2 gap-6 card-grid">
                       <p className="text-xs text-slate-600 font-medium leading-relaxed"><b>Coding Programs:</b> Python, JavaScript, and Web Development tracks.</p>
                       <p className="text-xs text-slate-600 font-medium leading-relaxed"><b>Robotics & AI:</b> Hands-on hardware learning and automation logic.</p>
                    </div>
                  </div>
                )}
              </section>

              {/* PAGE 2: INFRASTRUCTURE */}
              <section className="space-y-8 page-break pt-16">
                <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">2. Operational Infrastructure</h3>
                <div className="grid grid-cols-2 gap-8 card-grid">
                  {[
                    { title: 'Academic Intelligence', desc: 'Automated result computation, grading, and advanced performance analytics.' },
                    { title: 'Smart Finance & Wallet', desc: 'Cashless fee payments and digital student wallets with full reporting.' },
                    { title: 'Security & Attendance', desc: 'Daily tracking with automated SMS alerts to parents for safety monitoring.' },
                    { title: 'Administrative Command', desc: 'Staff payroll management and centralized school control tools.' },
                    { title: 'Admission Gateway', desc: 'Digital admission funnels and streamlined enrollment tracking.' },
                    { title: 'Parent Experience', desc: 'Mobile-first insights and easy communication with school management.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-1" />
                      <div>
                        <p className="font-black text-slate-900 text-sm mb-1 uppercase tracking-tight">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FINANCIALS */}
              <section className="space-y-6">
                 <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">Financial Investment</h3>
                 <div className="overflow-hidden rounded-[32px] border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-[#1e1b4b] text-white">
                        <tr>
                          <th className="p-6">Package Tier</th>
                          <th className="p-6 text-right">Investment per Student (₦)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-bold">
                         <tr>
                           <td className="p-6">
                              <p className="font-black text-slate-900">{data.packageTier === 'premium' ? 'Premium Robotics Bundle' : 'Standard ERP Package'}</p>
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Zero Upfront Cost — Pay based on usage</p>
                           </td>
                           <td className="p-6 text-right font-black text-slate-900 text-lg">₦{currentFee}</td>
                         </tr>
                      </tbody>
                    </table>
                 </div>
              </section>

              {/* PAGE 3: PROOF OF EXCELLENCE */}
              <section className="space-y-6 page-break pt-16">
                 <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">3. Proof of Excellence</h3>
                 <p className="text-sm font-medium text-slate-600">We don’t just promise quality—we demonstrate it with visually superior academic outputs.</p>
                 <div className="relative rounded-[40px] overflow-hidden border-2 border-slate-100 bg-slate-50 p-10 text-center">
                    <img src={resultTemplateImg} alt="Result Template" className="w-full h-auto rounded-2xl shadow-sm border border-slate-200 mb-4" />
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Proprietary High-Fidelity Result Matrix</p>
                 </div>
              </section>

              {/* CONCLUSION */}
              <section className="space-y-6 pt-10 border-t border-slate-100">
                 <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">Conclusion</h3>
                 <p className="text-sm font-medium text-slate-700 leading-relaxed">
                   By adopting this system, your school will operate more efficiently, improve communication with parents, and position itself as a leader in modern education. This is more than a document—it is a complete transformation strategy.
                 </p>
                 <div className="pt-6">
                    <p className="font-black text-slate-900 uppercase tracking-tighter text-lg">Dar-Ark Byte</p>
                    <p className="text-xs font-bold text-[#d946ef] uppercase tracking-widest italic">Innovating Education Through Technology</p>
                 </div>
              </section>

              {/* FOOTER */}
              <footer className="pt-10 flex justify-between items-center text-slate-400 border-t border-slate-50">
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
