/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
import TimetablesPage from './pages/timetables/TimetablesPage';
import ExamSchedulePage from './pages/exams/ExamSchedulePage';
import ResultEntryPage from './pages/results/ResultEntryPage';
import FeeManager from './pages/finance/FeeManager';
import StaffManagement from './pages/staff/StaffManagement';
import { SchoolProvider } from './hooks/useSchool';
import { Loader2 } from 'lucide-react';

function DashboardHome() {
  const { userProfile, loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white">
      <Loader2 className="w-12 h-12 text-[#d946ef] animate-spin mb-4" />
      <p className="font-black uppercase tracking-widest text-xs">Syncing Master Node...</p>
    </div>
  );

  if (!userProfile) return <Navigate to="/login" replace />;
  
  // Direct Role Routing
  if (userProfile.role === 'super-admin') return <SuperAdminDashboard />;
  if (userProfile.role === 'school-admin') return <SchoolAdminDashboard />;
  if (userProfile.role === 'teacher') return <TeacherDashboard />;
  if (userProfile.role === 'parent') return <ParentDashboard />;
  
  return <SuperAdminDashboard />; // Emergency Fallback to Super Admin
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-[#d946ef] mb-6"></div>
      <h2 className="text-2xl font-black uppercase tracking-tighter">Dar-Ark Byte</h2>
    </div>
  );

  return (
    <Router>
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
          <Route path="/timetables" element={<TimetablesPage />} />
          <Route path="/results/entry" element={<ResultEntryPage />} />
          <Route path="/finance" element={<FeeManager />} />
          <Route path="/staff" element={<StaffManagement />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
