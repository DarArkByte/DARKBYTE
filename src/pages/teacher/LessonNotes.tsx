import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { Class, Subject } from '../../types';
import { BookOpen, Upload, FileText, Plus, X, Search, CheckCircle2, Clock } from 'lucide-react';

interface LessonNote {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  fileUrl?: string;
  content?: string;
  createdAt: any;
}

export default function LessonNotes() {
  const { userProfile } = useAuth();
  const { school } = useSchool();
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    description: '',
    classId: '',
    subjectId: '',
    content: ''
  });

  const loadData = async () => {
    if (!school?.id || !userProfile?.uid) return;
    try {
      setLoading(true);
      const classesSnap = await getDocs(collection(db, 'schools', school.id, 'classes'));
      setClasses(classesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Class)));

      const subjectsSnap = await getDocs(collection(db, 'schools', school.id, 'subjects'));
      setSubjects(subjectsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Subject)));

      const notesSnap = await getDocs(
        query(
          collection(db, 'schools', school.id, 'lessonNotes'),
          where('teacherId', '==', userProfile.uid),
          orderBy('createdAt', 'desc')
        )
      );
      setNotes(notesSnap.docs.map(d => ({ id: d.id, ...d.data() } as LessonNote)));
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [school?.id, userProfile?.uid]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!school?.id || !userProfile?.uid) return;

    try {
      const selectedClass = classes.find(c => c.id === newNote.classId);
      const selectedSubject = subjects.find(s => s.id === newNote.subjectId);

      await addDoc(collection(db, 'schools', school.id, 'lessonNotes'), {
        ...newNote,
        teacherId: userProfile.uid,
        teacherName: userProfile.displayName,
        className: selectedClass?.name || '',
        subjectName: selectedSubject?.name || '',
        createdAt: Timestamp.now(),
      });

      setShowAddModal(false);
      setNewNote({ title: '', description: '', classId: '', subjectId: '', content: '' });
      loadData();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-bold text-gray-900 mb-2">Lesson Notes Center</h1>
          <p className="text-gray-500 font-medium font-sans">Upload and manage your digital learning materials.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" /> Create New Note
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center border border-gray-100 shadow-sm">
               <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full mb-4" />
               <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Loading Repository...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center border border-gray-100 shadow-sm text-center">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-300">
                  <BookOpen className="w-8 h-8" />
               </div>
               <h3 className="text-lg font-bold text-gray-900 mb-2">No Lesson Notes Yet</h3>
               <p className="text-gray-400 font-medium text-sm max-w-xs mx-auto mb-8">Start by creating your first lesson note to share with your students.</p>
               <button 
                onClick={() => setShowAddModal(true)}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest"
               >
                 Create Note
               </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {notes.map(note => (
                <div key={note.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:border-indigo-100 transition-all group">
                   <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full">{note.className}</span>
                   </div>
                   <h3 className="font-bold text-gray-900 mb-1">{note.title}</h3>
                   <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mb-4">{note.subjectName}</p>
                   <p className="text-xs text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">{note.description || note.content}</p>
                   <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                         <Clock className="w-3 h-3" />
                         {note.createdAt?.toDate().toLocaleDateString()}
                      </div>
                      <button className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">View Note</button>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Repository Stats</h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500">Total Notes</p>
                    <p className="text-lg font-black text-gray-900">{notes.length}</p>
                 </div>
                 <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500">Active Classes</p>
                    <p className="text-lg font-black text-gray-900">{classes.length}</p>
                 </div>
                 <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500">Student Access</p>
                    <p className="text-lg font-black text-emerald-600 uppercase">Live</p>
                 </div>
              </div>
           </div>

           <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20">
              <Zap className="w-8 h-8 mb-4 text-indigo-300" />
              <h3 className="text-lg font-black mb-2">Did You Know?</h3>
              <p className="text-indigo-100 text-xs font-medium leading-relaxed">
                Students with access to digital lesson notes score 25% higher on average in term exams. Keep your repository updated!
              </p>
           </div>
        </div>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
           <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Create Lesson Note</h2>
                 <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                    <X className="w-5 h-5 text-slate-400" />
                 </button>
              </div>
              <form onSubmit={handleAddNote} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Target Class</label>
                       <select 
                         required
                         value={newNote.classId}
                         onChange={(e) => setNewNote({...newNote, classId: e.target.value})}
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
                         value={newNote.subjectId}
                         onChange={(e) => setNewNote({...newNote, subjectId: e.target.value})}
                         className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all"
                       >
                          <option value="">Select Subject</option>
                          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Note Title</label>
                    <input 
                      required
                      type="text" 
                      value={newNote.title}
                      onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                      placeholder="e.g., Introduction to Quadratic Equations"
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Content / Summary</label>
                    <textarea 
                      required
                      rows={6}
                      value={newNote.content}
                      onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                      placeholder="Type your lesson notes or a summary here..."
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all resize-none"
                    />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 p-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                       Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 p-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                    >
                       Publish Note
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
