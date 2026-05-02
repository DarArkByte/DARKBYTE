/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Build Trigger: Case-Sensitivity Fix v2
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
import TeacherResultEntry from './pages/teacher/ResultEntry';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import ParentDashboard from './pages/parent/Dashboard';
import ResultView from './pages/results/ResultView';
import ClassesPage from './pages/classes/ClassesPage';
import TimetablesPage from './pages/timetables/TimetablesPage';
import ExamSchedulePage from './pages/exams/ExamSchedulePage';
import PromotionPage from './pages/exams/PromotionPage';
import MessagesPage from './pages/communication/MessagesPage';
import MediaManagerPage from './pages/media/MediaManagerPage';
import QuestionBankPage from './pages/cbt/QuestionBankPage';
import OnlineExamPage from './pages/cbt/OnlineExamPage';
import ResultEntryPage from './pages/results/ResultEntryPage';
import CommentsEntryPage from './pages/results/CommentsEntryPage';
import ObservationalEntryPage from './pages/results/ObservationalEntryPage';
import AcademicSettingsPage from './pages/settings/AcademicSettingsPage';
import SubjectAllocationPage from './pages/academics/SubjectAllocationPage';
import FeeManager from './pages/finance/FeeManager';
import StorePage from './pages/inventory/StorePage';
import StaffManagement from './pages/staff/StaffManagement';
import SecurityTransportHub from './pages/gate_system/SecurityTransportHub';
import { SchoolProvider } from './hooks/useSchool';

function AppContent() {
  const { user, loading, userProfile } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1e1b4b]">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#d946ef] mx-auto mb-6"></div>
          <h2 className="text-white text-2xl font-black tracking-tighter uppercase mb-2">Dar-Ark Bytes</h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Initializing Secure Core...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />

        {/* Login */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        
        {/* Independent School Portals */}
        <Route path="/portal/:schoolDomain/login" element={user ? <Navigate to="/dashboard" replace /> : <SchoolPortalLogin />} />
        
        {/* Secret Master Admin Login */}
        <Route path="/master-command/login" element={user ? <Navigate to="/dashboard" replace /> : <SuperAdminLogin />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/timetables" element={<TimetablesPage />} />
          <Route path="/exams/schedule" element={<ExamSchedulePage />} />
          <Route path="/promotion" element={<PromotionPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/media" element={<MediaManagerPage />} />
          <Route path="/cbt/questions" element={<QuestionBankPage />} />
          <Route path="/cbt/exams" element={<OnlineExamPage />} />
          <Route path="/results/entry" element={<ResultEntryPage />} />
          <Route path="/results/observations" element={<ObservationalEntryPage />} />
          <Route path="/results/comments" element={<CommentsEntryPage />} />
          <Route path="/settings/academic" element={<AcademicSettingsPage />} />
          <Route path="/academics/subjects" element={<SubjectAllocationPage />} />
          <Route path="/finance" element={<FeeManager />} />
          <Route path="/inventory" element={<StorePage />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/security" element={<SecurityTransportHub />} />
          <Route path="/transport" element={<SecurityTransportHub />} />
          
          {/* Direct Role Routes */}
          <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
          <Route path="/school-admin/*" element={<SchoolAdminDashboard />} />
          <Route path="/teacher/*" element={<TeacherDashboard />} />
          <Route path="/parent/*" element={<ParentDashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function DashboardHome() {
  const { userProfile } = useAuth();
  
  if (!userProfile) return <Navigate to="/login" replace />;
  
  switch (userProfile.role) {
    case 'super-admin': return <SuperAdminDashboard />;
    case 'school-admin': return <SchoolAdminDashboard />;
    case 'teacher': return <TeacherDashboard />;
    case 'parent': return <ParentDashboard />;
    default: return <Navigate to="/" replace />;
  }
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
