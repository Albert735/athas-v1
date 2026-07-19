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
      return <AlertTriangle size={20} />;

    case "security":
      return <ShieldCheck size={20} />;

    case "system":
      return <Settings size={20} />;

    case "reminder":
      return <Clock size={20} />;

    default:
      return <Bell size={20} />;
  }
}
