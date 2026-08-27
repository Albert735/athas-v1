import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { Clock, MapPin, Navigation, Pencil } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColor } from "@/hooks/useColor";
import { useTimetable } from "@/providers/timetable-context";
import { Button } from "@/components/ui/button";

export default function ScheduledClassDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { classes, loading, deleteClass } = useTimetable();

  const selectedClass = classes.find((item) => item.id === id);

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");
  const iconColor = useColor("icon");
  const redColor = useColor("red");

  const handleEdit = () => {
    if (!id) {
      return;
    }

    router.push({
      pathname: "/(drawer)/(tabs)/(schedule)/[id]/edit",
      params: { id },
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.screen, { backgroundColor }]}
        edges={["top", "bottom"]}
      >
        <Header title="Class Details" />
      </SafeAreaView>
    );
  }

  if (!selectedClass) {
    return (
      <SafeAreaView
        style={[styles.screen, { backgroundColor }]}
        edges={["top", "bottom"]}
      >
        <Header title="Class Details" />

        <View style={styles.container}>
          <Text style={[styles.error, { color: redColor }]}>
            Class not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    if (!selectedClass) {
      return;
    }

    Alert.alert(
      "Delete Class",
      `Are you sure you want to delete ${selectedClass.course}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteClass(selectedClass.id);

              router.replace(
                "/(drawer)/(tabs)/(schedule)/scheduled-class-list",
              );
            } catch (error) {
              console.error("Failed to delete class:", error);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor }]}
      edges={["top", "bottom"]}
    >
      <Header
        title="Class Details"
        rightAction={
          <Pressable
            onPress={handleEdit}
            hitSlop={10}
            style={({ pressed }) => ({
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Pencil size={20} color={iconColor} />
          </Pressable>
        }
      />

      <View style={styles.container}>
        {/* Course Header */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: cardColor,
              borderColor,
            },
          ]}
        >
          <Text style={[styles.course, { color: textColor }]}>
            {selectedClass.course}
          </Text>

          <Text style={[styles.code, { color: textMuted }]}>
            {selectedClass.code}
          </Text>

          <View
            style={[
              styles.status,
              {
                backgroundColor: primaryColor,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: primaryForeground,
                },
              ]}
            >
              UPCOMING
            </Text>
          </View>
        </View>

        {/* Time */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: cardColor,
            },
          ]}
        >
          <Clock size={22} color={primaryColor} />

          <View>
            <Text style={[styles.label, { color: textMuted }]}>Time</Text>

            <Text style={[styles.value, { color: textColor }]}>
              {selectedClass.startTime} - {selectedClass.endTime}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: cardColor,
            },
          ]}
        >
          <MapPin size={22} color={primaryColor} />

          <View>
            <Text style={[styles.label, { color: textMuted }]}>Location</Text>

            <Text style={[styles.value, { color: textColor }]}>
              {selectedClass.hall} • {selectedClass.building}
            </Text>
          </View>
        </View>

        {/* Edit Action */}
        {/* <Pressable
          onPress={() =>
            router.push({
              pathname: "/(drawer)/(tabs)/(schedule)/[id]/edit",
              params: { id: selectedClass.id },
            })
          }
          style={({ pressed }) => [
            styles.editButton,
            {
              borderColor,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Pencil size={20} color={textColor} />

          <Text style={[styles.editText, { color: textColor }]}>
            Edit Class
          </Text>
        </Pressable> */}

        {/* Navigation Action */}
        <Button
          icon={Navigation}
          onPress={() =>
            router.push({
              pathname: "/map",
              params: {
                buildingId: selectedClass.buildingId,
                source: "home",
              },
            })
          }
        >
          Navigate to Class
        </Button>

        <Button onPress={handleDelete} style={{ backgroundColor: redColor }}>
          Delete Class
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 20,
    gap: 16,
  },

  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    marginTop: 10,
  },

  course: {
    fontSize: 22,
    fontWeight: "800",
  },

  code: {
    marginTop: 6,
    fontSize: 14,
  },

  status: {
    alignSelf: "flex-start",
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    borderRadius: 18,
  },

  label: {
    fontSize: 12,
  },

  value: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
  },

  navigateButton: {
    marginTop: 20,
    height: 54,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  navigateText: {
    fontWeight: "700",
    fontSize: 15,
  },

  error: {
    fontSize: 16,
    fontWeight: "600",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },

  editText: {
    fontSize: 15,
    fontWeight: "600",
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 10,
  },

  deleteText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
