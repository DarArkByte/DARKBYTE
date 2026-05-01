/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { doc, writeBatch, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { School, UserProfile, Class, Subject } from '../types';

export const setupDemoData = async (userProfile: UserProfile) => {
  const schoolId = userProfile.schoolId || 'demo-school-1';
  
  // Check if school already populated
  const classesRef = collection(db, 'schools', schoolId, 'classes');
  const snapshot = await getDocs(classesRef);
  
  if (!snapshot.empty) return; // Already setup

  const batch = writeBatch(db);

  // 1. Create School if needed
  const schoolRef = doc(db, 'schools', schoolId);
  const demoSchool: School = {
    id: schoolId,
    name: 'Greenwood Academy',
    branding: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
    },
    settings: {
      usePositions: true,
      caWeight: 40,
      examWeight: 60,
      reportCardTheme: 'modern',
      gradingSystem: [
        { label: 'A', min: 75, max: 100, remark: 'Excellent' },
        { label: 'B', min: 65, max: 74, remark: 'Very Good' },
        { label: 'C', min: 50, max: 64, remark: 'Good' },
        { label: 'D', min: 40, max: 49, remark: 'Pass' },
        { label: 'F', min: 0, max: 39, remark: 'Fail' }
      ]
    }
  };
  batch.set(schoolRef, demoSchool);

  // Update user profile with schoolId if missing
  if (!userProfile.schoolId) {
    batch.update(doc(db, 'users', userProfile.uid), { schoolId });
  }

  // 2. Create Classes
  const classIds = ['ss1-a', 'ss1-b', 'ss2-a'];
  classIds.forEach(id => {
    const ref = doc(db, 'schools', schoolId, 'classes', id);
    batch.set(ref, {
      id,
      schoolId,
      name: id.toUpperCase().replace('-', ' '),
      formTeacherId: userProfile.uid
    });
  });

  // 3. Create Subjects
  const subjects = ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology'];
  subjects.forEach(name => {
    const id = name.toLowerCase().replace(' ', '-');
    const ref = doc(db, 'schools', schoolId, 'subjects', id);
    batch.set(ref, { id, schoolId, name });
  });

  // 4. Create Students (mock users)
  const students = [
    { uid: 'student-1', name: 'John Doe', email: 'john@example.com' },
    { uid: 'student-2', name: 'Jane Smith', email: 'jane@example.com' },
    { uid: 'student-3', name: 'Alex Brown', email: 'alex@example.com' }
  ];
  
  students.forEach(s => {
    const ref = doc(db, 'users', s.uid);
    batch.set(ref, {
      uid: s.uid,
      email: s.email,
      displayName: s.name,
      role: 'student',
      schoolId
    });
  });

  await batch.commit();
};
