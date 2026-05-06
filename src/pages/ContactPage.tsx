import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Phone, Mail, MapPin, Send, MessageCircle, Globe, Smartphone, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[150px] -mr-40 -mt-40" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px] -ml-40 -mb-40" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-[#111827]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-3 group text-slate-400 hover:text-white transition-all">
             <div className="p-2 bg-white/5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ArrowLeft className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-xl">
                <Globe className="w-6 h-6 text-white" />
             </div>
             <span className="text-xl font-black tracking-tighter uppercase italic">Dar-Ark Byte OS</span>
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-24">
              {/* Left Side: Info */}
              <motion.div initial="initial" animate="animate" className="space-y-16">
                 <div className="space-y-6">
                    <motion.h2 {...fadeInUp} className="text-blue-500 font-black uppercase tracking-[0.4em] text-sm italic">Contact Infrastructure</motion.h2>
                    <motion.h1 {...fadeInUp} className="text-7xl font-black tracking-tighter leading-none italic uppercase">
                       Let's Build the <br /> <span className="text-blue-600">Future.</span>
                    </motion.h1>
                    <motion.p {...fadeInUp} className="text-slate-400 text-xl font-medium leading-relaxed max-w-xl">
                       Whether you are a school owner, an enterprise CEO, or a tech visionary, our engineering team is ready to deploy your solution.
                    </motion.p>
                 </div>

                 <div className="grid gap-8">
                    {[
                      { icon: Phone, title: 'Voice & WhatsApp', value: '+234 916 960 0724', sub: 'Instant support & inquiries' },
                      { icon: Mail, title: 'Strategic Email', value: 'info@dararkbytes.com', sub: 'Official proposals & partnerships' },
                      { icon: MapPin, title: 'Operational Hub', value: 'Trans Ekulu, Enugu, Nigeria', sub: 'Global tech headquarters' },
                    ].map((item, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex items-center gap-8 group"
                      >
                         <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all shadow-2xl">
                            <item.icon className="w-8 h-8 text-blue-500 group-hover:text-white" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.title}</p>
                            <p className="text-2xl font-black text-white italic">{item.value}</p>
                            <p className="text-sm text-slate-500 italic">{item.sub}</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </motion.div>

              {/* Right Side: Form */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/[0.02] border border-white/10 p-12 rounded-[64px] backdrop-blur-3xl space-y-10"
              >
                 <div className="space-y-2">
                    <h3 className="text-3xl font-black italic uppercase">Inquiry Portal</h3>
                    <p className="text-slate-500 text-sm font-medium italic">Secure transmission via Dar-Ark encryption.</p>
                 </div>

                 <form className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all" placeholder="John Doe" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                          <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all" placeholder="john@company.com" />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Project Type</label>
                       <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all text-slate-400">
                          <option>School Operating System</option>
                          <option>Robotics Academy Deployment</option>
                          <option>Enterprise E-Commerce</option>
                          <option>AI / Custom App Development</option>
                       </select>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message</label>
                       <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Describe your vision..." />
                    </div>

                    <button className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl uppercase italic shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 group transition-all hover:bg-blue-700">
                       Deploy Inquiry
                       <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                 </form>
              </motion.div>
           </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center relative z-10">
         <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">© 2026 DAR-ARK BYTES TECHNOLOGY | SECURE PORTAL</p>
      </footer>
    </div>
  );
}
