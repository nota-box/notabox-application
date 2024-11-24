"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/docs/theme-toggle";

export default function AuthPage() {
  const { user, isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user || isGuest) {
      router.push("/");
    }
  }, [user, isGuest, router]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-8 left-8">
        <Logo isSearchFocused={false} />
      </div>
      
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-lg dark:shadow-primary/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to NotaBox
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to access your notes and documents
            </p>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}