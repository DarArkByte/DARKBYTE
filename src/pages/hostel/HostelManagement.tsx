import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { Building, Users, Bed, CheckCircle2, Shield, Plus, MoreVertical } from 'lucide-react';
import { HostelBlock, HostelRoom } from '../../types';

export default function HostelManagement() {
  const { school } = useSchool();
  const [activeTab, setActiveTab] = useState<'blocks' | 'rooms'>('blocks');

  // Mock data
  const [blocks] = useState<HostelBlock[]>([
    { id: 'b1', schoolId: '1', name: 'Zik Block (Boys)', gender: 'male', capacity: 200 },
    { id: 'b2', schoolId: '1', name: 'Moremi Block (Girls)', gender: 'female', capacity: 200 },
  ]);

  const [rooms] = useState<HostelRoom[]>([
    { id: 'r1', schoolId: '1', blockId: 'b1', roomNumber: 'A101', capacity: 4, currentOccupancy: 4 },
    { id: 'r2', schoolId: '1', blockId: 'b1', roomNumber: 'A102', capacity: 4, currentOccupancy: 2 },
    { id: 'r3', schoolId: '1', blockId: 'b2', roomNumber: 'B101', capacity: 4, currentOccupancy: 4 },
    { id: 'r4', schoolId: '1', blockId: 'b2', roomNumber: 'B102', capacity: 4, currentOccupancy: 0 },
  ]);

  return (
    <div className="space-y-8 pb-12">
      <header className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1e1b4b] to-indigo-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-4 border border-white/10">
              <Building className="w-4 h-4 text-indigo-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Hostel Engine</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Hostel & Dormitory</h1>
            <p className="text-indigo-200 font-medium">Manage accommodation blocks, room allocations, and bed spaces.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-400 transition-all">
            <Plus className="w-5 h-5" />
            Allocate Room
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Capacity', value: '400', icon: Bed, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Allocated Beds', value: '10', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Available Spaces', value: '390', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-50 flex gap-2 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('blocks')}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'blocks' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200'}`}
          >
            Blocks View
          </button>
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'rooms' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200'}`}
          >
            Rooms Matrix
          </button>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'blocks' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blocks.map(block => (
                <div key={block.id} className="p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-100 transition-all bg-slate-50/30">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                      <Building className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg ${block.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                      {block.gender}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1">{block.name}</h3>
                  <p className="text-sm font-bold text-slate-400">Total Capacity: {block.capacity}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {rooms.map(room => (
                <div key={room.id} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col items-center justify-center text-center hover:border-indigo-200 transition-all cursor-pointer group">
                  <div className="flex gap-1 mb-3">
                    {[...Array(room.capacity)].map((_, i) => (
                      <div key={i} className={`w-2.5 h-6 rounded-full transition-all ${i < room.currentOccupancy ? 'bg-indigo-600' : 'bg-slate-100 group-hover:bg-indigo-100'}`} />
                    ))}
                  </div>
                  <h4 className="font-black text-slate-900">{room.roomNumber}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{room.currentOccupancy}/{room.capacity} Full</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
