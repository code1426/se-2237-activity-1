import { useState } from "react";
import { ChecklistTask as ChecklistTaskType } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Check, Plus, ListChecks, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { TaskManager } from "@/lib/patterns/TaskManager";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ChecklistTaskProps {
  task: ChecklistTaskType;
}

export function ChecklistTask({ task }: ChecklistTaskProps) {
  const [newItemText, setNewItemText] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const progress = task.items.length
    ? Math.round(
        (task.items.filter((item) => item.completed).length /
          task.items.length) *
          100
      )
    : 0;

  const handleToggleComplete = () => {
    TaskManager.toggleTaskComplete(task.id);
  };

  const handleRemove = () => {
    TaskManager.removeTask(task.id);
  };

  const handleToggleItem = (itemId: string) => {
    const updatedTask: ChecklistTaskType = {
      ...task,
      items: task.items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    };
    TaskManager.updateTask(updatedTask);
  };

  const handleAddItem = () => {
    if (newItemText.trim()) {
      const updatedTask: ChecklistTaskType = {
        ...task,
        items: [
          ...task.items,
          {
            id: crypto.randomUUID(),
            text: newItemText.trim(),
            completed: false,
          },
        ],
      };
      TaskManager.updateTask(updatedTask);
      setNewItemText("");
      setIsAddingItem(false);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedTask: ChecklistTaskType = {
      ...task,
      items: task.items.filter((item) => item.id !== itemId),
    };
    TaskManager.updateTask(updatedTask);
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        task.completed ? "opacity-70" : ""
      )}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={handleToggleComplete}
                  className="mt-1"
                  aria-label={
                    task.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {task.completed ? "Mark as incomplete" : "Mark as complete"}
            </TooltipContent>
          </Tooltip>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3
                className={cn(
                  "font-medium text-lg transition-all",
                  task.completed ? "line-through text-muted-foreground" : ""
                )}
              >
                {task.title}
              </h3>
              <ListChecks className="h-4 w-4 text-primary" />
            </div>

            {task.description && (
              <p className="text-muted-foreground text-sm mt-1">
                {task.description}
              </p>
            )}

            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <Progress value={progress} className="h-2" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {progress}%
                </span>
              </div>

              <ul className="space-y-2 mt-3">
                {task.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => handleToggleItem(item.id)}
                            disabled={task.completed}
                            aria-label={
                              item.completed
                                ? "Mark item as incomplete"
                                : "Mark item as complete"
                            }
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {item.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"}
                      </TooltipContent>
                    </Tooltip>
                    <span
                      className={cn(
                        "flex-1 text-sm",
                        item.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      )}
                    >
                      {item.text}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={task.completed}
                          aria-label="Remove item"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Remove item</TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>

              {isAddingItem ? (
                <div className="flex gap-2 mt-3">
                  <Input
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="New item"
                    className="text-sm h-8"
                    disabled={task.completed}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddItem}
                    disabled={task.completed || !newItemText.trim()}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsAddingItem(false)}
                    disabled={task.completed}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => setIsAddingItem(true)}
                  disabled={task.completed}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          Created {formatDistanceToNow(task.createdAt, { addSuffix: true })}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete task</TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
