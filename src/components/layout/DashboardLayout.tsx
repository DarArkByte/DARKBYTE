/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Calendar,
  FileText,
  TrendingUp,
  Folder,
  Database,
  MonitorPlay,
  FileSpreadsheet,
  MessageSquareQuote,
  ClipboardCheck,
  BookOpen,
  Wallet,
  Package,
  UserCheck,
  Shield,
  Bus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DashboardLayout() {
  const { userProfile, logout } = useAuth();
  const { school } = useSchool();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Classes', href: '/classes', icon: Users, roles: ['school-admin', 'teacher'] },
    { name: 'Timetables', href: '/timetables', icon: Calendar, roles: ['school-admin', 'teacher', 'student'] },
    { name: 'Exam Schedule', href: '/exams/schedule', icon: FileText, roles: ['school-admin', 'teacher', 'student'] },
    { name: 'Promotion', href: '/promotion', icon: TrendingUp, roles: ['school-admin'] },
    { name: 'Results', href: '/results', icon: ClipboardList, roles: ['school-admin', 'teacher', 'parent'] },
    { name: 'Enter Marks', href: '/results/entry', icon: FileSpreadsheet, roles: ['school-admin', 'teacher'] },
    { name: 'Creche Grading', href: '/results/observations', icon: ClipboardCheck, roles: ['school-admin', 'teacher'] },
    { name: 'Report Remarks', href: '/results/comments', icon: MessageSquareQuote, roles: ['school-admin', 'teacher'] },
    { name: 'Question Bank', href: '/cbt/questions', icon: Database, roles: ['school-admin', 'teacher'] },
    { name: 'Online Exams', href: '/cbt/exams', icon: MonitorPlay, roles: ['school-admin', 'teacher', 'student'] },
    { name: 'Subject Rules', href: '/academics/subjects', icon: BookOpen, roles: ['school-admin'] },
    { name: 'Fees & Finance', href: '/finance', icon: Wallet, roles: ['school-admin', 'parent'] },
    { name: 'Inventory', href: '/inventory', icon: Package, roles: ['school-admin'] },
    { name: 'Staff & Payroll', href: '/staff', icon: UserCheck, roles: ['school-admin'] },
    { name: 'Security', href: '/security', icon: Shield, roles: ['school-admin'] },
    { name: 'Transport', href: '/transport', icon: Bus, roles: ['school-admin'] },
    { name: 'Lesson Notes', href: '/notes', icon: BookOpen, roles: ['teacher', 'student'] },
    { name: 'Communication', href: '/messages', icon: MessageSquare },
    { name: 'Media', href: '/media', icon: Folder, roles: ['school-admin', 'teacher'] },
    { name: 'Academic Config', href: '/settings/academic', icon: Settings, roles: ['school-admin', 'super-admin'] },
  ].filter(item => !item.roles || (userProfile?.role && item.roles.includes(userProfile.role)));

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ w: 0, opacity: 0 }}
            animate={{ w: 280, opacity: 1 }}
            exit={{ w: 0, opacity: 0 }}
            className="w-72 bg-white border-r border-gray-100 flex flex-col shrink-0 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-indigo-600 p-2 rounded-lg shrink-0">
                  <GraduationCap className="text-white w-5 h-5" />
                </div>
                <span className="font-sans font-bold text-lg tracking-tight text-gray-900 truncate">
                  {school?.name || 'Dar-Ark Byte'}
                </span>
              </div>

              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans font-medium transition-all group ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-auto p-6 border-t border-gray-50">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-sans font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all group"
              >
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm shadow-gray-100/50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="font-sans font-bold text-gray-900 text-lg uppercase tracking-wider">
              {navigation.find(item => location.pathname.startsWith(item.href))?.name || 'Overview'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-sans font-bold text-gray-900">{userProfile?.displayName}</p>
                <p className="text-[10px] font-sans font-bold text-indigo-500 uppercase tracking-widest">{userProfile?.role}</p>
              </div>
              <div className="h-10 w-10 bg-indigo-100 border-2 border-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 font-bold">
                {userProfile?.displayName ? userProfile.displayName[0] : 'U'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
