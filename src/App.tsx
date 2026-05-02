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
import SecurityTransportHub from './pages/security-module/SecurityTransportHub';
import { SchoolProvider } from './hooks/useSchool';

function AppContent() {
  const { user, loading, userProfile } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium font-sans">Loading Dar-Ark Byte...</p>
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
          <Route path="/dashboard" element={<DashboardRedirect />} />
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
          
          {/* Super Admin */}
          <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
          
          {/* School Admin */}
          <Route path="/school-admin/*" element={<SchoolAdminDashboard />} />
          
          {/* Teacher */}
          <Route path="/teacher/*" element={<TeacherDashboard />} />
          <Route path="/teacher/results/entry/:classId/:subjectId" element={<TeacherResultEntry />} />
          
          {/* Parent */}
          <Route path="/parent/*" element={<ParentDashboard />} />
          <Route path="/parent/results/view/:studentId" element={<ResultView />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function DashboardRedirect() {
  const { userProfile } = useAuth();
  
  if (!userProfile) return <Navigate to="/login" replace />;
  
  switch (userProfile.role) {
    case 'super-admin': return <Navigate to="/super-admin" replace />;
    case 'school-admin': return <Navigate to="/school-admin" replace />;
    case 'teacher': return <Navigate to="/teacher" replace />;
    case 'parent': return <Navigate to="/parent" replace />;
    case 'student': return <Navigate to="/student" replace />; // Implement later
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
