import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { CheckCircle2, XCircle, Mic, MicOff, Users, Calendar, Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AttendancePage() {
  const { school } = useSchool();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (school?.id) {
      fetchStudents();
    }
  }, [school]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'students'), where('schoolId', '==', school?.id));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startVoiceRollCall = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const current = event.results[event.results.length - 1][0].transcript.toLowerCase();
      setTranscript(current);

      if (current.includes('present')) {
        markAttendance(students[currentIndex].id, 'present');
        nextStudent();
      } else if (current.includes('absent')) {
        markAttendance(students[currentIndex].id, 'absent');
        nextStudent();
      }
    };

    recognition.start();
  };

  const markAttendance = (studentId: string, status: 'present' | 'absent') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const nextStudent = () => {
    if (currentIndex < students.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const saveAttendance = async () => {
    if (!school?.id) return;
    try {
      await addDoc(collection(db, 'schools', school.id, 'attendance'), {
        date: serverTimestamp(),
        records: attendance,
        createdAt: serverTimestamp()
      });
      alert('Attendance saved successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10 pb-24 font-sans">
      <header className="relative overflow-hidden rounded-[56px] bg-slate-900 p-10 md:p-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 flex items-center gap-4">
              <Mic className="w-10 h-10 text-emerald-400" />
              VOICE ROLL CALL
            </h1>
            <p className="text-slate-400 font-bold text-lg max-w-xl">Mark attendance with your voice. Faster, hands-free, and smart.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={startVoiceRollCall}
              className={`flex items-center gap-3 ${isListening ? 'bg-rose-600' : 'bg-emerald-600'} text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              {isListening ? 'Listening...' : 'Start Roll Call'}
            </button>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[56px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-600" /> Student Directory
            </h2>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{students.length} Students</div>
          </div>

          <div className="p-10">
            {loading ? (
              <div className="py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-600" /></div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {students.map((student, idx) => (
                  <motion.div 
                    key={student.id}
                    initial={false}
                    animate={{
                      scale: idx === currentIndex ? 1.05 : 1,
                      opacity: idx === currentIndex ? 1 : 0.6,
                      borderColor: idx === currentIndex ? '#4f46e5' : '#f1f5f9'
                    }}
                    className={`p-6 rounded-[32px] border-2 transition-all flex items-center justify-between ${idx === currentIndex ? 'bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-xl' : 'bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white ${attendance[student.id] === 'present' ? 'bg-emerald-500' : attendance[student.id] === 'absent' ? 'bg-rose-500' : 'bg-slate-900'}`}>
                        {student.displayName?.[0] || 'S'}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm leading-tight">{student.displayName}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{student.class}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => markAttendance(student.id, 'present')} className={`p-2 rounded-xl ${attendance[student.id] === 'present' ? 'text-emerald-600 bg-emerald-100' : 'text-slate-300 bg-slate-50'}`}><CheckCircle2 className="w-5 h-5" /></button>
                       <button onClick={() => markAttendance(student.id, 'absent')} className={`p-2 rounded-xl ${attendance[student.id] === 'absent' ? 'text-rose-600 bg-rose-100' : 'text-slate-300 bg-slate-50'}`}><XCircle className="w-5 h-5" /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#1e1b4b] p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />
              <div className="relative z-10">
                 <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">Current Voice Command</h3>
                 <div className="bg-white/10 p-6 rounded-3xl border border-white/10 mb-8 min-h-[100px] flex items-center justify-center">
                    <p className="text-2xl font-black italic text-indigo-300">"{transcript || 'Waiting...'}"</p>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span>Commands</span>
                       <span>Function</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                       <span className="font-bold text-emerald-400">"PRESENT"</span>
                       <span className="text-[8px] font-black text-slate-400 uppercase">Mark Present</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                       <span className="font-bold text-rose-400">"ABSENT"</span>
                       <span className="text-[8px] font-black text-slate-400 uppercase">Mark Absent</span>
                    </div>
                 </div>
              </div>
           </div>

           <button 
             onClick={saveAttendance}
             className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl"
           >
             Finalize & Upload Attendance
           </button>
        </div>
      </div>
    </div>
  );
}
