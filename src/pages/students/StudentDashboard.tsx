import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { Link } from 'react-router-dom';
import {
  Search, Bell, LayoutDashboard, CalendarDays, ClipboardList,
  FileText, CheckSquare, Library, HelpCircle, LogOut, GraduationCap,
  TrendingUp, ShieldCheck, AlertCircle, Clock, ArrowUpRight, MessageCircle
} from 'lucide-react';

interface ScheduleSlot {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  status: 'ongoing' | 'next' | 'upcoming';
}

interface Deadline {
  title: string;
  subtitle: string;
  course: string;
  due: string;
  urgency: 'today' | 'soon' | 'later';
  progress?: string;
}

interface GradeCard {
  grade: string;
  subject: string;
  score: string;
  date: string;
  color: string;
}

const DEMO_SCHEDULE: ScheduleSlot[] = [
  { time: '08:00 - 09:30', subject: 'Advanced Mathematics', teacher: 'Dr. Sarah Jenkins', room: 'Room 402B', status: 'ongoing' },
  { time: '10:00 - 11:30', subject: 'Quantum Physics', teacher: 'Prof. Michael Chen', room: 'Lab 12', status: 'next' },
  { time: '12:30 - 14:00', subject: 'Data Structures', teacher: 'Mr. Robert Pike', room: 'Comp Hall 1', status: 'upcoming' },
];

const DEMO_DEADLINES: Deadline[] = [
  { title: 'History Essay', subtitle: 'The Industrial Revolution Impact', course: 'HISTORY 101', due: 'TODAY', urgency: 'today', progress: 'Submit Now' },
  { title: 'Physics Lab Report', subtitle: 'Optics & Waveforms Analysis', course: 'PHYSICS', due: 'OCT 26', urgency: 'soon', progress: '80% Drafted' },
  { title: 'Calculus Assignment', subtitle: 'Derivatives and Integration Set 4', course: 'CALCULUS', due: 'OCT 28', urgency: 'later', progress: 'Pending' },
];

const DEMO_GRADES: GradeCard[] = [
  { grade: 'A', subject: 'Calculus Quiz 3', score: '92 / 100', date: 'Oct 20', color: '#0051d5' },
  { grade: 'A-', subject: 'Chemistry Project', score: '88 / 100', date: 'Oct 18', color: '#316bf3' },
  { grade: 'B+', subject: 'English Literature', score: '79 / 100', date: 'Oct 15', color: '#38485d' },
  { grade: 'A+', subject: 'Computer Science', score: '98 / 100', date: 'Oct 12', color: '#0b1c30' },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  ongoing: { bg: '#dbe1ff', color: '#003ea8' },
  next: { bg: '#d3e4fe', color: '#38485d' },
  upcoming: { bg: '#e0e3e5', color: '#45464d' },
};

const urgencyStyle: Record<string, { color: string; bg: string }> = {
  today: { color: '#ba1a1a', bg: '#ffdad6' },
  soon: { color: '#38485d', bg: '#d3e4fe' },
  later: { color: '#45464d', bg: '#eceef0' },
};

const navItems = [
  { icon: <LayoutDashboard size={16} />, label: 'Dashboard', active: true, to: '/dashboard' },
  { icon: <CalendarDays size={16} />, label: 'My Schedule', to: '/dashboard' },
  { icon: <ClipboardList size={16} />, label: 'Assignments', to: '/dashboard' },
  { icon: <FileText size={16} />, label: 'Exams', to: '/dashboard' },
  { icon: <CheckSquare size={16} />, label: 'Attendance', to: '/academics/attendance' },
  { icon: <Library size={16} />, label: 'Library', to: '/library/digital' },
];

export default function StudentDashboard() {
  const { userProfile, signOut } = useAuth() as any;
  const { school } = useSchool();
  const [loading, setLoading] = useState(false);
  const firstName = userProfile?.displayName?.split(' ')[0] || 'Student';

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fb', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, minHeight: '100vh', background: '#ffffff', borderRight: '1px solid #c6c6cd',
        display: 'flex', flexDirection: 'column', padding: '16px 0', position: 'sticky', top: 0, zIndex: 40
      }}>
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#0051d5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={18} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: 15, fontWeight: 900, color: '#0051d5', margin: 0 }}>Dar-Ark Byte</h1>
              <p style={{ fontSize: 10, color: '#45464d', margin: 0, fontWeight: 600 }}>Student Portal</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <Link key={item.label} to={item.to}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
                textDecoration: 'none', fontSize: 12, fontWeight: item.active ? 700 : 600,
                color: item.active ? '#0051d5' : '#45464d',
                background: item.active ? 'rgba(219,225,255,0.3)' : 'transparent',
                borderLeft: item.active ? '3px solid #0051d5' : '3px solid transparent',
                transition: 'all 0.15s'
              }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid #c6c6cd', paddingTop: 12 }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', textDecoration: 'none', fontSize: 12, fontWeight: 600, color: '#45464d' }}>
            <HelpCircle size={16} /> Help Center
          </Link>
          <button onClick={signOut} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', fontSize: 12, fontWeight: 600, color: '#45464d', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        <header style={{ height: 64, background: '#fff', borderBottom: '1px solid #c6c6cd', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f2f4f6', borderRadius: 20, padding: '8px 16px', width: 320 }}>
            <Search size={14} color="#76777d" />
            <input placeholder="Search courses, tasks, or grades..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#191c1e', width: '100%' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, position: 'relative' }}>
              <Bell size={20} color="#45464d" />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, background: '#ba1a1a', borderRadius: '50%' }} />
            </button>
            <div style={{ width: 1, height: 32, background: '#c6c6cd' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, margin: 0, textAlign: 'right' }}>{userProfile?.displayName || 'Student'}</p>
                <p style={{ fontSize: 10, color: '#45464d', margin: 0, textAlign: 'right' }}>{school?.name || 'Student Portal'}</p>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0051d5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#fff' }}>
                {userProfile?.displayName?.[0] || 'S'}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: 24, flex: 1 }}>
          {/* Welcome + Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: '#191c1e' }}>Hello, {firstName}.</h2>
              <p style={{ fontSize: 14, color: '#45464d', margin: 0 }}>Here is an overview of your academic progress for today.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#fff', border: '1px solid #c6c6cd', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#191c1e' }}>
                <FileText size={14} /> Report Card
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#0051d5', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', color: '#fff' }}>
                <MessageCircle size={14} /> Request Leave
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            {/* GPA */}
            <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#45464d', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Current GPA</span>
                <div style={{ width: 32, height: 32, background: '#f2f4f6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0051d5' }}>
                  <TrendingUp size={16} />
                </div>
              </div>
              <p style={{ fontSize: 36, fontWeight: 700, margin: '0 0 6px', color: '#191c1e' }}>3.8</p>
              <p style={{ fontSize: 12, color: '#0051d5', margin: 0, fontWeight: 600 }}>↑ 0.2 from last semester</p>
            </div>

            {/* Attendance */}
            <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#45464d', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Attendance</span>
                <div style={{ width: 32, height: 32, background: '#f2f4f6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0051d5' }}>
                  <ShieldCheck size={16} />
                </div>
              </div>
              <p style={{ fontSize: 36, fontWeight: 700, margin: '0 0 8px', color: '#191c1e' }}>94%</p>
              <div style={{ background: '#e6e8ea', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                <div style={{ width: '94%', height: '100%', background: '#0051d5', borderRadius: 4 }} />
              </div>
            </div>

            {/* Pending Tasks */}
            <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#45464d', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Pending Tasks</span>
                <div style={{ width: 32, height: 32, background: '#ffdad6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ba1a1a' }}>
                  <AlertCircle size={16} />
                </div>
              </div>
              <p style={{ fontSize: 36, fontWeight: 700, margin: '0 0 4px', color: '#191c1e' }}>3</p>
              <p style={{ fontSize: 12, color: '#ba1a1a', margin: 0, fontWeight: 600 }}>Next due in 24 hours</p>
            </div>
          </div>

          {/* Schedule + Deadlines */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, marginBottom: 24 }}>
            {/* Schedule */}
            <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CalendarDays size={18} color="#0051d5" />
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Current Schedule</h3>
                </div>
                <span style={{ background: '#f2f4f6', border: '1px solid #c6c6cd', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#45464d' }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}
                </span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e6e8ea' }}>
                    {['TIME', 'SUBJECT', 'ROOM', 'STATUS'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#45464d', textAlign: 'left', letterSpacing: '0.04em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEMO_SCHEDULE.map((slot, i) => (
                    <tr key={i} style={{ borderBottom: i < DEMO_SCHEDULE.length - 1 ? '1px solid #f2f4f6' : 'none' }}>
                      <td style={{ padding: '14px 12px', fontSize: 13, fontWeight: 600, color: '#45464d' }}>{slot.time}</td>
                      <td style={{ padding: '14px 12px' }}>
                        <p style={{ fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{slot.subject}</p>
                        <p style={{ fontSize: 11, color: '#45464d', margin: 0 }}>{slot.teacher}</p>
                      </td>
                      <td style={{ padding: '14px 12px', fontSize: 13, color: '#45464d' }}>{slot.room}</td>
                      <td style={{ padding: '14px 12px' }}>
                        <span style={{ background: statusStyle[slot.status].bg, color: statusStyle[slot.status].color, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 4, textTransform: 'uppercase' }}>
                          {slot.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Upcoming Deadlines */}
            <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Clock size={18} color="#ba1a1a" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Upcoming Deadlines</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {DEMO_DEADLINES.map((dl, i) => (
                  <div key={i} style={{ borderLeft: i === 0 ? '3px solid #0051d5' : '3px solid #e6e8ea', paddingLeft: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{dl.title}</p>
                      <span style={{ background: urgencyStyle[dl.urgency].bg, color: urgencyStyle[dl.urgency].color, fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>{dl.due}</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#45464d', margin: '0 0 6px' }}>{dl.subtitle}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ background: '#eceef0', color: '#45464d', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>{dl.course}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: dl.urgency === 'today' ? '#0051d5' : '#45464d', cursor: 'pointer' }}>{dl.progress}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Grades */}
          <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={18} color="#0051d5" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Recent Grades</h3>
              </div>
              <Link to="/results/view/me" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#0051d5', textDecoration: 'none' }}>
                Full Gradebook <ArrowUpRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {DEMO_GRADES.map((g, i) => (
                <div key={i} style={{ border: `1px solid ${g.color}22`, borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: `${g.color}15`, border: `2px solid ${g.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: g.color, flexShrink: 0 }}>
                    {g.grade}
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, margin: '0 0 2px', lineHeight: 1.3 }}>{g.subject}</p>
                    <p style={{ fontSize: 11, color: '#45464d', margin: '0 0 2px' }}>{g.score}</p>
                    <p style={{ fontSize: 10, color: '#76777d', margin: 0 }}>{g.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ padding: '12px 24px', borderTop: '1px solid #c6c6cd', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#76777d', margin: 0, fontWeight: 600, letterSpacing: '0.05em' }}>
            DAR-ARK BYTE ENTERPRISE EDUCATION PLATFORM • ACADEMIC YEAR 2023–2024
          </p>
        </footer>
      </main>
    </div>
  );
}
