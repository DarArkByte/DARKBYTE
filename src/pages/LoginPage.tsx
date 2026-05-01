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
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signIn();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-10 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-100 rotate-3">
            <GraduationCap className="text-white w-10 h-10 -rotate-3" />
          </div>
          <h1 className="text-3xl font-sans font-bold text-gray-900 tracking-tight">Welcome to Dar-Ark Byte</h1>
          <p className="text-gray-500 mt-2 font-sans font-medium">Please sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white border-2 border-gray-100 hover:border-indigo-100 py-4 px-6 rounded-2xl font-bold text-gray-700 flex items-center justify-center gap-4 transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
              Sign in with Google
            </>
          )}
        </button>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            By signing in, you agree to our Terms of Service <br /> and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
