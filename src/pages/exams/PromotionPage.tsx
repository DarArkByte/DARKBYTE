import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { TrendingUp, Users, AlertTriangle, CheckCircle, ChevronRight, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface PromotionStudent {
  id: string;
  name: string;
  currentClass: string;
  averageScore: number;
  status: 'promoted' | 'repeated' | 'pending';
}

export default function PromotionPage() {
  const { school } = useSchool();
  const [selectedClass, setSelectedClass] = useState('JSS 1');

  // Dummy data
  const [students, setStudents] = useState<PromotionStudent[]>([
    { id: '1', name: 'Alice Johnson', currentClass: 'JSS 1', averageScore: 85.5, status: 'pending' },
    { id: '2', name: 'Bob Smith', currentClass: 'JSS 1', averageScore: 38.0, status: 'pending' },
    { id: '3', name: 'Charlie Davis', currentClass: 'JSS 1', averageScore: 65.2, status: 'pending' },
  ]);

  const handleStatusChange = (id: string, newStatus: 'promoted' | 'repeated') => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const promoteAllEligible = () => {
    setStudents(students.map(s => ({
      ...s,
      status: s.averageScore >= 40 ? 'promoted' : 'repeated'
    })));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-600 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              Session Promotion
            </h1>
            <p className="text-orange-100 font-medium">Review final averages and advance students to the next academic level.</p>
          </div>
          <button onClick={promoteAllEligible} className="flex items-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit">
            <CheckCircle className="w-5 h-5" />
            Auto-Promote Eligible
          </button>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center bg-gray-50/50 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Select Class to Evaluate</p>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-transparent text-xl font-black text-gray-900 border-none p-0 focus:ring-0 cursor-pointer"
              >
                <option value="JSS 1">JSS 1</option>
                <option value="JSS 2">JSS 2</option>
                <option value="SSS 1">SSS 1</option>
              </select>
            </div>
          </div>

          <button className="flex items-center gap-2 text-gray-600 font-bold px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors bg-white shadow-sm">
            <Download className="w-4 h-4" />
            Export List
          </button>
        </div>

        {/* Students List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="p-6 font-bold">Student Name</th>
                <th className="p-6 font-bold">Session Average</th>
                <th className="p-6 font-bold">Eligibility</th>
                <th className="p-6 font-bold text-right">Promotion Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student, idx) => {
                const isEligible = student.averageScore >= 40;
                
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={student.id} 
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                          {student.name.charAt(0)}
                        </div>
                        <p className="font-bold text-gray-900">{student.name}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`font-black text-lg ${isEligible ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {student.averageScore.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-6">
                      {isEligible ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-lg text-sm border border-emerald-100">
                          <CheckCircle className="w-4 h-4" /> Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 font-bold px-3 py-1 rounded-lg text-sm border border-rose-100">
                          <AlertTriangle className="w-4 h-4" /> Requires Review
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      {student.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleStatusChange(student.id, 'promoted')}
                            className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 shadow-sm transition-colors"
                          >
                            Promote
                          </button>
                          <button 
                            onClick={() => handleStatusChange(student.id, 'repeated')}
                            className="px-4 py-2 bg-white text-rose-600 border border-rose-200 text-sm font-bold rounded-lg hover:bg-rose-50 shadow-sm transition-colors"
                          >
                            Repeat
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <span className={`font-bold px-4 py-2 rounded-lg ${student.status === 'promoted' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {student.status === 'promoted' ? 'Promoted' : 'Repeated'}
                          </span>
                          <button 
                            onClick={() => handleStatusChange(student.id, 'pending')}
                            className="text-gray-400 hover:text-gray-600 p-2"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
