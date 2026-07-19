import {
  AlertTriangle,
  Settings,
  ShieldCheck,
  Bell,
  Clock,
} from "lucide-react-native";

import type { NotificationType } from "@/api/types/notification";

interface Props {
  type: NotificationType;
}

export function NotificationIcon({ type }: Props) {
  switch (type) {
    case "warning":
      return <AlertTriangle size={24} />;

    case "security":
      return <ShieldCheck size={24} />;

    case "system":
      return <Settings size={24} />;

    case "reminder":
      return <Clock size={24} />;

    default:
      return <Bell size={24} />;
  }
}
