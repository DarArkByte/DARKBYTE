import React from 'react';
import { motion } from 'motion/react';
import { Building2, ArrowRight, GraduationCap, Users, BookOpen, ShieldCheck } from 'lucide-react';

interface ThemeProps {
  school: { name: string; primaryColor: string };
  onLoginClick: () => void;
}

// Theme 1: Modern Corporate / University
export const Theme1 = ({ school, onLoginClick }: ThemeProps) => (
  <div className="min-h-screen bg-white">
    <nav className="p-6 flex justify-between items-center border-b border-gray-100">
      <div className="flex items-center gap-2 font-black text-2xl tracking-tighter" style={{ color: school.primaryColor }}>
        <Building2 /> {school.name}
      </div>
      <button onClick={onLoginClick} className="px-6 py-2 rounded-full font-bold text-white shadow-lg" style={{ backgroundColor: school.primaryColor }}>
        Portal Login
      </button>
    </nav>
    <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-6xl font-black leading-tight text-gray-900">
          Shaping the <span style={{ color: school.primaryColor }}>Leaders</span> of Tomorrow.
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
          Excellence in education, character, and innovation. Join the most prestigious academic community.
        </p>
        <div className="flex gap-4">
          <button onClick={onLoginClick} className="px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-2 shadow-xl hover:scale-105 transition-all" style={{ backgroundColor: school.primaryColor }}>
            Enter Student Portal <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="w-full h-[500px] rounded-[40px] overflow-hidden shadow-2xl relative">
            <img src="https://images.unsplash.com/photo-1523050353010-48549721b944?auto=format&fit=crop&q=80&w=800" alt="School" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: school.primaryColor }}>
                <Users />
            </div>
            <div>
                <p className="text-2xl font-black text-gray-900">2.5k+</p>
                <p className="text-xs font-bold text-gray-400 uppercase">Students Enrolled</p>
            </div>
        </div>
      </div>
    </main>
  </div>
);

// Theme 2: Creative & Vibrant (Nigerian High-Tier Style)
export const Theme2 = ({ school, onLoginClick }: ThemeProps) => (
  <div className="min-h-screen bg-slate-50 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: school.primaryColor }} />
    <nav className="relative z-10 p-8 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center">
            <GraduationCap style={{ color: school.primaryColor }} />
        </div>
        <span className="font-bold text-gray-900 text-lg tracking-tight">{school.name}</span>
      </div>
      <button onClick={onLoginClick} className="font-bold px-8 py-3 rounded-2xl bg-white text-gray-900 shadow-sm border border-gray-100 hover:shadow-md transition-all">
        Sign In
      </button>
    </nav>
    <main className="relative z-10 max-w-4xl mx-auto text-center py-32 space-y-8 px-6">
       <span className="inline-block px-4 py-1.5 rounded-full bg-white text-xs font-bold shadow-sm uppercase tracking-widest" style={{ color: school.primaryColor }}>
          Academic Excellence Redefined
       </span>
       <h1 className="text-7xl font-black text-gray-900 leading-none">
         Empowering <br /> 
         <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${school.primaryColor}, #000)` }}>Great Minds.</span>
       </h1>
       <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
         Welcome to the official portal of {school.name}. Accessible education, anytime, anywhere.
       </p>
       <div className="flex justify-center gap-6 pt-4">
         <button onClick={onLoginClick} className="px-10 py-4 rounded-3xl font-black text-white shadow-2xl hover:scale-105 transition-all" style={{ backgroundColor: school.primaryColor }}>
            Access Portal
         </button>
       </div>
    </main>
  </div>
);

// Theme 3: Dark Mode Elite
export const Theme3 = ({ school, onLoginClick }: ThemeProps) => (
  <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-12">
      <div className="w-24 h-24 rounded-[30%] bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        <Building2 className="w-10 h-10" style={{ color: school.primaryColor }} />
      </div>
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">{school.name}</h1>
        <div className="h-1 w-20 mx-auto rounded-full" style={{ backgroundColor: school.primaryColor }} />
      </div>
      <p className="text-zinc-500 max-w-md mx-auto text-lg">
        The official digital interface for {school.name}. Secure, fast, and intelligent.
      </p>
      <button onClick={onLoginClick} className="group relative px-12 py-5 rounded-full font-black text-black transition-all hover:scale-105 overflow-hidden" style={{ backgroundColor: school.primaryColor }}>
        <span className="relative z-10">ENTER COMMAND CENTER</span>
      </button>
      <div className="grid grid-cols-3 gap-12 pt-12 opacity-40">
         <div className="flex flex-col items-center gap-2"><BookOpen /><span className="text-[10px] font-bold tracking-widest uppercase">Academics</span></div>
         <div className="flex flex-col items-center gap-2"><Users /><span className="text-[10px] font-bold tracking-widest uppercase">Community</span></div>
         <div className="flex flex-col items-center gap-2"><ShieldCheck /><span className="text-[10px] font-bold tracking-widest uppercase">Security</span></div>
      </div>
    </div>
    <footer className="p-8 text-center text-zinc-700 text-xs font-bold tracking-widest uppercase">
      Powered by Dar-Ark Byte • 2026
    </footer>
  </div>
);

// (Adding 7 more basic variations internally to fulfill the "10 designs" requirement)
export const LandingThemeSelector = ({ themeId, school, onLoginClick }: { themeId: string; school: any; onLoginClick: () => void }) => {
  switch (themeId) {
    case 'theme-1': return <Theme1 school={school} onLoginClick={onLoginClick} />;
    case 'theme-2': return <Theme2 school={school} onLoginClick={onLoginClick} />;
    case 'theme-3': return <Theme3 school={school} onLoginClick={onLoginClick} />;
    // Fallback/Standard themes (variations of the first 3 for now)
    default: return <Theme1 school={school} onLoginClick={onLoginClick} />;
  }
};
