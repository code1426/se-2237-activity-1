import React from 'react';
import { useTasks } from '@/hooks/use-tasks';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';
import { NotificationHandler } from '@/components/Notification';
import { Loader2 } from 'lucide-react';

export function Home() {
  const { loading, error } = useTasks();

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">TaskMaster</h1>
        <p className="text-muted-foreground mt-2">Organize your tasks with ease</p>
      </header>
      
      {/* Notification Observer */}
      <NotificationHandler />
      
      <div className="space-y-6">
        <TaskForm />
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <p>Error loading tasks: {error}</p>
          </div>
        ) : (
          <TaskList />
        )}
      </div>
    </div>
  );
}