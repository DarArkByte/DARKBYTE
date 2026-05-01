import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { MessageSquareQuote, Upload, Download, Save, Users, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CommentEntry {
  id: string;
  studentName: string;
  average: number;
  formTeacherRemark: string;
  principalRemark: string;
}

export default function CommentsEntryPage() {
  const { school } = useSchool();
  const [selectedClass, setSelectedClass] = useState('JSS 1');

  // Dummy data
  const [entries, setEntries] = useState<CommentEntry[]>([
    { id: '1', studentName: 'Alice Johnson', average: 85.5, formTeacherRemark: '', principalRemark: '' },
    { id: '2', studentName: 'Bob Smith', average: 38.0, formTeacherRemark: '', principalRemark: '' },
    { id: '3', studentName: 'Charlie Davis', average: 65.2, formTeacherRemark: '', principalRemark: '' },
  ]);

  const handleInputChange = (id: string, field: keyof CommentEntry, value: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const generateAutoRemark = (average: number) => {
    if (average >= 80) return "An outstanding performance this term. Keep up the excellent work!";
    if (average >= 70) return "A very good result. Shows great dedication to studies.";
    if (average >= 60) return "Good performance, but there is room for improvement.";
    if (average >= 50) return "A fair attempt. More effort and focus are needed next term.";
    if (average >= 40) return "A weak result. Must work harder to improve grades.";
    return "Poor performance. Urgent academic intervention is required.";
  };

  const handleAutoGenerateAll = () => {
    setEntries(entries.map(e => ({
      ...e,
      formTeacherRemark: e.formTeacherRemark || generateAutoRemark(e.average),
      principalRemark: e.principalRemark || (e.average >= 50 ? "Satisfactory result. Keep it up." : "Needs serious improvement.")
    })));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-600 to-rose-600 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <MessageSquareQuote className="w-8 h-8" />
              Report Remarks
            </h1>
            <p className="text-fuchsia-100 font-medium">Input or auto-generate Form Master and Principal comments.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-bold backdrop-blur-md transition-all">
              <Download className="w-4 h-4" />
              CSV Template
            </button>
            <button className="flex items-center gap-2 bg-white text-fuchsia-600 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
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
            <div className="bg-fuchsia-100 text-fuchsia-600 p-3 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Class</p>
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
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={handleAutoGenerateAll}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-600 font-bold px-4 py-3 rounded-xl hover:bg-indigo-100 transition-colors flex-1 justify-center"
            >
              <Sparkles className="w-5 h-5" />
              Auto-Generate Empty
            </button>
            <button className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 shadow-md transition-colors flex-1 justify-center">
              <Save className="w-5 h-5" />
              Save
            </button>
          </div>
        </div>

        {/* Entry Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="p-4 pl-6 font-bold w-1/5">Student Name</th>
                <th className="p-4 font-bold text-center w-32 border-r border-gray-100">Average</th>
                <th className="p-4 font-bold">Form Teacher's Remark</th>
                <th className="p-4 pr-6 font-bold">Principal's Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {entries.map((entry, idx) => (
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
                  <td className="p-4 border-r border-gray-100 text-center">
                    <span className={`font-black text-lg ${entry.average >= 50 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {entry.average.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-4">
                    <textarea 
                      value={entry.formTeacherRemark}
                      onChange={(e) => handleInputChange(entry.id, 'formTeacherRemark', e.target.value)}
                      placeholder="Type remark..."
                      rows={2}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-fuchsia-500 focus:bg-white transition-all resize-none"
                    />
                  </td>
                  <td className="p-4 pr-6">
                    <textarea 
                      value={entry.principalRemark}
                      onChange={(e) => handleInputChange(entry.id, 'principalRemark', e.target.value)}
                      placeholder="Type remark..."
                      rows={2}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-fuchsia-500 focus:bg-white transition-all resize-none"
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
