import { places } from "@/data/places";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useColor } from "@/hooks/useColor";
import { router } from "expo-router";
import { MAP_ACTIONS } from "@/data/map-actions";
import { Clock, Navigation, X } from "lucide-react-native";
import { Button } from "../ui/button";
import { Image } from "expo-image";
import { categoryImages } from "@/data/category-images";

interface Props {
  place: (typeof places)[number];
  onDirections?: () => void;
  onClose?: () => void;
  distanceOverride?: string;
  isOpenOverride?: boolean;
}

export default function MapDetailsCard({
  place,
  onDirections,
  onClose,
  distanceOverride,
  isOpenOverride,
}: Props) {
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");

  const distanceLabel = distanceOverride ?? place.distance;

  const isCurrentlyOpen = isOpenOverride ?? place.isOpen;

  return (
    <View
      style={[
        styles.sheet,
        {
          backgroundColor: cardColor,
        },
      ]}
    >
      {onClose && (
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              backgroundColor,
            },
          ]}
          onPress={onClose}
        >
          <X size={16} color={mutedColor} />
        </TouchableOpacity>
      )}

      <View style={styles.imageWrapper}>
        <Image
          source={categoryImages[place.category] ?? categoryImages.library}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <View style={styles.nameRow}>
        <View style={styles.nameInfo}>
          <Text
            style={[
              styles.buildingName,
              {
                color: textColor,
              },
            ]}
          >
            {place.name}
          </Text>

          <Text
            style={[
              styles.buildingDept,
              {
                color: mutedColor,
              },
            ]}
            numberOfLines={1}
          >
            {place.description}
          </Text>
        </View>

        <Text style={styles.duration}>{distanceLabel}</Text>
      </View>

      <View style={styles.actions}>
        {MAP_ACTIONS.map((action, index) => {
          const Icon = action.icon;

          return (
            <TouchableOpacity
              key={action.id}
              style={[
                styles.actionButton,
                {
                  backgroundColor,
                },
                index === 0 && styles.actionButtonPrimary,
              ]}
              onPress={() => {
                if (action.id === "info") {
                  router.push(`/building/${place.id}`);
                }
              }}
            >
              <Icon size={16} color={index === 0 ? "#FFFFFF" : mutedColor} />

              <Text
                style={[
                  styles.actionLabel,
                  {
                    color: mutedColor,
                  },
                  index === 0 && styles.actionLabelPrimary,
                ]}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={[
          styles.hoursRow,
          {
            borderTopColor: borderColor,
          },
        ]}
      >
        <Clock size={16} color={mutedColor} />

        <Text
          style={[
            styles.hoursText,
            {
              color: mutedColor,
            },
          ]}
        >
          {place.hours}
        </Text>

        <Text
          style={[
            styles.hoursDot,
            {
              color: mutedColor,
            },
          ]}
        >
          •
        </Text>

        <Text
          style={[
            styles.hoursDays,
            {
              color: mutedColor,
            },
          ]}
        >
          {place.days}
        </Text>

        <View
          style={[
            styles.statusBadge,
            isCurrentlyOpen ? styles.statusOpen : styles.statusClosed,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isCurrentlyOpen ? styles.statusTextOpen : styles.statusTextClosed,
            ]}
          >
            {isCurrentlyOpen ? "Open" : "Closed"}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.description,
          {
            color: mutedColor,
          },
        ]}
      >
        {place.description}
      </Text>

      <View style={styles.footer}>
        <Button variant="default" icon={Navigation} onPress={onDirections}>
          Directions
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    margin: 16,
    borderRadius: 40,
  },

  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  imageWrapper: {
    height: 150,
    borderRadius: 25,
    marginBottom: 20,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    gap: 12,
  },

  nameInfo: {
    flex: 1,
  },

  buildingName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },

  buildingDept: {
    fontSize: 14,
    fontWeight: "500",
  },

  duration: {
    fontSize: 15,
    fontWeight: "600",
    color: "#10B981",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  actionButton: {
    flex: 1,
    height: 32,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  actionButtonPrimary: {
    backgroundColor: "#10B981",
  },

  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
  },

  actionLabelPrimary: {
    color: "#FFFFFF",
  },

  hoursRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
  },

  hoursText: {
    fontSize: 14,
    fontWeight: "500",
  },

  hoursDot: {
    fontSize: 16,
  },

  hoursDays: {
    fontSize: 14,
    fontWeight: "500",
  },

  statusBadge: {
    marginLeft: "auto",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },

  statusOpen: {
    backgroundColor: "#ECFDF5",
  },

  statusClosed: {
    backgroundColor: "#FEF2F2",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  statusTextOpen: {
    color: "#10B981",
  },

  statusTextClosed: {
    color: "#EF4444",
  },

  description: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
    lineHeight: 20,
  },

  footer: {
    marginTop: 24,
  },
});
