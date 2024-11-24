"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { RecordDialog } from "@/components/records/record-dialog";
import {
  User,
  Upload,
  Book,
  Sun,
  Moon,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SideMenu({ open, onClose }: SideMenuProps) {
  const { theme, setTheme } = useTheme();
  const { user, signOut, isGuest } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  const handleUploadSubmit = async (data: any) => {
    try {
      console.log("Uploading record:", data);
      toast({
        title: "Success",
        description: "Record uploaded successfully",
      });
      setIsUploadDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload record",
      });
    }
  };

  const handleDocsClick = () => {
    router.push('/docs');
    onClose();
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (isGuest) return "G";
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (isGuest) return "Guest User";
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    return user?.email?.split('@')[0] || "User";
  };

  const menuItems = [
    {
      icon: (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url} 
                  alt={getDisplayName()} 
                />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              {isGuest && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" side="right">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url} 
                  alt={getDisplayName()} 
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">{getDisplayName()}</h4>
                <p className="text-sm text-muted-foreground">
                  {isGuest ? "Guest Account" : user?.email}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            {isGuest && (
              <div className="mb-4 p-3 bg-destructive/10 rounded-lg">
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Limited functionality in guest mode
                </p>
              </div>
            )}

            <Button
              variant="destructive"
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isGuest ? "Exit Guest Mode" : "Sign Out"}
            </Button>
          </PopoverContent>
        </Popover>
      ),
    },
    {
      icon: (
        <Button
          variant="ghost"
          size="icon"
          disabled={isGuest}
          onClick={() => setIsUploadDialogOpen(true)}
        >
          <Upload className="h-5 w-5" />
        </Button>
      ),
    },
    {
      icon: (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDocsClick}
        >
          <Book className="h-5 w-5" />
        </Button>
      ),
    },
    {
      icon: (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      ),
    },
  ];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 flex flex-col gap-2"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism rounded-full"
              >
                {item.icon}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <RecordDialog
        mode="create"
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onSubmit={handleUploadSubmit}
      />
    </>
  );
}