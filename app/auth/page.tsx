"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  const { user, isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user || isGuest) {
      router.push("/");
    }
  }, [user, isGuest, router]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="tubelight-effect absolute inset-0 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glassmorphism p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to NotaBox</h1>
          <AuthForm />
        </div>
      </motion.div>
    </main>
  );
}