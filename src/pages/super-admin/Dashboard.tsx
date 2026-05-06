import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Globe,
  Trash2,
  FileText,
  Download,
  Database,
  TrendingUp,
  Hash,
  Ticket,
  Sparkles as SparklesIcon,
  Database as DatabaseIcon
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, addDoc, doc, updateDoc, onSnapshot, where, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

// Import Assets for reliable serving
import resultTemplateImg from '../../assets/branding/result_template.png';
import proposalPreviewImg from '../../assets/branding/portal_proposal.png';
import financeMockupImg from '../../assets/branding/finance_mockup.png';

interface TenantSchool {
  id: string;
  domain: string;
  name: string;
  studentsCount: number;
  isActive: boolean;
  color: string;
}

export default function SuperAdminDashboard() {
  const { clearImpersonation } = useSchool();
  const [activeTab, setActiveTab] = useState<'schools' | 'users' | 'media' | 'pins' | 'results'>('schools');
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedPitch = async (id?: string, domain?: string, customName?: string) => {
    setIsSeeding(true);
    try {
      const batch = writeBatch(db);
      const schoolId = id || 'elite-academy';
      const schoolDomain = domain || 'elite-academy';
      const schoolName = customName || 'Dar-Ark Elite Academy';
      
      const schoolRef = doc(db, 'schools', schoolId);
      batch.set(schoolRef, {
        id: schoolId,
        name: schoolName,
        isActive: true,
        domain: schoolDomain,
        studentsCount: 150,
        branding: {
          primaryColor: '#1e1b4b',
          secondaryColor: '#d946ef',
          landingPageTheme: 'theme-4',
          identity: {
            motto: 'Excellence in Every Byte',
            phone: '+234 812 345 6789',
            email: `info@${schoolDomain}.edu.ng`,
            address: '12 Digital Command Way, Lagos'
          }
        },
        settings: {
          usePositions: true,
          showAverage: true,
          reportCardTheme: 'elite',
          caWeight: 40,
          examWeight: 60
        },
        createdAt: new Date().toISOString()
      }, { merge: true });

      const resultsRef = collection(db, 'results');
      for (let i = 0; i < 5; i++) {
        const resRef = doc(resultsRef);
        batch.set(resRef, {
          schoolId,
          studentName: `Demo Student ${i+1}`,
          classId: 'JSS 1',
          termId: '1st Term',
          sessionId: '2023/2024',
          total: 80 + i,
          status: 'ready',
          createdAt: new Date().toISOString()
        });
      }

      const admissionsRef = collection(db, 'admissions');
      const apps = [
        { studentName: 'Chidi Okoro', targetClass: 'JSS 1', status: 'exam-scheduled', examDate: new Date().toISOString().split('T')[0], examStatus: 'pending' },
        { studentName: 'Fatima Yusuf', targetClass: 'SSS 1', status: 'accepted', examScore: 88, examStatus: 'completed' }
      ];
      apps.forEach(app => {
        const appRef = doc(admissionsRef);
        batch.set(appRef, { ...app, schoolId, parentPhone: '08123456789', createdAt: new Date().toISOString() });
      });

      // SEED DEMO ADMIN
      const adminRef = doc(db, 'users', `demo_admin_${schoolId}`);
      batch.set(adminRef, {
        uid: `demo_admin_${schoolId}`,
        email: `admin@${schoolDomain}.com`,
        displayName: `${schoolName} Admin`,
        role: 'school-admin',
        schoolId: schoolId,
        metadata: { isDemo: true }
      }, { merge: true });

      await batch.commit();
      setSuccess(`${schoolName.toUpperCase()} SEEDED! Pitch mode active.`);
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error(err);
      alert('Seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };
  const [search, setSearch] = useState('');
  const { resetPassword } = useAuth();
  const [tenants, setTenants] = useState<TenantSchool[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [pins, setPins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isGeneratingPins, setIsGeneratingPins] = useState(false);
  const [isPublishing, setIsPublishing] = useState<string | null>(null);

  const renameSchool = async (schoolId: string, currentName: string) => {
    const newName = prompt('Enter new name for the school:', currentName);
    if (!newName || newName === currentName) return;
    
    try {
      await updateDoc(doc(db, 'schools', schoolId), { name: newName });
      setSuccess(`SCHOOL RENAMED TO ${newName}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      alert('Rename failed');
    }
  };

  const publishAllResults = async (schoolId: string) => {
    setIsPublishing(schoolId);
    try {
      const q = query(collection(db, 'results'), where('schoolId', '==', schoolId));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      
      snapshot.docs.forEach(doc => {
        batch.update(doc.ref, { status: 'published' });
      });
      
      await batch.commit();
      setSuccess(`ALL RESULTS PUBLISHED ONLINE FOR ${tenants.find(t => t.id === schoolId)?.name}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      alert('Publication failed');
    } finally {
      setIsPublishing(null);
    }
  };

  const [pinRequest, setPinRequest] = useState({ 
    schoolId: '', 
    termId: '1st Term', 
    sessionId: '2023/2024', 
    count: 50 
  });
  const [newSchool, setNewSchool] = useState({ 
    name: '', 
    domain: '', 
    color: '#4f46e5',
    theme: 'Elite Midnight',
    features: {
      cbt: true,
      finance: true,
      inventory: true,
      transport: true,
      messages: true
    }
  });
  const [newAdmin, setNewAdmin] = useState({ email: '', name: '' });
  const [success, setSuccess] = useState<string | null>(null);
  const [resultStats, setResultStats] = useState<Record<string, { ready: number, published: number }>>({});

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

    const unsubscribeResults = onSnapshot(collection(db, 'results'), (snapshot) => {
      const stats: Record<string, { ready: number, published: number }> = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const sId = data.schoolId;
        if (!stats[sId]) stats[sId] = { ready: 0, published: 0 };
        if (data.status === 'ready') stats[sId].ready++;
        if (data.status === 'published') stats[sId].published++;
      });
      setResultStats(stats);
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

    const unsubscribePins = onSnapshot(collection(db, 'result_pins'), (snapshot) => {
      setPins(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeSchools();
      unsubscribeAdmins();
      unsubscribePins();
    };
  }, []);

  const generateBulkPins = async () => {
    if (!pinRequest.schoolId || pinRequest.count <= 0) return;
    try {
      const batch = writeBatch(db);
      for (let i = 0; i < pinRequest.count; i++) {
        const pinCode = Math.floor(100000 + Math.random() * 900000).toString();
        const serialNum = `SN-${Date.now().toString().slice(-6)}-${i+1}`;
        const pinRef = doc(collection(db, 'result_pins'));
        batch.set(pinRef, {
          pin: pinCode,
          serialNumber: serialNum,
          schoolId: pinRequest.schoolId,
          termId: pinRequest.termId,
          sessionId: pinRequest.sessionId,
          maxUsage: 5,
          usageCount: 0,
          status: 'active',
          createdAt: new Date().toISOString()
        });
      }
      await batch.commit();
      setSuccess(`Generated ${pinRequest.count} Security PINs for the school.`);
      setIsGeneratingPins(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      alert('PIN Generation failed');
    }
  };

  const handleOnboard = async () => {
    if (!newSchool.name || !newSchool.domain) return;
    try {
      await addDoc(collection(db, 'schools'), {
        name: newSchool.name,
        domain: newSchool.domain.toLowerCase(),
        isActive: true,
        branding: { 
          primaryColor: newSchool.color,
          themeName: newSchool.theme 
        },
        features: newSchool.features,
        createdAt: new Date().toISOString()
      });
      setSuccess(`School Node [${newSchool.name}] Successfully Hosted`);
      setIsOnboarding(false);
      setNewSchool({ 
        name: '', 
        domain: '', 
        color: '#4f46e5', 
        theme: 'Elite Midnight',
        features: { cbt: true, finance: true, inventory: true, transport: true, messages: true }
      });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      alert('Hosting failed');
    }
  };

  const handleAuthorize = async () => {
    if (!newAdmin.email) return;
    try {
      // Create a skeleton profile for the new admin
      // The user will 'claim' this when they login with this email
      const adminId = newAdmin.email.replace(/[@.]/g, '_');
      await setDoc(doc(db, 'users', adminId), {
        email: newAdmin.email,
        displayName: newAdmin.name,
        role: 'super-admin',
        isAuthorized: true,
        createdAt: new Date().toISOString()
      });

      setSuccess(`Security clearance granted to [${newAdmin.email}]`);
      setIsAuthorizing(false);
      setNewAdmin({ email: '', name: '' });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      alert('Authorization failed');
    }
  };

  const deleteSchool = async (id: string) => {
    if (!confirm('Are you sure you want to decommission this school node? This action is irreversible.')) return;
    try {
      await deleteDoc(doc(db, 'schools', id));
      setSuccess('School Node Decommissioned');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      alert('Decommission failed');
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

  const handleDownload = async (imgSrc: string, filename: string) => {
    try {
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      window.open(imgSrc, '_blank');
    }
  };

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
            <button 
              onClick={handleSeedPitch}
              disabled={isSeeding}
              className="inline-flex items-center gap-2 bg-indigo-500/20 hover:bg-indigo-500/40 px-4 py-2 rounded-full mb-6 border border-white/10 transition-all group"
            >
              <SparklesIcon className={`w-4 h-4 text-amber-400 ${isSeeding ? 'animate-spin' : 'group-hover:rotate-12'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Activate Pitch Mode</span>
            </button>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              DAR-ARK BYTE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-indigo-400 italic">COMMAND CENTER.</span>
            </h1>
            <p className="text-slate-400 font-bold text-xl tracking-tight max-w-xl">
              You are currently managing {tenants.length} active school nodes across the platform.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setActiveTab('schools')} className={`px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'schools' ? 'bg-[#d946ef] text-white shadow-xl shadow-magenta-500/20' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>Schools</button>
            <button onClick={() => setActiveTab('results')} className={`px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'results' ? 'bg-[#d946ef] text-white shadow-xl shadow-magenta-500/20' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>Result Mastery</button>
            <button onClick={() => setActiveTab('users')} className={`px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-[#1e1b4b]' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>Security</button>
            <button onClick={() => setActiveTab('pins')} className={`px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'pins' ? 'bg-[#1e1b4b] text-indigo-400 border border-indigo-500/30' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>PIN Vault</button>
          </div>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-500 text-white p-6 rounded-[32px] font-black text-center shadow-xl animate-bounce">
          {success}
        </div>
      )}

      {isOnboarding && (
        <div className="bg-white p-12 rounded-[56px] shadow-2xl border border-indigo-100 space-y-12 animate-in fade-in zoom-in duration-500">
           <div className="flex justify-between items-center border-b border-slate-100 pb-8">
             <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Provisioning Wizard</h3>
             <button onClick={() => setIsOnboarding(false)} className="text-slate-400 hover:text-slate-900 font-bold uppercase text-[10px] tracking-widest">Cancel Host</button>
           </div>

           <div className="grid lg:grid-cols-2 gap-12">
             {/* Step 1: Identity */}
             <div className="space-y-8">
                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> 01. School Identity
                </h4>
                <div className="grid gap-4">
                  <input 
                    placeholder="School Legal Name"
                    value={newSchool.name}
                    onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                    className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-[#d946ef] w-full"
                  />
                  <input 
                    placeholder="Desired Domain (e.g. excel)"
                    value={newSchool.domain}
                    onChange={(e) => setNewSchool({...newSchool, domain: e.target.value})}
                    className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-[#d946ef] w-full"
                  />
                </div>

                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 pt-4">
                  <Zap className="w-4 h-4" /> 02. Feature Activation
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(newSchool.features).map(([key, val]) => (
                    <button 
                      key={key}
                      onClick={() => setNewSchool({
                        ...newSchool, 
                        features: { ...newSchool.features, [key]: !val }
                      })}
                      className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${val ? 'border-[#d946ef] bg-magenta-50 text-[#d946ef]' : 'border-slate-100 text-slate-400 grayscale'}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">{key}</span>
                      {val && <Zap className="w-3 h-3 fill-current" />}
                    </button>
                  ))}
                </div>
             </div>

             {/* Step 2: Aesthetics */}
             <div className="space-y-8">
                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <Globe className="w-4 h-4" /> 03. Design Theme
                </h4>
                <div className="grid gap-4">
                  {[
                    { name: 'Elite Midnight', color: '#1e1b4b', preview: proposalPreviewImg },
                    { name: 'Emerald Academy', color: '#059669', preview: financeMockupImg },
                    { name: 'Ruby Scholar', color: '#e11d48', preview: resultTemplateImg },
                    { name: 'Royal Gold', color: '#d97706', preview: proposalPreviewImg },
                    { name: 'Sky Principal', color: '#0284c7', preview: financeMockupImg },
                  ].map((theme) => (
                    <div key={theme.name} className="group relative">
                      <button 
                        onClick={() => setNewSchool({...newSchool, theme: theme.name, color: theme.color})}
                        className={`p-6 rounded-3xl border-2 transition-all flex items-center gap-4 text-left w-full ${newSchool.theme === theme.name ? 'border-[#d946ef] bg-slate-50 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <div className="w-10 h-10 rounded-xl" style={{ backgroundColor: theme.color }} />
                        <div>
                          <p className="font-black text-slate-900 text-sm uppercase">{theme.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-widest">Premium Layout Active</p>
                        </div>
                      </button>
                      
                      {newSchool.theme === theme.name && (
                        <div className="absolute left-full ml-8 top-0 w-80 h-48 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl z-20 hidden lg:block animate-in slide-in-from-left-4 duration-300">
                          <img src={theme.preview} alt="Theme Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Preview: {theme.name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
             </div>
           </div>

           <div className="pt-8 border-t border-slate-100 flex justify-end">
              <button 
                onClick={handleOnboard}
                disabled={!newSchool.name || !newSchool.domain}
                className="bg-[#1e1b4b] text-white px-16 py-6 rounded-3xl font-black uppercase tracking-widest hover:bg-[#d946ef] transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Launch Multi-Tenant Node
              </button>
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

      {isGeneratingPins && (
        <div className="bg-white p-12 rounded-[56px] shadow-2xl border border-indigo-100 space-y-12 animate-in slide-in-from-top-10 duration-500">
           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Security PIN Generator</h3>
           <div className="grid md:grid-cols-4 gap-6">
              <select 
                value={pinRequest.schoolId}
                onChange={(e) => setPinRequest({...pinRequest, schoolId: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none"
              >
                <option value="">Target School</option>
                {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <input 
                type="number"
                placeholder="Quantity"
                value={pinRequest.count}
                onChange={(e) => setPinRequest({...pinRequest, count: parseInt(e.target.value)})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none"
              />
              <select 
                value={pinRequest.termId}
                onChange={(e) => setPinRequest({...pinRequest, termId: e.target.value})}
                className="px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none"
              >
                <option value="1st Term">1st Term</option>
                <option value="2nd Term">2nd Term</option>
                <option value="3rd Term">3rd Term</option>
              </select>
              <button onClick={generateBulkPins} className="bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-[#d946ef] transition-all">Generate Batch</button>
           </div>
           <button onClick={() => setIsGeneratingPins(false)} className="w-full text-slate-400 font-bold uppercase text-[10px] tracking-widest">Cancel</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Nodes', value: tenants.length, icon: Building2, color: 'bg-indigo-600' },
          { label: 'Admin Fleet', value: admins.length, icon: ShieldCheck, color: 'bg-[#d946ef]' },
          { label: 'Total PINs', value: pins.length, icon: Hash, color: 'bg-indigo-400' },
          { label: 'System Health', value: 'Stable', icon: Zap, color: 'bg-[#facc15]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full ${stat.color}`} />
            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Marketing Section - Reorganized for Advertisement */}
      <div className="bg-slate-900 rounded-[56px] shadow-2xl p-12 space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <header className="flex justify-between items-end relative z-10">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Platform Advert & Result Mastery</h2>
            <p className="text-slate-400 font-bold">Showcase high-fidelity results and portal aesthetics to clients.</p>
          </div>
          <Link 
            to="/super-admin/proposal-editor"
            className="flex items-center gap-3 bg-[#d946ef] text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-magenta-500/20 hover:scale-105 transition-all"
          >
            <FileText className="w-5 h-5" /> Customize & Export Proposal PDF
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { title: 'Official Result Slip v1', type: 'Production Template', img: resultTemplateImg, desc: 'This is the exact high-fidelity template used for physical result generation.' },
            { title: 'Master Portal View', type: 'Live Interface', img: proposalPreviewImg, desc: 'Demonstrate the clean, animated login experience for students and staff.' },
            { title: 'Global Finance Grid', type: 'Backend Intelligence', img: financeMockupImg, desc: 'Visual proof of the real-time revenue and split-payment architecture.' },
          ].map((item, i) => (
            <div key={i} className="group flex flex-col space-y-4">
              <div className="relative rounded-[40px] overflow-hidden bg-white/5 aspect-video border border-white/10 shadow-2xl">
                 <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/90 via-transparent to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-[10px] font-black text-[#d946ef] uppercase tracking-widest mb-1">{item.type}</span>
                    <h4 className="text-white font-black text-xl mb-4">{item.title}</h4>
                    <button 
                      onClick={() => handleDownload(item.img, `${item.title.replace(/\s+/g, '_')}.png`)}
                      className="bg-white text-[#1e1b4b] font-black px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest w-fit shadow-xl"
                    >
                      Download For Advert
                    </button>
                 </div>
              </div>
              <div className="px-4">
                <p className="text-white font-black text-sm mb-1">{item.title}</p>
                <p className="text-slate-400 text-[10px] font-bold leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
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
                          <button 
                            onClick={() => {
                              localStorage.setItem('impersonated_school_id', tenant.id);
                              window.location.href = '/dashboard';
                            }}
                            className="bg-slate-100 text-[#1e1b4b] hover:bg-[#d946ef] hover:text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm"
                          >
                            {tenant.domain}.darark.com (OPEN)
                          </button>
                        </td>
                        <td className="p-10 text-center">
                          <span className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${tenant.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {tenant.isActive ? 'Online' : 'Offline'}
                          </span>
                        </td>
                        <td className="p-10 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => renameSchool(tenant.id, tenant.name)}
                              className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all"
                              title="Rename School"
                            >
                              <FileText className="w-5 h-5 text-indigo-600" />
                            </button>
                            <button 
                              onClick={() => {
                                // Dynamic seeding for any school
                                handleSeedPitch(tenant.id, tenant.domain, tenant.name);
                              }}
                              className="p-4 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-all"
                              title="Seed Demo Data"
                            >
                              <Zap className="w-5 h-5 text-emerald-600" />
                            </button>
                            <button onClick={() => toggleStatus(tenant.id, tenant.isActive)} className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all">
                              {tenant.isActive ? <PowerOff className="w-5 h-5 text-rose-500" /> : <Power className="w-5 h-5 text-emerald-500" />}
                            </button>
                            <button onClick={() => deleteSchool(tenant.id)} className="p-4 bg-rose-50 rounded-2xl hover:bg-rose-100 transition-all">
                              <Trash2 className="w-5 h-5 text-rose-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : activeTab === 'users' ? (
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
        ) : activeTab === 'pins' ? (
          <>
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">PIN Security Vault</h2>
              <button onClick={() => setIsGeneratingPins(true)} className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
                <Hash className="w-4 h-4" /> Bulk Generate PINs
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                    <th className="p-10">PIN Details</th>
                    <th className="p-10 text-center">School Node</th>
                    <th className="p-10 text-center">Term/Session</th>
                    <th className="p-10 text-center">Usage Tracking</th>
                    <th className="p-10 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {pins.length === 0 ? (
                    <tr><td colSpan={5} className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No security pins discovered in this matrix.</td></tr>
                  ) : (
                    pins.map(pin => (
                      <tr key={pin.id} className="hover:bg-slate-50 transition-all group">
                        <td className="p-10">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <Ticket className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="font-black text-slate-900 text-lg tracking-[0.2em]">{pin.pin}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pin.serialNumber}</p>
                             </div>
                          </div>
                        </td>
                        <td className="p-10 text-center">
                          <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold text-xs">
                            {tenants.find(t => t.id === pin.schoolId)?.name || pin.schoolId}
                          </span>
                        </td>
                        <td className="p-10 text-center">
                          <p className="text-xs font-black text-slate-900">{pin.termId}</p>
                          <p className="text-[10px] font-bold text-slate-400">{pin.sessionId}</p>
                        </td>
                        <td className="p-10 text-center">
                           <div className="space-y-2 w-32 mx-auto">
                              <div className="flex justify-between text-[8px] font-black uppercase">
                                 <span className="text-slate-400">Usage Matrix</span>
                                 <span className="text-indigo-600">{pin.usageCount} / {pin.maxUsage}</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-indigo-500 transition-all" style={{ width: `${(pin.usageCount / pin.maxUsage) * 100}%` }} />
                              </div>
                           </div>
                        </td>
                        <td className="p-10 text-right">
                           <span className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${pin.status === 'active' ? 'bg-emerald-100 text-emerald-600 shadow-sm shadow-emerald-500/10' : 'bg-rose-100 text-rose-600 shadow-sm shadow-rose-500/10'}`}>
                             {pin.status}
                           </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : activeTab === 'results' ? (
          <>
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Result Mastery Hub</h2>
              <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Final Audit Authorization Required
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                    <th className="p-10">School Identity</th>
                    <th className="p-10 text-center">Data Readiness</th>
                    <th className="p-10 text-center">Visibility</th>
                    <th className="p-10 text-right">Master Command</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {tenants.map(tenant => {
                    const stats = resultStats[tenant.id] || { ready: 0, published: 0 };
                    const isReady = stats.ready > 0;
                    const isFullyPublished = stats.published > 0 && stats.ready === 0;

                    return (
                      <tr key={tenant.id} className="hover:bg-slate-50 transition-all">
                        <td className="p-10">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg" style={{ backgroundColor: tenant.color }}>{tenant.name[0]}</div>
                            <div>
                              <p className="font-black text-slate-900 text-lg">{tenant.name}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tenant.studentsCount} Active Students</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-10 text-center">
                          <div className="flex flex-col items-center gap-2">
                             <span className="text-xs font-bold text-slate-900">{stats.ready + stats.published} Scripts Logged</span>
                             <div className="flex gap-1">
                               <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase ${stats.ready > 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                                 {stats.ready} Ready
                               </div>
                               <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase ${stats.published > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                 {stats.published} Live
                               </div>
                             </div>
                          </div>
                        </td>
                        <td className="p-10 text-center">
                          <span className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${
                            isFullyPublished ? 'bg-emerald-100 text-emerald-600' : 
                            isReady ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {isFullyPublished ? 'ONLINE' : isReady ? 'AWAITING PUBLISH' : 'NO DATA'}
                          </span>
                        </td>
                        <td className="p-10 text-right">
                          <button 
                            onClick={() => publishAllResults(tenant.id)}
                            disabled={isPublishing === tenant.id || stats.ready === 0}
                            className={`px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl disabled:opacity-50 ${
                              stats.ready > 0 ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-900 text-slate-500'
                            }`}
                          >
                            {isPublishing === tenant.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'PUBLISH ALL RESULTS ONLINE'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
            Module loading or access restricted
          </div>
        )}
      </div>

      {/* GLOBAL INTELLIGENCE MATRIX - EXCLUSIVE TO SUPER ADMIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1e1b4b] rounded-[56px] p-12 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#d946ef]/20 rounded-full blur-[80px] -mr-20 -mt-20" />
           <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3">
             <Database className="w-6 h-6 text-[#d946ef]" /> Global Fleet Intelligence
           </h3>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Database Size</p>
                 <p className="text-4xl font-black">1.2 GB</p>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-[#d946ef]" />
                 </div>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Concurrent Sessions</p>
                 <p className="text-4xl font-black">482</p>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-emerald-400" />
                 </div>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Global Uptime</p>
                 <p className="text-4xl font-black">99.9%</p>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-indigo-400" />
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-[56px] p-12 border border-slate-100 shadow-sm flex flex-col justify-center">
           <TrendingUp className="w-12 h-12 text-emerald-500 mb-6" />
           <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Revenue Aggregator</h3>
           <p className="text-slate-500 font-bold mb-6 text-sm">Real-time processing across all active school nodes.</p>
           <p className="text-5xl font-black text-[#1e1b4b]">₦12.8M</p>
           <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-2">+14% Growth this month</p>
        </div>
      </div>
    </div>
  );
}
