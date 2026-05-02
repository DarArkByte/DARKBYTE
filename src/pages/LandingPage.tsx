import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
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
  MessageCircle
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function LandingPage() {
  const navigate = useNavigate();

  const services = [
    { icon: GraduationCap, title: 'School ERP Portal', desc: 'Complete result processing, finance, and staff management.' },
    { icon: Cpu, title: 'Robotics & Coding', desc: 'Preparing students for the future with hands-on technical skills.' },
    { icon: Code, title: 'App Development', desc: 'Custom Mobile, Web, and Desktop applications for your business.' },
    { icon: Monitor, title: 'CBT Training & Exams', desc: 'Professional computer-based testing and examination services.' },
  ];

  const reviews = [
    { name: 'Dr. Samuel Okoro', role: 'Principal, Excel Academy', text: 'Dar-Ark Bytes transformed our result processing from weeks to just minutes. Highly recommended!' },
    { name: 'Engr. Fatima B.', role: 'CEO, TechFlow Ltd', text: 'The mobile app they built for us is world-class. Fast, secure, and very professional.' },
    { name: 'Mrs. Adebayo', role: 'Proprietress', text: 'Their Robotics training for our students was the highlight of the session. Incredible expertise.' },
  ];

  return (
    <div className="min-h-screen bg-[#1e1b4b] text-white font-sans overflow-x-hidden selection:bg-[#d946ef] selection:text-white">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#d946ef]/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 120, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" 
        />
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        href="https://wa.me/2349169600724" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] p-4 rounded-full shadow-2xl transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-white font-black whitespace-nowrap ml-0 group-hover:ml-2">
          WhatsApp Us
        </span>
      </motion.a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#1e1b4b]/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="bg-[#d946ef] p-2 rounded-xl shadow-lg shadow-magenta-500/20">
               <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Dar-Ark Bytes</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <a href="#services" className="hover:text-[#d946ef] transition-colors">Services</a>
            <a href="#reviews" className="hover:text-[#d946ef] transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-[#d946ef] transition-colors">Contact</a>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="bg-[#d946ef] text-white px-8 py-2.5 rounded-full hover:bg-[#c026d3] transition-all shadow-lg shadow-magenta-500/20"
            >
              Portal Login
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-60 pb-40 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#facc15] font-black uppercase tracking-[0.4em] mb-6 text-xs"
            >
              Innovation Meets Education
            </motion.h2>
            <h1 className="text-6xl md:text-[9rem] font-black leading-[0.85] mb-12 tracking-tighter">
              BEYOND <br />
              <motion.span 
                animate={{ 
                  backgroundImage: [
                    'linear-gradient(to right, #fff, #94a3b8)',
                    'linear-gradient(to right, #d946ef, #4f46e5)',
                    'linear-gradient(to right, #fff, #94a3b8)'
                  ] 
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="text-transparent bg-clip-text"
              >
                TECHNOLOGY.
              </motion.span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
              We specialize in School ERP systems, Robotics & Coding Academy, and Enterprise Application Development.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-white text-[#1e1b4b] px-14 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all"
              >
                ACCESS PORTAL
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#services"
                className="bg-white/5 border border-white/10 text-white px-14 py-6 rounded-3xl font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-xl"
              >
                OUR SERVICES
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 relative z-10 border-t border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-[#d946ef] font-black uppercase tracking-widest text-xs mb-4">Core Expertise</h2>
              <h3 className="text-6xl font-black tracking-tighter mb-10 leading-tight">Advanced Digital <br /> Solutions for All.</h3>
              <p className="text-slate-400 font-medium text-xl leading-relaxed mb-14">
                At Dar-Ark Bytes, we build the infrastructure for the future of education across Nigeria.
              </p>
              <div className="space-y-8">
                {['Custom School Management Systems', 'Professional Mobile App Development', 'CBT Examination Infrastructure', 'Robotics & STEAM Education'].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    key={i} 
                    className="flex items-center gap-5 group"
                  >
                    <div className="bg-[#facc15]/20 p-2 rounded-lg group-hover:bg-[#facc15] transition-all">
                       <CheckCircle2 className="w-6 h-6 text-[#facc15] group-hover:text-slate-900 transition-colors" />
                    </div>
                    <span className="font-bold text-slate-200 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-8"
            >
              {services.map((s, i) => (
                <motion.div 
                  variants={fadeInUp}
                  key={i} 
                  className="bg-white/5 border border-white/10 p-10 rounded-[48px] hover:border-[#d946ef]/50 transition-all group backdrop-blur-3xl"
                >
                  <div className="bg-[#d946ef] w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-magenta-500/20 group-hover:rotate-6 transition-transform">
                    <s.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-black mb-4">{s.title}</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-40 px-6 relative z-10 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <h2 className="text-[#facc15] font-black uppercase tracking-widest text-xs mb-4">Testimonials</h2>
            <h3 className="text-6xl font-black tracking-tighter">What Clients Say</h3>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10">
            {reviews.map((r, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                key={i} 
                className="bg-[#1e1b4b]/40 p-12 rounded-[56px] border border-white/10 backdrop-blur-3xl hover:bg-[#1e1b4b]/60 transition-all"
              >
                <div className="flex gap-1.5 mb-8">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 text-[#facc15] fill-[#facc15]" />)}
                </div>
                <p className="text-slate-300 font-bold leading-relaxed mb-10 italic text-lg">"{r.text}"</p>
                <div>
                  <p className="font-black text-white text-xl">{r.name}</p>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2">{r.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-[#d946ef] w-24 h-24 rounded-[36px] flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-magenta-500/40 animate-bounce">
             <Phone className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-7xl font-black tracking-tighter mb-10 italic">Ready to Start?</h2>
          <p className="text-2xl text-slate-400 mb-16 font-medium leading-relaxed">
            Contact Dar-Ark Bytes Technology today for your School Portal, Website, or App Development project.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 p-10 rounded-[48px] border border-white/10 backdrop-blur-xl">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Main Office</p>
               <p className="text-2xl font-black text-white">+234 916 960 0724</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 p-10 rounded-[48px] border border-white/10 backdrop-blur-xl">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Technical Support</p>
               <p className="text-2xl font-black text-white">+234 903 925 6458</p>
            </motion.div>
          </div>
          <motion.button 
            whileHover={{ letterSpacing: "0.5em" }}
            onClick={() => window.location.href = 'mailto:info@dararkbytes.com'}
            className="text-slate-400 font-black uppercase tracking-[0.3em] hover:text-white transition-all duration-300"
          >
            info@dararkbytes.com
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
             <div className="bg-white/10 p-2 rounded-xl">
                <GraduationCap className="w-6 h-6 text-[#d946ef]" />
             </div>
             <span className="text-lg font-black tracking-tighter uppercase">Dar-Ark Bytes Tech</span>
          </div>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
            © 2026 DAR-ARK BYTES ENTERPRISE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
