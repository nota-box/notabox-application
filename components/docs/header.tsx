import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/docs/theme-toggle";

interface DocsHeaderProps {
  onMenuClick: () => void;
}

export function DocsHeader({ onMenuClick }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mt-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 hover:bg-primary/10"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1" />
        <ThemeToggle />
      </div>
    </header>
  );
}