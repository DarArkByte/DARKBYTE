/**
 * DEMO SCHOOL SEEDER
 * Seeds "Greenfield International Academy" into Firebase as a live demo.
 */
import { doc, writeBatch, collection, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const DEMO_SCHOOL_ID = 'greenfield-demo';
export const DEMO_SCHOOL_DOMAIN = 'greenfield-demo';

const SCHOOL_NAME = 'Greenfield International Academy';

const CLASSES = [
  { id: 'jss1', name: 'JSS 1', formTeacherId: 'teacher-001' },
  { id: 'jss2', name: 'JSS 2', formTeacherId: 'teacher-002' },
  { id: 'jss3', name: 'JSS 3', formTeacherId: 'teacher-003' },
  { id: 'sss1', name: 'SSS 1', formTeacherId: 'teacher-004' },
  { id: 'sss2', name: 'SSS 2', formTeacherId: 'teacher-005' },
  { id: 'sss3', name: 'SSS 3', formTeacherId: 'teacher-006' },
];

const SUBJECTS = [
  'Mathematics', 'English Language', 'Physics', 'Chemistry',
  'Biology', 'Further Mathematics', 'Economics', 'Civic Education',
  'Agricultural Science', 'Computer Science', 'Literature in English',
  'Geography', 'Government', 'French',
];

const STUDENTS = [
  { id: 'stu-001', name: 'Adaeze Nwosu', classId: 'sss2', gender: 'Female' },
  { id: 'stu-002', name: 'Emeka Okafor', classId: 'sss2', gender: 'Male' },
  { id: 'stu-003', name: 'Fatima Al-Hassan', classId: 'sss1', gender: 'Female' },
  { id: 'stu-004', name: 'Ibrahim Musa', classId: 'sss1', gender: 'Male' },
  { id: 'stu-005', name: 'Chidera Eze', classId: 'jss3', gender: 'Male' },
  { id: 'stu-006', name: 'Ngozi Okeke', classId: 'jss3', gender: 'Female' },
  { id: 'stu-007', name: 'Tunde Adeyemi', classId: 'jss2', gender: 'Male' },
  { id: 'stu-008', name: 'Kemi Afolabi', classId: 'jss2', gender: 'Female' },
  { id: 'stu-009', name: 'Uche Nnamdi', classId: 'jss1', gender: 'Male' },
  { id: 'stu-010', name: 'Blessing Onyeka', classId: 'jss1', gender: 'Female' },
  { id: 'stu-011', name: 'Yusuf Abdullahi', classId: 'sss3', gender: 'Male' },
  { id: 'stu-012', name: 'Chinwe Obi', classId: 'sss3', gender: 'Female' },
];

const STAFF = [
  { id: 'teacher-001', name: 'Mr. Adebola Ogunleye', subject: 'Mathematics', email: 'ogunleye@greenfield.edu.ng' },
  { id: 'teacher-002', name: 'Mrs. Chioma Eze', subject: 'English Language', email: 'eze@greenfield.edu.ng' },
  { id: 'teacher-003', name: 'Dr. Akin Taiwo', subject: 'Physics', email: 'taiwo@greenfield.edu.ng' },
  { id: 'teacher-004', name: 'Mrs. Funke Bello', subject: 'Chemistry', email: 'bello@greenfield.edu.ng' },
  { id: 'teacher-005', name: 'Mr. Chukwu Nwosu', subject: 'Biology', email: 'nwosu@greenfield.edu.ng' },
  { id: 'teacher-006', name: 'Ms. Amina Yusuf', subject: 'Computer Science', email: 'yusuf@greenfield.edu.ng' },
];

const ADMISSIONS = [
  { studentName: 'Oluwaseun Adebayo', parentName: 'Mr. Adebayo', parentPhone: '08033215678', email: 'adebayo@gmail.com', targetClass: 'JSS 1', status: 'pending', examStatus: 'pending' },
  { studentName: 'Aisha Mohammed', parentName: 'Alhaji Mohammed', parentPhone: '08155443322', email: 'alhaji@gmail.com', targetClass: 'SSS 1', status: 'exam-scheduled', examDate: '2026-06-10', examStatus: 'pending' },
  { studentName: 'Chukwuemeka Obi', parentName: 'Chief Obi', parentPhone: '07012345678', email: 'chiefobi@yahoo.com', targetClass: 'JSS 2', status: 'accepted', examScore: 82, examStatus: 'completed' },
  { studentName: 'Grace Effiong', parentName: 'Pastor Effiong', parentPhone: '09087654321', email: 'pastoreffiong@church.org', targetClass: 'SSS 2', status: 'accepted', examScore: 91, examStatus: 'completed' },
  { studentName: 'Babatunde Lawal', parentName: 'Engr. Lawal', parentPhone: '08122334455', email: 'engr.lawal@gmail.com', targetClass: 'JSS 3', status: 'rejected', examScore: 28, examStatus: 'completed' },
];

const SUBJECTS_IDS = SUBJECTS.map(s => s.toLowerCase().replace(/ /g, '-'));

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function seedDemoSchool(): Promise<{ success: boolean; message: string }> {
  try {
    // Check if already seeded
    const schoolDoc = await getDoc(doc(db, 'schools', DEMO_SCHOOL_ID));
    if (schoolDoc.exists() && schoolDoc.data()?.seeded) {
      return { success: true, message: 'Demo already active.' };
    }

    const batch = writeBatch(db);

    // 1. SCHOOL RECORD
    batch.set(doc(db, 'schools', DEMO_SCHOOL_ID), {
      id: DEMO_SCHOOL_ID,
      name: SCHOOL_NAME,
      isActive: true,
      domain: DEMO_SCHOOL_DOMAIN,
      studentsCount: STUDENTS.length,
      seeded: true,
      branding: {
        primaryColor: '#1e1b4b',
        secondaryColor: '#d946ef',
        landingPageTheme: 'theme-4',
        identity: {
          motto: 'Nurturing Excellence, Building Futures',
          phone: '+234 803 456 7890',
          email: 'info@greenfield.edu.ng',
          address: '14 Greenfield Avenue, Abuja, FCT',
          website: 'www.greenfield.edu.ng',
          socials: { facebook: '#', instagram: '#', twitter: '#' },
        },
      },
      settings: {
        usePositions: true,
        showAverage: true,
        reportCardTheme: 'nigerian-standard',
        gradingSystem: [
          { label: 'A1', min: 75, max: 100, remark: 'Excellent' },
          { label: 'B2', min: 70, max: 74, remark: 'Very Good' },
          { label: 'B3', min: 65, max: 69, remark: 'Good' },
          { label: 'C4', min: 60, max: 64, remark: 'Credit' },
          { label: 'C5', min: 55, max: 59, remark: 'Credit' },
          { label: 'C6', min: 50, max: 54, remark: 'Credit' },
          { label: 'D7', min: 45, max: 49, remark: 'Pass' },
          { label: 'E8', min: 40, max: 44, remark: 'Pass' },
          { label: 'F9', min: 0, max: 39, remark: 'Fail' },
        ],
        caWeight: 40,
        examWeight: 60,
      },
      createdAt: new Date().toISOString(),
    }, { merge: true });

    // 2. CLASSES
    CLASSES.forEach(cls => {
      batch.set(doc(db, 'schools', DEMO_SCHOOL_ID, 'classes', cls.id), {
        id: cls.id,
        schoolId: DEMO_SCHOOL_ID,
        name: cls.name,
        formTeacherId: cls.formTeacherId,
        usePositions: true,
        assessmentType: 'numerical',
      });
    });

    // 3. SUBJECTS
    SUBJECTS.forEach((name, i) => {
      batch.set(doc(db, 'schools', DEMO_SCHOOL_ID, 'subjects', SUBJECTS_IDS[i]), {
        id: SUBJECTS_IDS[i],
        schoolId: DEMO_SCHOOL_ID,
        name,
      });
    });

    // 4. SESSIONS & TERMS
    batch.set(doc(db, 'schools', DEMO_SCHOOL_ID, 'sessions', '2025-2026'), {
      id: '2025-2026', schoolId: DEMO_SCHOOL_ID, name: '2025/2026', isActive: true,
    });
    ['1st-term', '2nd-term', '3rd-term'].forEach((tid, i) => {
      batch.set(doc(db, 'schools', DEMO_SCHOOL_ID, 'terms', tid), {
        id: tid, schoolId: DEMO_SCHOOL_ID, name: `${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : 'rd'} Term`, isActive: i === 2,
      });
    });

    await batch.commit(); // Commit batch 1

    // BATCH 2: STUDENTS
    const batch2 = writeBatch(db);
    STUDENTS.forEach(s => {
      batch2.set(doc(db, 'users', `demo_${s.id}`), {
        uid: `demo_${s.id}`,
        email: `${s.id}@greenfield.edu.ng`,
        displayName: s.name,
        role: 'student',
        schoolId: DEMO_SCHOOL_ID,
        classId: s.classId,
        gender: s.gender,
        phone: `080${rnd(10000000, 99999999)}`,
        address: 'Abuja, FCT',
        metadata: { isDemo: true, enrollmentDate: '2024-09-01' },
      });
    });

    // STAFF
    STAFF.forEach(t => {
      batch2.set(doc(db, 'users', `demo_${t.id}`), {
        uid: `demo_${t.id}`,
        email: t.email,
        displayName: t.name,
        role: 'teacher',
        schoolId: DEMO_SCHOOL_ID,
        metadata: { isDemo: true, subject: t.subject },
      });
    });

    // DEMO SCHOOL ADMIN
    batch2.set(doc(db, 'users', `demo_admin_${DEMO_SCHOOL_ID}`), {
      uid: `demo_admin_${DEMO_SCHOOL_ID}`,
      email: 'admin@greenfield.edu.ng',
      displayName: 'Greenfield Admin',
      role: 'school-admin',
      schoolId: DEMO_SCHOOL_ID,
      metadata: { isDemo: true },
    });

    await batch2.commit(); // Commit batch 2

    // BATCH 3: RESULTS
    const batch3 = writeBatch(db);
    const subjectSample = SUBJECTS_IDS.slice(0, 8);
    STUDENTS.forEach(student => {
      subjectSample.forEach(subjectId => {
        const ca1 = rnd(10, 20);
        const ca2 = rnd(10, 20);
        const exam = rnd(35, 60);
        const total = ca1 + ca2 + exam;
        const grade = total >= 75 ? 'A1' : total >= 70 ? 'B2' : total >= 65 ? 'B3' : total >= 60 ? 'C4' : total >= 50 ? 'C6' : total >= 45 ? 'D7' : 'F9';
        const resultRef = doc(collection(db, 'results'));
        batch3.set(resultRef, {
          schoolId: DEMO_SCHOOL_ID,
          studentId: `demo_${student.id}`,
          subjectId,
          classId: student.classId,
          sessionId: '2025-2026',
          termId: '3rd-term',
          ca1, ca2, exam, total, grade,
          status: 'approved',
          teacherId: 'demo_teacher-001',
          updatedAt: new Date().toISOString(),
        });
      });
    });

    await batch3.commit(); // Commit batch 3

    // BATCH 4: ADMISSIONS + PINS + FINANCE
    const batch4 = writeBatch(db);

    ADMISSIONS.forEach(app => {
      const appRef = doc(collection(db, 'admissions'));
      batch4.set(appRef, {
        ...app, schoolId: DEMO_SCHOOL_ID,
        createdAt: new Date().toISOString(),
      });
    });

    // RESULT PINS
    for (let i = 0; i < 10; i++) {
      const pin = Math.floor(100000 + Math.random() * 900000).toString();
      const pinRef = doc(collection(db, 'result_pins'));
      batch4.set(pinRef, {
        pin,
        serialNumber: `SN-GFA-${Date.now().toString().slice(-5)}-${i + 1}`,
        schoolId: DEMO_SCHOOL_ID,
        termId: '3rd-term',
        sessionId: '2025-2026',
        maxUsage: 5,
        usageCount: rnd(0, 4),
        status: i < 8 ? 'active' : 'exhausted',
        createdAt: new Date().toISOString(),
      });
    }

    // FEE INVOICES
    STUDENTS.slice(0, 6).forEach((student, i) => {
      const amount = 120000;
      const paid = i < 3 ? amount : i === 3 ? 60000 : 0;
      const invRef = doc(collection(db, 'fee_invoices'));
      batch4.set(invRef, {
        schoolId: DEMO_SCHOOL_ID,
        studentId: `demo_${student.id}`,
        amount,
        paidAmount: paid,
        status: paid === amount ? 'paid' : paid > 0 ? 'partial' : 'owing',
        dueDate: '2026-07-01',
        items: [
          { description: 'School Fees', amount: 80000 },
          { description: 'Development Levy', amount: 20000 },
          { description: 'Exam Fees', amount: 20000 },
        ],
        createdAt: new Date().toISOString(),
      });
    });

    await batch4.commit();

    return { success: true, message: `${SCHOOL_NAME} demo is now live!` };
  } catch (err: any) {
    console.error('Seed error:', err);
    return { success: false, message: err.message || 'Seeding failed' };
  }
}
