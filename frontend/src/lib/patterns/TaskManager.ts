import {
  Task,
  BasicTask,
  TimedTask,
  ChecklistTask,
  Notification,
} from "@/lib/types";

// Singleton Pattern implementation
class TaskManagerClass {
  private tasks: Task[] = [];
  private listeners: ((tasks: Task[]) => void)[] = [];
  private notificationListeners: ((notification: Notification) => void)[] = [];
  private static instance: TaskManagerClass;

  private constructor() {
    // Private constructor to prevent direct construction calls with the `new` operator
    this.loadTasks();
  }

  public static getInstance(): TaskManagerClass {
    if (!TaskManagerClass.instance) {
      TaskManagerClass.instance = new TaskManagerClass();
    }
    return TaskManagerClass.instance;
  }

  // Subscribe to task changes
  subscribe(callback: (tasks: Task[]) => void): () => void {
    this.listeners.push(callback);
    callback(this.tasks);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  // Subscribe to notifications
  subscribeToNotifications(
    callback: (notification: Notification) => void
  ): () => void {
    this.notificationListeners.push(callback);

    // Return unsubscribe function
    return () => {
      this.notificationListeners = this.notificationListeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  // Notify all listeners
  private notify(): void {
    this.listeners.forEach((listener) => listener([...this.tasks]));
  }

  // Send notification
  notify_notification(notification: Notification): void {
    this.notificationListeners.forEach((listener) => listener(notification));
  }

  // Get all tasks
  getTasks(): Task[] {
    return [...this.tasks];
  }

  // Add a task
  addTask(
    task:
      | Omit<BasicTask, "id" | "createdAt" | "completed">
      | Omit<TimedTask, "id" | "createdAt" | "completed">
      | Omit<ChecklistTask, "id" | "createdAt" | "completed">
  ): void {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completed: false,
    } as Task;

    this.tasks = [...this.tasks, newTask];
    this.saveTasks();
    this.notify();

    // Generate notification
    this.notify_notification({
      id: crypto.randomUUID(),
      message: "Task added successfully",
      type: "success",
    });
  }

  // Update a task
  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveTasks();
    this.notify();

    // Generate notification
    this.notify_notification({
      id: crypto.randomUUID(),
      message: "Task updated successfully",
      type: "info",
    });
  }

  // Remove a task
  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
    this.notify();

    // Generate notification
    this.notify_notification({
      id: crypto.randomUUID(),
      message: "Task removed successfully",
      type: "info",
    });
  }

  // Toggle task completion
  toggleTaskComplete(taskId: string): void {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
    this.notify();
  }

  // Search tasks
  searchTasks(query: string): Task[] {
    if (!query) return this.tasks;

    const lowerQuery = query.toLowerCase();
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description?.toLowerCase().includes(lowerQuery)
    );
  }

  // Check for overdue tasks - Observer pattern implementation
  checkOverdueTasks(): void {
    const now = new Date();

    this.tasks.forEach((task) => {
      if (task.type === "timed" && !task.completed) {
        const dueDate = new Date(task.dueDate);
        if (dueDate < now) {
          this.notify_notification({
            id: task.id,
            message: `Task "${task.title}" is overdue`,
            type: "warning",
          });
        }
      }
    });
  }

  // Local storage operations
  private saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  private loadTasks(): void {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        this.tasks = parsedTasks.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          ...(task.type === "timed" ? { dueDate: new Date(task.dueDate) } : {}),
        }));
      } catch (error) {
        console.error("Failed to load tasks from localStorage:", error);
        this.tasks = [];
      }
    }
  }
}

// Export singleton instance
export const TaskManager = TaskManagerClass.getInstance();
