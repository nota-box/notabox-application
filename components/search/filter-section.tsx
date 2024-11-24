"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterSectionProps {
  recordTypes: Record<string, boolean>;
  setRecordTypes: (types: Record<string, boolean>) => void;
  date?: Date;
  setDate: (date?: Date) => void;
  selectedTags: Record<string, boolean>;
  setSelectedTags: (tags: Record<string, boolean>) => void;
  onClose: () => void;
}

export function FilterSection({
  recordTypes,
  setRecordTypes,
  date,
  setDate,
  selectedTags,
  setSelectedTags,
  onClose,
}: FilterSectionProps) {
  const handleRecordTypeChange = (type: string) => {
    setRecordTypes({ ...recordTypes, [type]: !recordTypes[type] });
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags({ ...selectedTags, [tag]: !selectedTags[tag] });
  };

  const handleReset = () => {
    setRecordTypes({ documents: true, notes: true, media: true });
    setDate(undefined);
    setSelectedTags({
      work: false,
      personal: false,
      important: false,
      archived: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      className="filter-section"
    >
      <div className="p-6 space-y-6">
        <div>
          <h4 className="font-medium mb-3">Record Type</h4>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(recordTypes).map(([type, checked]) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={checked}
                  onCheckedChange={() => handleRecordTypeChange(type)}
                />
                <Label htmlFor={type} className="capitalize">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-3">Date Added</h4>
          <div className="grid gap-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              onClick={() => setDate(date ? undefined : new Date())}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
            <motion.div
              initial={false}
              animate={{ height: date ? "auto" : 0, opacity: date ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {date && (
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              )}
            </motion.div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-3">Tags</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(selectedTags).map(([tag, checked]) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={checked}
                  onCheckedChange={() => handleTagChange(tag)}
                />
                <Label htmlFor={tag} className="capitalize">
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            onClick={handleReset}
            size="sm"
          >
            Reset Filters
          </Button>
          <Button
            onClick={onClose}
            size="sm"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </motion.div>
  );
}