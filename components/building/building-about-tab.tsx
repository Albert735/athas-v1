import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/components/ui/button";
import { useColor } from "@/hooks/useColor";

interface AccessibilityItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Props {
  description: string;
  accessibility: AccessibilityItem[];
  onContactConcierge: () => void;
}

export function BuildingAboutTab({
  description,
  accessibility,
  onContactConcierge,
}: Props) {
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");

  return (
    <View style={{ gap: 16 }}>
      <Text style={[styles.description, { color: mutedColor }]}>
        {description}
      </Text>

      <View style={styles.sectionList}>
        {accessibility.map((item) => (
          <View key={item.id} style={styles.accessibilityItem}>
            <View
              style={[styles.accessibilityIcon, { backgroundColor: cardColor }]}
            >
              {item.icon}
            </View>
            <View style={styles.accessibilityContent}>
              <Text style={[styles.accessibilityTitle, { color: textColor }]}>
                {item.title}
              </Text>
              <Text
                style={[styles.accessibilityDescription, { color: mutedColor }]}
              >
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.needAssistance}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Need Assistance
        </Text>
        <Text style={[styles.needAssistanceText, { color: mutedColor }]}>
          Our building concierge is available for floor plans, technical
          support, and general inquiries.
        </Text>
        <Button variant="default" onPress={onContactConcierge}>
          Contact Building Concierge
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: { fontSize: 14, lineHeight: 20 },
  sectionList: { gap: 12 },
  accessibilityItem: { flexDirection: "row", gap: 12, padding: 15 },
  accessibilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  accessibilityContent: { flex: 1, gap: 6 },
  accessibilityTitle: { fontSize: 16, fontWeight: "600" },
  accessibilityDescription: { fontSize: 14, lineHeight: 19 },
  needAssistance: {
    flexDirection: "column",
    gap: 12,
    marginTop: 20,
    marginBottom: 50,
  },
  sectionTitle: { fontWeight: "600", fontSize: 16, textAlign: "center" },
  needAssistanceText: { fontSize: 12, textAlign: "center" },
});
