import React, { useState } from 'react';
import { CreditCard, Wallet, Receipt, Users, AlertCircle, TrendingUp, Search, Plus, Filter } from 'lucide-react';
import { motion } from 'motion/react';

export default function FeeManager() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'debtors'>('overview');
  
  const stats = [
    { label: 'Expected Revenue', value: '₦45.2M', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Collected', value: '₦32.8M', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Outstanding', value: '₦12.4M', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[40px] bg-slate-950 p-10 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3 tracking-tight">
              <Wallet className="w-10 h-10 text-emerald-400" />
              Smart Finance Hub
            </h1>
            <p className="text-slate-400 font-medium">Automated invoicing, split payments, and debtor tracking.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-emerald-500 text-black font-black px-8 py-4 rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
              <Plus className="w-5 h-5" /> Generate Invoices
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5"
          >
            <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-50/30">
          <div className="flex gap-2 bg-gray-200/50 p-1.5 rounded-2xl">
            {['overview', 'invoices', 'debtors'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search invoices..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="p-4">Student</th>
                <th className="p-4">Total Bill</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Adewale Musa', total: '₦125,000', paid: '₦125,000', status: 'paid' },
                { name: 'Chisom Okafor', total: '₦125,000', paid: '₦40,000', status: 'partial' },
                { name: 'Fatima Yusuf', total: '₦125,000', paid: '₦0', status: 'owing' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{row.name}</p>
                    <p className="text-xs text-gray-400">JSS 2 Diamond</p>
                  </td>
                  <td className="p-4 font-black text-gray-900">{row.total}</td>
                  <td className="p-4 font-bold text-emerald-600">{row.paid}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      row.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                      row.status === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Receipt className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
