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
    <div className="space-y-8 pb-24 font-sans print:p-0 print:m-0 print:bg-white">
      <style>
        {`
          @media print {
            body { background: white !important; margin: 0; padding: 0; }
            .print\\:hidden { display: none !important; }
            .bg-white { box-shadow: none !important; border: none !important; }
            .shadow-2xl { box-shadow: none !important; }
            .rounded-\\[48px\\], .rounded-\\[40px\\] { border-radius: 0 !important; }
            .lg\\:col-span-2 { width: 100% !important; margin: 0 !important; padding: 0 !important; }
            
            .page-break { page-break-before: always; }
            
            .proposal-watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 120px;
              font-weight: 900;
              color: rgba(30, 27, 75, 0.03);
              white-space: nowrap;
              z-index: -1;
              pointer-events: none;
              text-transform: uppercase;
              letter-spacing: 0.5em;
            }

            header.letterhead { border-bottom: 4px solid #1e1b4b !important; margin-bottom: 40px; }
            .bg-slate-50 { background: white !important; border: 1px solid #eee !important; }
            table { border: 1px solid #1e1b4b !important; }
            th { background: #1e1b4b !important; color: white !important; -webkit-print-color-adjust: exact; }
          }
        `}
      </style>
      
      <header className="flex items-center justify-between bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/super-admin" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Proposal Architect</h1>
            <p className="text-slate-500 font-bold text-sm">Package: {data.packageTier.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={handlePrint} className="flex items-center gap-2 bg-[#1e1b4b] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20">
            <Printer className="w-4 h-4" /> Export as PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6 print:hidden">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Configuration</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Phone 1</label>
                  <input 
                    type="text" 
                    value={data.phone1}
                    onChange={(e) => setData({...data, phone1: e.target.value})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Phone 2</label>
                  <input 
                    type="text" 
                    value={data.phone2}
                    onChange={(e) => setData({...data, phone2: e.target.value})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Package Tier</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setData({...data, packageTier: 'standard'})}
                    className={`p-3 rounded-xl font-black text-[10px] uppercase transition-all ${data.packageTier === 'standard' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
                  >
                    Standard (₦1.2k)
                  </button>
                  <button 
                    onClick={() => setData({...data, packageTier: 'premium'})}
                    className={`p-3 rounded-xl font-black text-[10px] uppercase transition-all ${data.packageTier === 'premium' ? 'bg-[#d946ef] text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
                  >
                    Premium (₦6k)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Target Institution</label>
                <input 
                  type="text" 
                  value={data.schoolName}
                  onChange={(e) => setData({...data, schoolName: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[48px] shadow-2xl border border-slate-100 p-16 overflow-hidden relative print:shadow-none print:border-none print:rounded-none print:p-0">
          <div className="proposal-watermark hidden print:block">DAR-ARK BYTE</div>
          
          <div className="relative z-10 space-y-12">
            <header className="flex justify-between items-start border-b-4 border-[#1e1b4b] pb-10 letterhead">
              <div>
                <h2 className="text-4xl font-black text-[#1e1b4b] tracking-tighter uppercase">Dar-Ark Byte</h2>
                <p className="text-[#d946ef] font-black text-xs uppercase tracking-[0.3em]">Intelligence For Modern Schools</p>
                <div className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                   12 Digital Excellence Way, Lagos <br />
                   {data.phone1} | {data.phone2} <br />
                   {data.email}
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900">Official Proposal</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.date}</p>
                {data.packageTier === 'premium' && (
                  <span className="inline-block mt-2 px-3 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full">Future-Skills Tier</span>
                )}
              </div>
            </header>

            <section className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Prepared For:</p>
                <h3 className="text-3xl font-black text-slate-900">{data.schoolName || '_____________________________________'}</h3>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-[32px] space-y-4 border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" /> Executive Summary
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  We are presenting Dar-Ark Byte, the ultimate School Intelligence Ecosystem. 
                  {data.packageTier === 'premium' ? (
                    " This Premium Package integrates our world-class ERP with a specialized Coding and Robotics curriculum, equipping every student with industry-ready technical skills."
                  ) : (
                    " Our Zero-Upfront model ensures your school transitions to digital excellence without financial strain."
                  )}
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter flex items-center gap-2">
                <Globe className="w-6 h-6 text-indigo-600" /> Digital Identity & Mobile Access
              </h3>
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 space-y-2">
                    <p className="font-black text-indigo-900 text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <Zap className="w-3 h-3" /> Bespoke School Website
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      A premium, SEO-optimized web presence for the institution, featuring online admission funnels and a dynamic news/gallery engine.
                    </p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 space-y-2">
                    <p className="font-black text-indigo-900 text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <Smartphone className="w-3 h-3" /> The Parent Mobile App
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      Instant PWA mobile access for parents to track attendance, pay fees, and monitor student performance in real-time.
                    </p>
                 </div>
              </div>
            </section>

            {data.packageTier === 'premium' && (
              <section className="space-y-6 bg-indigo-50/30 p-8 rounded-[40px] border border-indigo-100">
                <h3 className="text-xl font-black text-indigo-900 uppercase tracking-tighter flex items-center gap-2">
                  <Cpu className="w-6 h-6" /> Coding & Robotics Integration
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2"><Code2 className="w-4 h-4 text-[#d946ef]" /> Modern Coding</p>
                    <p className="text-[11px] text-slate-500 font-medium">Python, JavaScript, and Web Development tracks for all grade levels.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2"><Cpu className="w-4 h-4 text-[#d946ef]" /> Robotics & AI</p>
                    <p className="text-[11px] text-slate-500 font-medium">Hands-on hardware programming, circuit design, and AI logic fundamentals.</p>
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-8 page-break pt-12">
              <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter border-b-2 border-slate-100 pb-2">Platform Ecosystem Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Academic Intelligence', desc: 'Automated result processing with Student Weakness Analysis.' },
                  { title: 'Smart Finance & Wallet', desc: 'Cashless school ecosystem with parent e-wallets.' },
                  { title: 'Security & Attendance', desc: 'Real-time attendance with instant SMS alerts to parents.' },
                  { title: 'Administrative Command', desc: 'Centralized staff payroll and role-based access.' },
                  { title: 'Admission Gateway', desc: 'Hybrid digital/physical admission funnel.' },
                  { title: 'Parent Experience', desc: 'Mobile-friendly portals for real-time tracking.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm mb-1 uppercase tracking-tight">{item.title}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
               <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">Financial Investment</h3>
               <div className="overflow-hidden rounded-[32px] border border-slate-100">
                  <table className="w-full text-left">
                    <thead className="bg-[#1e1b4b] text-white">
                      <tr>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest">Service Item</th>
                        <th className="p-5 text-right text-[10px] font-black uppercase tracking-widest">Investment (₦)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 bg-slate-50/30">
                       <tr className={data.packageTier === 'premium' ? 'bg-indigo-50/50' : ''}>
                         <td className="p-5">
                            <p className="font-black text-slate-900 text-sm">
                              {data.packageTier === 'premium' ? 'Premium Robotics & Coding Bundle' : 'Standard ERP Usage Fee'}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400">
                              {data.packageTier === 'premium' ? 'Includes Full ERP + School Website + Parent App' : 'Processing fee per student per term'}
                            </p>
                         </td>
                         <td className="p-5 text-right font-black text-slate-900">₦{currentFee}</td>
                       </tr>
                    </tbody>
                  </table>
               </div>
            </section>

            <section className="space-y-6 page-break pt-12">
               <h3 className="text-xl font-black text-[#1e1b4b] uppercase tracking-tighter">Sample Academic Output</h3>
               <div className="relative rounded-[32px] overflow-hidden border-2 border-slate-100 bg-slate-50 p-6">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <img src={resultTemplateImg} alt="Result Template" className="w-full h-auto" />
                  </div>
                  <p className="mt-4 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] text-center">High-Fidelity Automated Result Matrix</p>
               </div>
            </section>

            <footer className="pt-10 border-t border-slate-100 flex justify-between items-center">
               <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} Dar-Ark Byte Intelligence
               </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
