"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface LogoProps {
  isSearchFocused: boolean;
  className?: string;
}

export function Logo({ isSearchFocused, className = "" }: LogoProps) {
  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isSearchFocused ? 0.8 : 1,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        animate={{
          rotate: isSearchFocused ? [0, 360] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <Terminal className="h-8 w-8 text-primary" />
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-lg"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      <motion.span
        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
        animate={{
          opacity: isSearchFocused ? 0 : 1,
          x: isSearchFocused ? -20 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        NotaBox
      </motion.span>
    </motion.div>
  );
}