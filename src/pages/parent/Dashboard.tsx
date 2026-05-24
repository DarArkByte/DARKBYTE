import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useSchool } from '../../hooks/useSchool';
import { Link } from 'react-router-dom';
import {
  Bell, Search, Settings, HelpCircle, LogOut, LayoutDashboard,
  User, CreditCard, CheckSquare, Mail, Calendar, ChevronRight,
  ArrowRight, BookOpen, FlaskConical, GraduationCap, BadgeCheck, AlertCircle, FileSpreadsheet
} from 'lucide-react';

interface ChildProfile {
  uid: string;
  displayName: string;
  className?: string;
  rollNumber?: string;
}

interface Notice {
  id: string;
  title: string;
  body: string;
  type: 'circular' | 'urgent' | 'event';
  createdAt: any;
}

export default function ParentDashboard() {
  const { userProfile, signOut } = useAuth() as any;
  const { school } = useSchool();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [feeStatus, setFeeStatus] = useState<{ amount: number; status: string; dueDate: string } | null>(null);
  const [attendancePct, setAttendancePct] = useState(95);
  const [examAvg, setExamAvg] = useState(82);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!school?.id) return;
    const q = query(
      collection(db, 'users'),
      where('schoolId', '==', school.id),
      where('role', '==', 'student')
    );
    getDocs(q).then(snap => {
      const kids = snap.docs.map(d => ({ uid: d.id, ...d.data() } as ChildProfile));
      setChildren(kids);
      if (kids.length > 0) setSelectedChild(kids[0]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [school?.id]);

  useEffect(() => {
    if (!school?.id) return;
    const q = query(
      collection(db, 'schools', school.id, 'notices'),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
    const unsub = onSnapshot(q, snap => {
      setNotices(snap.docs.map(d => ({ id: d.id, ...d.data() } as Notice)));
    });
    return unsub;
  }, [school?.id]);

  const navItems = [
    { icon: <LayoutDashboard size={16} />, label: 'Dashboard', active: true, to: '/dashboard' },
    { icon: <User size={16} />, label: 'Child Profile', to: '/dashboard' },
    { icon: <CreditCard size={16} />, label: 'Fees & Payments', to: '/finance' },
    { icon: <CheckSquare size={16} />, label: 'Attendance', to: '/academics/attendance' },
    { icon: <FileSpreadsheet size={16} />, label: 'Report Cards', to: '/parent/results' },
    { icon: <Mail size={16} />, label: 'Messages', to: '/messages' },
    { icon: <Calendar size={16} />, label: 'Calendar', to: '/dashboard' },
  ];

  const noticeTypeStyle: Record<string, { border: string; badge: string; badgeText: string; text: string }> = {
    circular: { border: '#0051d5', badge: '#dbe1ff', badgeText: '#003ea8', text: 'Circular' },
    urgent: { border: '#ba1a1a', badge: '#ffdad6', badgeText: '#93000a', text: 'Urgent' },
    event: { border: '#c6c6cd', badge: '#eceef0', badgeText: '#45464d', text: 'Event' },
  };

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
              <p style={{ fontSize: 11, color: '#45464d', margin: 0, fontWeight: 600 }}>Parent Portal</p>
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
          <button onClick={signOut} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', fontSize: 12, fontWeight: 600, color: '#ba1a1a', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        <header style={{ height: 64, background: '#fff', borderBottom: '1px solid #c6c6cd', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f2f4f6', border: '1px solid #c6c6cd', borderRadius: 24, padding: '8px 16px', width: 280 }}>
            <Search size={14} color="#76777d" />
            <input placeholder="Search notices, grades..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#191c1e', width: '100%' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
              <Bell size={20} color="#45464d" />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, background: '#ba1a1a', borderRadius: '50%' }} />
            </button>
            <div style={{ width: 1, height: 32, background: '#c6c6cd' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#dbe1ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#003ea8' }}>
                {userProfile?.displayName?.[0] || 'P'}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{userProfile?.displayName || 'Parent'}</p>
                <p style={{ fontSize: 10, color: '#45464d', margin: 0 }}>Parent Portal</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: 24, flex: 1 }}>
          {/* Welcome + Child Switcher */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', color: '#191c1e' }}>
                Welcome back, {userProfile?.displayName?.split(' ')[1] || userProfile?.displayName || 'Parent'}
              </h2>
              <p style={{ fontSize: 14, color: '#45464d', margin: 0 }}>Here is a quick summary of your children's academic status.</p>
            </div>
            {children.length > 0 && (
              <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #c6c6cd', padding: 4, borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                {children.map(child => (
                  <button key={child.uid} onClick={() => setSelectedChild(child)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                      background: selectedChild?.uid === child.uid ? '#0051d5' : 'transparent',
                      color: selectedChild?.uid === child.uid ? '#fff' : '#45464d',
                      border: 'none', cursor: 'pointer', transition: 'all 0.15s'
                    }}>
                    <User size={12} /> {child.displayName}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            {/* Fee Status */}
            <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, transition: 'transform 0.15s, box-shadow 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#45464d' }}>Fee Status</span>
                <span style={{ background: '#ffdad6', color: '#93000a', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12, textTransform: 'uppercase' }}>PENDING</span>
              </div>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#ba1a1a', margin: '0 0 4px' }}>$1,250</p>
              <p style={{ fontSize: 12, color: '#45464d', margin: '0 0 16px' }}>Next due: Oct 15, 2023</p>
              <Link to="/finance" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#0051d5', color: '#fff', borderRadius: 8, padding: '10px 0', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                Pay Now <ArrowRight size={14} />
              </Link>
            </div>

            {/* Last Exam Avg */}
            <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#45464d' }}>Last Exam Avg.</span>
                <span style={{ background: '#dbe1ff', color: '#003ea8', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>+4%</span>
              </div>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#191c1e', margin: '0 0 8px' }}>{examAvg}%</p>
              <div style={{ background: '#e6e8ea', borderRadius: 4, height: 8, overflow: 'hidden', marginBottom: 4 }}>
                <div style={{ width: `${examAvg}%`, height: '100%', background: '#0051d5', borderRadius: 4 }} />
              </div>
              <p style={{ fontSize: 12, color: '#45464d', margin: '12px 0 0' }}>Ranked 5th in Class 10-A</p>
            </div>

            {/* Attendance */}
            <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#45464d' }}>Attendance</span>
                <BadgeCheck size={18} color="#0051d5" />
              </div>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#191c1e', margin: '0 0 4px' }}>{attendancePct}%</p>
              <p style={{ fontSize: 12, color: '#45464d', margin: 0 }}>Present: 18/19 days this month</p>
            </div>
          </div>

          {/* Main Content Split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
            {/* Academic Overview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Academic Overview</h3>
                <Link to="/dashboard" style={{ fontSize: 12, fontWeight: 700, color: '#0051d5', textDecoration: 'none' }}>View Schedule</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: <BookOpen size={20} />, name: 'Mathematics', sub: 'Midterm Report Available', action: 'Download PDF' },
                  { icon: <FlaskConical size={20} />, name: 'Advanced Science', sub: 'Project Grade: A+', action: 'View Feedback' },
                ].map(item => (
                  <div key={item.name} style={{ background: '#fff', border: '1px solid #c6c6cd', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0051d5' }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{item.name}</p>
                        <p style={{ fontSize: 11, color: '#45464d', margin: 0 }}>{item.sub}</p>
                      </div>
                    </div>
                    <button style={{ width: '100%', padding: '8px 0', border: '1px solid #0051d5', color: '#0051d5', background: 'transparent', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}>
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>

              {/* Annual Report CTA */}
              <div style={{ background: '#0b1c30', borderRadius: 16, padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.08 }}>
                  <GraduationCap size={160} color="white" />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h4 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Annual Performance Report</h4>
                  <p style={{ fontSize: 14, color: '#75859d', margin: '0 0 20px', maxWidth: 400 }}>
                    The comprehensive 2023–2024 academic summary for {selectedChild?.displayName || 'your child'} is now available for review.
                  </p>
                  <Link to={selectedChild ? `/results/view/${selectedChild.uid}` : '/dashboard'}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#0b1c30', fontWeight: 700, fontSize: 14, padding: '10px 20px', borderRadius: 8, textDecoration: 'none' }}>
                    Open Report
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Notices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Recent Notices</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {notices.length > 0 ? notices.map(notice => {
                  const style = noticeTypeStyle[notice.type] || noticeTypeStyle.event;
                  return (
                    <div key={notice.id} style={{ background: '#fff', borderLeft: `4px solid ${style.border}`, borderRadius: '0 8px 8px 0', padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                      <span style={{ background: style.badge, color: style.badgeText, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{style.text}</span>
                      <h5 style={{ fontSize: 13, fontWeight: 700, margin: '8px 0 4px' }}>{notice.title}</h5>
                      <p style={{ fontSize: 11, color: '#45464d', margin: '0 0 8px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{notice.body}</p>
                      <p style={{ fontSize: 10, color: '#76777d', margin: 0 }}>Recently posted</p>
                    </div>
                  );
                }) : (
                  // Fallback demo notices
                  [
                    { id: '1', type: 'circular', title: 'Parent-Teacher Meeting', body: 'The monthly PTM is scheduled for Saturday, 28th October at 10:00 AM in the main hall.', time: '2 hours ago' },
                    { id: '2', type: 'urgent', title: 'Winter Uniform Update', body: 'Switch to full-sleeve winter uniforms from Nov 1st. Orders available at the shop.', time: 'Yesterday' },
                    { id: '3', type: 'event', title: 'Annual Sports Day', body: 'Sign up for volunteer positions by this Friday. We need 15 more parents.', time: '2 days ago' },
                  ].map(n => {
                    const s = noticeTypeStyle[n.type];
                    return (
                      <div key={n.id} style={{ background: '#fff', borderLeft: `4px solid ${s.border}`, borderRadius: '0 8px 8px 0', padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                        <span style={{ background: s.badge, color: s.badgeText, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase' }}>{s.text}</span>
                        <h5 style={{ fontSize: 13, fontWeight: 700, margin: '8px 0 4px' }}>{n.title}</h5>
                        <p style={{ fontSize: 11, color: '#45464d', margin: '0 0 8px', lineHeight: 1.5 }}>{n.body}</p>
                        <p style={{ fontSize: 10, color: '#76777d', margin: 0 }}>{n.time}</p>
                      </div>
                    );
                  })
                )}
              </div>
              <button style={{ width: '100%', padding: '10px 0', border: '1px solid #0051d5', color: '#0051d5', background: 'transparent', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                View All Notices
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
