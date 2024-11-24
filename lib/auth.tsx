"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInAsGuest: () => void;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setUser(session?.user ?? null);
            setIsGuest(false);
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    router.push('/');
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    if (isGuest) {
      setIsGuest(false);
      router.push('/auth');
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push('/auth');
  };

  const signInAsGuest = () => {
    setIsGuest(true);
    router.push('/');
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInAsGuest,
        isGuest,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}