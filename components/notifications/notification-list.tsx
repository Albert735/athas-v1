import { FlatList, StyleProp, ViewStyle, Text, View } from "react-native";

import type { Notification } from "@/api/types/notification";
import { NotificationCard } from "./notification-card";

/**
 * NotificationList Component Props
 */
interface Props {
  /** Array of notification objects */
  notifications: Notification[];
  /** Pull-to-refresh active loading status */
  refreshing: boolean;
  /** Handler callback when pull-to-refresh is triggered */
  onRefresh: () => void;
  /** Optional container style overrides */
  style?: StyleProp<ViewStyle>;
}

/**
 * NotificationList Component
 *
 * Renders a scrollable list of notifications with pull-to-refresh capabilities
 * and an empty state placeholder.
 */
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
