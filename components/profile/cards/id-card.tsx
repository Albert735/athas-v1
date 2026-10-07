import { StyleSheet, Text, View } from "react-native";
import { GraduationCap } from "lucide-react-native";

interface IDCardProps {
  /** University name, e.g. "University of Ghana". */
  school?: string;
  /** Student / university ID number. */
  universityId?: string;
  email?: string;
}

export function IDCard({
  school = "University of Ghana",
  universityId,
  email,
}: IDCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>STUDENT IDENTIFICATION</Text>

      <View style={styles.header}>
        <GraduationCap color="#000" size={24} />
        <Text style={styles.school} numberOfLines={1}>
          {school.toUpperCase()}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.id}>{universityId ?? "—"}</Text>
        <Text style={styles.email} numberOfLines={1}>
          {email ?? ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    height: 120,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  school: {
    flex: 1,
    color: "#000",
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  id: {
    color: "#000",
    fontWeight: "600",
  },
  email: {
    flexShrink: 1,
    color: "#374151",
    fontSize: 12,
  },
});
