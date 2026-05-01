import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { ClipboardList, Upload, Download, Save, Users, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultEntry {
  id: string;
  studentName: string;
  ca1: string;
  ca2: string;
  exam: string;
}

export default function ResultEntryPage() {
  const { school } = useSchool();
  const [selectedClass, setSelectedClass] = useState('JSS 1');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  // Dummy data
  const [entries, setEntries] = useState<ResultEntry[]>([
    { id: '1', studentName: 'Alice Johnson', ca1: '15', ca2: '18', exam: '52' },
    { id: '2', studentName: 'Bob Smith', ca1: '10', ca2: '12', exam: '45' },
    { id: '3', studentName: 'Charlie Davis', ca1: '18', ca2: '19', exam: '60' },
  ]);

  const handleInputChange = (id: string, field: keyof ResultEntry, value: string) => {
    // Basic validation to ensure numbers
    if (value !== '' && isNaN(Number(value))) return;
    
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const calculateTotal = (entry: ResultEntry) => {
    const total = Number(entry.ca1 || 0) + Number(entry.ca2 || 0) + Number(entry.exam || 0);
    return total;
  };

  const getGrade = (total: number) => {
    if (total >= 70) return { grade: 'A', color: 'text-emerald-600' };
    if (total >= 60) return { grade: 'B', color: 'text-blue-600' };
    if (total >= 50) return { grade: 'C', color: 'text-amber-600' };
    if (total >= 40) return { grade: 'D', color: 'text-orange-600' };
    return { grade: 'F', color: 'text-rose-600' };
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8" />
              Marks Entry
            </h1>
            <p className="text-blue-100 font-medium">Input Continuous Assessment (CA) and Exam scores.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-bold backdrop-blur-md transition-all">
              <Download className="w-4 h-4" />
              CSV Template
            </button>
            <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <Upload className="w-4 h-4" />
              Upload CSV
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center bg-gray-50/50 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Class</p>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-transparent font-black text-gray-900 border-none p-0 focus:ring-0 cursor-pointer"
                >
                  <option value="JSS 1">JSS 1</option>
                  <option value="JSS 2">JSS 2</option>
                  <option value="SSS 1">SSS 1</option>
                </select>
              </div>
              <div className="w-px bg-gray-300 mx-2" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Subject</p>
                <select 
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-transparent font-black text-gray-900 border-none p-0 focus:ring-0 cursor-pointer"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 shadow-md transition-colors w-full sm:w-auto justify-center">
            <Save className="w-5 h-5" />
            Save Marks
          </button>
        </div>

        {/* Entry Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="p-4 pl-6 font-bold w-1/4">Student Name</th>
                <th className="p-4 font-bold text-center">CA 1 (20)</th>
                <th className="p-4 font-bold text-center">CA 2 (20)</th>
                <th className="p-4 font-bold text-center border-r border-gray-100">Exam (60)</th>
                <th className="p-4 font-bold text-center bg-gray-50">Total</th>
                <th className="p-4 pr-6 font-bold text-center bg-gray-50">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {entries.map((entry, idx) => {
                const total = calculateTotal(entry);
                const { grade, color } = getGrade(total);
                
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={entry.id} 
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 pl-6">
                      <p className="font-bold text-gray-900">{entry.studentName}</p>
                    </td>
                    <td className="p-4">
                      <input 
                        type="text" 
                        value={entry.ca1}
                        onChange={(e) => handleInputChange(entry.id, 'ca1', e.target.value)}
                        className="w-full text-center bg-gray-50 border border-gray-200 rounded-lg py-2 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="text" 
                        value={entry.ca2}
                        onChange={(e) => handleInputChange(entry.id, 'ca2', e.target.value)}
                        className="w-full text-center bg-gray-50 border border-gray-200 rounded-lg py-2 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </td>
                    <td className="p-4 border-r border-gray-100">
                      <input 
                        type="text" 
                        value={entry.exam}
                        onChange={(e) => handleInputChange(entry.id, 'exam', e.target.value)}
                        className="w-full text-center bg-blue-50 border border-blue-200 rounded-lg py-2 font-bold text-blue-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </td>
                    <td className="p-4 bg-gray-50 text-center">
                      <span className="font-black text-lg text-gray-900">{total}</span>
                    </td>
                    <td className="p-4 pr-6 bg-gray-50 text-center">
                      <span className={`inline-block font-black text-lg w-8 h-8 rounded-full flex items-center justify-center mx-auto ${total > 0 ? color : 'text-gray-400'}`}>
                        {total > 0 ? grade : '-'}
                      </span>
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
