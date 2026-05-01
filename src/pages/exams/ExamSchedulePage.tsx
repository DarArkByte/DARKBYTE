import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { Calendar as CalendarIcon, Clock, Plus, Filter, Search, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ExamSchedule } from '../../types';

export default function ExamSchedulePage() {
  const { school } = useSchool();
  const [search, setSearch] = useState('');

  // Dummy data
  const schedules: ExamSchedule[] = [
    { id: '1', schoolId: school?.id || '', examName: 'First Term Mid-Term Test', classId: 'JSS 1', sectionId: 'Science', subjectId: 'Mathematics', date: '2026-10-15', startTime: '09:00 AM', endTime: '10:30 AM', roomId: 'Hall A' },
    { id: '2', schoolId: school?.id || '', examName: 'First Term Mid-Term Test', classId: 'JSS 1', sectionId: 'Science', subjectId: 'English Language', date: '2026-10-15', startTime: '11:00 AM', endTime: '12:30 PM', roomId: 'Hall A' },
    { id: '3', schoolId: school?.id || '', examName: 'First Term Mid-Term Test', classId: 'JSS 2', sectionId: 'Arts', subjectId: 'Literature', date: '2026-10-16', startTime: '09:00 AM', endTime: '11:00 AM', roomId: 'Hall B' },
  ];

  const filteredSchedules = schedules.filter(s => s.examName.toLowerCase().includes(search.toLowerCase()) || s.subjectId.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8" />
              Exam Scheduling
            </h1>
            <p className="text-emerald-100 font-medium">Coordinate exam timetables and room allocations.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit">
            <Plus className="w-5 h-5" />
            Create Schedule
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
             <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Exams</p>
            <p className="text-2xl font-black text-gray-900">1</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
             <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Upcoming Papers</p>
            <p className="text-2xl font-black text-gray-900">{schedules.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600">
             <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Rooms Allocated</p>
            <p className="text-2xl font-black text-gray-900">2</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search subjects or exams..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-700 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-600 font-bold px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors bg-white border border-gray-200 shadow-sm w-full sm:w-auto justify-center">
            <Filter className="w-5 h-5" />
            Filter by Class
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-100">
                <th className="p-6 font-bold">Exam Name</th>
                <th className="p-6 font-bold">Subject</th>
                <th className="p-6 font-bold">Class/Section</th>
                <th className="p-6 font-bold">Date & Time</th>
                <th className="p-6 font-bold">Room</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSchedules.map((schedule, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={schedule.id} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-6">
                    <p className="font-bold text-gray-900">{schedule.examName}</p>
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-lg border border-emerald-100">
                      {schedule.subjectId}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-gray-700">{schedule.classId}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase">{schedule.sectionId}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      {schedule.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4 text-gray-300" />
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-gray-600">{schedule.roomId || 'Unassigned'}</p>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-emerald-600 font-bold hover:text-emerald-800 transition-colors opacity-0 group-hover:opacity-100">
                      Edit
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filteredSchedules.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <FileText className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No exam schedules found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
