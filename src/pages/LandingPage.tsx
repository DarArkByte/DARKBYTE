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
  MessageSquare
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1e1b4b] text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#1e1b4b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-magenta-500 to-indigo-600 p-2 rounded-xl">
               <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Dar-Ark Bytes</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-300">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#d946ef] hover:bg-[#c026d3] text-white px-8 py-3 rounded-full transition-all shadow-lg shadow-magenta-500/20 active:scale-95"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#d946ef]/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-[#facc15] font-black uppercase tracking-[0.2em] mb-4 text-sm">Technology Solution</h2>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight">
              DO YOU NEED A <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">COOL WEBSITE?</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed font-medium">
              We build premium School Portals, E-Commerce platforms, and corporate websites tailored to your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="group bg-[#d946ef] text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#c026d3] transition-all shadow-2xl shadow-magenta-500/40 active:scale-95"
              >
                LEARN MORE
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="bg-[#facc15] p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Direct Line</p>
                  <p className="font-bold text-sm">+234 916 960 0724</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-[#d946ef]/20 to-indigo-600/20 rounded-[40px] blur-2xl" />
             <img 
               src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
               alt="Digital Solutions" 
               className="relative rounded-[40px] border border-white/10 shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
             />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#d946ef] font-black uppercase tracking-widest text-sm mb-4">Our Services</h2>
            <h3 className="text-4xl font-black tracking-tight">Crafting Digital Excellence</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: 'School Portal', desc: 'Comprehensive management for modern education.' },
              { icon: Globe, title: 'School Website', desc: 'Premium online presence for your institution.' },
              { icon: ShoppingBag, title: 'E-Commerce Site', desc: 'Secure, high-converting online stores.' },
              { icon: Smartphone, title: 'Company Website', desc: 'Sleek, responsive corporate platforms.' }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-all group"
              >
                <div className="bg-[#1e1b4b] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#d946ef] transition-all">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-black mb-3">{service.title}</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-[#facc15] mb-4" />
            <h5 className="font-bold text-lg mb-2">Secure & Reliable</h5>
            <p className="text-slate-400 text-sm">Enterprise-grade security for your data.</p>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-12 h-12 text-[#d946ef] mb-4" />
            <h5 className="font-bold text-lg mb-2">Blazing Fast</h5>
            <p className="text-slate-400 text-sm">Optimized for performance and speed.</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="w-12 h-12 text-blue-400 mb-4" />
            <h5 className="font-bold text-lg mb-2">24/7 Support</h5>
            <p className="text-slate-400 text-sm">Expert help whenever you need it.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#1e1b4b]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Contact Dar-Ark Bytes</p>
            <p className="text-lg font-black">+234 916 960 0724 | +234 903 925 6458</p>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            © 2026 Dar-Ark Bytes Technology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
