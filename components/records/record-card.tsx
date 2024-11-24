"use client";

import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { FileText, File, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecordCardProps {
  record: {
    id: string;
    title: string;
    description?: string;
    tags: string[];
    customFields: { key: string; value: string }[];
    file?: {
      name: string;
      type: string;
      url: string;
    };
    createdBy: {
      email: string;
      name?: string;
    };
    modifiedBy?: {
      email: string;
      name?: string;
    };
    createdAt: string;
    modifiedAt?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RecordCard({ record, onEdit, onDelete }: RecordCardProps) {
  const FileIcon = record.file ? FileText : File;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="record-card"
    >
      <Card className="p-4 glassmorphism transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${record.file ? 'bg-primary/20' : 'bg-muted'}`}>
              <FileIcon className={`h-5 w-5 ${record.file ? 'text-primary' : ''}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{record.title}</h3>
              {record.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {record.description}
                </p>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit(record.id)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(record.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {record.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {record.customFields.length > 0 && (
          <div className="mt-3 space-y-1">
            {record.customFields.map(({ key, value }, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium text-foreground">{key}:</span>{" "}
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-border/50 text-xs space-y-1">
          <p className="text-muted-foreground">
            Created by{" "}
            <span className="text-foreground font-medium">
              {record.createdBy.name || record.createdBy.email}
            </span>
          </p>
          <p className="text-muted-foreground">
            Created{" "}
            <span className="text-foreground">
              {formatDistanceToNow(new Date(record.createdAt))}
            </span>{" "}
            ago
          </p>
          {record.modifiedAt && (
            <p className="text-muted-foreground">
              Modified by{" "}
              <span className="text-foreground font-medium">
                {record.modifiedBy?.name || record.modifiedBy?.email}
              </span>{" "}
              <span className="text-foreground">
                {formatDistanceToNow(new Date(record.modifiedAt))}
              </span>{" "}
              ago
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}