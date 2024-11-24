"use client";

import { motion } from "framer-motion";

interface TypingEffectProps {
  text: string;
  className?: string;
  isVisible: boolean;
}

export function TypingEffect({ className = "", isVisible }: TypingEffectProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className={`${className} flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="typing-container main-title">
          <span className="typing-text">
            NotaBox - Smart Data Management
          </span>
        </div>
        <div className="typing-container subtitle">
          <span className="typing-text">
            Your team's knowledge base, organized and accessible
          </span>
        </div>
      </div>
    </motion.div>
  );
}