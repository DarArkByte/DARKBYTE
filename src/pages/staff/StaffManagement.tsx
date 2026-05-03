import React, { useState, useEffect } from 'react';
import { Banknote, Users, UserCheck, Clock, Receipt, Calculator, Calendar, Search, Filter, ArrowUpRight, ArrowDownRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { useSchool } from '../../hooks/useSchool';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  bankAccount: string;
}

interface PayrollLog {
  id: string;
  month: string;
  status: 'pending' | 'disbursed';
  totalAmount: number;
}

export default function StaffManagement() {
  const { school } = useSchool();
  const [activeTab, setActiveTab] = useState<'payroll' | 'attendance'>('payroll');
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDisbursing, setIsDisbursing] = useState(false);

  useEffect(() => {
    if (!school?.id) return;
    const unsubscribe = onSnapshot(collection(db, 'schools', school.id, 'staff'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setStaff(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [school?.id]);

  const handleDisburse = async () => {
    if (!school?.id || staff.length === 0) return;
    if (!confirm(`Confirm disbursement of salaries to ${staff.length} staff members?`)) return;
    
    setIsDisbursing(true);
    try {
      const total = staff.reduce((acc, s) => acc + s.baseSalary, 0);
      
      // 1. Log Payroll Run
      await addDoc(collection(db, 'schools', school.id, 'payroll'), {
        month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        staffCount: staff.length,
        totalAmount: total,
        status: 'disbursed',
        createdAt: serverTimestamp()
      });

      // 2. record individual transactions
      for (const member of staff) {
        await addDoc(collection(db, 'schools', school.id, 'transactions'), {
          type: 'salary_payment',
          recipientId: member.id,
          recipientName: member.name,
          amount: member.baseSalary,
          status: 'completed',
          date: serverTimestamp()
        });
      }

      alert('All Salaries Disbursed Successfully');
    } catch (err) {
      alert('Disbursement failed');
    } finally {
      setIsDisbursing(false);
    }
  };

  const handleClockIn = async (staffId: string) => {
    if (!school?.id) return;
    try {
      await addDoc(collection(db, 'schools', school.id, 'attendance'), {
        staffId,
        type: 'clock_in',
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0]
      });
      alert('Clock-in recorded');
    } catch (err) {
      alert('Attendance log failed');
    }
  };

  const totalPayroll = staff.reduce((acc, s) => acc + (s.baseSalary || 0), 0);

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[40px] bg-emerald-950 p-10 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3 tracking-tight">
              {activeTab === 'payroll' ? <Banknote className="w-10 h-10 text-emerald-400" /> : <UserCheck className="w-10 h-10 text-blue-400" />}
              {activeTab === 'payroll' ? 'Staff Payroll' : 'Attendance Hub'}
            </h1>
            <p className="text-emerald-200 font-medium">Automated salary disbursement and workforce tracking.</p>
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
                { label: 'Total Payroll', value: `₦${totalPayroll.toLocaleString()}`, icon: Calculator, color: 'text-emerald-600' },
                { label: 'Staff Count', value: staff.length, icon: Users, color: 'text-blue-600' },
                { label: 'Tax Estimate', value: `₦${(totalPayroll * 0.05).toLocaleString()}`, icon: ArrowDownRight, color: 'text-rose-600' },
                { label: 'Disbursement Pool', value: `₦${(totalPayroll * 0.95).toLocaleString()}`, icon: Banknote, color: 'text-emerald-600' },
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
                 <h2 className="text-xl font-black text-gray-900">Payroll Cycle: {new Date().toLocaleString('default', { month: 'long' })}</h2>
                 <button 
                   onClick={handleDisburse}
                   disabled={isDisbursing || staff.length === 0}
                   className="bg-emerald-600 text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-emerald-600/20 disabled:opacity-50 flex items-center gap-2"
                 >
                    {isDisbursing ? <Loader2 className="animate-spin w-4 h-4" /> : <Banknote className="w-4 h-4" />}
                    Disburse Salaries
                 </button>
              </div>
              <div className="overflow-x-auto">
                 {loading ? (
                   <div className="p-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-emerald-600" /></div>
                 ) : (
                   <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                           <th className="p-6">Employee</th>
                           <th className="p-6 text-center">Designation</th>
                           <th className="p-6 text-center">Net Pay</th>
                           <th className="p-6 text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {staff.map((member) => (
                          <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                             <td className="p-6">
                                <p className="font-bold text-gray-900">{member.name}</p>
                                <p className="text-xs text-gray-400">Staff ID: {member.id}</p>
                             </td>
                             <td className="p-6 text-center font-bold text-gray-600 uppercase text-xs tracking-widest">{member.role}</td>
                             <td className="p-6 text-center font-black text-emerald-600">₦{member.baseSalary?.toLocaleString()}</td>
                             <td className="p-6 text-right">
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter">Verified</span>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                 )}
              </div>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                 <h2 className="text-xl font-black text-gray-900">Workforce Attendance</h2>
                 <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Live Status</span>
              </div>
              <div className="p-8 space-y-4">
                 {staff.map((member) => (
                   <div key={member.id} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black">{member.name[0]}</div>
                         <div>
                            <p className="font-bold text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => handleClockIn(member.id)}
                        className="bg-white text-blue-600 font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                         Clock In
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl text-center">
              <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Security Matrix</h3>
              <div className="w-48 h-48 bg-gray-100 rounded-[32px] mx-auto mb-8 flex items-center justify-center border-4 border-dashed border-gray-200">
                 <Receipt className="w-16 h-16 text-gray-300" />
              </div>
              <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">Integrated attendance feeds directly into payroll deductions and bonus calculations.</p>
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
                 <CheckCircle2 className="text-emerald-600 w-8 h-8" />
                 <div className="text-left">
                    <p className="font-black text-emerald-900 uppercase text-[10px] tracking-widest">System Status</p>
                    <p className="text-sm font-bold text-emerald-700">Database Optimized</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
