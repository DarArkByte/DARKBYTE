import React, { useState, useEffect } from 'react';
import { Shield, Bus, UserCheck, MapPin, Clock, AlertTriangle, CheckCircle, QrCode, Navigation, Loader2, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useSchool } from '../../hooks/useSchool';

interface Visitor {
  id: string;
  name: string;
  purpose: string;
  host: string;
  timeIn: any;
  status: 'inside' | 'exited';
}

interface BusNode {
  id: string;
  route: string;
  driver: string;
  students: number;
  status: 'pending' | 'en-route' | 'arrived';
  eta: string;
}

export default function SecurityTransportHub() {
  const { school } = useSchool();
  const [activeTab, setActiveTab] = useState<'security' | 'transport'>('security');
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [buses, setBuses] = useState<BusNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newVisitor, setNewVisitor] = useState({ name: '', purpose: '', host: '' });

  useEffect(() => {
    if (!school?.id) return;
    
    const unsubVisitors = onSnapshot(query(collection(db, 'schools', school.id, 'visitors'), orderBy('timeIn', 'desc')), (snapshot) => {
      setVisitors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Visitor)));
    });

    const unsubBuses = onSnapshot(collection(db, 'schools', school.id, 'transport'), (snapshot) => {
      setBuses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BusNode)));
      setLoading(false);
    });

    return () => {
      unsubVisitors();
      unsubBuses();
    };
  }, [school?.id]);

  const handleLogVisitor = async () => {
    if (!school?.id || !newVisitor.name) return;
    try {
      await addDoc(collection(db, 'schools', school.id, 'visitors'), {
        ...newVisitor,
        status: 'inside',
        timeIn: serverTimestamp()
      });
      setShowLogModal(false);
      setNewVisitor({ name: '', purpose: '', host: '' });
    } catch (err) {
      alert('Logging failed');
    }
  };

  const markExited = async (id: string) => {
    if (!school?.id) return;
    try {
      await updateDoc(doc(db, 'schools', school.id, 'visitors', id), {
        status: 'exited',
        timeOut: serverTimestamp()
      });
    } catch (err) {
      alert('Exit update failed');
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[40px] bg-slate-900 p-10 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3 tracking-tight">
              {activeTab === 'security' ? <Shield className="w-10 h-10 text-blue-400" /> : <Bus className="w-10 h-10 text-emerald-400" />}
              {activeTab === 'security' ? 'Security & Visitors' : 'Transport Tracker'}
            </h1>
            <p className="text-slate-400 font-medium">Real-time gate management and fleet tracking system.</p>
          </div>
          <div className="flex gap-2 bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700">
            <button onClick={() => setActiveTab('security')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
              Security
            </button>
            <button onClick={() => setActiveTab('transport')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'transport' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>
              Transport
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'security' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Visitors Inside', value: visitors.filter(v => v.status === 'inside').length, icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Total Today', value: visitors.length, icon: Shield, color: 'text-slate-600', bg: 'bg-slate-50' },
              { label: 'System Health', value: 'Active', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h2 className="text-xl font-black text-gray-900">Digital Gate Log</h2>
              <button 
                onClick={() => setShowLogModal(true)}
                className="bg-slate-900 text-white font-black px-6 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-600 transition-all"
              >
                <QrCode className="w-4 h-4" /> Log New Visitor
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <div className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" /></div>
              ) : visitors.map((v) => (
                <div key={v.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-600">
                      {v.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{v.name}</p>
                      <p className="text-xs text-gray-400">{v.purpose} • Host: {v.host}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {v.status === 'inside' ? (
                      <button 
                        onClick={() => markExited(v.id)}
                        className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        Mark Exit
                      </button>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-gray-100 text-gray-400">
                        Exited
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Active Buses', value: buses.length, icon: Bus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Students In Transit', value: buses.reduce((acc, b) => acc + (b.students || 0), 0), icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Fleet Status', value: 'Live', icon: MapPin, color: 'text-slate-600', bg: 'bg-slate-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
              <h2 className="text-xl font-black text-gray-900">Fleet Real-Time Radar</h2>
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                <Navigation className="w-4 h-4" /> Live Map View
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {buses.map((bus) => (
                <div key={bus.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                      <Bus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{bus.id} — {bus.route}</p>
                      <p className="text-xs text-gray-400">Driver: {bus.driver} • {bus.students} students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">ETA</p>
                      <p className="font-black text-gray-900 text-sm">{bus.eta || 'N/A'}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                      bus.status === 'arrived' ? 'bg-emerald-100 text-emerald-700' :
                      bus.status === 'en-route' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visitor Modal */}
      <AnimatePresence>
        {showLogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl">
              <button onClick={() => setShowLogModal(false)} className="absolute top-8 right-8 text-gray-400"><X /></button>
              <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Register Visitor</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Visitor Name</label>
                  <input type="text" value={newVisitor.name} onChange={(e) => setNewVisitor({...newVisitor, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Purpose of Visit</label>
                  <input type="text" value={newVisitor.purpose} onChange={(e) => setNewVisitor({...newVisitor, purpose: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Host Staff / Office</label>
                  <input type="text" value={newVisitor.host} onChange={(e) => setNewVisitor({...newVisitor, host: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold" />
                </div>
                <button onClick={handleLogVisitor} className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">Grant Gate Access</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
