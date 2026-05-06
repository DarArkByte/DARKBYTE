import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { Class, Subject } from '../../types';
import { ClipboardList, Plus, X, Clock, Calendar, CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  dueDate: string;
  maxScore: number;
  submissionCount: number;
  createdAt: any;
}

export default function Assignments() {
  const { userProfile } = useAuth();
  const { school } = useSchool();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    classId: '',
    subjectId: '',
    dueDate: '',
    maxScore: 10
  });

  const loadData = async () => {
    if (!school?.id || !userProfile?.uid) return;
    try {
      setLoading(true);
      const classesSnap = await getDocs(collection(db, 'schools', school.id, 'classes'));
      setClasses(classesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Class)));

      const subjectsSnap = await getDocs(collection(db, 'schools', school.id, 'subjects'));
      setSubjects(subjectsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Subject)));

      const assignmentsSnap = await getDocs(
        query(
          collection(db, 'schools', school.id, 'assignments'),
          where('teacherId', '==', userProfile.uid),
          orderBy('createdAt', 'desc')
        )
      );
      setAssignments(assignmentsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Assignment)));
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [school?.id, userProfile?.uid]);

  const handleAddAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!school?.id || !userProfile?.uid) return;

    try {
      const selectedClass = classes.find(c => c.id === newAssignment.classId);
      const selectedSubject = subjects.find(s => s.id === newAssignment.subjectId);

      await addDoc(collection(db, 'schools', school.id, 'assignments'), {
        ...newAssignment,
        teacherId: userProfile.uid,
        teacherName: userProfile.displayName,
        className: selectedClass?.name || '',
        subjectName: selectedSubject?.name || '',
        submissionCount: 0,
        createdAt: Timestamp.now(),
      });

      setShowAddModal(false);
      setNewAssignment({ title: '', description: '', classId: '', subjectId: '', dueDate: '', maxScore: 10 });
      loadData();
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-bold text-gray-900 mb-2">Assignment Command</h1>
          <p className="text-gray-500 font-medium font-sans">Set tasks, track deadlines, and monitor student progress.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center border border-gray-100 shadow-sm">
               <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full mb-4" />
               <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Accessing Assignments...</p>
            </div>
          ) : assignments.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center border border-gray-100 shadow-sm text-center">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-300">
                  <ClipboardList className="w-8 h-8" />
               </div>
               <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Assignments</h3>
               <p className="text-gray-400 font-medium text-sm max-w-xs mx-auto mb-8">Ready to challenge your students? Create your first digital assignment now.</p>
               <button 
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest"
               >
                 New Assignment
               </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {assignments.map(assignment => (
                <div key={assignment.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:border-indigo-100 transition-all group">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <Send className="w-6 h-6" />
                         </div>
                         <div>
                            <h3 className="font-black text-gray-900 tracking-tight">{assignment.title}</h3>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{assignment.className}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">{assignment.subjectName}</span>
                      </div>
                   </div>
                   
                   <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2 mb-8">{assignment.description}</p>
                   
                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-slate-50 rounded-2xl">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                         <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-indigo-600" />
                            {new Date(assignment.dueDate).toLocaleDateString()}
                         </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Submissions</p>
                         <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <Users className="w-3 h-3 text-indigo-600" />
                            {assignment.submissionCount} Students
                         </p>
                      </div>
                   </div>

                   <button className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 shadow-sm">
                      Track Submissions
                   </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                 <AlertCircle className="w-6 h-6 text-amber-400" />
                 <h3 className="text-sm font-black uppercase tracking-widest">Active Deadlines</h3>
              </div>
              <div className="space-y-6">
                 {assignments.length > 0 ? (
                   assignments.slice(0, 3).map(a => (
                     <div key={a.id} className="border-l-2 border-slate-700 pl-4 space-y-1">
                        <p className="text-xs font-black text-white">{a.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{a.className}</p>
                     </div>
                   ))
                 ) : (
                   <p className="text-xs text-slate-500 font-medium">No pending deadlines.</p>
                 )}
              </div>
           </div>

           <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Productivity Tips</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Setting clear "Max Scores" and "Due Dates" helps the OS automate student reminders. Digital assignments reduce grading time by up to 40%.
              </p>
           </div>
        </div>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
           <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Set New Assignment</h2>
                 <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                    <X className="w-5 h-5 text-slate-400" />
                 </button>
              </div>
              <form onSubmit={handleAddAssignment} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Class</label>
                       <select 
                         required
                         value={newAssignment.classId}
                         onChange={(e) => setNewAssignment({...newAssignment, classId: e.target.value})}
                         className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all"
                       >
                          <option value="">Select Class</option>
                          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Subject</label>
                       <select 
                         required
                         value={newAssignment.subjectId}
                         onChange={(e) => setNewAssignment({...newAssignment, subjectId: e.target.value})}
                         className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all"
                       >
                          <option value="">Select Subject</option>
                          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                       </select>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Due Date</label>
                       <input 
                         required
                         type="date"
                         value={newAssignment.dueDate}
                         onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                         className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all"
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Max Score</label>
                       <input 
                         required
                         type="number"
                         value={newAssignment.maxScore}
                         onChange={(e) => setNewAssignment({...newAssignment, maxScore: parseInt(e.target.value)})}
                         className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Assignment Title</label>
                    <input 
                      required
                      type="text" 
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      placeholder="e.g., Weekly Mathematics Drill - Week 4"
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Instructions / Details</label>
                    <textarea 
                      required
                      rows={4}
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                      placeholder="Specify what students need to do..."
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all resize-none"
                    />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 p-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                       Discard
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 p-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                    >
                       Set Assignment
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
