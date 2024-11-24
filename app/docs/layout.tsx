"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { DocsSidebar } from "@/components/docs/sidebar";
import { DocsHeader } from "@/components/docs/header";
import { Logo } from "@/components/logo";
import "@/styles/mdx.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <div 
        className="fixed top-4 left-6 z-[60] cursor-pointer"
        onClick={() => router.push('/')}
      >
        <Logo isSearchFocused={false} className="scale-90" />
      </div>
      <DocsSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <motion.div 
        className="flex-1"
        initial={false}
        animate={{
          marginLeft: isSidebarOpen ? "280px" : "0",
          width: isSidebarOpen ? "calc(100% - 280px)" : "100%",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-14">
          <DocsHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="container mx-auto px-8 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </div>
  );
}