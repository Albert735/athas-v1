import { View, Text, StyleSheet } from "react-native";

interface Props {
  isOpen: boolean;
}

export function BuildingStatusBadge({ isOpen }: Props) {
  return (
    <View
      style={[
        styles.statusBadge,
        isOpen ? styles.statusBadgeOpen : styles.statusBadgeClosed,
      ]}
    >
      <View
        style={[
          styles.statusDot,
          isOpen ? styles.statusDotOpen : styles.statusDotClosed,
        ]}
      />
      <Text
        style={[
          styles.statusText,
          isOpen ? styles.statusTextOpen : styles.statusTextClosed,
        ]}
      >
        {isOpen ? "Open now" : "Closed"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeOpen: { backgroundColor: "#D6FCDB" },
  statusBadgeClosed: { backgroundColor: "#FCE0E0" },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusDotOpen: { backgroundColor: "#1E9E4A" },
  statusDotClosed: { backgroundColor: "#C23B3B" },
  statusText: { fontSize: 12, fontWeight: "600" },
  statusTextOpen: { color: "#146C34" },
  statusTextClosed: { color: "#8A2626" },
});
