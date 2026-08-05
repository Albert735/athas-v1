import {
  AlertTriangle,
  Settings,
  ShieldCheck,
  Bell,
  Clock,
} from "lucide-react-native";

import type { NotificationType } from "@/api/types/notification";

/**
 * NotificationIcon Component Props
 */
interface Props {
  /** The type category of notification */
  type: NotificationType;
}

/**
 * NotificationIcon Component
 *
 * Renders the appropriate colored icon based on the notification type
 * (warning, security, system, reminder, or default bell).
 */
export function NotificationIcon({ type }: Props) {
  switch (type) {
    case "warning":
      return <AlertTriangle size={20} color="#F59E0B" />;

    case "security":
      return <ShieldCheck size={20} color="#3B82F6" />;

    case "system":
      return <Settings size={20} color="#6B7280" />;

    case "reminder":
      return <Clock size={20} color="#8B5CF6" />;

    default:
      return <Bell size={20} color="#111827" />;
  }
}
