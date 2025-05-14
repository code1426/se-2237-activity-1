import { useState, useEffect } from "react";
import { TaskManager } from "@/lib/patterns/TaskManager";
import { TaskAdapter } from "@/lib/patterns/TaskAdapter";

// Decide whether to use mock data or fetch from API
const USE_MOCK_DATA = true;

export function useTasks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load initial data
    const loadTasks = async () => {
      try {
        setLoading(true);

        if (USE_MOCK_DATA) {
          // Use mock data
          const mockData = TaskAdapter.getMockData();

          // Add mock tasks to TaskManager
          setTimeout(() => {
            mockData.forEach((task) => {
              // Skip if already in localStorage
              if (!TaskManager.getTasks().some((t) => t.id === task.id)) {
                // Task is already in the correct format for updateTask
                TaskManager.updateTask(task);
              }
            });

            setLoading(false);
          }, 500); // Simulate network delay
        } else {
          // Fetch from an API
          const response = await fetch("http://localhost:5000/tasks");

          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }

          const data = await response.json();
          const tasks = TaskAdapter.fromApiFormatList(data);

          // Add tasks to TaskManager
          tasks.forEach((task) => {
            TaskManager.updateTask(task);
          });

          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading tasks:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return { loading, error };
}
