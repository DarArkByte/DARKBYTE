import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useSchool } from '../../hooks/useSchool';
import { Building2, User, Phone, Mail, GraduationCap, ArrowRight, CheckCircle2, Loader2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdmissionsForm() {
  const { domain } = useParams();
  const { school, loading: schoolLoading } = useSchool();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    parentPhone: '',
    email: '',
    targetClass: 'JSS 1',
    previousSchool: '',
    dateOfBirth: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!school) return;
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'admissions'), {
        ...formData,
        schoolId: school.id,
        status: 'pending',
        examStatus: 'pending',
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      // Store application ID for the exam
      localStorage.setItem('admission_app_id', docRef.id);
    } catch (err) {
      alert('Application failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (schoolLoading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[56px] shadow-2xl max-w-2xl w-full text-center space-y-8 border border-emerald-100"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Application Received!</h2>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">
            Your application to <span className="text-indigo-600">{school?.name}</span> has been successfully logged into our digital matrix.
          </p>
          
          <div className="bg-amber-50 p-8 rounded-[32px] border border-amber-100 space-y-4">
             <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center justify-center gap-2">
               <AlertCircle className="w-4 h-4" /> Application Processing
             </h4>
             <p className="text-sm text-slate-900 font-bold">
               Our admissions office will review your data and schedule an Entrance Exam date. You will be notified via phone/email.
             </p>
             <div className="p-4 bg-white/50 rounded-2xl border border-amber-200">
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Portal Access</p>
               <p className="text-slate-900 font-bold">Please return to this portal on your assigned date to take the screening.</p>
             </div>
          </div>
          
          <button onClick={() => navigate(`/portal/${domain}`)} className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-600">
            Return to School Homepage
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/30 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] -ml-40 -mb-40" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white rounded-[56px] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row"
      >
        <div className="bg-indigo-600 md:w-1/3 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Building2 className="w-12 h-12 mb-8 opacity-50" />
            <h2 className="text-4xl font-black leading-[0.9] tracking-tighter mb-4">ADMISSIONS <br />GATEWAY.</h2>
            <p className="text-indigo-100 font-bold opacity-80 uppercase text-[10px] tracking-widest">Enrollment Cycle {new Date().getFullYear()}/{new Date().getFullYear() + 1}</p>
          </div>
          
          <div className="relative z-10 space-y-6">
             <div className="flex items-center gap-4">
               <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center font-black text-xs">1</div>
               <span className="text-xs font-black uppercase tracking-widest opacity-60">Personal Identity</span>
             </div>
             <div className="flex items-center gap-4">
               <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center font-black text-xs">2</div>
               <span className="text-xs font-black uppercase tracking-widest opacity-60">Academic History</span>
             </div>
             <div className="flex items-center gap-4">
               <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center font-black text-xs">3</div>
               <span className="text-xs font-black uppercase tracking-widest opacity-60">Entrance Exam</span>
             </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        </div>

        <div className="flex-1 p-12 md:p-16">
          <header className="mb-12">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Apply to {school?.name}
            </h3>
            <p className="text-slate-400 font-bold mt-2">Please provide accurate data for the academic vetting process.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prospective Student Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <input 
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    placeholder="Full Legal Name"
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Class</label>
                <div className="relative">
                  <GraduationCap className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <select 
                    value={formData.targetClass}
                    onChange={(e) => setFormData({...formData, targetClass: e.target.value})}
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-indigo-600 transition-all appearance-none"
                  >
                    <option>JSS 1</option>
                    <option>JSS 2</option>
                    <option>JSS 3</option>
                    <option>SSS 1</option>
                    <option>SSS 2</option>
                    <option>SSS 3</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent/Guardian Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <input 
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    placeholder="Father/Mother Full Name"
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guardian Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <input 
                    required
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                    placeholder="+234 ..."
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guardian Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@example.com"
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Previous Institution</label>
                <div className="relative">
                  <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <input 
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({...formData, previousSchool: e.target.value})}
                    placeholder="Former School Name"
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-3xl font-bold border-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl flex items-center gap-4 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
