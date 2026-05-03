/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SchoolPortalLogin from './pages/portal/SchoolPortalLogin';
import SuperAdminLogin from './pages/super-admin/SuperAdminLogin';
import DashboardLayout from './components/layout/DashboardLayout';
import SchoolAdminDashboard from './pages/school-admin/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import ParentDashboard from './pages/parent/Dashboard';
import ClassesPage from './pages/classes/ClassesPage';
import StudentManagement from './pages/students/StudentManagement';
import ResultEntryPage from './pages/results/ResultEntryPage';
import { SchoolProvider } from './hooks/useSchool';
import { Loader2 } from 'lucide-react';

// STABLE DASHBOARD SWITCHER
function DashboardHome() {
  const { userProfile, loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white p-10">
      <Loader2 className="w-16 h-16 text-[#d946ef] animate-spin mb-6" />
      <h2 className="text-2xl font-black uppercase tracking-tighter">Syncing Command Center</h2>
      <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-2 text-center">Authenticating Master Security Profile...</p>
    </div>
  );

  if (!userProfile) return <Navigate to="/login" replace />;
  
  // DIRECT INJECTION LOGIC
  if (userProfile.role === 'super-admin') return <SuperAdminDashboard />;
  if (userProfile.role === 'school-admin') return <SchoolAdminDashboard />;
  if (userProfile.role === 'teacher') return <TeacherDashboard />;
  if (userProfile.role === 'parent') return <ParentDashboard />;
  
  return <SuperAdminDashboard />; // MASTER FALLBACK
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white">
       <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-[#d946ef] mb-8 shadow-2xl shadow-magenta-500/20"></div>
       <h1 className="text-3xl font-black tracking-tighter uppercase">DAR-ARK BYTE</h1>
    </div>
  );

  return (
    <Router>
      <Suspense fallback={<div className="h-screen bg-[#1e1b4b]" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/portal/:schoolDomain/login" element={<SchoolPortalLogin />} />
          <Route path="/master-command/login" element={<SuperAdminLogin />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/students" element={<StudentManagement />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/results/entry" element={<ResultEntryPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SchoolProvider>
        <AppContent />
      </SchoolProvider>
    </AuthProvider>
  );
}
