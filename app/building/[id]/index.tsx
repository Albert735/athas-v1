import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { ParallaxScrollView } from "@/components/ui/parallax-scrollview";
import { buildingData } from "@/data/buildings";
import {
  Brain,
  Clock4,
  FlaskConical,
  Utensils,
  WifiHigh,
} from "lucide-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { StatusBar } from "expo-status-bar";
import { Heart, Share2 } from "lucide-react-native";
import { Pressable, Share } from "react-native";
import { useState } from "react";

interface FacilityItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AccessibilityItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

type OperatingStatus = {
  isOpen: boolean;
};

// TODO: replace with real operational-hours logic once building data is wired up
function getBuildingStatus(): OperatingStatus {
  return { isOpen: true };
}

const accessibility: AccessibilityItem[] = [
  {
    id: "1",
    title: "Ramp Access",
    description: "Wheelchair accessible ramps at all entrances",
    icon: (
      <MaterialCommunityIcons
        name="wheelchair-accessibility"
        size={24}
        color="black"
      />
    ),
  },
  {
    id: "2",
    title: "Elevator Access",
    description: "Elevator access to all floors",
    icon: <MaterialCommunityIcons name="elevator" size={24} color="black" />,
  },
  {
    id: "3",
    title: "Restroom Access",
    description: "Restrooms on all floors",
    icon: <MaterialIcons name="wc" size={24} color="black" />,
  },
];

const facilities: FacilityItem[] = [
  {
    id: "1",
    title: "Central Cafeteria",
    description:
      "Gourmet coffee and healthy meal options with indoor and outdoor seating",
    icon: <Utensils />,
  },
  {
    id: "2",
    title: "Study Hub",
    description: "Level 2 South Wing",
    icon: <Brain />,
  },
  {
    id: "3",
    title: "Lab Access",
    description: "ID required",
    icon: <FlaskConical />,
  },
];

export default function BuildingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const status = getBuildingStatus();

  const [isFavorited, setIsFavorited] = useState(false);

  const handleShare = () => {
    Share.share({
      message:
        "Check out this building on Athas: https://athas.app/building/" + id,
      title: "Check out this building",
    });
  };

  return (
    <ParallaxScrollView
      headerHeight={460}
      headerImage={
        <Image
          source={require("@/assets/images/building-1.jpg")}
          style={{ position: "relative", width: "100%", height: "100%" }}
          contentFit="cover"
        />
      }
      headerOverlay={
        <>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <SafeAreaView edges={["top"]}>
            <Header title="Building Details" variant="transparent" />
          </SafeAreaView>
        </>
      }
    >
      <View style={styles.container}>
        <View style={styles.badgeRow}>
          <View style={styles.badgeRowActions}>
            <Pressable
              onPress={() => setIsFavorited((prev) => !prev)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={
                isFavorited ? "Remove from favorites" : "Add to favorites"
              }
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
              ]}
            >
              <Heart
                size={20}
                color={isFavorited ? "#E23744" : "#111"}
                fill={isFavorited ? "#E23744" : "transparent"}
              />
            </Pressable>

            <Pressable
              onPress={handleShare}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Share this building"
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
              ]}
            >
              <Share2 size={20} color="#111" />
            </Pressable>
          </View>

          <View
            style={[
              styles.statusBadge,
              status.isOpen ? styles.statusBadgeOpen : styles.statusBadgeClosed,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                status.isOpen ? styles.statusDotOpen : styles.statusDotClosed,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                status.isOpen ? styles.statusTextOpen : styles.statusTextClosed,
              ]}
            >
              {status.isOpen ? "Open now" : "Closed"}
            </Text>
          </View>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={buildingData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.carouselContent}
          renderItem={({ item }) => (
            <Image
              source={item.image}
              style={styles.carouselImage}
              contentFit="cover"
            />
          )}
        />

        <Text style={styles.description}>
          The main hub for Faculty of Computing and Information Technology
          (FCIT). Student Affairs, lecture halls, and academic resources.
        </Text>

        <View style={styles.operationalHoursContainer}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#111",
              marginBottom: 4,
            }}
          >
            Operational Hours
          </Text>
          <Text style={styles.subText}>Monday – Saturday</Text>

          <View style={styles.operationalHours}>
            <View style={styles.operationalHoursInner}>
              <Clock4 size={20} />
              <Text style={styles.subText}>Open Today</Text>
              <Text style={styles.subText}>7:00 AM – 6:00 PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>Facilities & Amenities</Text> */}

          <View style={styles.sectionList}>
            {facilities.map((item) => (
              <View key={item.id} style={styles.facilityItem}>
                <View style={styles.facilityIcon}>{item.icon}</View>
                <View style={styles.facilityContent}>
                  <Text style={styles.facilityTitle}>{item.title}</Text>
                  <Text style={styles.facilityDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.wifi}>
            <View style={styles.wifiContent}>
              <WifiHigh size={24} />
              <Text style={styles.wifiText}>
                High-Speed campus Wi-Fi coverage
              </Text>
            </View>
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
          </View>
        </View>

        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>Accessibility</Text> */}

          <View style={styles.sectionList}>
            {accessibility.map((item) => (
              <View key={item.id} style={styles.accessibilityItem}>
                <View style={styles.accessibilityIcon}>{item.icon}</View>
                <View style={styles.accessibilityContent}>
                  <Text style={styles.accessibilityTitle}>{item.title}</Text>
                  <Text style={styles.accessibilityDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* contact building concierge */}
        <View style={styles.needAssistance}>
          <Text style={styles.sectionTitle}>Need Assistance</Text>
          <Text style={styles.needAssistanceText}>
            Our building concierge is available for floor plans, technical
            support, and general inquiries.
          </Text>

          <Button variant="default" onPress={() => {}}>
            Contact Building Concierge
          </Button>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 20,
  },

  // Badge
  badgeRow: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
  },
  badgeRowActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
  },
  actionButtonPressed: {
    opacity: 0.6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeOpen: {
    backgroundColor: "#D6FCDB",
  },
  statusBadgeClosed: {
    backgroundColor: "#FCE0E0",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotOpen: {
    backgroundColor: "#1E9E4A",
  },
  statusDotClosed: {
    backgroundColor: "#C23B3B",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextOpen: {
    color: "#146C34",
  },
  statusTextClosed: {
    color: "#8A2626",
  },

  // Carousel
  carouselContent: {
    gap: 12,
  },
  carouselImage: {
    width: 180,
    height: 150,
    borderRadius: 12,
  },

  // Description
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#999898",
  },

  // Shared section styles
  section: {
    gap: 16,
  },
  sectionList: {
    gap: 12,
    // backgroundColor: "red",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#444",
  },

  // Operational hours
  operationalHoursContainer: {
    gap: 8,
  },
  operationalHours: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  operationalHoursInner: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Facilities
  facilityItem: {
    flexDirection: "column",
    gap: 12,
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
  },
  facilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  facilityContent: {
    flex: 1,
    gap: 6,
  },
  facilityTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  facilityDescription: {
    fontSize: 14,
    lineHeight: 19,
    color: "#666",
  },

  // Wifi
  wifi: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
  },
  wifiContent: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    flexShrink: 1,
  },
  wifiText: {
    fontSize: 12,
    flexShrink: 1,
  },

  // Accessibility
  accessibilityItem: {
    flexDirection: "row",
    gap: 12,
    padding: 15,
  },
  accessibilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  accessibilityContent: {
    flex: 1,
    gap: 6,
  },
  accessibilityTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  accessibilityDescription: {
    fontSize: 14,
    lineHeight: 19,
    color: "#666",
  },

  // Need assistance
  needAssistance: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 50,
  },
  needAssistanceText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
});
