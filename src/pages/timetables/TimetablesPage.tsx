import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { Calendar as CalendarIcon, Clock, Plus, Users, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Routine, Class, Section } from '../../types';

export default function TimetablesPage() {
  const { school } = useSchool();
  const [selectedDay, setSelectedDay] = useState(1); // 1 = Monday
  const [search, setSearch] = useState('');

  const days = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
  ];

  // Dummy data
  const routines: Routine[] = [
    { id: '1', schoolId: school?.id || '', classId: '1', sectionId: 's1', subjectId: 'Math', teacherId: 'Mr. John', dayOfWeek: 1, startTime: '08:00 AM', endTime: '08:45 AM' },
    { id: '2', schoolId: school?.id || '', classId: '1', sectionId: 's1', subjectId: 'English', teacherId: 'Mrs. Smith', dayOfWeek: 1, startTime: '08:45 AM', endTime: '09:30 AM' },
    { id: '3', schoolId: school?.id || '', classId: '2', sectionId: 's3', subjectId: 'Physics', teacherId: 'Dr. Mike', dayOfWeek: 1, startTime: '10:00 AM', endTime: '10:45 AM' },
  ];

  const filteredRoutines = routines.filter(r => r.dayOfWeek === selectedDay);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <CalendarIcon className="w-8 h-8" />
              School Timetables
            </h1>
            <p className="text-blue-100 font-medium">Manage class routines and teacher schedules dynamically.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit">
            <Plus className="w-5 h-5" />
            Add Schedule
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Select Day</h3>
            <div className="space-y-2">
              {days.map(day => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                    selectedDay === day.id 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {day.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg">
             <Clock className="w-8 h-8 mb-4 opacity-50" />
             <h3 className="font-bold text-lg mb-2">Automated Scheduling</h3>
             <p className="text-indigo-100 text-sm leading-relaxed">
               Prevent timetable clashes. The system will automatically warn you if a teacher is double-booked.
             </p>
          </div>
        </div>

        {/* Main Timetable View */}
        <div className="lg:col-span-3 space-y-6">
          {/* Toolbar */}
          <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Filter by Class or Teacher..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 font-medium text-gray-700"
              />
            </div>
          </div>

          {/* Schedule List */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
               <h2 className="text-xl font-bold text-gray-900">{days.find(d => d.id === selectedDay)?.name}'s Schedule</h2>
               <span className="text-sm font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{filteredRoutines.length} Classes</span>
            </div>
            
            <div className="divide-y divide-gray-50">
              {filteredRoutines.length === 0 ? (
                <div className="p-12 text-center">
                  <CalendarIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No schedules found for this day.</p>
                </div>
              ) : (
                filteredRoutines.map((routine, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={routine.id} 
                    className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="bg-blue-50 text-blue-700 font-black px-4 py-3 rounded-xl border border-blue-100 shadow-sm text-center min-w-[120px]">
                        <div className="text-sm">{routine.startTime}</div>
                        <div className="text-[10px] text-blue-400 uppercase tracking-widest mt-1">TO</div>
                        <div className="text-sm">{routine.endTime}</div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{routine.subjectId}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                            <Users className="w-4 h-4" />
                            Class {routine.classId} ({routine.sectionId})
                          </span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="text-sm font-bold text-indigo-600">
                            {routine.teacherId}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold text-blue-600 bg-white border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 shadow-sm">
                      Edit Slot
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
