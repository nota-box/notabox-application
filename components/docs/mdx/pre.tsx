"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

interface PreProps {
  children: React.ReactNode;
  className?: string;
}

export function Pre({ children, className }: PreProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (typeof children === "string") {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <pre className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4",
        className
      )}>
        {children}
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onCopy}
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );
}