/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { School, SchoolSettings } from '../types';
import { useAuth } from './useAuth';

interface SchoolContextType {
  school: School | null;
  loading: boolean;
  refreshSchool: () => Promise<void>;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const DEFAULT_SCHOOL_SETTINGS: SchoolSettings = {
  usePositions: true,
  gradingSystem: [
    { label: 'A', min: 75, max: 100, remark: 'Excellent' },
    { label: 'B', min: 65, max: 74, remark: 'Very Good' },
    { label: 'C', min: 50, max: 64, remark: 'Good' },
    { label: 'D', min: 45, max: 49, remark: 'Pass' },
    { label: 'E', min: 40, max: 44, remark: 'Poor' },
    { label: 'F', min: 0, max: 39, remark: 'Fail' }
  ],
  caWeight: 40,
  examWeight: 60,
  reportCardTheme: 'modern'
};

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const { userProfile } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSchool = async () => {
    if (!userProfile?.schoolId) {
      setSchool(null);
      setLoading(false);
      return;
    }

    try {
      const schoolDoc = await getDoc(doc(db, 'schools', userProfile.schoolId));
      if (schoolDoc.exists()) {
        setSchool(schoolDoc.data() as School);
      } else {
        // Create demo school if none exists and user has a schoolId
        const demoSchool: School = {
          id: userProfile.schoolId,
          name: 'Demo International School',
          branding: {
            primaryColor: '#4f46e5',
            secondaryColor: '#818cf8',
          },
          settings: DEFAULT_SCHOOL_SETTINGS
        };
        await setDoc(doc(db, 'schools', userProfile.schoolId), demoSchool);
        setSchool(demoSchool);
      }
    } catch (error) {
      console.error('Error fetching school:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchool();
  }, [userProfile?.schoolId]);

  return (
    <SchoolContext.Provider value={{ school, loading, refreshSchool: fetchSchool }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
}
