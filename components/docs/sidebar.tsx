"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Authentication", href: "/docs/auth" },
    ],
  },
  {
    title: "Features",
    items: [
      { title: "Search", href: "/docs/search" },
      { title: "Records", href: "/docs/records" },
      { title: "Tags", href: "/docs/tags" },
      { title: "Custom Fields", href: "/docs/custom-fields" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Overview", href: "/docs/api" },
      { title: "Authentication", href: "/docs/api/auth" },
      { title: "Records", href: "/docs/api/records" },
      { title: "Search", href: "/docs/api/search" },
    ],
  },
];

interface DocsSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DocsSidebar({ isOpen, onToggle }: DocsSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <motion.div
      className="fixed left-0 top-0 h-screen bg-background"
      initial={false}
      animate={{
        width: isOpen ? "280px" : "0",
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {isOpen && (
        <div className="h-full flex flex-col">
          <div className="p-6 mt-14">
            <h2 className="text-2xl font-bold">Documentation</h2>
          </div>
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-8">
              {navigation.map((section) => (
                <div
                  key={section.title}
                  className="bg-card/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full text-sm font-semibold text-muted-foreground hover:text-foreground p-3"
                  >
                    {section.title}
                    <motion.div
                      initial={false}
                      animate={{ rotate: expandedSections.includes(section.title) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedSections.includes(section.title) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-2 pb-2">
                          {section.items.map((item) => (
                            <motion.div
                              key={item.href}
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <button
                                onClick={() => handleNavigation(item.href)}
                                className={cn(
                                  "w-full text-left py-1.5 px-3 text-sm rounded-md transition-colors duration-200",
                                  pathname === item.href
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                              >
                                {item.title}
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </motion.div>
  );
}