import { FlatList, StyleProp, ViewStyle, Text, View } from "react-native";

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
      contentContainerStyle={{ paddingHorizontal: 20, gap: 12, flexGrow: 1 }}
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NotificationCard notification={item} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 14, color: "#9CA3AF" }}>
            No notifications yet
          </Text>
        </View>
      }
    />
  );
}
