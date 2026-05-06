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
  updateSchool: (updates: Partial<School>) => Promise<void>;
  clearImpersonation: () => void;
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
  reportCardTheme: 'nigerian-standard'
};

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const { userProfile } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchSchool = React.useCallback(async () => {
    // Priority 1: Subdomain/Domain matching
    const hostname = window.location.hostname;
    const isMainDomain = ['localhost', 'dar-ark-byte.vercel.app', 'dararkbyte.com', 'dararkbyte-erp.vercel.app'].includes(hostname);
    
    if (!isMainDomain) {
      try {
        const domain = hostname.split('.')[0];
        const schoolDoc = await getDoc(doc(db, 'schools', domain));
        if (schoolDoc.exists()) {
          setSchool(schoolDoc.data() as School);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn("Domain fetch failed");
      }
    }

    // Priority 0: Super Admin Impersonation Bypass
    const impersonatedId = localStorage.getItem('impersonated_school_id');
    const schoolId = impersonatedId || userProfile?.schoolId || localStorage.getItem('last_school_id');

    if (!schoolId) {
      if (userProfile === null) {
        setSchool(null);
        setLoading(false);
      }
      return;
    }

    try {
      const schoolDoc = await getDoc(doc(db, 'schools', schoolId));
      if (schoolDoc.exists()) {
        const data = schoolDoc.data() as School;
        setSchool(data);
        localStorage.setItem('last_school_id', data.id);
      } else {
        // Create demo school if none exists and user has a schoolId
        const demoSchool: School = {
          id: schoolId,
          name: 'Dar-Ark Byte Academy',
          branding: {
            primaryColor: '#4f46e5',
            secondaryColor: '#818cf8',
            landingPageTheme: 'theme-1',
            gallery: [],
            identity: {
              motto: 'Knowledge is Power',
              phone: '+234 000 000 0000',
              email: 'admin@dararkbyte.com',
              address: 'Abuja, Nigeria',
              website: 'www.dararkbyte.com',
              socials: { facebook: '', instagram: '', twitter: '' }
            }
          },
          settings: DEFAULT_SCHOOL_SETTINGS,
          isActive: true
        };
        await setDoc(doc(db, 'schools', schoolId), demoSchool);
        setSchool(demoSchool);
      }
    } catch (error) {
      console.error('Error fetching school:', error);
    } finally {
      setLoading(false);
    }
  }, [userProfile?.schoolId]);

  const updateSchool = async (updates: Partial<School>) => {
    const schoolId = userProfile?.schoolId || school?.id;
    if (!schoolId || !school) return;
    
    try {
      const schoolRef = doc(db, 'schools', schoolId);
      const updatedSchool = { ...school, ...updates };
      await setDoc(schoolRef, updatedSchool, { merge: true });
      setSchool(updatedSchool);
    } catch (error) {
      console.error('Error updating school:', error);
      throw error;
    }
  };

  const clearImpersonation = () => {
    localStorage.removeItem('impersonated_school_id');
    fetchSchool();
  };

  useEffect(() => {
    fetchSchool();
  }, [fetchSchool]);

  return (
    <SchoolContext.Provider value={{ school, loading, refreshSchool: fetchSchool, updateSchool, clearImpersonation }}>
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
