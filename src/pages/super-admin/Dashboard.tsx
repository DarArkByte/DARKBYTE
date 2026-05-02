import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Users, 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight,
  Globe,
  Plus,
  Database,
  Search,
  Power,
  PowerOff,
  Layout,
  KeyRound,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface TenantSchool {
  id: string;
  domain: string;
  name: string;
  studentsCount: number;
  isActive: boolean;
  color: string;
  landingPageTheme: string;
}

const stats = [
  { label: 'Registered Schools', value: '142', icon: Building2, color: 'bg-indigo-600', trend: '+12% this month' },
  { label: 'Active Students', value: '12,840', icon: Users, color: 'bg-[#d946ef]', trend: '+8% growth' },
  { label: 'Platform Revenue', value: '₦4.2M', icon: Wallet, color: 'bg-emerald-500', trend: '+15.2% yield' },
  { label: 'System Uptime', value: '99.9%', icon: Zap, color: 'bg-[#facc15]', trend: 'All Nodes Live' },
];

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'schools' | 'users'>('schools');
  const [search, setSearch] = useState('');
  const [editingTheme, setEditingTheme] = useState<string | null>(null);
  const { resetPassword } = useAuth();
  const [success, setSuccess] = useState<string | null>(null);

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

  const toggleTenantStatus = (id: string) => {
    setTenants(tenants.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t));
  };

  const filteredTenants = tenants.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.domain.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Master Command Center</h1>
          <p className="text-slate-500 font-bold tracking-tight italic">Ecosystem Oversight • Global Node Control</p>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button 
            onClick={() => setActiveTab('schools')} 
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'schools' ? 'bg-[#1e1b4b] text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Schools
          </button>
          <button 
            onClick={() => setActiveTab('users')} 
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-[#1e1b4b] text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Admins
          </button>
        </div>
      </motion.div>

      {success && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-500 text-white p-6 rounded-[32px] font-black text-center shadow-xl shadow-emerald-500/20">
          {success}
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-[#d946ef]/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-[#d946ef]/5 transition-all" />
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className={`${stat.color} p-4 rounded-2xl shadow-xl shadow-black/5`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#d946ef] transition-colors" />
            </div>
            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1 relative z-10">{stat.label}</h3>
            <p className="text-3xl font-black text-slate-900 mb-2 relative z-10">{stat.value}</p>
            <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 relative z-10">
              <TrendingUp className="w-3 h-3" />
              {stat.trend}
            </p>
          </motion.div>
        ))}
      </div>

      {activeTab === 'schools' ? (
        <div className="space-y-8">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search schools or domains..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-[28px] focus:ring-2 focus:ring-[#1e1b4b] transition-all font-bold text-slate-700 placeholder-slate-300"
              />
            </div>
            <button className="bg-[#d946ef] text-white font-black px-10 py-5 rounded-[28px] hover:bg-[#c026d3] transition-all shadow-xl shadow-magenta-500/20 active:scale-95 flex items-center gap-3 justify-center">
              <Plus className="w-5 h-5" />
              Onboard New School
            </button>
          </div>

          {/* Tenants List */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredTenants.map((tenant, idx) => (
              <motion.div 
                key={tenant.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white rounded-[48px] p-10 shadow-sm border-2 transition-all group ${!tenant.isActive ? 'border-rose-100 bg-rose-50/20 opacity-80' : 'border-slate-50 hover:border-[#d946ef]/20'}`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[32px] flex items-center justify-center shadow-xl text-white font-black text-3xl" style={{ backgroundColor: tenant.color }}>
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{tenant.name}</h3>
                      <p className="text-slate-400 font-bold text-sm mt-1 flex items-center gap-2 underline decoration-[#d946ef]/20 underline-offset-4 cursor-pointer hover:text-[#d946ef] transition-colors">
                        <Globe className="w-4 h-4" /> {tenant.domain}.darark.com
                      </p>
                    </div>
                  </div>
                  <span className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${tenant.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    <Activity className={`w-3 h-3 ${tenant.isActive ? 'animate-pulse' : ''}`} />
                    {tenant.isActive ? 'Live' : 'Suspended'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    { label: 'Students', val: tenant.studentsCount.toLocaleString(), icon: Users },
                    { label: 'Tier', val: 'Enterprise', icon: ShieldCheck },
                    { label: 'Uptime', val: '99.9%', icon: Zap },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-[32px] p-5 border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all">
                      <item.icon className="w-4 h-4 text-slate-300 mx-auto mb-2" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="font-black text-slate-900">{item.val}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => toggleTenantStatus(tenant.id)}
                    className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${tenant.isActive ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                  >
                    {tenant.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                    {tenant.isActive ? 'Suspend' : 'Activate'}
                  </button>
                  <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-100">
                    Enter Portal
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[48px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-10 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-2xl font-black text-slate-900">Platform Administrators</h2>
            <p className="text-sm text-slate-500 font-bold mt-1 uppercase tracking-tight">Security Node Access Control</p>
          </div>
          <div className="divide-y divide-slate-50">
            {users.map((u) => (
              <div key={u.id} className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-slate-50/50 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-[28px] flex items-center justify-center shadow-inner">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-xl tracking-tight">{u.email}</p>
                    <p className="text-sm text-slate-400 font-bold flex items-center gap-2">
                       <span className="text-[#d946ef] uppercase tracking-widest text-[10px] font-black">{u.role}</span>
                       • {u.school}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleManualReset(u.email)}
                  className="bg-[#1e1b4b] text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all shadow-xl"
                >
                  <KeyRound className="w-4 h-4 text-[#d946ef]" /> Trigger Security Reset
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
