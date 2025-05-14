import { Task, SortingOption } from "@/lib/types";

// Strategy Pattern implementation
export class TaskSortingStrategy {
  // Sort by creation date (newest first)
  static sortByDate(tasks: Task[]): Task[] {
    return [...tasks].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Sort by due date (for timed tasks)
  static sortByDueDate(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      // Put timed tasks first
      if (a.type === "timed" && b.type !== "timed") return -1;
      if (a.type !== "timed" && b.type === "timed") return 1;

      // Sort timed tasks by due date
      if (a.type === "timed" && b.type === "timed") {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }

      // Fall back to creation date for non-timed tasks
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  // Sort by name (alphabetically)
  static sortByName(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }

  // Sort by ID
  static sortById(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.id.localeCompare(b.id));
  }

  // Sort by completion status (incomplete first)
  static sortByCompletion(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) {
        // If completion status is the same, sort by creation date
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.completed ? 1 : -1; // Incomplete tasks first
    });
  }

  // Apply sort based on strategy name
  static applySort(tasks: Task[], strategy: SortingOption): Task[] {
    switch (strategy) {
      case "date":
        return this.sortByDate(tasks);
      case "name":
        return this.sortByName(tasks);
      case "id":
        return this.sortById(tasks);
      default:
        return tasks;
    }
  }
}
