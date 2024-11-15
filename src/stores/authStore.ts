import { create } from 'zustand';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Set up auth state listener
  supabase.auth.onAuthStateChange((event, session) => {
    set({ user: session?.user ?? null, isLoading: false });
  });

  return {
    user: null,
    isLoading: true,
    error: null,

    signInWithEmail: async (email: string, password: string) => {
      try {
        set({ isLoading: true, error: null });
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Successfully signed in');
      } catch (error) {
        const message = error instanceof AuthError ? error.message : 'Failed to sign in';
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    signUpWithEmail: async (email: string, password: string, name: string) => {
      try {
        set({ isLoading: true, error: null });
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });
        
        if (signUpError) throw signUpError;
        toast.success('Registration successful! Please check your email to verify your account.');
      } catch (error) {
        const message = error instanceof AuthError ? error.message : 'Failed to register';
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    signInWithGoogle: async () => {
      try {
        set({ isLoading: true, error: null });
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
        toast.success('Successfully signed in with Google');
      } catch (error) {
        const message = error instanceof AuthError ? error.message : 'Failed to sign in with Google';
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    signInWithApple: async () => {
      try {
        set({ isLoading: true, error: null });
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'apple',
          options: {
            redirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
        toast.success('Successfully signed in with Apple');
      } catch (error) {
        const message = error instanceof AuthError ? error.message : 'Failed to sign in with Apple';
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    signInAsGuest: async () => {
      try {
        set({ isLoading: true, error: null });
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
        toast.success('Successfully signed in as guest');
      } catch (error) {
        const message = error instanceof AuthError ? error.message : 'Failed to sign in as guest';
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        toast.success('Successfully signed out');
      } catch (error) {
        const message = error instanceof AuthError ? error.message : 'Failed to sign out';
        toast.error(message);
        set({ error: message });
      }
    },

    clearError: () => set({ error: null })
  };
});