import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { Plus, Users, Layers, Search, ChevronRight, Settings2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Class, Section } from '../../types';

export default function ClassesPage() {
  const { school } = useSchool();
  const [classes, setClasses] = useState<Class[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [search, setSearch] = useState('');

  // Dummy data for now until we hook up the Firebase fetching
  useEffect(() => {
    if (school) {
      setClasses([
        { id: '1', schoolId: school.id, name: 'JSS 1', formTeacherId: 't1' },
        { id: '2', schoolId: school.id, name: 'JSS 2', formTeacherId: 't2' },
        { id: '3', schoolId: school.id, name: 'JSS 3', formTeacherId: 't3' },
      ]);
      setSections([
        { id: 's1', schoolId: school.id, classId: '1', name: 'Science' },
        { id: 's2', schoolId: school.id, classId: '1', name: 'Arts' },
        { id: 's3', schoolId: school.id, classId: '2', name: 'Science' },
      ]);
    }
  }, [school]);

  const filteredClasses = classes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      {/* Header section with Glassmorphism */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <Layers className="w-8 h-8" />
              Class & Section Manager
            </h1>
            <p className="text-indigo-100 font-medium">Organize your school's academic structure and arms.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit">
            <Plus className="w-5 h-5" />
            Create New Class
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search classes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-700"
          />
        </div>
        <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors w-full sm:w-auto justify-center">
          <Settings2 className="w-5 h-5" />
          Structure Settings
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls, idx) => {
          const classSections = sections.filter(s => s.classId === cls.id);
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={cls.id} 
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all group cursor-pointer flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600">
                  <Users className="w-7 h-7" />
                </div>
                <button className="text-gray-300 hover:text-indigo-600 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">{cls.name}</h3>
              <p className="text-sm font-medium text-gray-500 mb-6">Form Teacher: Unassigned</p>
              
              <div className="mt-auto pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Sections / Arms</span>
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md">{classSections.length} Total</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {classSections.map(sec => (
                    <span key={sec.id} className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                      {sec.name}
                    </span>
                  ))}
                  <button className="bg-dashed border-2 border-dashed border-gray-200 text-gray-400 px-3 py-1.5 rounded-lg text-sm font-bold hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Empty State / Add New Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer min-h-[300px]"
        >
          <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">Add New Class</h3>
          <p className="text-sm text-gray-500 font-medium">Create a new academic level</p>
        </motion.div>
      </div>
    </div>
  );
}
