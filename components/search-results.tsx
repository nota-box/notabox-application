"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RecordCard } from "@/components/records/record-card";
import { RecordDialog } from "@/components/records/record-dialog";
import { useToast } from "@/components/ui/use-toast";

const mockRecords = [
  {
    id: "1",
    title: "Project Documentation",
    description: "Contains all relevant project details and specifications.",
    tags: ["work", "documentation"],
    customFields: [
      { key: "Project ID", value: "PRJ-001" },
      { key: "Status", value: "In Progress" }
    ],
    file: {
      name: "project_plan.pdf",
      type: "application/pdf",
      url: "#"
    },
    createdBy: {
      email: "john.doe@example.com",
      name: "John Doe"
    },
    createdAt: "2024-03-01T10:00:00Z",
    modifiedAt: "2024-03-05T15:30:00Z",
    modifiedBy: {
      email: "jane.smith@example.com",
      name: "Jane Smith"
    }
  },
  {
    id: "2",
    title: "Team Meeting Notes",
    description: "Notes from the weekly team sync meeting discussing Q1 goals and project timelines.",
    tags: ["meeting", "team", "important"],
    customFields: [
      { key: "Meeting Date", value: "2024-03-01" },
      { key: "Attendees", value: "8" }
    ],
    createdBy: {
      email: "jane.smith@example.com",
      name: "Jane Smith"
    },
    createdAt: "2024-03-01T14:00:00Z"
  },
  {
    id: "3",
    title: "Product Design Assets",
    description: "UI/UX design files for the new mobile application interface.",
    tags: ["design", "media", "work"],
    customFields: [
      { key: "Design System", value: "Material 3.0" },
      { key: "Version", value: "2.1.0" }
    ],
    file: {
      name: "mobile_designs.fig",
      type: "application/figma",
      url: "#"
    },
    createdBy: {
      email: "sarah.parker@example.com",
      name: "Sarah Parker"
    },
    createdAt: "2024-03-02T09:15:00Z"
  },
  {
    id: "4",
    title: "Research Data Analysis",
    description: "Comprehensive analysis of user behavior patterns and market trends.",
    tags: ["research", "data", "important"],
    customFields: [
      { key: "Data Period", value: "Q4 2023" },
      { key: "Sample Size", value: "1,500" }
    ],
    file: {
      name: "analysis_report.xlsx",
      type: "application/excel",
      url: "#"
    },
    createdBy: {
      email: "mike.ross@example.com",
      name: "Mike Ross"
    },
    createdAt: "2024-03-03T11:30:00Z",
    modifiedAt: "2024-03-04T16:45:00Z",
    modifiedBy: {
      email: "mike.ross@example.com",
      name: "Mike Ross"
    }
  },
  {
    id: "5",
    title: "Client Presentation",
    description: "Final presentation for the Q1 client review meeting.",
    tags: ["client", "presentation", "work"],
    customFields: [
      { key: "Client", value: "TechCorp Inc." },
      { key: "Meeting Date", value: "2024-03-15" }
    ],
    file: {
      name: "client_presentation.pptx",
      type: "application/powerpoint",
      url: "#"
    },
    createdBy: {
      email: "alex.wong@example.com",
      name: "Alex Wong"
    },
    createdAt: "2024-03-04T13:20:00Z"
  },
  {
    id: "6",
    title: "API Documentation",
    description: "Technical documentation for the new REST API endpoints.",
    tags: ["technical", "documentation", "development"],
    customFields: [
      { key: "Version", value: "v2.0.0" },
      { key: "Status", value: "Published" }
    ],
    file: {
      name: "api_docs.md",
      type: "text/markdown",
      url: "#"
    },
    createdBy: {
      email: "david.chen@example.com",
      name: "David Chen"
    },
    createdAt: "2024-03-05T08:45:00Z"
  },
  {
    id: "7",
    title: "Marketing Campaign Brief",
    description: "Strategy and execution plan for Q2 marketing initiatives.",
    tags: ["marketing", "strategy", "work"],
    customFields: [
      { key: "Campaign ID", value: "MKT-2024-Q2" },
      { key: "Budget", value: "$50,000" }
    ],
    createdBy: {
      email: "emma.wilson@example.com",
      name: "Emma Wilson"
    },
    createdAt: "2024-03-06T10:15:00Z",
    modifiedAt: "2024-03-07T14:20:00Z",
    modifiedBy: {
      email: "emma.wilson@example.com",
      name: "Emma Wilson"
    }
  },
  {
    id: "8",
    title: "Budget Forecast",
    description: "Financial projections and budget allocation for Q2 2024.",
    tags: ["finance", "planning", "confidential"],
    customFields: [
      { key: "Period", value: "Q2 2024" },
      { key: "Department", value: "Operations" }
    ],
    file: {
      name: "budget_forecast.xlsx",
      type: "application/excel",
      url: "#"
    },
    createdBy: {
      email: "robert.johnson@example.com",
      name: "Robert Johnson"
    },
    createdAt: "2024-03-07T09:30:00Z"
  }
];

interface SearchResultsProps {
  query: string;
  filters?: {
    recordTypes: Record<string, boolean>;
    date?: Date;
    selectedTags: Record<string, boolean>;
  };
}

export function SearchResults({ query, filters }: SearchResultsProps) {
  const [records, setRecords] = useState(mockRecords);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = async (id: string) => {
    const record = records.find(r => r.id === id);
    if (record) {
      setEditingRecord(record);
      setIsEditDialogOpen(true);
    }
  };

  const handleEditSubmit = async (data: any) => {
    const updatedRecords = records.map(record =>
      record.id === editingRecord.id
        ? {
            ...record,
            ...data,
            modifiedAt: new Date().toISOString(),
            modifiedBy: {
              email: "current.user@example.com",
              name: "Current User"
            }
          }
        : record
    );
    setRecords(updatedRecords);
    toast({
      title: "Success",
      description: "Record updated successfully",
    });
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
    toast({
      title: "Success",
      description: "Record deleted successfully",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 space-y-4"
    >
      <AnimatePresence>
        {records.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </AnimatePresence>

      <RecordDialog
        mode="edit"
        record={editingRecord}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditSubmit}
      />
    </motion.div>
  );
}