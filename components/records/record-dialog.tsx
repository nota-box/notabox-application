"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Upload, Loader2 } from "lucide-react";
import { z } from "zod";
import { useAuth } from "@/lib/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const recordSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  tags: z.array(z.string()),
  customFields: z.array(z.object({
    key: z.string().min(1, "Key is required"),
    value: z.string().min(1, "Value is required"),
  })),
  file: z.any().optional(),
});

type RecordFormData = z.infer<typeof recordSchema>;

interface RecordDialogProps {
  mode?: 'create' | 'edit';
  record?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: RecordFormData) => Promise<void>;
}

export function RecordDialog({
  mode = 'create',
  record,
  isOpen,
  onOpenChange,
  onSubmit: controlledOnSubmit,
}: RecordDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isGuest } = useAuth();
  const { toast } = useToast();
  const [customFields, setCustomFields] = useState(record?.customFields || [{ key: "", value: "" }]);
  const [tags, setTags] = useState<string[]>(record?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RecordFormData>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      title: record?.title || "",
      description: record?.description || "",
      customFields: record?.customFields || [{ key: "", value: "" }],
      tags: record?.tags || [],
    },
  });

  useEffect(() => {
    if (record) {
      reset({
        title: record.title,
        description: record.description,
        customFields: record.customFields,
        tags: record.tags,
      });
      setTags(record.tags);
      setCustomFields(record.customFields);
    }
  }, [record, reset]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const handleAddCustomField = () => {
    const newFields = [...customFields, { key: "", value: "" }];
    setCustomFields(newFields);
    setValue('customFields', newFields);
  };

  const handleRemoveCustomField = (index: number) => {
    const newFields = customFields.filter((_unused: void, i: number) => i !== index);
    setCustomFields(newFields);
    setValue('customFields', newFields);
  };

  const onSubmitInternal = async (data: RecordFormData) => {
    if (isGuest) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to manage records",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (controlledOnSubmit) {
        await controlledOnSubmit(data);
      } else {
        console.log("Record data:", { ...data, uploader: user?.email });
        toast({
          title: "Success",
          description: `Record ${mode === 'create' ? 'created' : 'updated'} successfully`,
        });
      }
      if (onOpenChange) {
        onOpenChange(false);
      }
      if (!record) {
        reset();
        setTags([]);
        setCustomFields([{ key: "", value: "" }]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${mode === 'create' ? 'create' : 'update'} record`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Record' : 'Edit Record'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitInternal)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Custom Fields</Label>
            {customFields.map((field: any, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Key"
                  {...register(`customFields.${index}.key`)}
                />
                <Input
                  placeholder="Value"
                  {...register(`customFields.${index}.value`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCustomField(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddCustomField}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>

          {mode === 'create' && (
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                {...register("file")}
                className="cursor-pointer"
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'create' ? 'Create' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}