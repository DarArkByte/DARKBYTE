import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Database, ShieldAlert, Activity, Users, Settings2, Globe, Search, PowerOff, Power, Layout, CheckCircle2, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TenantSchool {
  id: string;
  domain: string;
  name: string;
  studentsCount: number;
  isActive: boolean;
  color: string;
  landingPageTheme: string;
}

export default function SuperAdminDashboard() {
  const [search, setSearch] = useState('');
  const [editingTheme, setEditingTheme] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'schools' | 'users'>('schools');
  const { resetPassword } = useAuth();
  const [success, setSuccess] = useState<string | null>(null);

  // Dummy tenants
  const [tenants, setTenants] = useState<TenantSchool[]>([
    { id: '1', domain: 'excel-royal', name: 'Excel Royal Academy', studentsCount: 1540, isActive: true, color: '#4f46e5', landingPageTheme: 'theme-1' },
    { id: '2', domain: 'springfield', name: 'Springfield High School', studentsCount: 850, isActive: false, color: '#059669', landingPageTheme: 'theme-2' },
    { id: '3', domain: 'dar-ark', name: 'Dar-Ark Demo Academy', studentsCount: 120, isActive: true, color: '#dc2626', landingPageTheme: 'theme-3' },
  ]);

  const [users] = useState([
    { id: 'u1', email: 'admin@excel.com', role: 'school-admin', school: 'Excel Royal' },
    { id: 'u2', email: 'principal@spring.com', role: 'school-admin', school: 'Springfield' },
    { id: 'u3', email: 'owner@darark.com', role: 'school-admin', school: 'Dar-Ark' },
  ]);

  const handleManualReset = async (email: string) => {
    try {
      await resetPassword(email);
      setSuccess(`Reset link sent to ${email}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      alert('Error triggering reset');
    }
  };

  const updateTheme = (tenantId: string, theme: string) => {
    setTenants(tenants.map(t => t.id === tenantId ? { ...t, landingPageTheme: theme } : t));
    setEditingTheme(null);
  };

  const toggleTenantStatus = (id: string) => {
    setTenants(tenants.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t));
  };

  const filteredTenants = tenants.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.domain.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Header */}
      <header className="relative overflow-hidden rounded-[40px] bg-slate-900 p-10 text-white shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3 tracking-tight">
              <Database className="w-10 h-10 text-emerald-500" />
              Master Control Center
            </h1>
            <p className="text-slate-400 font-medium">Global ecosystem management for Dar-Ark Byte.</p>
          </div>
          <div className="flex gap-2 bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700">
            <button onClick={() => setActiveTab('schools')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'schools' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>
              Schools
            </button>
            <button onClick={() => setActiveTab('users')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
              Admin Accounts
            </button>
          </div>
        </div>
      </header>

      {success && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500 text-white p-4 rounded-2xl font-bold text-center shadow-lg">
          {success}
        </motion.div>
      )}

      {activeTab === 'schools' ? (
        <>
          {/* Toolbar */}
          <div className="flex justify-between items-center bg-white p-4 rounded-[32px] shadow-sm border border-gray-100">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search schools or domains..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-bold text-gray-700"
              />
            </div>
            <button className="bg-slate-900 text-white font-black px-8 py-3.5 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200">
              Onboard New School
            </button>
          </div>

          {/* Tenants Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredTenants.map((tenant, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={tenant.id}
                className={`bg-white rounded-[40px] p-8 shadow-sm border-2 transition-all flex flex-col ${!tenant.isActive ? 'border-rose-200 bg-rose-50/30 opacity-90' : 'border-gray-50 hover:border-gray-200'}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[24px] flex items-center justify-center shadow-inner" style={{ backgroundColor: tenant.color }}>
                      <span className="font-black text-white text-2xl">{tenant.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 leading-tight">{tenant.name}</h3>
                      <p className="text-gray-400 font-bold text-sm mt-1 flex items-center gap-1.5 underline decoration-emerald-500/30 underline-offset-4">
                        <Globe className="w-4 h-4 text-emerald-500" /> {tenant.domain}.dararkbyte.com
                      </p>
                    </div>
                  </div>
                  
                  {tenant.isActive ? (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live
                    </span>
                  ) : (
                    <span className="bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" /> Suspended
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                    <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Students</p>
                    <p className="text-lg font-black text-gray-900">{tenant.studentsCount.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                    <Settings2 className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plan</p>
                    <p className="text-lg font-black text-indigo-600">Pro</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                    <Database className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Storage</p>
                    <p className="text-lg font-black text-gray-900">12.4 GB</p>
                  </div>
                </div>

                <div className="mt-auto flex gap-4 pt-6 border-t border-gray-50">
                  <button 
                    onClick={() => toggleTenantStatus(tenant.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all ${
                      tenant.isActive 
                      ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {tenant.isActive ? (
                      <><PowerOff className="w-5 h-5" /> Suspend</>
                    ) : (
                      <><Power className="w-5 h-5" /> Restore</>
                    )}
                  </button>
                  <button 
                    onClick={() => setEditingTheme(tenant.id)}
                    className="px-6 py-4 bg-slate-100 text-slate-700 font-black text-sm rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2"
                  >
                    <Layout className="w-5 h-5" /> Theme
                  </button>
                  <button className="px-8 py-4 bg-slate-900 text-white font-black text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200">
                    Manage
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gray-50/30">
            <h2 className="text-2xl font-black text-gray-900">Registered Admin Accounts</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Manage school administrator credentials and security.</p>
          </div>
          <div className="divide-y divide-gray-50">
            {users.map((u) => (
              <div key={u.id} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg">{u.email}</p>
                    <p className="text-sm text-gray-400 font-bold">Role: {u.role} • School: {u.school}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleManualReset(u.email)}
                  className="bg-slate-900 text-white font-black px-6 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-slate-100"
                >
                  <KeyRound className="w-4 h-4" /> Trigger Password Reset
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Theme Selector Modal */}
      <AnimatePresence>
        {editingTheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditingTheme(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Design Studio</h2>
                  <p className="text-sm text-gray-500 font-medium">Select a homepage theme for this school portal.</p>
                </div>
                <button onClick={() => setEditingTheme(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <PowerOff className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="p-8 grid grid-cols-2 sm:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh]">
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <button 
                    key={num}
                    onClick={() => updateTheme(editingTheme, `theme-${num}`)}
                    className="group relative rounded-2xl overflow-hidden border-4 border-transparent hover:border-indigo-600 transition-all aspect-video bg-gray-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <span className="text-white font-black text-sm uppercase">Theme {num}</span>
                    </div>
                    {tenants.find(t => t.id === editingTheme)?.landingPageTheme === `theme-${num}` && (
                        <div className="absolute top-3 right-3 bg-indigo-600 text-white p-1 rounded-full">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
