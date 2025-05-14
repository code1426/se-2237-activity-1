import { TimedTask as TimedTaskType } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash, Clock, AlertCircle } from "lucide-react";
import { format, formatDistanceToNow, isPast, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { TaskManager } from "@/lib/patterns/TaskManager";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Decorator Pattern implementation - adds due date functionality
interface TimedTaskProps {
  task: TimedTaskType;
}

export function TimedTask({ task }: TimedTaskProps) {
  const handleToggleComplete = () => {
    TaskManager.toggleTaskComplete(task.id);
  };

  const handleRemove = () => {
    TaskManager.removeTask(task.id);
  };

  const isOverdue = isPast(task.dueDate) && !task.completed;
  const isDueToday = isToday(task.dueDate) && !task.completed;

  // Get status color
  const getStatusColor = () => {
    if (task.completed) return "text-muted-foreground";
    if (isOverdue) return "text-destructive";
    if (isDueToday) return "text-orange-500";
    return "text-primary";
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        task.completed ? "opacity-70" : "",
        isOverdue && !task.completed ? "border-destructive" : ""
      )}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
          />
          <div className="flex-1">
            {/* Title section with reminder decorator */}
            <div className="flex justify-between items-start">
              <h3
                className={cn(
                  "font-medium text-lg transition-all",
                  task.completed ? "line-through text-muted-foreground" : ""
                )}
              >
                {task.title}
              </h3>

              {/* Decorator Pattern - Reminder Icon */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Clock className={cn("h-4 w-4", getStatusColor())} />
                    {isOverdue && !task.completed && (
                      <AlertCircle className="h-4 w-4 text-destructive animate-pulse" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isOverdue
                      ? "Overdue!"
                      : isDueToday
                        ? "Due today!"
                        : `Due ${format(task.dueDate, "MMM d, yyyy")}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {task.description && (
              <p className="text-muted-foreground text-sm mt-1">
                {task.description}
              </p>
            )}

            {/* Due date information */}
            <div
              className={cn(
                "text-sm mt-2 flex items-center gap-1",
                getStatusColor()
              )}
            >
              Due: {format(task.dueDate, "MMM d, yyyy")}
              <span className="text-xs">
                ({formatDistanceToNow(task.dueDate, { addSuffix: true })})
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          Created {formatDistanceToNow(task.createdAt, { addSuffix: true })}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="h-8 w-8"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
