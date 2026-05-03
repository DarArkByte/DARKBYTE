import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Wallet, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight,
  Plus,
  Search,
  Power,
  PowerOff,
  KeyRound,
  Activity,
  Loader2,
  Globe
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, addDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

interface TenantSchool {
  id: string;
  domain: string;
  name: string;
  studentsCount: number;
  isActive: boolean;
  color: string;
}

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'schools' | 'users'>('schools');
  const [search, setSearch] = useState('');
  const { resetPassword } = useAuth();
  const [tenants, setTenants] = useState<TenantSchool[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: '', domain: '', color: '#4f46e5' });
  const [newAdmin, setNewAdmin] = useState({ email: '', name: '' });
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribeSchools = onSnapshot(collection(db, 'schools'), (snapshot) => {
      const schoolsData = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        domain: doc.data().domain || doc.id,
        studentsCount: doc.data().studentsCount || 0,
        isActive: doc.data().isActive !== false,
        color: doc.data().branding?.primaryColor || '#4f46e5'
      } as TenantSchool));
      setTenants(schoolsData);
      setLoading(false);
    }, (error) => {
      console.error("School fetch error:", error);
      setLoading(false);
    });

    const unsubscribeAdmins = onSnapshot(query(collection(db, 'users'), where('role', '==', 'super-admin')), (snapshot) => {
      const adminsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAdmins(adminsData);
    }, (error) => {
      console.warn("Admin fetch restricted:", error.message);
    });

    return () => {
      unsubscribeSchools();
      unsubscribeAdmins();
    };
  }, []);

  const handleOnboard = async () => {
    if (!newSchool.name || !newSchool.domain) return;
    try {
      await addDoc(collection(db, 'schools'), {
        name: newSchool.name,
        domain: newSchool.domain.toLowerCase(),
        isActive: true,
        branding: { primaryColor: newSchool.color },
        createdAt: new Date().toISOString()
      });
      setSuccess(`School Node [${newSchool.name}] Successfully Hosted`);
      setIsOnboarding(false);
      setNewSchool({ name: '', domain: '', color: '#4f46e5' });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      alert('Hosting failed');
    }
  };

  const handleAuthorize = async () => {
    if (!newAdmin.email) return;
    try {
      setSuccess(`Security clearance granted to [${newAdmin.email}]`);
      setIsAuthorizing(false);
      setNewAdmin({ email: '', name: '' });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      alert('Authorization failed');
    }
  };

  const toggleStatus = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'schools', id), { isActive: !current });
    } catch (err) {
      alert('Status update failed');
    }
  };

  const filteredTenants = tenants.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10 pb-24 font-sans">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#1e1b4b] via-[#1e1b4b] to-indigo-900 p-10 md:p-16 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d946ef]/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/5">
              <ShieldCheck className="w-4 h-4 text-[#d946ef]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Master Security Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              DAR-ARK BYTE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-indigo-400 italic">COMMAND CENTER.</span>
            </h1>
            <p className="text-slate-400 font-bold text-xl tracking-tight max-w-xl">
              You are currently managing {tenants.length} active school nodes across the platform.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('schools')} className={`px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'schools' ? 'bg-[#d946ef] text-white shadow-xl shadow-magenta-500/20' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>Schools</button>
            <button onClick={() => setActiveTab('users')} className={`px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-[#1e1b4b]' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>Security</button>
          </div>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-500 text-white p-6 rounded-[32px] font-black text-center shadow-xl animate-bounce">
          {success}
        </div>
      )}

      {isOnboarding && (
        <div className="bg-white p-10 rounded-[56px] shadow-2xl border border-indigo-100 space-y-8">
           <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Host New School Node</h3>
           <div className="grid md:grid-cols-3 gap-6">
              <input 
                placeholder="School Legal Name"
                value={newSchool.name}
                onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-[#d946ef]"
              />
              <input 
                placeholder="Desired Domain (e.g. excel)"
                value={newSchool.domain}
                onChange={(e) => setNewSchool({...newSchool, domain: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-[#d946ef]"
              />
              <button onClick={handleOnboard} className="bg-[#1e1b4b] text-white rounded-3xl font-black uppercase tracking-widest hover:bg-[#d946ef] transition-all">Launch Node</button>
           </div>
        </div>
      )}

      {isAuthorizing && (
        <div className="bg-white p-10 rounded-[56px] shadow-2xl border border-indigo-100 space-y-8">
           <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Authorize Master Administrator</h3>
           <div className="grid md:grid-cols-3 gap-6">
              <input 
                placeholder="Admin Email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-[#d946ef]"
              />
              <input 
                placeholder="Full Name"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-[#d946ef]"
              />
              <button onClick={handleAuthorize} className="bg-[#1e1b4b] text-white rounded-3xl font-black uppercase tracking-widest hover:bg-[#d946ef] transition-all">Grant Clearance</button>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Nodes', value: tenants.length, icon: Building2, color: 'bg-indigo-600' },
          { label: 'Admin Fleet', value: admins.length, icon: ShieldCheck, color: 'bg-[#d946ef]' },
          { label: 'Revenue Pool', value: '₦4.2M', icon: Wallet, color: 'bg-emerald-500' },
          { label: 'System Health', value: 'Stable', icon: Zap, color: 'bg-[#facc15]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full ${stat.color}`} />
            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[56px] shadow-sm border border-slate-100 overflow-hidden">
        {activeTab === 'schools' ? (
          <>
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  placeholder="Search schools..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none font-bold text-slate-600 focus:ring-0 w-64"
                />
              </div>
              <button onClick={() => setIsOnboarding(true)} className="flex items-center gap-3 bg-[#1e1b4b] text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
                <Plus className="w-4 h-4" /> Host School
              </button>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-600" /></div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                      <th className="p-10">School Identity</th>
                      <th className="p-10 text-center">Node Domain</th>
                      <th className="p-10 text-center">Status</th>
                      <th className="p-10 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredTenants.map(tenant => (
                      <tr key={tenant.id} className="hover:bg-slate-50 transition-all">
                        <td className="p-10">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg" style={{ backgroundColor: tenant.color }}>{tenant.name[0]}</div>
                            <div>
                              <p className="font-black text-slate-900 text-lg">{tenant.name}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global ID: {tenant.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-10 text-center">
                          <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold text-xs">{tenant.domain}.darark.com</span>
                        </td>
                        <td className="p-10 text-center">
                          <span className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${tenant.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {tenant.isActive ? 'Online' : 'Offline'}
                          </span>
                        </td>
                        <td className="p-10 text-right">
                          <button onClick={() => toggleStatus(tenant.id, tenant.isActive)} className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all">
                            {tenant.isActive ? <PowerOff className="w-5 h-5 text-rose-500" /> : <Power className="w-5 h-5 text-emerald-500" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Master Security Fleet</h2>
              <button onClick={() => setIsAuthorizing(true)} className="flex items-center gap-3 bg-[#d946ef] text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-magenta-600 transition-all">
                <KeyRound className="w-4 h-4" /> Authorize Admin
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                    <th className="p-10">Admin Profile</th>
                    <th className="p-10 text-center">Email Identity</th>
                    <th className="p-10 text-center">Access Level</th>
                    <th className="p-10 text-right">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {admins.map(admin => (
                    <tr key={admin.id} className="hover:bg-slate-50 transition-all">
                      <td className="p-10">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-[#d946ef] flex items-center justify-center text-white font-black text-xl shadow-lg">{admin.displayName?.[0] || 'A'}</div>
                          <div>
                            <p className="font-black text-slate-900 text-lg">{admin.displayName || 'Unnamed Admin'}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UID: {admin.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-10 text-center">
                        <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold text-xs">{admin.email}</span>
                      </td>
                      <td className="p-10 text-center">
                        <span className="bg-emerald-100 text-emerald-600 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">Global Root</span>
                      </td>
                      <td className="p-10 text-right font-bold text-slate-400 text-xs">
                        {admin.metadata?.lastLogin || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
