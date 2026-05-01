import { 
  School, Class, UserProfile, FeeInvoice, InventoryItem, 
  StaffSalary, VisitorRecord 
} from '../types';

export const DEMO_SCHOOLS: School[] = [
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
      reportCardTheme: 'nigerian-standard',
      gradingScale: []
    }
  },
  {
    id: 'springfield',
    name: 'Springfield High School',
    isActive: false,
    domain: 'springfield',
    branding: {
      primaryColor: '#059669',
      secondaryColor: '#34d399',
      landingPageTheme: 'theme-2'
    },
    settings: {
      usePositions: false,
      reportCardTheme: 'international-modern',
      gradingScale: []
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

export const DEMO_VISITORS: VisitorRecord[] = [
  { id: 'v-01', name: 'Mr. Jude Anyanwu', purpose: 'Parent-Teacher Meeting', timeIn: '08:30 AM', hostId: 'principal' },
  { id: 'v-02', name: 'Mrs. Funke Akindele', purpose: 'Uniform Purchase', timeIn: '10:15 AM', hostId: 'store-keeper' }
];
