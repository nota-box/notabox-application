import { create } from 'zustand';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider,
  signInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import toast from 'react-hot-toast';

interface AuthState {
  user: FirebaseUser | null;
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Set up auth state listener
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    set({ user, isLoading: false });
  });

  // Cleanup subscription on store destruction
  window.addEventListener('beforeunload', unsubscribe);

  return {
    user: null,
    isLoading: true,
    error: null,

    signInWithGoogle: async () => {
      try {
        set({ isLoading: true, error: null });
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        toast.success('Successfully signed in with Google');
      } catch (error) {
        const message = import.meta.env.DEV ? 
          'Using demo mode. Set up Firebase config to enable actual authentication.' :
          'Failed to sign in with Google';
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    signInWithApple: async () => {
      try {
        set({ isLoading: true, error: null });
        const provider = new OAuthProvider('apple.com');
        await signInWithPopup(auth, provider);
        toast.success('Successfully signed in with Apple');
      } catch (error) {
        const message = import.meta.env.DEV ? 
          'Using demo mode. Set up Firebase config to enable actual authentication.' :
          'Failed to sign in with Apple';
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    signInAsGuest: async () => {
      try {
        set({ isLoading: true, error: null });
        await signInAnonymously(auth);
        toast.success('Successfully signed in as guest');
      } catch (error) {
        const message = import.meta.env.DEV ? 
          'Using demo mode. Set up Firebase config to enable actual authentication.' :
          'Failed to sign in as guest';
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    signOut: async () => {
      try {
        await firebaseSignOut(auth);
        toast.success('Successfully signed out');
      } catch (error) {
        const message = 'Failed to sign out';
        toast.error(message);
        set({ error: message });
      }
    },

    clearError: () => set({ error: null })
  };
});