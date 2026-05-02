import React, { useState } from 'react';
import { Shield, Bus, UserCheck, MapPin, Clock, AlertTriangle, CheckCircle, QrCode, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

export default function SecurityTransportHub() {
  const [activeTab, setActiveTab] = useState<'security' | 'transport'>('security');

  const visitors = [
    { name: 'Mr. Emeka Nwosu', purpose: 'Parent Meeting', timeIn: '8:42 AM', host: 'Mrs. Adaeze', status: 'inside' },
    { name: 'Mrs. Fatima Aliyu', purpose: 'Enrollment Inquiry', timeIn: '9:15 AM', host: 'Admin Office', status: 'inside' },
    { name: 'Dr. Tunde Afolabi', purpose: 'Board Inspection', timeIn: '10:00 AM', host: 'Principal', status: 'exited' },
  ];

  const buses = [
    { id: 'BUS-01', route: 'Lekki – Maryland', driver: 'Musa Garba', students: 32, status: 'en-route', eta: '3:45 PM' },
    { id: 'BUS-02', route: 'Ikeja – Surulere', driver: 'Sunday Obi', students: 28, status: 'arrived', eta: 'Arrived' },
    { id: 'BUS-03', route: 'Ajah – VI', driver: 'Chukwu Eze', students: 24, status: 'pending', eta: '4:10 PM' },
  ];

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
              { label: 'Visitors Inside', value: '2', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Total Today', value: '7', icon: Shield, color: 'text-slate-600', bg: 'bg-slate-50' },
              { label: 'Alerts', value: '0', icon: AlertTriangle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
              <h2 className="text-xl font-black text-gray-900">Visitor Log — Today</h2>
              <button className="bg-slate-900 text-white font-black px-6 py-3 rounded-xl text-sm flex items-center gap-2">
                <QrCode className="w-4 h-4" /> Log New Visitor
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {visitors.map((v, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-600">
                      {v.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{v.name}</p>
                      <p className="text-xs text-gray-400">{v.purpose} • Host: {v.host}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {v.timeIn}</p>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${v.status === 'inside' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                      {v.status === 'inside' ? 'Inside' : 'Exited'}
                    </span>
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
              { label: 'Active Buses', value: '3', icon: Bus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Students In Transit', value: '84', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Routes Covered', value: '3', icon: MapPin, color: 'text-slate-600', bg: 'bg-slate-50' },
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
            <div className="p-8 border-b border-gray-50 bg-gray-50/30">
              <h2 className="text-xl font-black text-gray-900">Live Fleet Status</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {buses.map((bus, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
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
                      <p className="font-black text-gray-900 text-sm">{bus.eta}</p>
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
    </div>
  );
}
