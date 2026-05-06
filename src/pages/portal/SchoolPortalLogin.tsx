import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Lock, Mail, AlertTriangle, ShieldAlert } from 'lucide-react';
import { LandingThemeSelector } from '../../components/portal/LandingThemes';

export default function SchoolPortalLogin() {
  const { schoolDomain } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Mock fetching school data based on domain
  const [school, setSchool] = useState<{ name: string; primaryColor: string; isActive: boolean; landingPageTheme: string } | null>(null);

  useEffect(() => {
    if (userProfile?.role === 'super-admin' && school) {
      localStorage.setItem('impersonated_school_id', schoolDomain || '');
      navigate('/dashboard');
    }
  }, [userProfile, school, schoolDomain]);

  useEffect(() => {
    // Simulate API call to verify tenant domain
    setTimeout(() => {
      if (schoolDomain === 'elite-academy') {
        setSchool({ 
          name: 'Dar-Ark Elite Academy', 
          primaryColor: '#1e1b4b', 
          secondaryColor: '#d97706',
          isActive: true, 
          landingPageTheme: 'theme-4' 
        });
      } else if (schoolDomain === 'excel-royal') {
        setSchool({ name: 'Excel Royal Academy', primaryColor: '#4f46e5', isActive: true, landingPageTheme: 'theme-1' });
      } else if (schoolDomain === 'springfield') {
        setSchool({ name: 'Springfield High School', primaryColor: '#059669', isActive: false, landingPageTheme: 'theme-2' });
      } else if (schoolDomain === 'elite') {
        setSchool({ name: 'Elite International', primaryColor: '#6366f1', isActive: true, landingPageTheme: 'theme-3' });
      } else {
        setSchool({ name: 'Generic Academy', primaryColor: '#2563eb', isActive: true, landingPageTheme: 'theme-1' });
      }
      setLoading(false);
    }, 800);
  }, [schoolDomain]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!school?.isActive) return;

    try {
      await login(email, password, schoolDomain);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials for this school portal.');
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-gray-900 rounded-full"></div>
      </div>
    );
  }

  if (school && !school.isActive) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-rose-600" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Portal Suspended</h1>
          <p className="text-gray-500 font-medium mb-8">
            Access to the <strong className="text-gray-900">{school.name}</strong> portal has been temporarily suspended by the platform administrator.
          </p>
          <button 
            onClick={() => window.location.href = 'mailto:billing@dararkbyte.com'}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Contact Dar-Ark Byte Billing
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <LandingThemeSelector 
        themeId={school?.landingPageTheme || 'theme-1'} 
        school={school} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
      />

      {/* Unified Login Modal for all themes */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div 
                className="h-24 p-6 flex items-end relative overflow-hidden"
                style={{ backgroundColor: school?.primaryColor }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                <h2 className="relative z-10 text-white font-black text-xl uppercase tracking-widest">Portal Access</h2>
              </div>

              <div className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-xl flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:bg-white transition-all font-bold text-gray-900 outline-none"
                        style={{ '--tw-ring-color': school?.primaryColor } as React.CSSProperties}
                        placeholder="admin@school.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:bg-white transition-all font-bold text-gray-900 outline-none"
                        style={{ '--tw-ring-color': school?.primaryColor } as React.CSSProperties}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white font-black py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 mt-4"
                    style={{ backgroundColor: school?.primaryColor }}
                  >
                    Authorize Session
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
