/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'super-admin' | 'school-admin' | 'teacher' | 'parent' | 'student';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  schoolId?: string; // null for super-admin
  metadata?: Record<string, any>;
  phone?: string;
  address?: string;
  bloodGroup?: string;
  religion?: string;
  guardianId?: string; // For students to link to parents
}

export interface Branding {
  primaryColor: string; // Tailwind color or hex
  secondaryColor: string;
  accentColor?: string;
  backgroundColor?: string;
  logoUrl?: string;
  bannerUrl?: string;
  landingPageTheme: string; // theme-1 to theme-10
  selectedThemeId?: string; // Links to the 5 predefined themes
  gallery?: string[]; // Array of media URLs
  identity?: {
    motto: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    socials: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
}

export interface GradeRange {
  label: string;
  min: number;
  max: number;
  remark: string;
}

export type ReportCardTheme = 'nigerian-standard' | 'international-modern' | 'elite-private' | 'minimalist' | 'creche-observational';

export interface SchoolSettings {
  usePositions: boolean;
  showAverage: boolean;
  gradingSystem: GradeRange[];
  caWeight: number; // e.g. 40
  examWeight: number; // e.g. 60
  reportCardTheme: ReportCardTheme;
}

export interface School {
  id: string;
  name: string;
  branding: Branding;
  settings: SchoolSettings;
  domain?: string;
  isActive: boolean;
}

export interface Class {
  id: string;
  schoolId: string;
  name: string;
  formTeacherId: string;
  usePositions: boolean;
  assessmentType: 'numerical' | 'observational';
}

export interface Section {
  id: string;
  schoolId: string;
  classId: string;
  name: string; // e.g., 'A', 'Science', 'Art'
  formTeacherId?: string;
}

export interface Routine {
  id: string;
  schoolId: string;
  classId: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
  dayOfWeek: number; // 1 (Mon) - 5 (Fri)
  startTime: string; // e.g., "08:00"
  endTime: string; // e.g., "08:45"
  roomId?: string;
}

export interface Subject {
  id: string;
  schoolId: string;
  name: string;
}

export type ResultStatus = 'draft' | 'reviewed' | 'approved' | 'published';

export interface Result {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  classId: string;
  sessionId: string;
  termId: string;
  ca1: number;
  ca2: number;
  assignment?: number;
  exam: number;
  total: number;
  grade: string;
  status: ResultStatus;
  teacherId: string;
  term1Score?: number;
  term2Score?: number;
  updatedAt: string;
}

export interface ReportCardDetails {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  sessionId: string;
  termId: string;
  formTeacherRemark: string;
  principalRemark: string;
  areasForImprovement?: string;
  daysPresent: number;
  daysAbsent: number;
  nextTermBegins?: string;
  updatedAt: string;
}

export interface ObservationalMetric {
  id: string;
  schoolId: string;
  classId: string;
  studentId: string;
  metricName: string; // e.g., 'Identifies Colors'
  evaluation: 'Consistently' | 'Sometimes' | 'Rarely' | 'Not Evaluated';
  sessionId: string;
  termId: string;
}

export interface AnnualResult {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  classId: string;
  sessionId: string;
  firstTermScore?: number;
  secondTermScore?: number;
  thirdTermScore?: number;
  cumulativeAverage: number;
  grade: string;
  promotionStatus: 'promoted' | 'repeated' | 'pending';
}

export interface Session {
  id: string;
  schoolId: string;
  name: string;
  isActive: boolean;
}

// --- MEGA ADMIN SUITE TYPES ---

export interface FeeInvoice {
  id: string;
  studentId: string;
  amount: number;
  paidAmount: number;
  status: 'paid' | 'owing' | 'partial';
  dueDate: string;
  items: { description: string; amount: number }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'books' | 'uniform' | 'stationery';
  stockLevel: number;
  minLevel: number;
  price: number;
}

export interface VisitorRecord {
  id: string;
  name: string;
  purpose: string;
  timeIn: string;
  timeOut?: string;
  hostId: string;
}

export interface StaffSalary {
  id: string;
  staffId: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: 'paid' | 'pending';
}

export interface Term {
  id: string;
  schoolId: string;
  name: string;
  isActive: boolean;
}

export interface MessageCategory {
  id: 'academic' | 'behaviour' | 'attendance' | 'general';
  label: string;
}

export interface CommunicationMessage {
  id: string;
  schoolId: string;
  studentId: string;
  senderId: string;
  recipientId: string;
  content: string;
  type: MessageCategory['id'];
  createdAt: string;
  readAt?: string;
}

export interface NoteType {
  id: 'general' | 'academic' | 'urgent';
  label: string;
}

export interface TermlyNote {
  id: string;
  schoolId: string;
  classId?: string; // Optional for school-wide
  title: string;
  content: string;
  type: NoteType['id'];
  attachments?: string[];
  publishedAt: string;
  authorId: string;
}

export interface LessonNote {
  id: string;
  schoolId: string;
  classId: string;
  subjectId: string;
  term: number;
  week: number;
  topic: string;
  content: string;
  files?: string[];
  teacherId: string;
  createdAt: string;
}

// --- EXAM & CBT MODULES ---

export interface ExamSchedule {
  id: string;
  schoolId: string;
  examName: string; // e.g., "First Term Mid-Term Test"
  classId: string;
  sectionId: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  roomId?: string;
}

export interface ExamAttendance {
  id: string;
  schoolId: string;
  examScheduleId: string;
  studentId: string;
  status: 'present' | 'absent';
}

export interface QuestionBank {
  id: string;
  schoolId: string;
  subjectId: string;
  classId: string;
  questionText: string;
  type: 'multiple-choice' | 'essay';
  options?: { id: string; text: string; isCorrect: boolean }[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface OnlineExam {
  id: string;
  schoolId: string;
  title: string;
  classId: string;
  subjectId: string;
  questionIds: string[];
  durationMinutes: number;
  startTime: string;
  endTime: string;
  passingPercentage: number;
}

// --- MEDIA MODULE ---

export interface MediaItem {
  id: string;
  schoolId: string;
  title: string;
  url: string;
  type: 'document' | 'image' | 'video';
  uploadedBy: string;
  createdAt: string;
}


// --- RESULT PIN SYSTEM ---

export interface ResultPin {
  id: string;
  pin: string;
  serialNumber: string;
  schoolId: string;
  studentId?: string; // Optional: Can be tied to a specific student or generic
  termId: string;
  sessionId: string;
  maxUsage: number; // default 5
  usageCount: number;
  status: 'active' | 'exhausted' | 'expired';
  generatedBy: string; // admin ID
  createdAt: string;
}
// --- ADMISSIONS ENGINE TYPES ---

export interface AdmissionApplication {
  id: string;
  schoolId: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  email: string;
  targetClass: string;
  previousSchool?: string;
  status: 'pending' | 'exam-scheduled' | 'interview' | 'accepted' | 'rejected';
  examScore?: number;
  examDate?: string; // YYYY-MM-DD
  examStatus: 'pending' | 'completed' | 'not-required';
  createdAt: string;
}

export interface EntranceExamQuestion {
  id: string;
  schoolId: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
