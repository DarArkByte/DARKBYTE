/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GraduationCap } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const { login, resetPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);

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
      }, 800);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Verify your Secure Key.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await resetPassword(email);
      setSuccess('Recovery link sent! Check your inbox.');
    } catch (err: any) {
      setError('Could not send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b4b] px-4 overflow-hidden relative font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#d946ef]/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-[480px] w-full bg-white/5 backdrop-blur-3xl rounded-[48px] shadow-2xl p-10 lg:p-14 border border-white/10 relative z-10">
        <div className="text-center mb-10">
          <div className="bg-[#d946ef] p-2 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-magenta-500/20">
             <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Dar-Ark Bytes</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Secure Access Portal</p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-500/10 text-red-400 rounded-3xl text-xs font-black border border-red-500/20 uppercase tracking-widest text-center animate-pulse">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-8 p-6 bg-emerald-500/20 text-emerald-400 rounded-3xl text-xs font-black border border-emerald-500/40 uppercase tracking-widest text-center shadow-2xl shadow-emerald-500/20">
            {success}
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
              className="w-full bg-[#d946ef] text-white font-black py-6 rounded-2xl shadow-2xl shadow-magenta-500/40 hover:bg-[#c026d3] transition-all active:scale-95 disabled:opacity-50 text-lg uppercase tracking-widest"
            >
              {loading ? 'Verifying...' : success ? 'Admitted' : 'Sign In'}
            </button>
            <button 
                type="button"
                onClick={() => setShowForgot(true)}
                className="w-full text-center text-xs font-black text-slate-600 hover:text-white transition-colors uppercase tracking-widest py-2"
              >
                Forgot Password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-8">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Recovery Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-black text-white placeholder-slate-700"
                placeholder="registered@email.com"
              />
            </div>
            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-[#1e1b4b] font-black py-6 rounded-2xl shadow-xl hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50 text-lg uppercase tracking-widest"
              >
                {loading ? 'Processing...' : 'Send Recovery'}
              </button>
              <button 
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full text-center text-xs font-black text-slate-500 hover:text-white transition-colors py-2 uppercase tracking-widest"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        <div className="mt-12 text-center pt-10 border-t border-white/10">
          <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] leading-relaxed">
            Proprietary Technology of <br /> 
            <span className="text-slate-400">Dar-Ark Bytes Enterprise</span>
          </p>
        </div>
      </div>
    </div>
  );
}
