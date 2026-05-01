import React, { useState } from 'react';
import { Banknote, Users, UserCheck, Clock, Receipt, Calculator, Calendar, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function StaffManagement() {
  const [activeTab, setActiveTab] = useState<'payroll' | 'attendance'>('payroll');

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[40px] bg-emerald-950 p-10 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3 tracking-tight">
              {activeTab === 'payroll' ? <Banknote className="w-10 h-10 text-emerald-400" /> : <UserCheck className="w-10 h-10 text-blue-400" />}
              {activeTab === 'payroll' ? 'Staff Payroll' : 'Attendance & Performance'}
            </h1>
            <p className="text-emerald-200 font-medium">Automated salary disbursement and teacher performance tracking.</p>
          </div>
          <div className="flex gap-2 bg-emerald-900/50 p-1.5 rounded-2xl border border-emerald-800">
            <button onClick={() => setActiveTab('payroll')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'payroll' ? 'bg-emerald-500 text-black' : 'text-emerald-400'}`}>
              Payroll
            </button>
            <button onClick={() => setActiveTab('attendance')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'text-emerald-400'}`}>
              Attendance
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'payroll' ? (
        <div className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Payroll', value: '₦8.4M', icon: Calculator, color: 'text-emerald-600' },
                { label: 'Allowances', value: '₦450k', icon: ArrowUpRight, color: 'text-blue-600' },
                { label: 'Deductions', value: '₦120k', icon: ArrowDownRight, color: 'text-rose-600' },
                { label: 'Net Pay', value: '₦8.7M', icon: Banknote, color: 'text-emerald-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                   <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                </div>
              ))}
           </div>

           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                 <h2 className="text-xl font-black text-gray-900">May 2026 Payroll Run</h2>
                 <button className="bg-emerald-600 text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-emerald-600/20">
                    Disburse All Salaries
                 </button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                          <th className="p-6">Employee</th>
                          <th className="p-6 text-center">Base Salary</th>
                          <th className="p-6 text-center">Net Pay</th>
                          <th className="p-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {[
                         { name: 'Dr. Chinedu Okafor', role: 'VP Academics', base: '₦245,000', net: '₦260,000' },
                         { name: 'Mrs. Amina Bello', role: 'Math Lead', base: '₦180,000', net: '₦185,000' },
                       ].map((staff, i) => (
                         <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-6">
                               <p className="font-bold text-gray-900">{staff.name}</p>
                               <p className="text-xs text-gray-400">{staff.role}</p>
                            </td>
                            <td className="p-6 text-center font-bold text-gray-600">{staff.base}</td>
                            <td className="p-6 text-center font-black text-emerald-600">{staff.net}</td>
                            <td className="p-6 text-right">
                               <button className="bg-gray-100 text-gray-600 text-xs font-bold px-4 py-2 rounded-lg">View Slip</button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                 <h2 className="text-xl font-black text-gray-900">Real-Time Clock-In</h2>
                 <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">Today: May 12</span>
              </div>
              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { name: 'Musa Ibrahim', time: '07:42 AM', status: 'On Time' },
                   { name: 'Sandra Eze', time: '08:05 AM', status: 'Late' },
                 ].map((log, i) => (
                   <div key={i} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex justify-between items-center">
                      <div>
                         <p className="font-bold text-gray-900">{log.name}</p>
                         <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {log.time}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'On Time' ? 'text-emerald-600' : 'text-rose-600'}`}>{log.status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl text-center">
              <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Attendance Terminal</h3>
              <div className="w-48 h-48 bg-gray-100 rounded-[32px] mx-auto mb-8 flex items-center justify-center border-4 border-dashed border-gray-200">
                 <div className="text-gray-300 font-black text-xs uppercase tracking-widest">[ QR SCANNER SIM ]</div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">Teachers scan this code at the gate to clock-in automatically.</p>
              <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20">Generate Today's Code</button>
           </div>
        </div>
      )}
    </div>
  );
}
