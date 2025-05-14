import { Task } from "@/lib/types";

// Define the API response interface
interface ApiTask {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  due_date?: string;
  task_type: string;
  checklist_items?: Array<{
    id: string;
    content: string;
    is_completed: boolean;
  }>;
}

// Adapter Pattern implementation
export class TaskAdapter {
  // Convert API format to application format
  static fromApiFormat(apiTask: ApiTask): Task {
    const baseTask = {
      id: apiTask.id,
      title: apiTask.title,
      description: apiTask.description,
      completed: apiTask.is_completed,
      createdAt: new Date(apiTask.created_at),
    };

    switch (apiTask.task_type) {
      case "basic":
        return {
          ...baseTask,
          type: "basic",
        };
      case "timed":
        return {
          ...baseTask,
          type: "timed",
          dueDate: apiTask.due_date ? new Date(apiTask.due_date) : new Date(),
        };
      case "checklist":
        return {
          ...baseTask,
          type: "checklist",
          items:
            apiTask.checklist_items?.map((item) => ({
              id: item.id,
              text: item.content,
              completed: item.is_completed,
            })) || [],
        };
      default:
        return {
          ...baseTask,
          type: "basic",
        };
    }
  }

  // Convert application format to API format
  static toApiFormat(task: Task): ApiTask {
    const baseApiTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      is_completed: task.completed,
      created_at: task.createdAt.toISOString(),
      task_type: task.type,
    };

    switch (task.type) {
      case "timed":
        return {
          ...baseApiTask,
          due_date: task.dueDate.toISOString(),
        };
      case "checklist":
        return {
          ...baseApiTask,
          checklist_items: task.items.map((item) => ({
            id: item.id,
            content: item.text,
            is_completed: item.completed,
          })),
        };
      default:
        return baseApiTask;
    }
  }

  // Convert a list of API tasks to application tasks
  static fromApiFormatList(apiTasks: ApiTask[]): Task[] {
    return apiTasks.map(this.fromApiFormat);
  }

  // Mock API data for demonstration
  static getMockData(): Task[] {
    const mockApiTasks: ApiTask[] = [
      {
        id: "1",
        title: "Complete project documentation",
        description:
          "Finish writing the technical documentation for the project",
        is_completed: false,
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        task_type: "basic",
      },
      {
        id: "2",
        title: "Team meeting",
        description: "Weekly team sync",
        is_completed: false,
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        due_date: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        task_type: "timed",
      },
      {
        id: "3",
        title: "Shopping list",
        description: "Items to buy for the weekend",
        is_completed: false,
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        task_type: "checklist",
        checklist_items: [
          { id: "c1", content: "Milk", is_completed: true },
          { id: "c2", content: "Eggs", is_completed: false },
          { id: "c3", content: "Bread", is_completed: false },
        ],
      },
      {
        id: "4",
        title: "Prepare presentation",
        description: "Create slides for the client presentation",
        is_completed: false,
        created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        due_date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago (overdue)
        task_type: "timed",
      },
    ];

    return this.fromApiFormatList(mockApiTasks);
  }
}
