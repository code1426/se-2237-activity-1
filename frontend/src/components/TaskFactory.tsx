import { Task } from "@/lib/types";
import { BasicTask } from "@/components/tasks/BasicTask";
import { TimedTask } from "@/components/tasks/TimedTask";
import { ChecklistTask } from "@/components/tasks/ChecklistTask";

// Factory Pattern implementation
interface TaskFactoryProps {
  task: Task;
}

export function TaskFactory({ task }: TaskFactoryProps) {
  // Render appropriate component based on task type
  switch (task.type) {
    case "basic":
      return <BasicTask task={task} />;
    case "timed":
      return <TimedTask task={task} />;
    case "checklist":
      return <ChecklistTask task={task} />;
    default:
      // TypeScript should catch this, but having a fallback is good practice
      return <div>Unknown task type</div>;
  }
}
