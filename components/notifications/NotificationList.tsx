import { FlatList, StyleProp, ViewStyle } from "react-native";

import type { Notification } from "@/api/types/notification";
import { NotificationCard } from "./NotificationCard";

interface Props {
  notifications: Notification[];
  refreshing: boolean;
  onRefresh: () => void;
  style?: StyleProp<ViewStyle>;
}

export function NotificationList({
  notifications,
  refreshing,
  onRefresh,
  style,
}: Props) {
  return (
    <FlatList
      style={style}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NotificationCard notification={item} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}
