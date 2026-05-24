import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { Class, Subject } from '../../types';
import { Link } from 'react-router-dom';
import {
  Search, Bell, LayoutDashboard, School, CheckSquare, Edit3,
  BookOpen, Calendar, HelpCircle, LogOut, Users, Clock,
  AlertCircle, ChevronRight, Megaphone, MoreVertical, GraduationCap
} from 'lucide-react';

interface PendingTask {
  id: string;
  title: string;
  subtitle: string;
  classRef: string;
  dueDate: string;
  status: 'urgent' | 'planned' | 'pending';
}

interface TimetableSlot {
  time: string;
  period: string;
  className: string;
  subject: string;
  room: string;
  status: 'ongoing' | 'next' | 'upcoming' | 'break';
}

const DEMO_TIMETABLE: TimetableSlot[] = [
  { time: '08:30', period: 'AM', className: 'Grade 10 - Sec A', subject: 'Mathematics', room: 'Lab 2', status: 'ongoing' },
  { time: '09:45', period: 'AM', className: 'Break', subject: '', room: 'Staff Lounge', status: 'break' },
  { time: '10:30', period: 'AM', className: 'Grade 11 - Sec B', subject: 'Calculus', room: 'Room 304', status: 'next' },
  { time: '01:15', period: 'PM', className: 'Grade 9 - Sec C', subject: 'Algebra', room: 'Room 102', status: 'upcoming' },
];

const DEMO_TASKS: PendingTask[] = [
  { id: '1', title: 'Grade Mid-term Scripts', subtitle: 'Algebra & Geometry', classRef: 'G9 - A', dueDate: 'Oct 24', status: 'urgent' },
  { id: '2', title: 'Upload Lesson Plan', subtitle: 'Probability Theory', classRef: 'G12 - B', dueDate: 'Oct 26', status: 'planned' },
  { id: '3', title: 'Enter CA-1 Marks', subtitle: 'Class Attendance', classRef: 'G10 - A', dueDate: 'Oct 28', status: 'pending' },
];

const DEMO_ANNOUNCEMENTS = [
  { from: "Principal's Office", time: '2h ago', text: 'Finalizing internal assessments for the winter break by Friday.' },
  { from: 'Admin Dept', time: 'Yesterday', text: 'New smart boards installed in Lab 2. Training session at 3 PM today.' },
];

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  urgent: { bg: '#ffdad6', color: '#93000a', label: 'Urgent' },
  planned: { bg: '#d3e4fe', color: '#38485d', label: 'Planned' },
  pending: { bg: '#e0e3e5', color: '#45464d', label: 'Pending' },
};

const slotBorder: Record<string, string> = {
  ongoing: '#0051d5',
  next: '#0051d5',
  upcoming: '#0051d5',
  break: '#c6c6cd',
};

export default function TeacherDashboard() {
  const { userProfile, signOut } = useAuth() as any;
  const { school } = useSchool();
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!school?.id) return;
    const fetchData = async () => {
      try {
        const [classSnap, subjectSnap] = await Promise.all([
          getDocs(collection(db, 'schools', school.id, 'classes')),
          getDocs(collection(db, 'schools', school.id, 'subjects')),
        ]);
        setClasses(classSnap.docs.map(d => ({ id: d.id, ...d.data() } as Class)));
        setSubjects(subjectSnap.docs.map(d => ({ id: d.id, ...d.data() } as Subject)));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [school?.id]);

  const firstName = userProfile?.displayName?.split(' ')[0] || 'Teacher';

  const navItems = [
    { icon: <LayoutDashboard size={16} />, label: 'Dashboard', active: true, to: '/dashboard' },
    { icon: <School size={16} />, label: 'My Classes', to: '/classes' },
    { icon: <CheckSquare size={16} />, label: 'Attendance', to: '/academics/attendance' },
    { icon: <Edit3 size={16} />, label: 'Marks Entry', to: '/results/entry' },
    { icon: <BookOpen size={16} />, label: 'Lesson Plans', to: '/teacher/lesson-notes' },
    { icon: <Calendar size={16} />, label: 'Leave Management', to: '/dashboard' },
  ];

  if (loading) return (
    <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #dbe1ff', borderTop: '3px solid #0051d5', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fb', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 260, minHeight: '100vh', background: '#ffffff', borderRight: '1px solid #c6c6cd',
        display: 'flex', flexDirection: 'column', padding: '16px 0', position: 'sticky', top: 0, zIndex: 40
      }}>
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#0051d5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: 16, fontWeight: 900, color: '#0051d5', margin: 0 }}>Dar-Ark Byte</h1>
              <p style={{ fontSize: 11, color: '#45464d', margin: 0, fontWeight: 600 }}>Teacher Portal</p>
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
                borderLeft: item.active ? '4px solid #0051d5' : '4px solid transparent',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f2f4f6', borderRadius: 8, padding: '8px 16px', width: 280 }}>
            <Search size={14} color="#76777d" />
            <input placeholder="Search students, marks..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#191c1e', width: '100%' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%' }}>
              <Bell size={20} color="#45464d" />
            </button>
            <div style={{ width: 1, height: 32, background: '#c6c6cd' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{userProfile?.displayName || 'Teacher'}</p>
                <p style={{ fontSize: 11, color: '#45464d', margin: 0 }}>{subjects[0]?.name || 'Educator'}</p>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#131b2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#b7c8e1' }}>
                {userProfile?.displayName?.[0] || 'T'}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div style={{ padding: 24, flex: 1 }}>
          {/* Welcome */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', color: '#191c1e' }}>Good morning, {firstName}</h2>
            <p style={{ fontSize: 14, color: '#45464d', margin: 0 }}>Here is what is happening in your classrooms today.</p>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,81,213,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0051d5' }}>
                <Users size={22} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#45464d', margin: '0 0 2px' }}>Total Students</p>
                <p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{classes.reduce((a, c) => a + (c.studentCount || 0), 0) || 120}</p>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(211,228,254,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38485d' }}>
                <Clock size={22} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#45464d', margin: '0 0 2px' }}>Classes Today</p>
                <p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>4</p>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderLeft: '4px solid #ba1a1a', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#ffdad6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ba1a1a' }}>
                <AlertCircle size={22} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#45464d', margin: '0 0 2px' }}>Pending Marks</p>
                <p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>2</p>
              </div>
            </div>
          </div>

          {/* Main Bento Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Timetable */}
              <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>My Timetable</h3>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0051d5', cursor: 'pointer' }}>View Full</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {DEMO_TIMETABLE.map((slot, i) => (
                    <div key={i} style={{
                      padding: 10, background: '#f2f4f6', borderRadius: 6,
                      borderLeft: `4px solid ${slotBorder[slot.status]}`,
                      display: 'flex', gap: 12,
                      opacity: slot.status === 'break' ? 0.5 : 1
                    }}>
                      <div style={{ textAlign: 'center', minWidth: 44 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{slot.time}</p>
                        <p style={{ fontSize: 11, color: '#45464d', margin: 0 }}>{slot.period}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{slot.className}</p>
                        {slot.subject && <p style={{ fontSize: 11, color: '#45464d', margin: 0 }}>{slot.subject} • {slot.room}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements */}
              <div style={{ background: '#131b2e', border: '1px solid #c6c6cd', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: '#b4c5ff' }}>
                  <Megaphone size={18} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#fff' }}>Announcements</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {DEMO_ANNOUNCEMENTS.map((ann, i) => (
                    <div key={i} style={{ borderBottom: i < DEMO_ANNOUNCEMENTS.length - 1 ? '1px solid rgba(180,197,255,0.2)' : 'none', paddingBottom: i < DEMO_ANNOUNCEMENTS.length - 1 ? 12 : 0 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#b4c5ff', margin: '0 0 4px' }}>{ann.from} • {ann.time}</p>
                      <p style={{ fontSize: 13, color: '#fff', margin: 0, lineHeight: 1.5 }}>{ann.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Active Classes */}
              <section>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px' }}>Active Classes</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {(classes.length > 0 ? classes.slice(0, 2) : [
                    { id: '1', name: 'Grade 10 - Sec A', subject: 'Mathematics', status: 'Ongoing' },
                    { id: '2', name: 'Grade 11 - Sec B', subject: 'Calculus', status: 'Starts 10:30 AM' },
                  ]).map((cls: any, i) => (
                    <div key={cls.id} style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'box-shadow 0.15s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                        <div>
                          <p style={{ fontSize: 18, fontWeight: 700, margin: '0 0 2px' }}>{cls.name}</p>
                          <p style={{ fontSize: 13, color: '#45464d', margin: 0 }}>{subjects[i]?.name || 'Mathematics'}</p>
                        </div>
                        <span style={{
                          background: i === 0 ? '#dbe1ff' : '#f2f4f6',
                          color: i === 0 ? '#00174b' : '#45464d',
                          fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 4
                        }}>{i === 0 ? 'Ongoing' : 'Upcoming'}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Link to="/academics/attendance" style={{
                          flex: 1, background: i === 0 ? '#0051d5' : 'transparent', color: i === 0 ? '#fff' : '#0051d5',
                          border: i === 0 ? 'none' : '1px solid #0051d5',
                          borderRadius: 6, padding: '8px 0', fontSize: 12, fontWeight: 700, textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {i === 0 ? 'Take Attendance' : 'Lesson Plan'}
                        </Link>
                        <button style={{ padding: '8px 12px', border: '1px solid #c6c6cd', borderRadius: 6, background: 'transparent', cursor: 'pointer' }}>
                          <MoreVertical size={14} color="#45464d" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pending Tasks */}
              <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Pending Tasks</h3>
                  <button style={{ fontSize: 12, fontWeight: 700, color: '#0051d5', background: 'none', border: 'none', cursor: 'pointer' }}>See All</button>
                </div>
                <div style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f2f4f6', borderBottom: '1px solid #c6c6cd' }}>
                        {['TASK DESCRIPTION', 'CLASS', 'DUE DATE', 'STATUS'].map(h => (
                          <th key={h} style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#45464d', textAlign: 'left' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DEMO_TASKS.map((task, i) => {
                        const s = statusStyle[task.status];
                        return (
                          <tr key={task.id} style={{ borderBottom: i < DEMO_TASKS.length - 1 ? '1px solid #e6e8ea' : 'none' }}>
                            <td style={{ padding: '14px 16px' }}>
                              <p style={{ fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{task.title}</p>
                              <p style={{ fontSize: 11, color: '#45464d', margin: 0 }}>{task.subtitle}</p>
                            </td>
                            <td style={{ padding: '14px 16px', fontSize: 13 }}>{task.classRef}</td>
                            <td style={{ padding: '14px 16px', fontSize: 13 }}>{task.dueDate}</td>
                            <td style={{ padding: '14px 16px' }}>
                              <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 12, textTransform: 'uppercase' }}>{s.label}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: 'auto', padding: '16px 24px', borderTop: '1px solid #c6c6cd', background: '#f2f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: '#45464d', margin: 0 }}>© 2024 Dar-Ark Byte. All institutional rights reserved.</p>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontSize: 12, color: '#45464d', cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ fontSize: 12, color: '#45464d', cursor: 'pointer' }}>System Status</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
