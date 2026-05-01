import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useSchool } from '../../hooks/useSchool';
import { ReportCardTheme } from '../../types';
import { Palette, Check, Layout, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export default function SchoolAdminDashboard() {
  const { school, refreshSchool } = useSchool();

  const themes: { id: ReportCardTheme, name: string, icon: any, desc: string, color: string }[] = [
    { 
      id: 'modern', 
      name: 'Modern Minimal', 
      icon: Sparkles, 
      desc: 'Clean, airy, and professional. Perfect for modern campuses.',
      color: 'bg-indigo-600'
    },
    { 
      id: 'elite', 
      name: 'Academic Elite', 
      icon: Trophy, 
      desc: 'Traditional grid layout with prestigious serif typography.',
      color: 'bg-gray-900'
    },
    { 
      id: 'dynamic', 
      name: 'Dynamic Data', 
      icon: Layout, 
      desc: 'Visual-heavy with progress bars and technical indicators.',
      color: 'bg-[#0f172a]'
    }
  ];

  const updateTheme = async (theme: ReportCardTheme) => {
    if (!school) return;
    try {
      await updateDoc(doc(db, 'schools', school.id), {
        'settings.reportCardTheme': theme
      });
      await refreshSchool();
    } catch (err) {
      console.error('Error updating theme:', err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-sans font-bold text-gray-900 mb-2">School Administration</h1>
        <p className="text-gray-500 font-medium font-sans">Configure your school's identity and global settings.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-amber-100 p-2 rounded-xl">
                <Palette className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Report Card Themes</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateTheme(t.id)}
                  className={`relative group p-6 rounded-2xl border-2 transition-all text-left flex flex-col h-full ${
                    school?.settings?.reportCardTheme === t.id 
                      ? 'border-indigo-600 bg-indigo-50/10' 
                      : 'border-gray-100 hover:border-indigo-200 bg-white'
                  }`}
                >
                  {school?.settings?.reportCardTheme === t.id && (
                    <div className="absolute top-4 right-4 bg-indigo-600 rounded-full p-1 shadow-lg shadow-indigo-200">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 ${t.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                    <t.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2">{t.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{t.desc}</p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Preview Layout</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center py-20">
             <Layout className="w-12 h-12 text-gray-300 mx-auto mb-6" />
             <p className="text-gray-400 font-medium font-sans">More administrative modules (Classes, Staff, Finance) coming soon.</p>
          </div>
        </section>

        <aside className="space-y-8">
           <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
              <Sparkles className="w-10 h-10 mb-6 bg-white/20 p-2 rounded-xl" />
              <h3 className="text-xl font-bold mb-3">Professional Branding</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed mb-6 font-medium">
                Changing your theme updates how all results are displayed to parents and generated in PDF format instantly across all devices.
              </p>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4 rounded-full" />
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-widest">Brand Consistency Active</p>
           </div>
        </aside>
      </div>
    </div>
  );
}
