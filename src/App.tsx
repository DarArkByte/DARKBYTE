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

// LAZY LOADED MODULES
const TimetablesPage = React.lazy(() => import('./pages/timetables/TimetablesPage'));
const StaffManagement = React.lazy(() => import('./pages/staff/StaffManagement'));
const FeeManager = React.lazy(() => import('./pages/finance/FeeManager'));
const StorePage = React.lazy(() => import('./pages/inventory/StorePage'));
const SecurityTransportHub = React.lazy(() => import('./pages/gate_system/SecurityTransportHub'));
const MessagesPage = React.lazy(() => import('./pages/communication/MessagesPage'));
const QuestionBankPage = React.lazy(() => import('./pages/cbt/QuestionBankPage'));
const OnlineExamPage = React.lazy(() => import('./pages/cbt/OnlineExamPage'));
const SubjectAllocationPage = React.lazy(() => import('./pages/academics/SubjectAllocationPage'));
const AcademicSettingsPage = React.lazy(() => import('./pages/settings/AcademicSettingsPage'));
const PromotionPage = React.lazy(() => import('./pages/academics/PromotionPage'));
const TranscriptPage = React.lazy(() => import('./pages/students/TranscriptPage'));
const ExamSchedulePage = React.lazy(() => import('./pages/exams/ExamSchedulePage'));
const CommentsEntryPage = React.lazy(() => import('./pages/results/CommentsEntryPage'));
const AttendancePage = React.lazy(() => import('./pages/academics/AttendancePage'));
const DigitalLibrary = React.lazy(() => import('./pages/library/DigitalLibrary'));
const NewsletterCenter = React.lazy(() => import('./pages/communication/NewsletterCenter'));
const AdmissionsForm = React.lazy(() => import('./pages/portal/AdmissionsForm'));
const EntranceExam = React.lazy(() => import('./pages/portal/EntranceExam'));
const BrandingSettings = React.lazy(() => import('./pages/settings/BrandingSettings'));
const ObservationalEntryPage = React.lazy(() => import('./pages/results/ObservationalEntryPage'));
const ResultAnalysisPage = React.lazy(() => import('./pages/results/ResultAnalysisPage'));
const LessonNotes = React.lazy(() => import('./pages/teacher/LessonNotes'));
const Assignments = React.lazy(() => import('./pages/teacher/Assignments'));


// STABLE DASHBOARD SWITCHER
function DashboardHome() {
  const { user, userProfile, loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1e1b4b] text-white p-10">
      <Loader2 className="w-16 h-16 text-[#d946ef] animate-spin mb-6" />
      <h2 className="text-2xl font-black uppercase tracking-tighter">Syncing Management Engine</h2>
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
  const isImpersonating = !!localStorage.getItem('impersonated_school_id');
  
  if (userProfile.role === 'super-admin' && !isImpersonating) return <SuperAdminDashboard />;
  if (userProfile.role === 'school-admin' || (userProfile.role === 'super-admin' && isImpersonating)) return <SchoolAdminDashboard />;
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
    }, 1500); // Drastically reduced from 5000ms
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
            
            {/* TEACHER PRODUCTIVITY ROUTES */}
            <Route path="/teacher/lesson-notes" element={<LessonNotes />} />
            <Route path="/teacher/assignments" element={<Assignments />} />
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
