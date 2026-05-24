/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GraduationCap, Zap, ShieldAlert, FlaskConical, Loader2, School } from 'lucide-react';
import { useState, useEffect } from 'react';
import { seedDemoSchool, DEMO_SCHOOL_ID } from '../services/seedDemoSchool';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function LoginPage() {
  const { login, resetPassword, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoStatus, setDemoStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  // CACHE BUSTER: Force clear any stuck session on mount
  useEffect(() => {
    if (window.location.search.includes('reset')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await login(email, password);
      setSuccess('ADMITTANCE GRANTED. INJECTING COMMAND CENTER...');
      // FORCE RELOAD BYPASS
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Verify your Secure Key.');
    } finally {
      setLoading(false);
    }
  };

  const forceEntry = () => {
    localStorage.clear();
    window.location.href = '/dashboard';
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setDemoStatus('Preparing demo school...');
    try {
      // Step 1: Seed the school data
      const result = await seedDemoSchool();
      setDemoStatus(result.message);

      // Step 2: Bypass Firebase Auth and use local demo state
      setDemoStatus('Authenticating demo session...');
      localStorage.setItem('demo_mode', 'true');

      // Step 3: Set the impersonation flag
      localStorage.setItem('impersonated_school_id', DEMO_SCHOOL_ID);
      setDemoStatus('Launching Greenfield Academy...');
      setTimeout(() => { window.location.href = '/dashboard'; }, 800);
    } catch (err: any) {
      setError('Demo launch failed: ' + (err.message || 'Unknown error'));
      setDemoLoading(false);
      setDemoStatus('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b4b] px-4 overflow-hidden relative font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#d946ef]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[520px] w-full space-y-6 relative z-10">

        {/* DEMO BANNER */}
        <div
          onClick={!demoLoading ? handleDemoLogin : undefined}
          className={`group relative overflow-hidden rounded-[32px] border-2 border-emerald-400/50 bg-gradient-to-br from-emerald-950/80 to-teal-900/80 backdrop-blur-xl p-8 text-white shadow-2xl shadow-emerald-500/10 ${
            demoLoading ? 'cursor-wait opacity-80' : 'cursor-pointer hover:border-emerald-300 hover:shadow-emerald-400/20 transition-all duration-300'
          }`}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="relative flex items-center gap-5">
            <div className="bg-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
              {demoLoading ? <Loader2 className="w-7 h-7 text-white animate-spin" /> : <School className="w-7 h-7 text-white" />}
            </div>
            <div className="flex-1">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-300 mb-1">🏫 Live Demo — Click to Launch</div>
              <h2 className="text-xl font-black tracking-tight">Greenfield International Academy</h2>
              <p className="text-emerald-200/70 text-[11px] font-bold mt-1">
                {demoLoading ? demoStatus : 'Full school ERP demo · No account needed · Instant access'}
              </p>
            </div>
            {!demoLoading && (
              <div className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl flex-shrink-0 group-hover:bg-white group-hover:text-emerald-700 transition-all">
                Try Now
              </div>
            )}
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-[40px] shadow-2xl p-10 border border-white/10">
          <div className="text-center mb-10">
            <div className="bg-[#d946ef] p-2 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Dar-Ark Bytes</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Secure Access Portal</p>
          </div>

        {error && (
          <div className="mb-8 p-6 bg-red-500/10 text-red-400 rounded-3xl text-xs font-black border border-red-500/20 uppercase tracking-widest text-center animate-pulse">
            <ShieldAlert className="w-5 h-5 mx-auto mb-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-8 p-6 bg-emerald-500/20 text-emerald-400 rounded-3xl text-xs font-black border border-emerald-500/40 uppercase tracking-widest text-center shadow-2xl shadow-emerald-500/20">
            {success}
            <button 
              onClick={forceEntry}
              className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
            >
              <Zap className="w-4 h-4 fill-current" /> FORCE ENTRY NOW
            </button>
          </div>
        )}

        {!showForgot ? (
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Secure Username</label>
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-black text-white placeholder-slate-700"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Encrypted Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-black text-white placeholder-slate-700"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full bg-[#d946ef] text-white font-black py-6 rounded-2xl shadow-2xl shadow-magenta-500/40 hover:bg-[#c026d3] transition-all active:scale-95 disabled:opacity-50 text-lg uppercase tracking-widest flex items-center justify-center gap-3"
            >
              {loading ? 'Verifying...' : success ? 'Admitted' : 'Sign In'}
            </button>
            
            {user && (
              <button 
                type="button"
                onClick={forceEntry}
                className="w-full bg-white/10 text-white font-black py-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all text-xs uppercase tracking-widest"
              >
                Enter Dashboard Directly
              </button>
            )}

            <button 
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full text-center text-xs font-black text-slate-600 hover:text-white transition-colors uppercase tracking-widest py-2"
              >
                Forgot Password?
            </button>
          </form>
        ) : (
          <div className="text-center p-10">
            <h3 className="text-white font-black uppercase mb-4">Reset Security Protocol</h3>
            <p className="text-slate-400 text-sm font-bold mb-8">Please contact Dar-Ark Platform Security for Master Key recovery.</p>
            <button onClick={() => setShowForgot(false)} className="text-[#d946ef] font-black uppercase tracking-widest text-xs">Back to Login</button>
          </div>
        )}

          <div className="mt-12 text-center pt-10 border-t border-white/10">
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] leading-relaxed">
              Proprietary Technology of <br />
              <span className="text-slate-400">Dar-Ark Bytes Enterprise</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
