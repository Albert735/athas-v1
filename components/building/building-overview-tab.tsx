import { View, Text, StyleSheet } from "react-native";
import { Clock4, WifiHigh } from "lucide-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColor } from "@/hooks/useColor";

interface Facility {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Props {
  description: string;
  days: string;
  hours: string;
  isOpen: boolean;
  facilities: Facility[];
}

export function BuildingOverviewTab({
  description,
  days,
  hours,
  isOpen,
  facilities,
}: Props) {
  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const iconColor = useColor("icon");

  return (
    <View
      style={{
        gap: 24,
      }}
    >
      <Text style={[styles.description, { color: mutedColor }]}>
        {description}
      </Text>

      <View style={styles.operationalHoursContainer}>
        <Text style={[styles.sectionHeading, { color: textColor }]}>
          Operational Hours
        </Text>
        <Text style={[styles.subText, { color: mutedColor }]}>{days}</Text>
        <View style={styles.operationalHoursInner}>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Clock4 size={20} color={iconColor} />
            <Text style={[styles.subText, { color: mutedColor }]}>
              {isOpen ? "Open Today" : "Closed Today"}
            </Text>
          </View>

          <Text style={[styles.subText, { color: mutedColor }]}>{hours}</Text>
        </View>
      </View>

      <View style={styles.sectionList}>
        {facilities.map((item) => (
          <View
            key={item.id}
            style={[styles.facilityItem, { backgroundColor: cardColor }]}
          >
            <View style={[styles.facilityIcon, { backgroundColor }]}>
              {item.icon}
            </View>
            <View style={styles.facilityContent}>
              <Text style={[styles.facilityTitle, { color: textColor }]}>
                {item.title}
              </Text>
              <Text style={[styles.facilityDescription, { color: mutedColor }]}>
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.wifi, { backgroundColor: cardColor }]}>
        <View style={styles.wifiContent}>
          <WifiHigh size={24} color={iconColor} />
          <Text style={[styles.wifiText, { color: textColor }]}>
            High-Speed campus Wi-Fi coverage
          </Text>
        </View>
        <Ionicons name="checkmark-circle-outline" size={24} color={"green"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: { fontSize: 14, lineHeight: 20 },
  operationalHoursContainer: { gap: 8 },
  sectionHeading: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  subText: { fontSize: 14 },
  operationalHoursInner: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  sectionList: { gap: 12 },
  facilityItem: {
    flexDirection: "column",
    gap: 12,
    padding: 15,
    borderRadius: 20,
  },
  facilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  facilityContent: { flex: 1, gap: 6 },
  facilityTitle: { fontSize: 16, fontWeight: "600" },
  facilityDescription: { fontSize: 14, lineHeight: 19 },
  wifi: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 20,
  },
  wifiContent: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    flexShrink: 1,
  },
  wifiText: { fontSize: 12, flexShrink: 1 },
});
