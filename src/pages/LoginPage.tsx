/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GraduationCap, LogIn } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
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
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
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
      setSuccess('Recovery link sent! Check your inbox or contact sparkodon61@gmail.com / info.dar.arkbytes@gmail.com');
    } catch (err: any) {
      setError('Could not send reset link. Please verify your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b4b] px-4 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#d946ef]/10 to-transparent blur-3xl pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-2xl rounded-[40px] shadow-2xl p-10 border border-white/10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="bg-gradient-to-br from-[#d946ef] to-[#4f46e5] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-magenta-500/20 rotate-3">
            <GraduationCap className="text-white w-12 h-12 -rotate-3" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Dar-Ark Bytes</h1>
          <p className="text-slate-400 mt-2 font-medium">
            {showForgot ? 'Password Recovery' : 'Secure Command Login'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-2xl text-sm font-bold border border-red-500/20 animate-pulse">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-sm font-bold border border-emerald-500/20">
            {success}
          </div>
        )}

        {!showForgot ? (
          <form onSubmit={handleEmailLogin} className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Username</label>
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-bold text-white placeholder-slate-600"
                placeholder="e.g. master_admin"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-bold text-white placeholder-slate-600"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d946ef] text-white font-black py-5 rounded-2xl shadow-2xl shadow-magenta-500/30 hover:bg-[#c026d3] transition-all active:scale-95 disabled:opacity-50 mt-4"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
            <button 
              type="button"
              onClick={() => setShowForgot(true)}
              className="w-full text-center text-xs font-black text-slate-500 hover:text-white transition-colors py-2 uppercase tracking-widest"
            >
              Forgot Password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Recovery Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-bold text-white"
                placeholder="Enter registered email"
              />
              <p className="mt-3 text-[10px] text-slate-500 leading-relaxed italic px-1">
                A link will be sent. Fallback: contact <span className="text-slate-300 font-bold">+234 916 960 0724</span>.
              </p>
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-slate-900 font-black py-5 rounded-2xl shadow-xl hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Send Recovery Link'}
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

        <div className="mt-8 text-center pt-8 border-t border-white/5">
          <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] leading-relaxed">
            Proprietary Technology of <br /> Dar-Ark Bytes
          </p>
        </div>
      </motion.div>
    </div>
  );
}
