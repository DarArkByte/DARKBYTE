import { 
  School, Class, UserProfile, FeeInvoice, InventoryItem, 
  StaffSalary, VisitorRecord 
} from '../types';

export const DEMO_SCHOOLS: School[] = [
  {
    id: 'dar-ark-elite',
    name: 'Dar-Ark Elite Academy',
    isActive: true,
    domain: 'elite-academy',
    branding: {
      primaryColor: '#1e1b4b',
      secondaryColor: '#d946ef',
      landingPageTheme: 'theme-5',
      identity: {
        motto: 'Excellence in Every Byte',
        phone: '+234 812 345 6789',
        email: 'info@dararkelite.edu.ng',
        address: '12 Digital Command Way, Lagos',
        website: 'www.dararkelite.edu.ng',
        socials: { facebook: '#', instagram: '#', twitter: '#' }
      }
    },
    settings: {
      usePositions: true,
      showAverage: true,
      reportCardTheme: 'elite',
      gradingSystem: [
        { label: 'A', min: 75, max: 100, remark: 'Distinction' },
        { label: 'B', min: 65, max: 74, remark: 'Very Good' },
        { label: 'C', min: 50, max: 64, remark: 'Credit' }
      ],
      caWeight: 40,
      examWeight: 60
    }
  },
  {
    id: 'excel-royal',
    name: 'Excel Royal Academy',
    isActive: true,
    domain: 'excel-royal',
    branding: {
      primaryColor: '#4f46e5',
      secondaryColor: '#818cf8',
      landingPageTheme: 'theme-1'
    },
    settings: {
      usePositions: true,
      showAverage: true,
      reportCardTheme: 'modern',
      gradingSystem: [],
      caWeight: 30,
      examWeight: 70
    }
  },
  {
    id: 'springfield',
    name: 'Springfield High School',
    isActive: true,
    domain: 'springfield',
    branding: {
      primaryColor: '#059669',
      secondaryColor: '#34d399',
      landingPageTheme: 'theme-2'
    },
    settings: {
      usePositions: false,
      showAverage: true,
      reportCardTheme: 'dynamic',
      gradingSystem: [],
      caWeight: 40,
      examWeight: 60
    }
  }
];

export const DEMO_INVOICES: FeeInvoice[] = [
  {
    id: 'inv-001',
    studentId: 'stu-01',
    amount: 150000,
    paidAmount: 50000,
    status: 'partial',
    dueDate: '2026-06-15',
    items: [
      { description: 'Tuition Fee', amount: 120000 },
      { description: 'Development Levy', amount: 30000 }
    ]
  },
  {
    id: 'inv-002',
    studentId: 'stu-02',
    amount: 150000,
    paidAmount: 150000,
    status: 'paid',
    dueDate: '2026-06-15',
    items: [{ description: 'Full Session Payment', amount: 150000 }]
  }
];

export const DEMO_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Math Textbook JSS1', category: 'books', stockLevel: 5, minLevel: 10, price: 4500 },
  { id: '2', name: 'School Blazer (L)', category: 'uniform', stockLevel: 25, minLevel: 10, price: 12000 },
  { id: '3', name: 'Scientific Calculator', category: 'stationery', stockLevel: 2, minLevel: 5, price: 8500 }
];

export const DEMO_STAFF: StaffSalary[] = [
  { id: 'sal-01', staffId: 'teacher-01', baseSalary: 180000, allowances: 20000, deductions: 5000, netPay: 195000, status: 'paid' },
  { id: 'sal-02', staffId: 'teacher-02', baseSalary: 150000, allowances: 10000, deductions: 0, netPay: 160000, status: 'pending' }
];

];

export const DEMO_ADMISSIONS = [
  { id: 'adm-001', studentName: 'Chidi Okoro', targetClass: 'JSS 1', parentPhone: '08123456789', status: 'exam-scheduled', examDate: new Date().toISOString().split('T')[0], examStatus: 'pending' },
  { id: 'adm-002', studentName: 'Fatima Yusuf', targetClass: 'SSS 1', parentPhone: '09087654321', status: 'accepted', examScore: 88, examStatus: 'completed' },
  { id: 'adm-003', studentName: 'Tunde Bakare', targetClass: 'JSS 2', parentPhone: '07011223344', status: 'pending', examStatus: 'pending' }
];

export const DEMO_LIBRARY = [
  { id: 'lib-001', title: 'New General Mathematics', author: 'Macrae et al.', category: 'Textbook', status: 'available', location: 'Shelf A1' },
  { id: 'lib-002', title: 'Purple Hibiscus', author: 'Chimamanda Adichie', category: 'Literature', status: 'borrowed', dueDate: '2026-05-20' },
  { id: 'lib-003', title: 'Introduction to Computing', author: 'Dar-Ark Press', category: 'ICT', status: 'available', location: 'Shelf C4' }
];

export const DEMO_BUS_FLEET = [
  { id: 'bus-01', plateNumber: 'LAG-123-EB', driverName: 'Uncle Sam', status: 'en-route', currentStop: 'Victoria Island', studentCount: 15 },
  { id: 'bus-02', plateNumber: 'ABJ-456-XY', driverName: 'Malam Ibrahim', status: 'idle', currentStop: 'School Base', studentCount: 0 }
];
