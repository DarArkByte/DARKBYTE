import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useSchool } from '../../hooks/useSchool';
import { Timer, Send, Loader2, CheckCircle2, Award, BookOpen, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EntranceExam() {
  const { domain } = useParams();
  const { school } = useSchool();
  const navigate = useNavigate();
  const [appId] = useState(localStorage.getItem('admission_app_id'));
  const [applicant, setApplicant] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isExamDay, setIsExamDay] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      if (!appId || !school) return;
      try {
        const appSnap = await getDoc(doc(db, 'admissions', appId));
        if (!appSnap.exists()) {
          alert('Application record not found.');
          navigate(`/portal/${domain}/admissions`);
          return;
        }
        const appData = appSnap.data();
        setApplicant(appData);

        // DATE LOCK CHECK
        const today = new Date().toISOString().split('T')[0];
        if (appData.examDate !== today) {
          setIsExamDay(false);
          setLoading(false);
          return;
        }
        setIsExamDay(true);

        // Fetch Entrance Questions for the school
        const q = query(collection(db, 'entrance_questions'), where('schoolId', '==', school.id));
        const qSnap = await getDocs(q);
        
        // If no questions exist, use some demo ones
        if (qSnap.empty) {
          setQuestions([
            { id: '1', question: 'What is 15% of 200?', options: ['20', '30', '40', '50'], correctAnswer: 1 },
            { id: '2', question: 'Which part of speech is "Quickly"?', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], correctAnswer: 3 },
            { id: '3', question: 'The capital city of Nigeria is...', options: ['Lagos', 'Abuja', 'Kano', 'Ibadan'], correctAnswer: 1 },
            { id: '4', question: 'Which of these is a primary color?', options: ['Green', 'Purple', 'Red', 'Orange'], correctAnswer: 2 },
            { id: '5', question: 'Solve for x: 2x + 10 = 20', options: ['5', '10', '15', '20'], correctAnswer: 0 },
          ]);
        } else {
          setQuestions(qSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [appId, school]);

  useEffect(() => {
    if (loading || completed || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [loading, completed, timeLeft]);

  const handleSubmit = async () => {
    if (!appId) return;
    setSubmitting(true);
    try {
      let score = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) score++;
      });
      
      const finalPercentage = Math.round((score / questions.length) * 100);
      
      await updateDoc(doc(db, 'admissions', appId), {
        examScore: finalPercentage,
        examStatus: 'completed',
        status: 'interview'
      });
      
      setCompleted(true);
      localStorage.removeItem('admission_app_id');
    } catch (err) {
      alert('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
    </div>
  );

  if (!isExamDay) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-16 rounded-[64px] shadow-2xl max-w-2xl w-full text-center space-y-8"
      >
        <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto border-4 border-rose-100 animate-pulse">
           <AlertCircle className="w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Portal Locked</h2>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">
            Prospective student <span className="text-indigo-600">{applicant?.studentName}</span>, your entrance screening is not scheduled for today.
          </p>
        </div>

        <div className="bg-indigo-50 p-8 rounded-[40px] border border-indigo-100 flex flex-col items-center gap-4">
           <div className="flex items-center gap-2 text-indigo-600 font-black uppercase text-xs tracking-widest">
             <Timer className="w-4 h-4" /> Assigned Screening Date
           </div>
           <p className="text-3xl font-black text-slate-900">{applicant?.examDate || 'PENDING SCHEDULE'}</p>
        </div>

        <p className="text-xs text-slate-400 font-bold">Please log back in on your assigned date to activate the screening interface.</p>
        
        <button onClick={() => navigate(`/portal/${domain}`)} className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
           Exit Secure Portal
        </button>
      </motion.div>
    </div>
  );

  if (completed) return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-16 rounded-[64px] shadow-2xl max-w-2xl w-full text-center space-y-8"
      >
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <Award className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black text-slate-900">Assessment Complete!</h2>
        <p className="text-slate-500 font-bold text-lg leading-relaxed">
          Your entrance screening responses have been synchronized with the school's master database.
        </p>
        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Final Status</p>
          <p className="text-2xl font-black text-indigo-600">Awaiting Interview Call</p>
        </div>
        <button onClick={() => navigate(`/portal/${domain}`)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
          Return to Portal
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
             </div>
             <div>
               <h1 className="font-black text-slate-900 uppercase tracking-tight">Entrance Screening</h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{applicant?.studentName}</p>
             </div>
          </div>
          
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-lg ${timeLeft < 300 ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-900'}`}>
            <Timer className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-16 px-8">
        <div className="mb-12 flex justify-between items-end">
           <div>
             <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Question {currentIdx + 1} of {questions.length}</span>
             <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">{questions[currentIdx]?.question}</h2>
           </div>
        </div>

        <div className="space-y-4">
          {questions[currentIdx]?.options.map((opt: string, i: number) => (
            <button 
              key={i}
              onClick={() => setAnswers({...answers, [currentIdx]: i})}
              className={`w-full p-8 rounded-[32px] border-2 text-left transition-all flex items-center justify-between group ${
                answers[currentIdx] === i 
                ? 'border-indigo-600 bg-indigo-50 shadow-lg' 
                : 'border-white bg-white hover:border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                  answers[currentIdx] === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className={`text-xl font-bold ${answers[currentIdx] === i ? 'text-indigo-900' : 'text-slate-600'}`}>
                  {opt}
                </span>
              </div>
              {answers[currentIdx] === i && <CheckCircle2 className="w-6 h-6 text-indigo-600" />}
            </button>
          ))}
        </div>

        <div className="mt-16 flex justify-between items-center">
           <button 
             disabled={currentIdx === 0}
             onClick={() => setCurrentIdx(prev => prev - 1)}
             className="px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest text-slate-400 hover:text-slate-900 transition-all disabled:opacity-0"
           >
             Previous
           </button>
           
           {currentIdx < questions.length - 1 ? (
             <button 
               onClick={() => setCurrentIdx(prev => prev + 1)}
               className="bg-slate-900 text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-600 shadow-2xl transition-all"
             >
               Next Question
             </button>
           ) : (
             <button 
               onClick={handleSubmit}
               disabled={submitting}
               className="bg-emerald-600 text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-emerald-700 shadow-2xl shadow-emerald-500/20 transition-all flex items-center gap-3"
             >
               {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
               Submit Screening
             </button>
           )}
        </div>
      </main>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
         {questions.map((_, i) => (
           <div 
             key={i} 
             className={`h-1.5 rounded-full transition-all ${
               i === currentIdx ? 'w-8 bg-indigo-600' : 
               answers[i] !== undefined ? 'w-4 bg-emerald-400' : 'w-4 bg-slate-200'
             }`} 
           />
         ))}
      </div>
    </div>
  );
}
