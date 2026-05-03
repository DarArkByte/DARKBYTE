import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { MessageSquareQuote, Upload, Download, Save, Users, Sparkles, Mic } from 'lucide-react';
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

  const [listeningFor, setListeningFor] = useState<{ id: string, field: string } | null>(null);

  const startVoiceDictation = (id: string, field: string) => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setListeningFor({ id, field });
    recognition.onend = () => setListeningFor(null);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleInputChange(id, field as any, transcript);
    };

    recognition.start();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-[40px] bg-slate-950 p-10 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3 tracking-tight">
              <MessageSquareQuote className="w-10 h-10 text-rose-400" />
              Academic Verdict Hub
            </h1>
            <p className="text-slate-400 font-medium">Dictate or auto-generate official commentary for students.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-slate-900 font-black px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-slate-100 transition-all shadow-xl">
              <Upload className="w-5 h-5" /> Import CSV
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center bg-gray-50/30 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-rose-100 text-rose-600 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Class</p>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-transparent font-black text-lg text-gray-900 border-none p-0 focus:ring-0 cursor-pointer"
              >
                <option value="JSS 1">JSS 1</option>
                <option value="JSS 2">JSS 2</option>
                <option value="SSS 1">SSS 1</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleAutoGenerateAll}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-600 font-black px-6 py-4 rounded-2xl hover:bg-indigo-100 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              AI Auto-Generate
            </button>
            <button className="flex items-center gap-2 bg-slate-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-slate-800 shadow-xl transition-all">
              <Save className="w-5 h-5" />
              Publish All
            </button>
          </div>
        </div>

        {/* Entry Table */}
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                <th className="p-6 w-1/4">Student</th>
                <th className="p-6 text-center w-32 border-r border-gray-100">Average</th>
                <th className="p-6">Form Master's Remark</th>
                <th className="p-6">Principal's Verdict</th>
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
                  <td className="p-6">
                    <p className="font-black text-gray-900">{entry.studentName}</p>
                    <p className="text-xs text-gray-400">Term Ranking: #{idx + 1}</p>
                  </td>
                  <td className="p-6 border-r border-gray-100 text-center">
                    <span className={`font-black text-xl tracking-tighter ${entry.average >= 50 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {entry.average.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="relative">
                      <textarea 
                        value={entry.formTeacherRemark}
                        onChange={(e) => handleInputChange(entry.id, 'formTeacherRemark', e.target.value)}
                        placeholder="Click mic to speak..."
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pr-12 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all resize-none shadow-inner"
                      />
                      <button 
                        onClick={() => startVoiceDictation(entry.id, 'formTeacherRemark')}
                        className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${listeningFor?.id === entry.id && listeningFor?.field === 'formTeacherRemark' ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-slate-400 hover:text-rose-500 shadow-sm'}`}
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="relative">
                      <textarea 
                        value={entry.principalRemark}
                        onChange={(e) => handleInputChange(entry.id, 'principalRemark', e.target.value)}
                        placeholder="Click mic to speak..."
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pr-12 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all resize-none shadow-inner"
                      />
                      <button 
                        onClick={() => startVoiceDictation(entry.id, 'principalRemark')}
                        className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${listeningFor?.id === entry.id && listeningFor?.field === 'principalRemark' ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-slate-400 hover:text-rose-500 shadow-sm'}`}
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                    </div>
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
}
