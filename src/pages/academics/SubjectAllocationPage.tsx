import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { BookOpen, Search, CheckCircle2, AlertTriangle, Plus, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function SubjectAllocationPage() {
  const { school } = useSchool();
  const [selectedClass, setSelectedClass] = useState('JSS 1');
  const [search, setSearch] = useState('');

  // Dummy subjects database
  const allSubjects = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'English Language' },
    { id: '3', name: 'Basic Science' },
    { id: '4', name: 'Agricultural Science' },
    { id: '5', name: 'French' },
    { id: '6', name: 'Christian Religious Studies' },
    { id: '7', name: 'Islamic Religious Studies' },
    { id: '8', name: 'Home Economics' },
  ];

  // Dummy allocation state for selected class
  const [allocation, setAllocation] = useState({
    compulsory: ['1', '2', '3'],
    optional: ['4', '5', '6', '7', '8'],
    minOptionalRequired: 2,
  });

  const filteredSubjects = allSubjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = (subId: string, currentStatus: 'unassigned' | 'compulsory' | 'optional', newStatus: 'compulsory' | 'optional') => {
    setAllocation(prev => {
      let comp = [...prev.compulsory].filter(id => id !== subId);
      let opt = [...prev.optional].filter(id => id !== subId);
      
      if (currentStatus === newStatus) {
        // Toggle off (becomes unassigned)
        return { ...prev, compulsory: comp, optional: opt };
      }
      
      if (newStatus === 'compulsory') comp.push(subId);
      if (newStatus === 'optional') opt.push(subId);
      
      return { ...prev, compulsory: comp, optional: opt };
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-700 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-teal-200" />
              Subject Allocation
            </h1>
            <p className="text-teal-100 font-medium">Define compulsory and optional subjects for each class level.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-md">
            <div className="text-center border-r border-teal-500/50 pr-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-200">Compulsory</p>
              <p className="text-2xl font-black">{allocation.compulsory.length}</p>
            </div>
            <div className="text-center pl-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-200">Optional Pool</p>
              <p className="text-2xl font-black">{allocation.optional.length}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Controls */}
        <div className="lg:w-80 shrink-0 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="text-teal-600" /> Target Class
            </h3>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:ring-2 focus:ring-teal-500 cursor-pointer mb-6"
            >
              <option value="JSS 1">JSS 1</option>
              <option value="JSS 2">JSS 2</option>
              <option value="SSS 1">SSS 1</option>
            </select>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Registration Rule</h3>
              <p className="text-sm text-gray-500 mb-4">How many optional subjects must a student select from the pool?</p>
              
              <div className="flex items-center justify-between bg-teal-50 border border-teal-100 rounded-xl p-3">
                <span className="font-bold text-teal-800 text-sm">Minimum Required</span>
                <input 
                  type="number" 
                  value={allocation.minOptionalRequired}
                  onChange={(e) => setAllocation({...allocation, minOptionalRequired: Number(e.target.value)})}
                  className="w-16 text-center font-black text-teal-900 bg-white border border-teal-200 rounded-lg p-1"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6">
            <AlertTriangle className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="font-bold text-amber-900 mb-2">Important Notice</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Changing compulsory subjects mid-term will immediately update the report card structures for all students in this class. Ensure you Save before exiting.
            </p>
          </div>
        </div>

        {/* Central Matrix */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          
          <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search subject database..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 transition-all font-medium text-gray-700"
              />
            </div>
            <button className="flex items-center gap-2 text-teal-600 font-bold px-4 py-2 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
              <Plus className="w-4 h-4" /> New Subject
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredSubjects.map((sub, idx) => {
              const isCompulsory = allocation.compulsory.includes(sub.id);
              const isOptional = allocation.optional.includes(sub.id);
              const status = isCompulsory ? 'compulsory' : isOptional ? 'optional' : 'unassigned';

              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={sub.id}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[140px] ${
                    isCompulsory ? 'border-teal-500 bg-teal-50 shadow-sm' :
                    isOptional ? 'border-blue-400 bg-blue-50/50 shadow-sm' : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-gray-900 leading-tight pr-4">{sub.name}</h4>
                    {isCompulsory && <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button 
                      onClick={() => toggleStatus(sub.id, status, 'compulsory')}
                      className={`flex-1 text-xs font-bold px-2 py-2 rounded-lg transition-colors border ${
                        isCompulsory ? 'bg-teal-500 text-white border-teal-600 shadow-inner' : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300 hover:text-teal-600'
                      }`}
                    >
                      Compulsory
                    </button>
                    <button 
                      onClick={() => toggleStatus(sub.id, status, 'optional')}
                      className={`flex-1 text-xs font-bold px-2 py-2 rounded-lg transition-colors border ${
                        isOptional ? 'bg-blue-500 text-white border-blue-600 shadow-inner' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      Optional
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
