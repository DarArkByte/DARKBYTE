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
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Default to closed on mobile

  const navigation = [
    { name: 'Command Center', href: userProfile?.role === 'super-admin' ? '/super-admin' : '/dashboard', icon: LayoutDashboard },
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
    { name: 'Communication', href: '/messages', icon: MessageSquare },
    { name: 'Media Center', href: '/media', icon: Folder, roles: ['school-admin', 'teacher'] },
    { name: 'System Config', href: '/settings/academic', icon: Settings, roles: ['school-admin', 'super-admin'] },
  ].filter(item => !item.roles || (userProfile?.role && item.roles.includes(userProfile.role)));

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay - Only shows on mobile when open */}
      {isSidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden cursor-pointer"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-[280px] bg-[#1e1b4b] transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col border-r border-white/5
      `}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-12 shrink-0">
            <div className="bg-[#d946ef] p-2.5 rounded-2xl shadow-xl shadow-magenta-500/20">
               <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white uppercase truncate">
              {school?.name || 'Dar-Ark Byte'}
            </span>
          </div>

          <nav className="space-y-1.5 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-[13px] transition-all group pointer-events-auto ${
                    isActive 
                      ? 'bg-white text-[#1e1b4b] shadow-xl shadow-white/5' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#d946ef]' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="tracking-tight whitespace-nowrap">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/5 shrink-0">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-4 w-full rounded-2xl font-bold text-[13px] text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all group pointer-events-auto"
            >
              <LogOut className="w-5 h-5 text-slate-600 group-hover:text-red-400" />
              Logout Securely
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-[50] shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors pointer-events-auto"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-black text-slate-900 text-lg uppercase tracking-tight">
                {navigation.find(item => location.pathname === item.href)?.name || 'Command Center'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <button className="relative p-2.5 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all hidden sm:block pointer-events-auto">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-[#d946ef] rounded-full border-2 border-white" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden md:block">
                <p className="text-sm font-black text-slate-900">{userProfile?.displayName}</p>
                <p className="text-[10px] font-black text-[#d946ef] uppercase tracking-widest">{userProfile?.role}</p>
              </div>
              <div className="h-11 w-11 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white font-black text-lg">
                {userProfile?.displayName ? userProfile.displayName[0] : 'U'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
