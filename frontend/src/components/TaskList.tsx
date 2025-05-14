import { useState, useEffect } from "react";
import { Task, SortingOption } from "@/lib/types";
import { TaskFactory } from "@/components/TaskFactory";
import { TaskSortingStrategy } from "@/lib/patterns/TaskSortingStrategy";
import { TaskManager } from "@/lib/patterns/TaskManager";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowDownAZ, ArrowUpToLine, SortAsc, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const [sortOption, setSortOption] = useState<SortingOption>("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  // Subscribe to task changes
  useEffect(() => {
    const unsubscribe = TaskManager.subscribe((newTasks) => {
      setTasks(newTasks);
    });

    return unsubscribe;
  }, []);

  // Apply sorting and filtering
  useEffect(() => {
    let filteredTasks = tasks;

    // Apply search filter
    if (searchQuery) {
      filteredTasks = TaskManager.searchTasks(searchQuery);
    }

    // Apply completed filter
    if (!showCompleted) {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    // Apply sorting
    const sorted = TaskSortingStrategy.applySort(filteredTasks, sortOption);
    setSortedTasks(sorted);
  }, [tasks, sortOption, searchQuery, showCompleted]);

  // Get sorting icon
  const getSortingIcon = () => {
    switch (sortOption) {
      case "date":
        return <ArrowUpToLine className="h-4 w-4" />;
      case "name":
        return <ArrowDownAZ className="h-4 w-4" />;
      case "id":
        return <SortAsc className="h-4 w-4" />;
      default:
        return <ArrowUpToLine className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          <Select
            value={sortOption}
            onValueChange={(value: string) =>
              setSortOption(value as SortingOption)
            }
          >
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                {getSortingIcon()}
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Created</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="id">ID</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setShowCompleted(!showCompleted)}
            className={cn(showCompleted ? "bg-primary/10" : "")}
          >
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => <TaskFactory key={task.id} task={task} />)
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery
              ? "No matching tasks found."
              : "No tasks yet. Add a task to get started!"}
          </div>
        )}
      </div>
    </div>
  );
}
