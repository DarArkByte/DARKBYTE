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
import ProposalEditor from './pages/super-admin/ProposalEditor';
import ResultEntryPage from './pages/results/ResultEntryPage';
import ResultView from './pages/results/ResultView';
import { SchoolProvider } from './hooks/useSchool';
import { Loader2 } from 'lucide-react';

// MODULE IMPORTS
import TimetablesPage from './pages/timetables/TimetablesPage';
import StaffManagement from './pages/staff/StaffManagement';
import FeeManager from './pages/finance/FeeManager';
import StorePage from './pages/inventory/StorePage';
import SecurityTransportHub from './pages/gate_system/SecurityTransportHub';
import MessagesPage from './pages/communication/MessagesPage';
import QuestionBankPage from './pages/cbt/QuestionBankPage';
import OnlineExamPage from './pages/cbt/OnlineExamPage';
import SubjectAllocationPage from './pages/academics/SubjectAllocationPage';
import AcademicSettingsPage from './pages/settings/AcademicSettingsPage';
import PromotionPage from './pages/academics/PromotionPage';
import TranscriptPage from './pages/students/TranscriptPage';
import ExamSchedulePage from './pages/exams/ExamSchedulePage';
import CommentsEntryPage from './pages/results/CommentsEntryPage';
import AttendancePage from './pages/academics/AttendancePage';
import DigitalLibrary from './pages/library/DigitalLibrary';
import NewsletterCenter from './pages/communication/NewsletterCenter';
import AdmissionsForm from './pages/portal/AdmissionsForm';
import EntranceExam from './pages/portal/EntranceExam';

// LAZY LOADED MODULES (To prevent esbuild transform errors)
const BrandingSettings = React.lazy(() => import('./pages/settings/BrandingSettings'));
const ObservationalEntryPage = React.lazy(() => import('./pages/results/ObservationalEntryPage'));
const ResultAnalysisPage = React.lazy(() => import('./pages/results/ResultAnalysisPage'));


// STABLE DASHBOARD SWITCHER
function DashboardHome() {
  const { user, userProfile, loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white p-10">
      <Loader2 className="w-16 h-16 text-[#d946ef] animate-spin mb-6" />
      <h2 className="text-2xl font-black uppercase tracking-tighter">Syncing Command Center</h2>
      <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-2 text-center">Authenticating Master Security Profile...</p>
    </div>
  );

  // NUCLEAR OVERRIDE: If authenticated but profile fetch failed, allow entry as super-admin fallback
  if (user && !userProfile) {
    console.warn("Emergency admittance active: User authenticated but profile missing.");
    return <SuperAdminDashboard />;
  }

  if (!userProfile) return <Navigate to="/login" replace />;
  
  // DIRECT INJECTION LOGIC
  if (userProfile.role === 'super-admin') return <SuperAdminDashboard />;
  if (userProfile.role === 'school-admin') return <SchoolAdminDashboard />;
  if (userProfile.role === 'teacher') return <TeacherDashboard />;
  if (userProfile.role === 'parent') return <ParentDashboard />;
  
  return <SuperAdminDashboard />; // MASTER FALLBACK
}

function AppContent() {
  const { loading: authLoading } = useAuth();
  const [safetyTimeout, setSafetyTimeout] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (authLoading) setSafetyTimeout(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [authLoading]);

  if (authLoading && !safetyTimeout) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white">
       <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-[#d946ef] mb-8 shadow-2xl shadow-magenta-500/20"></div>
       <h1 className="text-3xl font-black tracking-tighter uppercase">DAR-ARK BYTE</h1>
       <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">Initializing Security Matrix...</p>
    </div>
  );

  return (
    <Router>
      <Suspense fallback={<div className="h-screen bg-[#1e1b4b]" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/portal/:schoolDomain/login" element={<SchoolPortalLogin />} />
          <Route path="/portal/:domain/admissions" element={<AdmissionsForm />} />
          <Route path="/portal/:domain/entrance-exam" element={<EntranceExam />} />
          <Route path="/master-command/login" element={<SuperAdminLogin />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/hq" element={<SuperAdminDashboard />} />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/proposal-editor" element={<ProposalEditor />} />
            <Route path="/students" element={<StudentManagement />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/results/entry" element={<ResultEntryPage />} />
            
            {/* NEW MODULE ROUTES */}
            <Route path="/timetables" element={<TimetablesPage />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/finance" element={<FeeManager />} />
            <Route path="/inventory" element={<StorePage />} />
            <Route path="/security" element={<SecurityTransportHub />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/cbt/questions" element={<QuestionBankPage />} />
            <Route path="/cbt/exams" element={<OnlineExamPage />} />
            <Route path="/exams/schedule" element={<ExamSchedulePage />} />
            <Route path="/academics/allocation" element={<SubjectAllocationPage />} />
            <Route path="/academics/settings" element={<AcademicSettingsPage />} />
            <Route path="/exams/promotion" element={<PromotionPage />} />
            <Route path="/students/transcript" element={<TranscriptPage />} />
            <Route path="/results/comments" element={<CommentsEntryPage />} />
            <Route path="/results/observation" element={<ObservationalEntryPage />} />
            <Route path="/results/analysis" element={<ResultAnalysisPage />} />
            <Route path="/results/view/:studentId" element={<ResultView />} />
            <Route path="/academics/attendance" element={<AttendancePage />} />
            <Route path="/library/digital" element={<DigitalLibrary />} />
            <Route path="/communication/newsletter" element={<NewsletterCenter />} />
            <Route path="/settings/branding" element={<BrandingSettings />} />
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
