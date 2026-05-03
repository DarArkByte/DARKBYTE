/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
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
  Play
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const services = [
    { icon: GraduationCap, title: 'School ERP Portal', desc: 'Complete result processing, finance, and staff management.' },
    { icon: Cpu, title: 'Robotics & Coding', desc: 'Preparing students for the future with hands-on technical skills.' },
    { icon: Code, title: 'App Development', desc: 'Custom Mobile, Web, and Desktop applications for your business.' },
    { icon: Monitor, title: 'CBT Training & Exams', desc: 'Professional computer-based testing and examination services.' },
  ];

  return (
    <div className="min-h-screen bg-[#050515] text-white font-sans overflow-x-hidden selection:bg-[#d946ef] selection:text-white">
      {/* Cinematic Video-Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#050515_100%)]" />
        <div className="absolute top-[-20%] left-[-10%] w-[140%] h-[140%] animate-[spin_60s_linear_infinite] opacity-30">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#d946ef]/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050515]/80 backdrop-blur-3xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#d946ef] p-2.5 rounded-2xl shadow-2xl shadow-magenta-500/40">
               <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Dar-Ark Bytes</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => navigate('/login')} className="bg-[#d946ef] text-white px-10 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#c026d3] transition-all shadow-xl shadow-magenta-500/20 active:scale-95">
              Portal Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-64 pb-32 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h2 className="text-[#facc15] font-black uppercase tracking-[0.5em] mb-8 text-[10px]">
              Innovation Meets Education
            </h2>
            <h1 className="text-7xl md:text-[10rem] font-black leading-[0.8] mb-12 tracking-tighter uppercase italic">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d946ef] to-white animate-gradient-x">
                TECHNOLOGY.
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 mb-20 max-w-4xl mx-auto leading-relaxed font-bold tracking-tight">
              We specialize in School ERP systems, Robotics & Coding Academy, and Enterprise Application Development.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button 
                onClick={() => navigate('/login')}
                className="group relative bg-white text-[#050515] px-16 py-7 rounded-[32px] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl hover:scale-105 transition-all"
              >
                <Zap className="w-6 h-6 fill-current" />
                ACCESS PORTAL
              </button>
              <button className="flex items-center gap-3 text-white font-black uppercase tracking-widest group">
                <div className="bg-white/10 p-4 rounded-full group-hover:bg-[#d946ef] transition-all">
                  <Play className="w-6 h-6 fill-current" />
                </div>
                Watch Showreel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Services Grid */}
      <section className="py-40 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div 
                key={i} 
                className={`bg-white/5 border border-white/10 p-12 rounded-[56px] hover:bg-white/10 transition-all group backdrop-blur-2xl animate-in fade-in slide-in-from-left-${i * 10} duration-700`}
              >
                <div className="bg-[#d946ef] w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-2xl shadow-magenta-500/30 group-hover:scale-110 transition-transform">
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-black mb-6 tracking-tight uppercase italic">{s.title}</h4>
                <p className="text-slate-400 font-bold leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Quick-Action */}
      <section className="py-40 px-6 relative z-10 bg-gradient-to-t from-[#d946ef]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
           <div className="inline-block bg-[#facc15] text-[#050515] px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest mb-10">
             Ready to scale?
           </div>
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-12">Let's Build the Future.</h2>
           <button 
             onClick={() => window.location.href = 'https://wa.me/2349169600724'}
             className="bg-[#25D366] text-white px-16 py-7 rounded-[32px] font-black text-2xl flex items-center justify-center gap-4 mx-auto hover:scale-105 transition-all shadow-2xl shadow-green-500/20"
           >
             <MessageCircle className="w-8 h-8 fill-current" />
             START ON WHATSAPP
           </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-20 px-6 border-t border-white/5 opacity-50">
        <div className="max-w-7xl mx-auto text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">
             © 2026 DAR-ARK BYTES ENTERPRISE. ALL RIGHTS RESERVED.
           </p>
        </div>
      </footer>
    </div>
  );
}
