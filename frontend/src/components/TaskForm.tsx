import React, { useState } from "react";
import { TaskManager } from "@/lib/patterns/TaskManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  ClipboardList,
  Clock,
  CheckSquare,
  Plus,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export function TaskForm() {
  const [taskType, setTaskType] = useState<"basic" | "timed" | "checklist">(
    "basic"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);
  const [checklistItems, setChecklistItems] = useState<string[]>([""]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(undefined);
    setTaskType("basic");
    setIsCreating(false);
    setChecklistItems([""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    switch (taskType) {
      case "basic":
        TaskManager.addTask({
          type: "basic",
          title: title.trim(),
          description: description.trim() || undefined,
        });
        break;
      case "timed":
        if (!dueDate) return;
        TaskManager.addTask({
          type: "timed",
          title: title.trim(),
          description: description.trim() || undefined,
          dueDate,
        });
        break;
      case "checklist": {
        const validItems = checklistItems
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        if (validItems.length === 0) return;

        TaskManager.addTask({
          type: "checklist",
          title: title.trim(),
          description: description.trim() || undefined,
          items: validItems.map((text) => ({
            id: crypto.randomUUID(),
            text,
            completed: false,
          })),
        });
        break;
      }
    }

    resetForm();
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, ""]);
  };

  const handleRemoveChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  const handleChecklistItemChange = (index: number, value: string) => {
    const newItems = [...checklistItems];
    newItems[index] = value;
    setChecklistItems(newItems);
  };

  return (
    <>
      {isCreating ? (
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <form onSubmit={handleSubmit}>
            <Tabs
              value={taskType}
              onValueChange={(v: string) =>
                setTaskType(v as "basic" | "timed" | "checklist")
              }
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic" className="flex items-center gap-1">
                  <CheckSquare className="h-4 w-4" />
                  Basic
                </TabsTrigger>
                <TabsTrigger value="timed" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Timed
                </TabsTrigger>
                <TabsTrigger
                  value="checklist"
                  className="flex items-center gap-1"
                >
                  <ClipboardList className="h-4 w-4" />
                  Checklist
                </TabsTrigger>
              </TabsList>

              <div className="space-y-3">
                <Input
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <Textarea
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />

                {taskType === "timed" && (
                  <div className="flex flex-col space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !dueDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? format(dueDate, "PPP") : "Select due date"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {taskType === "checklist" && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Checklist Items</div>
                    {checklistItems.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Item ${index + 1}`}
                          value={item}
                          onChange={(e) =>
                            handleChecklistItemChange(index, e.target.value)
                          }
                          className="flex-1"
                        />
                        {checklistItems.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveChecklistItem(index)}
                            className="h-10 w-10 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddChecklistItem}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                )}
              </div>
            </Tabs>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  !title.trim() ||
                  (taskType === "timed" && !dueDate) ||
                  (taskType === "checklist" &&
                    !checklistItems.some((item) => item.trim()))
                }
              >
                Create Task
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button onClick={() => setIsCreating(true)} className="w-full">
          Create New Task
        </Button>
      )}
    </>
  );
}
