"use client";

import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className }: LinkProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "font-medium underline underline-offset-4 hover:text-primary",
          className
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={cn(
        "font-medium underline underline-offset-4 hover:text-primary",
        className
      )}
    >
      {children}
    </NextLink>
  );
}