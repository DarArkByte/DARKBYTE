import { Database, ShieldAlert, Activity, Users, Settings2, Globe, Search, PowerOff, Power, Layout } from 'lucide-react';
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
  
  // Dummy tenants
  const [tenants, setTenants] = useState<TenantSchool[]>([
    { id: '1', domain: 'excel-royal', name: 'Excel Royal Academy', studentsCount: 1540, isActive: true, color: '#4f46e5', landingPageTheme: 'theme-1' },
    { id: '2', domain: 'springfield', name: 'Springfield High School', studentsCount: 850, isActive: false, color: '#059669', landingPageTheme: 'theme-2' },
    { id: '3', domain: 'dar-ark', name: 'Dar-Ark Demo Academy', studentsCount: 120, isActive: true, color: '#dc2626', landingPageTheme: 'theme-3' },
  ]);

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
      <header className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3 tracking-tight">
              <Database className="w-8 h-8 text-emerald-500" />
              Master Control Center
            </h1>
            <p className="text-slate-400 font-medium">Manage all tenant schools across the Dar-Ark Byte ecosystem.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-800 px-6 py-3 rounded-2xl border border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Tenants</p>
              <p className="text-2xl font-black text-emerald-500">{tenants.length}</p>
            </div>
            <div className="bg-slate-800 px-6 py-3 rounded-2xl border border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Users</p>
              <p className="text-2xl font-black text-blue-500">{(2510).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by school name or domain..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 transition-all font-bold text-gray-700"
          />
        </div>
        <button className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all">
          Onboard New School
        </button>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredTenants.map((tenant, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={tenant.id}
            className={`bg-white rounded-3xl p-6 shadow-sm border-2 transition-all flex flex-col ${!tenant.isActive ? 'border-rose-200 bg-rose-50/30 opacity-90' : 'border-gray-100 hover:border-gray-300'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner" style={{ backgroundColor: tenant.color }}>
                  <span className="font-black text-white text-xl">{tenant.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 leading-tight">{tenant.name}</h3>
                  <p className="text-gray-400 font-bold text-sm mt-1 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> dararkbyte.com/portal/{tenant.domain}
                  </p>
                </div>
              </div>
              
              {tenant.isActive ? (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Active
                </span>
              ) : (
                <span className="bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> Suspended
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Students</p>
                <p className="text-lg font-black text-gray-900">{tenant.studentsCount.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                <Settings2 className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plan</p>
                <p className="text-lg font-black text-indigo-600">Pro</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                <Database className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Storage</p>
                <p className="text-lg font-black text-gray-900">12.4 GB</p>
              </div>
            </div>

            <div className="mt-auto flex gap-4 pt-4 border-t border-gray-100">
              <button 
                onClick={() => toggleTenantStatus(tenant.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  tenant.isActive 
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                {tenant.isActive ? (
                  <><PowerOff className="w-5 h-5" /> Suspend Access</>
                ) : (
                  <><Power className="w-5 h-5" /> Restore Access</>
                )}
              </button>
              <button 
                onClick={() => setEditingTheme(tenant.id)}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2"
              >
                <Layout className="w-4 h-4" /> Theme
              </button>
              <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md">
                Manage
              </button>
            </div>
          </motion.div>
        ))}
      </div>

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
