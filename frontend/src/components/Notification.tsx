import { useEffect } from "react";
import { Notification as NotificationType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

// Observer Pattern implementation
interface NotificationProps {
  notification: NotificationType;
}

export function Notification({ notification }: NotificationProps) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: getNotificationTitle(notification),
      description: notification.message,
      variant: getVariant(notification.type),
      duration: notification.duration || 3000,
    });
  }, [notification, toast]);

  // No direct rendering, we use the toast system
  return null;
}

function getNotificationTitle(notification: NotificationType): string {
  switch (notification.type) {
    case "info":
      return "Information";
    case "success":
      return "Success";
    case "warning":
      return "Warning";
    case "error":
      return "Error";
    default:
      return "Notification";
  }
}

function getVariant(type: NotificationType["type"]): "default" | "destructive" {
  return type === "error" ? "destructive" : "default";
}

// NotificationHandler component to subscribe to TaskManager notifications
export function NotificationHandler() {
  const { toast } = useToast();

  useEffect(() => {
    const handleNotification = (notification: NotificationType) => {
      toast({
        title: getNotificationTitle(notification),
        description: notification.message,
        variant: getVariant(notification.type),
        duration: notification.duration || 3000,
      });
    };

    // Import TaskManager dynamically to avoid circular dependencies
    import("@/lib/patterns/TaskManager").then(({ TaskManager }) => {
      // Subscribe to notifications
      const unsubscribe =
        TaskManager.subscribeToNotifications(handleNotification);

      // Check for overdue tasks initially and every minute
      TaskManager.checkOverdueTasks();
      const interval = setInterval(() => {
        TaskManager.checkOverdueTasks();
      }, 60000);

      return () => {
        unsubscribe();
        clearInterval(interval);
      };
    });
  }, [toast]);

  return null;
}
