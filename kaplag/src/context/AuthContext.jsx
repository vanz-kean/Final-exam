import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const AuthContext = createContext(null);

/**
 * AuthProvider - Manages authentication state across the application
 * Provides: user, login, logout, loading states
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Transform Firebase user to our app's user format
        const appUser = {
          uid: firebaseUser.uid,
          studentNumber: firebaseUser.email?.split('@')[0] || firebaseUser.uid,
          name: firebaseUser.displayName || 'Student',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          program: 'BS Computer Science', // Default, could be fetched from Firestore later
        };
        setUser(appUser);
        // Persist to sessionStorage for backward compatibility
        sessionStorage.setItem('kaplag-session', JSON.stringify(appUser));
      } else {
        setUser(null);
        sessionStorage.removeItem('kaplag-session');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Sign in with Google
   */
  const signInWithGoogle = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // User will be set via onAuthStateChanged
      return { success: true, user: result.user };
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      let errorMessage = 'Failed to sign in with Google. Please try again.';

      // Handle specific error codes
      switch (err.code) {
        case 'auth/popup-blocked':
          errorMessage = 'Pop-up was blocked. Please allow pop-ups for this site and try again.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled. Please try again.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in was cancelled. Please try again.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        default:
          errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Sign in with demo credentials (backward compatibility)
   */
  const signInWithDemo = useCallback(async (studentNumber, password) => {
    setError(null);
    setLoading(true);

    // Demo account validation
    const DEMO_ACCOUNT = {
      studentNumber: '2026-17196',
      password: 'UPMin@2026',
    };

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (studentNumber === DEMO_ACCOUNT.studentNumber && password === DEMO_ACCOUNT.password) {
      const demoUser = {
        uid: 'demo-user',
        studentNumber: DEMO_ACCOUNT.studentNumber,
        name: 'Vanz Kean',
        email: 'vanz.kean@up.edu.ph',
        photoURL: null,
        program: 'BS Computer Science',
        isDemo: true,
      };
      setUser(demoUser);
      sessionStorage.setItem('kaplag-session', JSON.stringify(demoUser));
      setLoading(false);
      return { success: true, user: demoUser };
    } else {
      const errorMessage = 'Invalid student number or password. Try the demo account.';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Sign out
   */
  const logout = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      sessionStorage.removeItem('kaplag-session');
    } catch (err) {
      console.error('Sign-out Error:', err);
      setError('Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithDemo,
    logout,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth - Hook to access authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;