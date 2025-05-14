// Task related types
export interface BaseTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface BasicTask extends BaseTask {
  type: "basic";
}

export interface TimedTask extends BaseTask {
  type: "timed";
  dueDate: Date;
}

export interface ChecklistTask extends BaseTask {
  type: "checklist";
  items: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

export type Task = BasicTask | TimedTask | ChecklistTask;

// Sorting types
export type SortingOption = "date" | "name" | "id";

// Notification types
export interface Notification {
  id: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  duration?: number;
}
