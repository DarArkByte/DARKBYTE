import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus, Users, Layers, Search, ChevronRight, Settings2, Loader2 } from 'lucide-react';
import { Class, Section } from '../../types';

export default function ClassesPage() {
  const { school } = useSchool();
  const [classes, setClasses] = useState<Class[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  const fetchData = async () => {
    if (!school?.id) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'classes'), where('schoolId', '==', school.id));
      const querySnapshot = await getDocs(q);
      const classesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Class));
      setClasses(classesData);

      const sQ = query(collection(db, 'sections'), where('schoolId', '==', school.id));
      const sSnapshot = await getDocs(sQ);
      const sectionsData = sSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Section));
      setSections(sectionsData);
    } catch (err) {
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [school?.id]);

  const handleCreateClass = async () => {
    if (!newClassName.trim() || !school?.id) return;
    try {
      await addDoc(collection(db, 'classes'), {
        name: newClassName,
        schoolId: school.id,
        formTeacherId: null
      });
      setNewClassName('');
      setIsCreating(false);
      fetchData();
    } catch (err) {
      alert('Error creating class');
    }
  };

  const filteredClasses = classes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing School Structure...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[48px] bg-gradient-to-r from-[#1e1b4b] to-indigo-600 p-10 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 flex items-center gap-4">
              <Layers className="w-10 h-10 text-[#d946ef]" />
              COMMAND SYSTEM: CLASSES
            </h1>
            <p className="text-indigo-200 font-bold text-lg max-w-xl">Configure and manage your school's academic hierarchy and student arms.</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-3 bg-[#d946ef] text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-magenta-500/20 hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Establish New Class
          </button>
        </div>
      </header>

      {isCreating && (
        <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-xl font-black text-slate-900 mb-6">Create New Academic Node</h3>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="e.g. JSS 1, Grade 10..."
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="flex-1 px-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-[#d946ef]"
            />
            <button 
              onClick={handleCreateClass}
              className="px-10 py-5 bg-[#1e1b4b] text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-[#d946ef] transition-all"
            >
              Confirm Deployment
            </button>
            <button 
              onClick={() => setIsCreating(false)}
              className="px-10 py-5 bg-slate-100 text-slate-400 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Abort
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search classes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-8 py-5 bg-slate-50 border-none rounded-full font-bold text-slate-600 focus:ring-2 focus:ring-[#1e1b4b]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClasses.map((cls) => {
          const classSections = sections.filter(s => s.classId === cls.id);
          return (
            <div key={cls.id} className="bg-white rounded-[56px] p-10 shadow-sm border border-slate-100 hover:shadow-2xl transition-all group cursor-pointer flex flex-col h-full border-b-8" style={{ borderBottomColor: '#d946ef' }}>
              <div className="flex justify-between items-start mb-10">
                <div className="bg-indigo-50 p-6 rounded-3xl text-indigo-600 group-hover:bg-[#1e1b4b] group-hover:text-white transition-all">
                  <Users className="w-8 h-8" />
                </div>
                <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-[#d946ef] transition-all" />
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">{cls.name}</h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Academic Node</p>
              
              <div className="mt-10 pt-10 border-t border-slate-50">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class Arms</span>
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-4 py-1.5 rounded-full">{classSections.length} Sections</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {classSections.map(sec => (
                    <span key={sec.id} className="bg-slate-50 border border-slate-100 text-slate-700 px-4 py-2 rounded-2xl text-xs font-bold">
                      {sec.name}
                    </span>
                  ))}
                  <button className="bg-white border-2 border-dashed border-slate-200 text-slate-400 px-4 py-2 rounded-2xl text-xs font-bold hover:border-[#d946ef] hover:text-[#d946ef] transition-all flex items-center gap-2">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <button 
          onClick={() => setIsCreating(true)}
          className="border-4 border-dashed border-slate-100 rounded-[56px] p-10 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 hover:border-indigo-200 transition-all min-h-[350px] group"
        >
          <div className="bg-white shadow-xl text-indigo-600 p-6 rounded-full mb-6 group-hover:scale-110 transition-all">
            <Plus className="w-10 h-10" />
          </div>
          <h3 className="font-black text-slate-900 text-xl mb-1 uppercase tracking-tight">Expand Structure</h3>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Deploy New Class Module</p>
        </button>
      </div>
    </div>
  );
}
