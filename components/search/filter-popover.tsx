"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterPopoverProps {
  children: React.ReactNode;
  onFiltersChange: (filters: any) => void;
}

export function FilterPopover({ children, onFiltersChange }: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [recordTypes, setRecordTypes] = useState({
    documents: true,
    notes: true,
    media: true,
  });
  const [date, setDate] = useState<Date>();
  const [selectedTags, setSelectedTags] = useState({
    work: false,
    personal: false,
    important: false,
    archived: false,
  });

  const handleRecordTypeChange = (type: keyof typeof recordTypes) => {
    const newTypes = { ...recordTypes, [type]: !recordTypes[type] };
    setRecordTypes(newTypes);
  };

  const handleTagChange = (tag: keyof typeof selectedTags) => {
    const newTags = { ...selectedTags, [tag]: !selectedTags[tag] };
    setSelectedTags(newTags);
  };

  const handleApplyFilters = () => {
    onFiltersChange({ recordTypes, date, selectedTags });
    setOpen(false);
  };

  const handleReset = () => {
    const resetTypes = { documents: true, notes: true, media: true };
    const resetTags = {
      work: false,
      personal: false,
      important: false,
      archived: false,
    };
    setRecordTypes(resetTypes);
    setDate(undefined);
    setSelectedTags(resetTags);
    onFiltersChange({ recordTypes: resetTypes, date: undefined, selectedTags: resetTags });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Record Type</h4>
            <div className="space-y-2">
              {Object.entries(recordTypes).map(([type, checked]) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={checked}
                    onCheckedChange={() => handleRecordTypeChange(type as keyof typeof recordTypes)}
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
            <h4 className="font-medium mb-2">Date Added</h4>
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={() => setDate(new Date())}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
              {date && (
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Tags</h4>
            <div className="space-y-2">
              {Object.entries(selectedTags).map(([tag, checked]) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag}
                    checked={checked}
                    onCheckedChange={() => handleTagChange(tag as keyof typeof selectedTags)}
                  />
                  <Label htmlFor={tag} className="capitalize">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}