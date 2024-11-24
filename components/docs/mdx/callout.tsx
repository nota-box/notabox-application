import { cn } from "@/lib/utils";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";

interface CalloutProps {
  type?: "default" | "warning" | "info" | "success";
  children: React.ReactNode;
}

const icons = {
  default: Info,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

export function Callout({
  children,
  type = "default",
  ...props
}: CalloutProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "my-6 flex items-start rounded-lg border border-l-4 p-4",
        {
          "border-red-900 bg-red-50 dark:bg-red-950/30": type === "warning",
          "border-blue-900 bg-blue-50 dark:bg-blue-950/30": type === "info",
          "border-green-900 bg-green-50 dark:bg-green-950/30": type === "success",
          "border-neutral-900 bg-neutral-50 dark:bg-neutral-950/30": type === "default",
        }
      )}
      {...props}
    >
      <Icon className="h-5 w-5 mr-3 mt-1" />
      <div>{children}</div>
    </div>
  );
}