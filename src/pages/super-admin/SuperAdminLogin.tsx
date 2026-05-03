import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';
import { Shield, KeyRound, TerminalSquare } from 'lucide-react';

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CACHE BUSTER: Force clear any stuck session on mount if requested
  React.useEffect(() => {
    if (window.location.search.includes('reset')) {
      localStorage.clear();
      window.location.href = '/master-command/login';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Secret login logic
      await login(email, password);
      // FORCE RELOAD BYPASS for master command
      window.location.href = '/dashboard'; 
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Access Denied: Master Security Protocol Failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 font-mono">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <TerminalSquare className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-white tracking-widest uppercase">Master Control</h1>
          <p className="text-emerald-500/60 font-bold mt-2 text-sm tracking-widest">Dar-Ark Byte Multi-Tenant Architecture</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-black uppercase tracking-widest text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-2 flex items-center shadow-inner">
            <div className="p-3">
               <Shield className="w-6 h-6 text-gray-500" />
            </div>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-none text-white font-bold placeholder-gray-600 focus:ring-0 outline-none"
              placeholder="MASTER EMAIL / USERNAME"
            />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-2 flex items-center shadow-inner">
            <div className="p-3">
               <KeyRound className="w-6 h-6 text-gray-500" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-none text-white font-bold placeholder-gray-600 focus:ring-0 outline-none"
              placeholder="ACCESS CODE"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-black font-black py-4 rounded-xl hover:bg-emerald-500 transition-all tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Override Protocol'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
