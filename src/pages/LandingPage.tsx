import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useSchool } from '../hooks/useSchool';
import { 
  GraduationCap, 
  Globe, 
  ChevronRight, 
  ShieldCheck, 
  Zap,
  Phone,
  Cpu,
  Code,
  Monitor,
  CheckCircle2,
  Star,
  MessageCircle,
  MapPin,
  Mail,
  ShieldAlert,
  Smartphone,
  Wallet,
  BookOpen,
  PieChart,
  Users,
  Settings,
  Rocket,
  Brain,
  Award
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
};

const slideInRight = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const zoomIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { school } = useSchool();
  
  const isCustomSchool = !!school && school.id !== 'demo-school';
  const schoolBranding = school?.branding;
  const identity = schoolBranding?.identity;

  const coreSystems = [
    { icon: Brain, title: 'Academic Intelligence', desc: 'Auto-grading & performance analytics.' },
    { icon: Monitor, title: 'CBT / Exam System', desc: 'Auto-marking WAEC/JAMB interface.' },
    { icon: BookOpen, title: 'Teacher Productivity', desc: 'Lesson note & assignment management.' },
    { icon: Smartphone, title: 'Student Portal', desc: '24/7 access to study materials & results.' },
    { icon: Wallet, title: 'Smart Finance', desc: 'Cashless fee payments & revenue tracking.' },
    { icon: ShieldCheck, title: 'Security & SMS', desc: 'Attendance & safety alerts to parents.' },
    { icon: Globe, title: 'Admission Gateway', desc: 'Complete digital enrollment funnel.' },
    { icon: MessageCircle, title: 'Communication Hub', desc: 'In-app chat & emergency broadcasts.' },
    { icon: FileText, title: 'Document Lab', desc: 'Instant Transcripts, ID Cards & Certificates.' },
    { icon: LayoutGrid, title: 'Multi-Campus Control', desc: 'Unified hub for multiple institutions.' },
    { icon: ShieldAlert, title: 'Access Control', desc: 'Enterprise-grade role-based security.' },
    { icon: Star, title: 'Branding & SEO', desc: 'School website & global visibility.' },
  ];

  const reviews = [
    { name: 'Dr. Samuel Okoro', role: 'Principal, Excel Academy', text: 'Dar-Ark Bytes transformed our result processing from weeks to just minutes. Highly recommended!' },
    { name: 'Engr. Fatima B.', role: 'CEO, TechFlow Ltd', text: 'The mobile app they built for us is world-class. Fast, secure, and very professional.' },
    { name: 'Mrs. Adebayo', role: 'Proprietress', text: 'Their Robotics training for our students was the highlight of the session. Incredible expertise.' },
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 120, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px]" 
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#111827]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-xl">
               <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">{school?.name || 'Dar-Ark Byte OS'}</span>
          </div>
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <a href="#ecosystem" className="hover:text-blue-500 transition-colors">OS Ecosystem</a>
            <a href="#robotics" className="hover:text-blue-500 transition-colors">Robotics Academy</a>
            <a href="#investment" className="hover:text-blue-500 transition-colors">Investment</a>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-10 py-3.5 rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20"
            >
              Portal Login
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-64 pb-48 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <motion.p variants={slideInLeft} className="text-blue-500 font-black uppercase tracking-[0.6em] mb-8 text-sm italic">The Future of Education is Here</motion.p>
            <motion.h1 variants={zoomIn} className="text-6xl md:text-[9rem] font-black leading-[0.85] mb-16 tracking-tighter uppercase italic">
              Strategic <br />
              <span className="text-blue-600">Transformation.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-400 mb-20 max-w-4xl mx-auto leading-relaxed font-medium">
              We deploy the complete **School Operating System**—unifying administration, future-ready learning, and parent-student engagement into one high-performance ecosystem.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-8 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-white text-[#111827] px-16 py-7 rounded-3xl font-black text-2xl shadow-[0_30px_100px_rgba(255,255,255,0.1)]"
              >
                ACCESS OS PORTAL
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#ecosystem"
                className="bg-white/5 border-2 border-white/10 text-white px-16 py-7 rounded-3xl font-black text-2xl hover:bg-white/10 backdrop-blur-xl transition-all"
              >
                EXPLORE FEATURES
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Operational Infrastructure (14 Pillars) */}
      <section id="ecosystem" className="py-48 px-6 relative z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-32 space-y-4">
             <motion.h2 variants={slideInLeft} className="text-blue-500 font-black uppercase tracking-widest text-sm">Operational Ecosystem</motion.h2>
             <motion.h3 variants={slideInRight} className="text-6xl font-black tracking-tighter">The 14 Core OS Pillars</motion.h3>
             <motion.p variants={zoomIn} className="text-slate-500 text-xl font-medium max-w-3xl mx-auto">Everything you need to run a modern, technology-driven institution in one unified platform.</p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {coreSystems.map((s, i) => (
              <motion.div 
                variants={zoomIn}
                key={i} 
                className="bg-white/[0.03] border border-white/10 p-10 rounded-[48px] hover:border-blue-500/50 transition-all group backdrop-blur-3xl"
              >
                <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-black mb-4 uppercase tracking-tighter italic">{s.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Robotics & Coding Section */}
      <section id="robotics" className="py-48 px-6 relative z-10 bg-blue-600 overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
           <Cpu className="w-[600px] h-[600px] text-white" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="grid lg:grid-cols-2 gap-32 items-center">
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-10">
                 <motion.h2 variants={slideInLeft} className="text-white/60 font-black uppercase tracking-widest text-sm italic">Premium Integration</motion.h2>
                 <motion.h3 variants={slideInLeft} className="text-7xl font-black tracking-tighter leading-none italic">Future-Ready <br /> <span className="text-[#facc15]">Robotics Academy.</span></motion.h3>
                 <motion.p variants={fadeInUp} className="text-white/80 text-2xl font-medium leading-relaxed italic">
                    We don't just build software; we build engineers. Our premium Robotics and Coding program equips students with real-world technical mastery.
                 </motion.p>
                 <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-8 pt-10">
                    <motion.div variants={zoomIn} className="bg-white/10 p-10 rounded-[40px] backdrop-blur-3xl border border-white/10">
                       <Code className="w-10 h-10 text-[#facc15] mb-6" />
                       <h4 className="text-2xl font-black mb-4 italic uppercase">Coding Mastery</h4>
                       <p className="text-white/60 text-sm leading-relaxed">Python, JavaScript, and Full-Stack development tracks for institutional deployment.</p>
                    </motion.div>
                    <motion.div variants={zoomIn} className="bg-white/10 p-10 rounded-[40px] backdrop-blur-3xl border border-white/10">
                       <Rocket className="w-10 h-10 text-[#facc15] mb-6" />
                       <h4 className="text-2xl font-black mb-4 italic uppercase">Hardware & AI</h4>
                       <p className="text-white/60 text-sm leading-relaxed">Hands-on robotics engineering, automated systems, and Artificial Intelligence foundations.</p>
                    </motion.div>
                 </motion.div>
              </motion.div>
              <motion.div variants={slideInRight} initial="initial" whileInView="whileInView" className="grid grid-cols-1 gap-6">
                 <div className="bg-white/5 rounded-[60px] p-4 border border-white/10 shadow-2xl overflow-hidden group">
                    <img 
                      src="/students_robotics_lab_1778070697763.png" 
                      alt="Students in Robotics Lab" 
                      className="w-full h-full object-cover rounded-[50px] transform group-hover:scale-105 transition-transform duration-700" 
                    />
                 </div>
                 <div className="bg-white/5 rounded-[60px] p-4 border border-white/10 shadow-2xl overflow-hidden group aspect-video">
                    <img 
                      src="/student_coding_presentation_1778070613247.png" 
                      alt="Student Coding Success" 
                      className="w-full h-full object-cover rounded-[50px] transform group-hover:scale-105 transition-transform duration-700" 
                    />
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Human Impact: Student & Teacher Comments */}
      <section className="py-40 px-6 relative z-10 border-t border-white/5">
         <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-24 space-y-4">
               <h2 className="text-blue-500 font-black uppercase tracking-widest text-sm italic">Voices of Impact</h2>
               <h3 className="text-6xl font-black tracking-tighter italic">From the Classroom to the World.</h3>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
               <motion.div variants={slideInLeft} className="bg-white/[0.02] p-12 rounded-[56px] border border-white/10 space-y-8">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-500/20 italic">CE</div>
                     <div>
                        <p className="font-black text-white text-xl">Chidera Eze</p>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">JSS3 Student</p>
                     </div>
                  </div>
                  <p className="text-slate-300 font-bold leading-relaxed italic text-xl italic">
                    "Before Dar-Ark Byte, Coding and Robotics felt like magic from the movies. Now, I am building my own apps and robots. I feel like I have a real future in tech!"
                  </p>
               </motion.div>

               <motion.div variants={slideInRight} className="bg-white/[0.02] p-12 rounded-[56px] border border-white/10 space-y-8">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-2xl bg-[#facc15] flex items-center justify-center font-black text-2xl text-slate-900 italic">MS</div>
                     <div>
                        <p className="font-black text-white text-xl">Mr. Segun</p>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Physics Teacher</p>
                     </div>
                  </div>
                  <p className="text-slate-300 font-bold leading-relaxed italic text-xl italic">
                    "The OS has removed the burden of paperwork. Result computation that used to take days now happens instantly. I can finally focus on teaching my students."
                  </p>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Financial Framework (Simplified) */}
      <section id="investment" className="py-48 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center space-y-24">
           <div className="space-y-4">
              <h2 className="text-blue-500 font-black uppercase tracking-widest text-sm">Strategic Investment</h2>
              <h3 className="text-6xl font-black tracking-tighter italic">Investment Framework</h3>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12">
              <motion.div {...fadeInUp} className="bg-white/[0.02] border-2 border-white/10 p-16 rounded-[60px] space-y-10 hover:border-blue-500/50 transition-all">
                 <div className="space-y-2">
                   <h4 className="text-3xl font-black italic uppercase">Standard OS</h4>
                   <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic">All Administrative Modules</p>
                 </div>
                 <div className="text-7xl font-black text-blue-500 italic">₦1,200<span className="text-xl text-slate-500">/Term</span></div>
                 <ul className="space-y-4 text-slate-400 font-medium text-sm">
                    <li className="flex items-center gap-3 justify-center italic"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Academic Intelligence</li>
                    <li className="flex items-center gap-3 justify-center italic"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Smart Finance System</li>
                    <li className="flex items-center gap-3 justify-center italic"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Parent/Student Portals</li>
                 </ul>
              </motion.div>
              <motion.div {...fadeInUp} className="bg-blue-600 p-16 rounded-[60px] space-y-10 shadow-3xl shadow-blue-500/40 transform scale-105 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Award className="w-32 h-32 text-white" />
                 </div>
                 <div className="space-y-2">
                   <h4 className="text-3xl font-black italic uppercase text-white">Premium OS</h4>
                   <p className="text-white/60 text-sm font-bold uppercase tracking-widest italic">Robotics & Coding Integration</p>
                 </div>
                 <div className="text-7xl font-black text-white italic">₦6,000<span className="text-xl text-white/60">/Term</span></div>
                 <ul className="space-y-4 text-white/80 font-medium text-sm">
                    <li className="flex items-center gap-3 justify-center italic"><CheckCircle2 className="w-4 h-4 text-[#facc15]" /> Robotics Lab Setup</li>
                    <li className="flex items-center gap-3 justify-center italic"><CheckCircle2 className="w-4 h-4 text-[#facc15]" /> Advanced AI Curriculum</li>
                    <li className="flex items-center gap-3 justify-center italic"><CheckCircle2 className="w-4 h-4 text-[#facc15]" /> Digital Proficiency Certs</li>
                 </ul>
              </motion.div>
           </div>
           
           <p className="text-slate-500 text-sm font-black uppercase tracking-widest italic">
              ✅ Zero Upfront Cost. ✅ Pay-As-You-Scale Model.
           </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
             <div className="bg-blue-600 p-2 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
             </div>
             <span className="text-2xl font-black tracking-tighter uppercase italic">{school?.name || 'Dar-Ark Byte OS'}</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
             <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
               © 2026 DAR-ARK BYTE SOLUTIONS | HIGH-FIDELITY ARCHITECTURAL DEPLOYMENT
             </p>
             <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-slate-500">
                <a href="#ecosystem" className="hover:text-white">Privacy Protocol</a>
                <a href="#robotics" className="hover:text-white">Service Infrastructure</a>
                <a href="#investment" className="hover:text-white">Investment Terms</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper icons that were missing
const FileText = ({ className }: { className?: string }) => <FileTextIcon className={className} />;
const LayoutGrid = ({ className }: { className?: string }) => <LayoutGridIcon className={className} />;
import { FileText as FileTextIcon, LayoutGrid as LayoutGridIcon } from 'lucide-react';
