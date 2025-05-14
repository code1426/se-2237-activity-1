import { BasicTask as BasicTaskType } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { TaskManager } from "@/lib/patterns/TaskManager";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface BasicTaskProps {
  task: BasicTaskType;
}

export function BasicTask({ task }: BasicTaskProps) {
  const handleToggleComplete = () => {
    TaskManager.toggleTaskComplete(task.id);
  };

  const handleRemove = () => {
    TaskManager.removeTask(task.id);
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
            <h3
              className={cn(
                "font-medium text-lg transition-all",
                task.completed ? "line-through text-muted-foreground" : ""
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-muted-foreground text-sm mt-1">
                {task.description}
              </p>
            )}
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
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
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
