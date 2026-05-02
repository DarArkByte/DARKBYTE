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
    <div className="min-h-screen flex bg-[#1e1b4b] overflow-hidden font-sans">
      {/* Left Side: Marketing / Brand Story */}
      <div className="hidden lg:flex lg:w-1/2 relative p-20 flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d946ef]/20 to-indigo-600/20 blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-[#d946ef] p-2 rounded-xl">
               <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">Dar-Ark Bytes</span>
          </div>
          
          <h2 className="text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            THE SMART WAY <br />
            TO MANAGE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] to-yellow-200 underline decoration-yellow-500/30 underline-offset-8">YOUR SCHOOL.</span>
          </h2>
          
          <div className="space-y-6 max-w-md">
            {[
              { icon: Zap, text: 'Real-time Result Processing & Vetting' },
              { icon: ShieldCheck, text: 'Enterprise-Grade Data Isolation' },
              { icon: Globe, text: 'Branded Portals for Every School' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover:bg-[#d946ef] transition-all">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-slate-300 font-bold tracking-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 flex items-center gap-8 pt-12 border-t border-white/10">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Corporate Office</p>
            <p className="text-sm font-bold text-slate-300 leading-tight">Dar-Ark Bytes Tech <br /> Lagos, Nigeria</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Support Line</p>
            <p className="text-sm font-bold text-slate-300">+234 916 960 0724</p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="absolute lg:hidden inset-0 bg-gradient-to-b from-[#d946ef]/10 to-transparent blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[480px] w-full bg-white/5 backdrop-blur-3xl rounded-[48px] shadow-2xl p-10 lg:p-14 border border-white/10 relative z-10"
        >
          <div className="mb-10 lg:hidden">
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-[#d946ef] p-2 rounded-xl">
                 <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-white">Dar-Ark Bytes</span>
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              {showForgot ? 'Recover Password' : 'Welcome Back'}
            </h1>
            <p className="text-slate-400 font-medium tracking-tight">
              {showForgot ? 'We will send a recovery link' : 'Access your customized school dashboard'}
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 text-red-400 rounded-2xl text-sm font-bold border border-red-500/20 animate-pulse">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-8 p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-sm font-bold border border-emerald-500/20">
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
                  className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-bold text-white placeholder-slate-700"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Encrypted Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-bold text-white placeholder-slate-700"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <button 
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs font-black text-[#d946ef] hover:text-white transition-colors uppercase tracking-widest"
                >
                  Forgot Key?
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d946ef] text-white font-black py-6 rounded-2xl shadow-2xl shadow-magenta-500/40 hover:bg-[#c026d3] transition-all active:scale-95 disabled:opacity-50 text-lg uppercase tracking-widest"
              >
                {loading ? 'Verifying...' : 'Sign In to Portal'}
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
                  className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#d946ef] focus:bg-white/10 outline-none transition-all font-bold text-white placeholder-slate-700"
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
        </motion.div>
      </div>
    </div>
  );
}
