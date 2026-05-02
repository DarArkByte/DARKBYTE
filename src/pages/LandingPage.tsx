import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Globe, 
  ShoppingBag, 
  ChevronRight, 
  Smartphone, 
  ShieldCheck, 
  Zap,
  Phone,
  MessageSquare,
  Cpu,
  Code,
  Monitor,
  CheckCircle2,
  Star,
  Layout,
  MessageCircle
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#1e1b4b] text-white font-sans overflow-x-hidden">
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/2349169600724" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-white font-black whitespace-nowrap ml-0 group-hover:ml-2">
          WhatsApp Us
        </span>
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#1e1b4b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#d946ef] p-2 rounded-xl">
               <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Dar-Ark Bytes</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <a href="#services" className="hover:text-[#d946ef] transition-colors">Services</a>
            <a href="#reviews" className="hover:text-[#d946ef] transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-[#d946ef] transition-colors">Contact</a>
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#d946ef] text-white px-8 py-2.5 rounded-full hover:bg-[#c026d3] transition-all shadow-lg shadow-magenta-500/20 active:scale-95"
            >
              Portal Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-[#d946ef]/10 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-[#facc15] font-black uppercase tracking-[0.3em] mb-6 text-xs">Innovation Meets Education</h2>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">TECHNOLOGY.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              We specialize in School ERP systems, Robotics & Coding Academy, and Enterprise Application Development (Mobile, Web & Desktop).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/login')}
                className="bg-white text-[#1e1b4b] px-12 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-2xl active:scale-95"
              >
                ACCESS PORTAL
              </button>
              <a 
                href="#services"
                className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                OUR SERVICES
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-[#d946ef] font-black uppercase tracking-widest text-xs mb-4">Core Expertise</h2>
              <h3 className="text-5xl font-black tracking-tighter mb-8 leading-tight">Advanced Digital <br /> Solutions for All.</h3>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-12">
                At Dar-Ark Bytes, we don't just build software; we build the infrastructure for the future of education and business across Nigeria.
              </p>
              <div className="space-y-6">
                {['Custom School Management Systems', 'Professional Mobile App Development', 'CBT Examination Infrastructure', 'Robotics & STEAM Education'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#facc15]" />
                    <span className="font-bold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:border-[#d946ef]/50 transition-all group">
                  <div className="bg-[#d946ef] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-magenta-500/20 group-hover:scale-110 transition-transform">
                    <s.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-black mb-3">{s.title}</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-32 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[#facc15] font-black uppercase tracking-widest text-xs mb-4">Testimonials</h2>
            <h3 className="text-5xl font-black tracking-tighter">What Clients Say</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="bg-[#1e1b4b] p-10 rounded-[48px] border border-white/10 relative">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-[#facc15] fill-[#facc15]" />)}
                </div>
                <p className="text-slate-300 font-bold leading-relaxed mb-8 italic">"{r.text}"</p>
                <div>
                  <p className="font-black text-white">{r.name}</p>
                  <p className="text-xs text-slate-500 font-black uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[#d946ef] w-20 h-20 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-magenta-500/30">
             <Phone className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-black tracking-tighter mb-8 italic">Ready to Start?</h2>
          <p className="text-xl text-slate-400 mb-12 font-medium">
            Contact Dar-Ark Bytes Technology today for your School Portal, Website, or App Development project.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Main Office</p>
               <p className="text-lg font-black text-white">+234 916 960 0724</p>
            </div>
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Technical Support</p>
               <p className="text-lg font-black text-white">+234 903 925 6458</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = 'mailto:info@dararkbytes.com'}
            className="text-slate-400 font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            info@dararkbytes.com
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 p-1.5 rounded-lg">
                <GraduationCap className="w-5 h-5 text-[#d946ef]" />
             </div>
             <span className="text-sm font-black tracking-tighter uppercase">Dar-Ark Bytes Tech</span>
          </div>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">
            © 2026 DAR-ARK BYTES ENTERPRISE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
