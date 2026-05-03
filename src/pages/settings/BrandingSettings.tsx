import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { 
  Palette, 
  Image as ImageIcon, 
  Settings, 
  Save, 
  Check, 
  Upload, 
  Trash2, 
  Plus, 
  School as SchoolIcon,
  Layout,
  Globe,
  Camera,
  Layers,
  Facebook,
  Instagram,
  Twitter,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Branding } from '../../types';

interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  previewColor: string;
  bgGradient: string;
  description: string;
  previewImage: string;
}

const THEMES: Theme[] = [
  {
    id: 'midnight-sovereign',
    name: 'Midnight Sovereign',
    primary: '#1e1b4b',
    secondary: '#312e81',
    accent: '#d946ef',
    previewColor: '#1e1b4b',
    bgGradient: 'from-[#1e1b4b] to-[#312e81]',
    description: 'Deep royal blue with vibrant magenta accents. Premium and authoritative.',
    previewImage: 'file:///C:/Users/DDL%20JUNIORATE/.gemini/antigravity/brain/9f13ad2b-7fb4-48eb-92f0-4694219dd174/modern_school_result_template_1777815752515.png'
  },
  {
    id: 'emerald-academy',
    name: 'Emerald Academy',
    primary: '#064e3b',
    secondary: '#065f46',
    accent: '#10b981',
    previewColor: '#064e3b',
    bgGradient: 'from-[#064e3b] to-[#065f46]',
    description: 'Rich dark green with bright emerald highlights. Fresh and academic.',
    previewImage: 'file:///C:/Users/DDL%20JUNIORATE/.gemini/antigravity/brain/9f13ad2b-7fb4-48eb-92f0-4694219dd174/finance_module_mockup_1777815867796.png'
  },
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    primary: '#422006',
    secondary: '#713f12',
    accent: '#f59e0b',
    previewColor: '#422006',
    bgGradient: 'from-[#422006] to-[#713f12]',
    description: 'Deep mahogany with gold accents. Prestigious and classic.',
    previewImage: 'file:///C:/Users/DDL%20JUNIORATE/.gemini/antigravity/brain/9f13ad2b-7fb4-48eb-92f0-4694219dd174/portal_proposal_preview_1777815783684.png'
  },
  {
    id: 'oceanic-wisdom',
    name: 'Oceanic Wisdom',
    primary: '#0c4a6e',
    secondary: '#075985',
    accent: '#0ea5e9',
    previewColor: '#0c4a6e',
    bgGradient: 'from-[#0c4a6e] to-[#075985]',
    description: 'Navy blue with bright sky blue accents. Trustworthy and modern.',
    previewImage: 'file:///C:/Users/DDL%20JUNIORATE/.gemini/antigravity/brain/9f13ad2b-7fb4-48eb-92f0-4694219dd174/media__1777815032808.png'
  },
  {
    id: 'sunset-scholar',
    name: 'Sunset Scholar',
    primary: '#4c0519',
    secondary: '#881337',
    accent: '#fb7185',
    previewColor: '#4c0519',
    bgGradient: 'from-[#4c0519] to-[#881337]',
    description: 'Deep burgundy with soft rose accents. Creative and warm.',
    previewImage: 'file:///C:/Users/DDL%20JUNIORATE/.gemini/antigravity/brain/9f13ad2b-7fb4-48eb-92f0-4694219dd174/media__1777815226983.png'
  }
];

export default function BrandingSettings() {
  const { school, updateSchool, loading: schoolLoading } = useSchool();
  const [activeTab, setActiveTab] = useState<'theme' | 'details' | 'gallery'>('theme');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [schoolName, setSchoolName] = useState('');
  const [branding, setBranding] = useState<Branding>({
    primaryColor: '#4f46e5',
    secondaryColor: '#818cf8',
    landingPageTheme: 'theme-1',
    selectedThemeId: 'midnight-sovereign',
    gallery: [],
    identity: {
      motto: '',
      phone: '',
      email: '',
      address: '',
      website: '',
      socials: { facebook: '', instagram: '', twitter: '' }
    }
  });

  // Sync with school data
  useEffect(() => {
    if (school) {
      setSchoolName(school.name);
      if (school.branding) {
        setBranding({
          ...branding,
          ...school.branding,
          identity: school.branding.identity || branding.identity,
          gallery: school.branding.gallery || []
        });
      }
    }
  }, [school]);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      await updateSchool({
        name: schoolName,
        branding: branding
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to synchronize branding data. Please check your connection.');
    } finally {
      setSaving(false);
    }
  };

  const updateIdentity = (field: string, value: any) => {
    setBranding(prev => ({
      ...prev,
      identity: {
        ...prev.identity!,
        [field]: value
      }
    }));
  };

  const updateSocials = (platform: string, value: string) => {
    setBranding(prev => ({
      ...prev,
      identity: {
        ...prev.identity!,
        socials: {
          ...prev.identity!.socials,
          [platform]: value
        }
      }
    }));
  };

  const handleThemeSelect = (theme: Theme) => {
    setBranding(prev => ({
      ...prev,
      selectedThemeId: theme.id,
      primaryColor: theme.primary,
      secondaryColor: theme.secondary,
      accentColor: theme.accent
    }));
  };

  const selectedTheme = THEMES.find(t => t.id === branding.selectedThemeId) || THEMES[0];

  if (schoolLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <header className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 to-indigo-950 p-10 text-white shadow-2xl border border-white/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-inner group transition-all hover:scale-110">
              <Palette className="w-10 h-10 text-indigo-300 group-hover:text-pink-400 transition-colors" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-1 italic">Branding Hub</h1>
              <p className="text-indigo-200/80 font-bold uppercase tracking-[0.2em] text-xs">Configure your school's visual identity & digital footprint</p>
            </div>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg transition-all ${
              saveSuccess 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-pink-500/20 hover:scale-105 active:scale-95 disabled:opacity-50'
            }`}
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : saveSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saving ? 'Syncing...' : saveSuccess ? 'Synchronized' : 'Synchronize Changes'}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-indigo-950/20 backdrop-blur-sm rounded-3xl w-fit border border-indigo-950/10">
        {[
          { id: 'theme', label: 'Theme Engine', icon: Layout },
          { id: 'details', label: 'Identity Matrix', icon: SchoolIcon },
          { id: 'gallery', label: 'Media Gallery', icon: Camera }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-indigo-950 shadow-lg' 
                : 'text-indigo-900/60 hover:bg-white/50 hover:text-indigo-950'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Theme Engine */}
        {activeTab === 'theme' && (
          <motion.div 
            key="theme"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-indigo-50">
                <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2 text-indigo-950">
                  <Layers className="w-6 h-6 text-pink-500" />
                  Select Primary Schema
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {THEMES.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme)}
                      className={`relative p-6 rounded-3xl border-2 transition-all text-left overflow-hidden group ${
                        branding.selectedThemeId === theme.id 
                          ? 'border-pink-500 bg-pink-50/30' 
                          : 'border-slate-100 hover:border-indigo-200 bg-white'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.bgGradient} opacity-10 rounded-bl-full transform translate-x-12 -translate-y-12 transition-transform group-hover:translate-x-8 group-hover:-translate-y-8`}></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.bgGradient} shadow-lg shadow-indigo-950/10 border-2 border-white`}></div>
                          {branding.selectedThemeId === theme.id && <div className="bg-pink-500 text-white p-1 rounded-full"><Check className="w-4 h-4" /></div>}
                        </div>
                        <h3 className="font-black uppercase tracking-tight text-indigo-950">{theme.name}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{theme.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Portal Preview */}
              <div className="bg-slate-950 rounded-[2.5rem] p-4 text-white relative overflow-hidden shadow-2xl group border-4 border-indigo-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none z-10"></div>
                <div className="relative z-20">
                  <div className="flex items-center justify-between mb-4 px-4 pt-4">
                    <h3 className="font-black uppercase tracking-widest text-[10px] text-indigo-400 flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      Live Portal Preview
                    </h3>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-700">
                    <img 
                      src={selectedTheme.previewImage} 
                      alt={selectedTheme.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-2">
                         <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedTheme.bgGradient} border-2 border-white/20 shadow-lg`}></div>
                         <div>
                           <p className="text-white font-black text-sm uppercase tracking-tighter">{selectedTheme.name}</p>
                           <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">Active Configuration</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic">Encrypted Design Protocol Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Inspector */}
            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-indigo-50 sticky top-8">
                <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-indigo-950">Spec Sheet</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Primary HEX</span>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg border border-white shadow-sm" style={{ backgroundColor: branding.primaryColor }}></div>
                      <span className="font-mono text-sm font-bold text-slate-700 uppercase">{branding.primaryColor}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Accent HEX</span>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg border border-white shadow-sm" style={{ backgroundColor: branding.accentColor || '#ffffff' }}></div>
                      <span className="font-mono text-sm font-bold text-slate-700 uppercase">{branding.accentColor || '#FFFFFF'}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Branding Package</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <input type="checkbox" checked readOnly className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
                        Dynamic CSS Variables
                      </label>
                      <label className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <input type="checkbox" checked readOnly className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
                        Custom Favicon Injection
                      </label>
                      <label className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <input type="checkbox" checked readOnly className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
                        Email Template Styling
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Identity Matrix */}
        {activeTab === 'details' && (
          <motion.div 
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-indigo-50 max-w-4xl"
          >
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-indigo-950 flex items-center gap-3">
              <SchoolIcon className="w-8 h-8 text-indigo-500" />
              Institutional Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 ml-1">Official Name</label>
                  <input 
                    type="text" 
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 ml-1">Motto / Slogan</label>
                  <input 
                    type="text" 
                    value={branding.identity?.motto}
                    onChange={(e) => updateIdentity('motto', e.target.value)}
                    placeholder="Knowledge is Power"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 ml-1">Official Email</label>
                  <input 
                    type="email" 
                    value={branding.identity?.email}
                    onChange={(e) => updateIdentity('email', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                  />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 ml-1">Social Footprint</label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Facebook className="w-5 h-5" /></div>
                      <input 
                        type="text" 
                        value={branding.identity?.socials.facebook}
                        onChange={(e) => updateSocials('facebook', e.target.value)}
                        placeholder="Facebook URL" 
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/10" 
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600"><Instagram className="w-5 h-5" /></div>
                      <input 
                        type="text" 
                        value={branding.identity?.socials.instagram}
                        onChange={(e) => updateSocials('instagram', e.target.value)}
                        placeholder="Instagram URL" 
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-pink-500/10" 
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600"><Twitter className="w-5 h-5" /></div>
                      <input 
                        type="text" 
                        value={branding.identity?.socials.twitter}
                        onChange={(e) => updateSocials('twitter', e.target.value)}
                        placeholder="Twitter URL" 
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/10" 
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 ml-1">Institutional Logo</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer group">
                    {branding.logoUrl ? (
                      <img src={branding.logoUrl} alt="Logo" className="w-32 h-32 object-contain mx-auto mb-4 rounded-2xl shadow-xl bg-white" />
                    ) : (
                      <div className="w-20 h-20 bg-white rounded-3xl shadow-lg border border-slate-100 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-indigo-400" />
                      </div>
                    )}
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Replace Shield</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 ml-1">Official Phone</label>
                  <input 
                    type="text" 
                    value={branding.identity?.phone}
                    onChange={(e) => updateIdentity('phone', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 ml-1">Physical Address</label>
                  <textarea 
                    value={branding.identity?.address}
                    onChange={(e) => updateIdentity('address', e.target.value)}
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700 resize-none" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Media Gallery */}
        {activeTab === 'gallery' && (
          <motion.div 
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-indigo-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-indigo-950 flex items-center gap-3">
                    <ImageIcon className="w-8 h-8 text-pink-500" />
                    Media Vault
                  </h2>
                  <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest">Manage showcase images for the public landing page</p>
                </div>
                <button className="flex items-center gap-3 bg-indigo-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:scale-105 active:scale-95 transition-all">
                  <Plus className="w-4 h-4" />
                  Upload Asset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {branding.gallery?.map((url, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="group relative rounded-[2rem] overflow-hidden bg-slate-100 shadow-lg border-4 border-white"
                  >
                    <img src={url} alt={`Gallery ${idx}`} className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <div className="flex gap-2">
                        <button className="p-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors ml-auto">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Demo Gallery Items if empty */}
                {(!branding.gallery || branding.gallery.length === 0) && [
                  'file:///C:/Users/DDL%20JUNIORATE/.gemini/antigravity/brain/9f13ad2b-7fb4-48eb-92f0-4694219dd174/modern_school_result_template_1777815752515.png',
                  'file:///C:/Users/DDL%20JUNIORATE/.gemini/antigravity/brain/9f13ad2b-7fb4-48eb-92f0-4694219dd174/finance_module_mockup_1777815867796.png'
                ].map((url, idx) => (
                  <div key={`demo-${idx}`} className="group relative rounded-[2rem] overflow-hidden bg-slate-100 shadow-lg border-4 border-white opacity-50 grayscale hover:grayscale-0 transition-all">
                    <img src={url} alt="Demo" className="w-full aspect-video object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-indigo-950/80 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">Demo Content</span>
                    </div>
                  </div>
                ))}

                <button className="border-4 border-dashed border-slate-200 rounded-[2rem] aspect-video flex flex-col items-center justify-center gap-4 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group">
                  <div className="p-4 bg-slate-100 rounded-full text-slate-400 group-hover:scale-110 group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-all">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-black uppercase tracking-widest text-[10px] text-slate-400 group-hover:text-indigo-500">Drop New Media</span>
                </button>
              </div>
            </div>
            
            <div className="bg-amber-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border border-amber-900/50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="p-6 bg-amber-500/10 backdrop-blur-xl rounded-3xl border border-amber-500/20">
                  <Settings className="w-12 h-12 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight italic">Advert Placement Active</h3>
                  <p className="text-amber-200/60 font-bold text-sm uppercase tracking-widest mt-1">One gallery image is currently designated as the "Master Banner" for promotional broadcasts.</p>
                </div>
                <button className="md:ml-auto bg-amber-500 text-amber-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-amber-400 transition-all">Configure Broadcast</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
