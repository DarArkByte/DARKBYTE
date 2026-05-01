import React, { useState } from 'react';
import { MonitorPlay, Plus, Search, Calendar, Clock, Users, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { OnlineExam } from '../../types';

export default function OnlineExamPage() {
  const [search, setSearch] = useState('');

  // Dummy data
  const exams: OnlineExam[] = [
    { id: '1', schoolId: 's1', title: 'JSS 1 Mathematics Mid-Term CBT', classId: 'JSS 1', subjectId: 'Mathematics', questionIds: ['1', '2', '3'], durationMinutes: 45, startTime: '2026-10-15T09:00', endTime: '2026-10-15T12:00', passingPercentage: 50 },
    { id: '2', schoolId: 's1', title: 'SSS 1 Physics Assessment', classId: 'SSS 1', subjectId: 'Physics', questionIds: ['4', '5'], durationMinutes: 60, startTime: '2026-10-16T10:00', endTime: '2026-10-16T11:00', passingPercentage: 40 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-800 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <MonitorPlay className="w-8 h-8" />
              CBT Exam Engine
            </h1>
            <p className="text-indigo-200 font-medium">Schedule and monitor live Computer Based Tests.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-500 text-white border border-indigo-400 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-400 hover:scale-105 transition-all w-fit">
            <Plus className="w-5 h-5" />
            Create CBT Exam
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search scheduled exams..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-700"
          />
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((exam, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={exam.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-slate-100 text-slate-800 font-black px-4 py-2 rounded-xl text-sm border border-slate-200">
                {exam.subjectId}
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <PlayCircle className="w-4 h-4" /> Ready
              </span>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">{exam.title}</h3>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Users className="w-4 h-4 text-gray-400" /> {exam.classId}
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Clock className="w-4 h-4 text-gray-400" /> {exam.durationMinutes} Minutes
              </div>
            </div>

            <div className="mt-auto bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Window Opens</p>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  {new Date(exam.startTime).toLocaleDateString()} @ {new Date(exam.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              <button className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors">
                Manage
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
