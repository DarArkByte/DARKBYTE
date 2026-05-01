import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { ClipboardCheck, Search, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ObservationEntry {
  id: string;
  studentName: string;
  metrics: Record<string, 'Consistently' | 'Sometimes' | 'Rarely' | 'Not Evaluated'>;
}

export default function ObservationalEntryPage() {
  const { school } = useSchool();
  const [selectedClass] = useState('Creche A');
  const [search, setSearch] = useState('');

  const metrics = [
    'Identifies Colors',
    'Plays well with others',
    'Follows basic instructions',
    'Shows curiosity',
    'Expresses needs clearly'
  ];

  // Dummy data
  const [entries, setEntries] = useState<ObservationEntry[]>([
    { id: '1', studentName: 'Emma Watson', metrics: { 'Identifies Colors': 'Consistently', 'Plays well with others': 'Sometimes' } },
    { id: '2', studentName: 'Noah Smith', metrics: { 'Follows basic instructions': 'Rarely' } },
    { id: '3', studentName: 'Olivia Davis', metrics: { 'Expresses needs clearly': 'Consistently' } },
  ]);

  const handleMetricChange = (studentId: string, metric: string, value: any) => {
    setEntries(entries.map(e => {
      if (e.id === studentId) {
        return { ...e, metrics: { ...e.metrics, [metric]: value } };
      }
      return e;
    }));
  };

  const filteredEntries = entries.filter(e => e.studentName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <ClipboardCheck className="w-8 h-8 text-amber-200" />
              Observational Assessment
            </h1>
            <p className="text-amber-100 font-medium">Evaluate early-years and creche students based on behavioral metrics.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-amber-700 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit">
            <Save className="w-5 h-5" />
            Save Evaluations
          </button>
        </div>
      </header>

      {/* Notice */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-4 text-amber-800">
        <AlertCircle className="w-6 h-6 shrink-0 mt-0.5 text-amber-600" />
        <div>
          <h4 className="font-bold mb-1 text-amber-900">Creche Grading System Active</h4>
          <p className="text-sm">This class is configured for observational assessment. Numerical CA and Exam scores are disabled. Evaluate each student using the scale below.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all font-medium text-gray-700 shadow-sm"
            />
          </div>
          <div className="text-sm font-bold text-gray-500">
            Class: <span className="text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">{selectedClass}</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="p-4 pl-6 font-bold w-1/4 sticky left-0 bg-white shadow-[1px_0_0_0_#f3f4f6]">Student Name</th>
                {metrics.map(metric => (
                  <th key={metric} className="p-4 font-bold text-center min-w-[200px] border-l border-gray-50">
                    <span className="line-clamp-2">{metric}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEntries.map((entry, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={entry.id} 
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4 pl-6 sticky left-0 bg-white group-hover:bg-gray-50/50 shadow-[1px_0_0_0_#f3f4f6] transition-colors">
                    <p className="font-bold text-gray-900">{entry.studentName}</p>
                  </td>
                  {metrics.map(metric => {
                    const value = entry.metrics[metric] || 'Not Evaluated';
                    return (
                      <td key={metric} className="p-4 border-l border-gray-50 text-center">
                        <select
                          value={value}
                          onChange={(e) => handleMetricChange(entry.id, metric, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg text-sm font-bold cursor-pointer transition-colors border ${
                            value === 'Consistently' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            value === 'Sometimes' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            value === 'Rarely' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            'bg-gray-50 text-gray-500 border-gray-200 hover:bg-white focus:ring-2 focus:ring-amber-500'
                          }`}
                        >
                          <option value="Not Evaluated" className="text-gray-500">Not Evaluated</option>
                          <option value="Consistently" className="text-emerald-700">Consistently</option>
                          <option value="Sometimes" className="text-blue-700">Sometimes</option>
                          <option value="Rarely" className="text-rose-700">Rarely</option>
                        </select>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
