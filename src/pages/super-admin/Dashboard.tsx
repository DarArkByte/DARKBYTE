import React, { useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="space-y-10 pb-24 font-sans">
      {/* Premium Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#1e1b4b] via-[#1e1b4b] to-indigo-900 p-10 md:p-16 text-white shadow-2xl shadow-indigo-950/20"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d946ef]/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -ml-20 -mb-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md border border-white/5"
            >
              <ShieldCheck className="w-4 h-4 text-[#d946ef]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Master Security Active</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              WELCOME TO THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-indigo-400 italic">COMMAND CENTER.</span>
            </h1>
            <p className="text-slate-400 font-bold text-xl tracking-tight max-w-xl">
              You are currently managing 142 school nodes across the global Dar-Ark Byte ecosystem.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('schools')}
              className={`px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'schools' ? 'bg-[#d946ef] text-white shadow-xl shadow-magenta-500/20' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
            >
              Node Manager
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-[#1e1b4b]' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
            >
              Access Keys
            </button>
          </div>
        </div>
      </motion.div>

      {success && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500 text-white p-6 rounded-[32px] font-black text-center shadow-xl shadow-emerald-500/20">
          {success}
        </motion.div>
      )}

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-2 h-full ${stat.color}`} />
            <div className="flex items-center justify-between mb-8">
              <div className={`${stat.color} p-4 rounded-2xl shadow-lg shadow-black/5`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
              </div>
            </div>
            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-4xl font-black text-slate-900 mb-2">{stat.value}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-500">{stat.trend}</span>
              <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '70%' }}
                  className={`h-full ${stat.color}`} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {activeTab === 'schools' ? (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Schools Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <Building2 className="w-6 h-6 text-[#d946ef]" />
                Registered School Nodes
              </h3>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search node..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-full focus:ring-2 focus:ring-[#1e1b4b] w-64 font-bold text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTenants.map((tenant, idx) => (
                <motion.div 
                  key={tenant.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-[56px] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group ${!tenant.isActive && 'opacity-60 grayscale'}`}
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-16 h-16 rounded-[24px] shadow-lg flex items-center justify-center text-white font-black text-2xl" style={{ backgroundColor: tenant.color }}>
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 leading-tight">{tenant.name}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{tenant.domain}.darark.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] mb-8">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Students</p>
                      <p className="font-black text-slate-900">{tenant.studentsCount}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200" />
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status</p>
                      <p className={`font-black uppercase text-[10px] ${tenant.isActive ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {tenant.isActive ? 'Active' : 'Suspended'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-[#1e1b4b] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">Portal</button>
                    <button onClick={() => toggleTenantStatus(tenant.id)} className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all text-slate-600">
                      {tenant.isActive ? <PowerOff className="w-5 h-5" /> : <Power className="w-5 h-5 text-emerald-500" />}
                    </button>
                  </div>
                </motion.div>
              ))}
              
              <button className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[56px] p-10 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-[#d946ef]/20 transition-all group">
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-slate-300 group-hover:text-[#d946ef] transition-colors">
                  <Plus className="w-8 h-8" />
                </div>
                <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Onboard School</p>
              </button>
            </div>
          </div>

          {/* Platform Intelligence Sidebar */}
          <div className="space-y-10">
             <div className="bg-white rounded-[56px] p-10 shadow-sm border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#facc15]" />
                  Platform Health
                </h3>
                <div className="space-y-10">
                   {[
                     { label: 'Database Latency', val: '12ms', color: 'bg-emerald-500' },
                     { label: 'Compute Power', val: '42%', color: 'bg-indigo-500' },
                     { label: 'Isolation Layer', val: 'Secured', color: 'bg-[#d946ef]' },
                   ].map((item, i) => (
                     <div key={i}>
                       <div className="flex justify-between items-end mb-3">
                         <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                         <p className="text-sm font-black text-slate-900">{item.val}</p>
                       </div>
                       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '85%' }}
                            className={`h-full ${item.color}`} 
                          />
                       </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-[#1e1b4b] rounded-[56px] p-10 text-white shadow-2xl shadow-indigo-900/20">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#d946ef]" />
                  Global Activity
                </h3>
                <div className="space-y-8">
                   {[
                     { user: 'Admin @ Excel', action: 'Result Batch Processed', time: '2m ago' },
                     { user: 'Principal @ Spring', action: 'Staff Payroll Finalized', time: '14m ago' },
                     { user: 'System Bot', action: 'Nightly Backup Completed', time: '1h ago' },
                   ].map((act, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="w-1 bg-white/10 rounded-full" />
                        <div>
                          <p className="text-sm font-bold text-white">{act.action}</p>
                          <p className="text-[10px] font-black text-slate-500 uppercase mt-1">{act.user} • {act.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[56px] shadow-sm border border-slate-100 overflow-hidden">
           <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Security Access Keys</h2>
                <p className="text-slate-500 font-bold tracking-tight mt-1">Manage global school administrator credentials.</p>
              </div>
           </div>
           <div className="divide-y divide-slate-50">
             {users.map((u) => (
               <div key={u.id} className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-slate-50 transition-all">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center">
                       <Users className="w-7 h-7" />
                    </div>
                    <div>
                       <p className="text-xl font-black text-slate-900">{u.email}</p>
                       <p className="text-[10px] font-black text-[#d946ef] uppercase tracking-widest mt-1">{u.role} • {u.school}</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => handleManualReset(u.email)}
                  className="bg-[#1e1b4b] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#d946ef] transition-all flex items-center gap-3 shadow-xl"
                 >
                   <KeyRound className="w-4 h-4" /> Reset Security Key
                 </button>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
}
