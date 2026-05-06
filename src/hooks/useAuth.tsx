/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  login: (email: string, pass: string, schoolId?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const profileDoc = await getDoc(doc(db, 'users', user.uid));
          if (profileDoc.exists()) {
            setUserProfile(profileDoc.data() as UserProfile);
          } else {
            // Check for pre-authorized profile by email (migration/authorization logic)
            const emailId = user.email?.replace(/[@.]/g, '_');
            const preAuthDoc = emailId ? await getDoc(doc(db, 'users', emailId)) : null;

            if (preAuthDoc?.exists()) {
              const data = preAuthDoc.data();
              const migratedProfile = { 
                ...data, 
                uid: user.uid,
                metadata: { ...data.metadata, migratedAt: new Date().toISOString() }
              } as UserProfile;
              
              setUserProfile(migratedProfile);
              await setDoc(doc(db, 'users', user.uid), migratedProfile);
            } else {
              const masterEmails = ['sparkodon61@gmail.com', 'info.dar.arkbytes@gmail.com', 'uche@darark.com'];
              const masterUids = ['VyWco6tQmGQDM5xq7N0SbOntJmv1', 'emBwTzHyq2WAqqVzQe3s5HfIWmr1'];
              const isMasterAdmin = masterUids.includes(user.uid) || (user.email && masterEmails.includes(user.email));
              
              const newProfile: UserProfile = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || 'User',
                role: isMasterAdmin ? 'super-admin' : 'teacher', 
                metadata: { firstLogin: new Date().toISOString() }
              };
              setUserProfile(newProfile);
              await setDoc(doc(db, 'users', user.uid), newProfile);
            }
          }
        } catch (error) {
          console.error("Auth profile fetch error:", error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    // Speed-optimized safety timeout
    const safetyTimer = setTimeout(() => setLoading(false), 1200);

    return () => {
      unsubscribe();
      clearTimeout(safetyTimer);
    };
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const login = async (username: string, pass: string, schoolId?: string) => {
    // If it's a pure username (no @), convert to dummy email for Firebase
    const loginIdentifier = username.includes('@') ? username : `${username}@darark.com`;
    const userCredential = await signInWithEmailAndPassword(auth, loginIdentifier, pass);
    
    // If a specific school was requested, store it for the session
    if (schoolId) {
      localStorage.setItem('impersonated_school_id', schoolId);
    }
    
    return userCredential;
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, login, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
