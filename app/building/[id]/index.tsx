import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Share,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { ParallaxScrollView } from "@/components/ui/parallax-scrollview";
import { buildingData } from "@/data/buildings";
import {
  Brain,
  Clock4,
  FlaskConical,
  Utensils,
  WifiHigh,
  Heart,
  Share2,
  ArrowRight,
} from "lucide-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";
import { categoryImages } from "@/data/category-images";

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

type OperatingStatus = { isOpen: boolean };

function getBuildingStatus(): OperatingStatus {
  return { isOpen: true };
}

/**
 * BuildingDetailsScreen Component
 *
 * Displays detailed information about a specific building/place by ID.
 * Features parallax hero image, accessibility amenities, facility highlights, favorite toggle, and share action.
 */
export default function BuildingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const foundPlace = places.find((p) => p.id === id);

  const status = getBuildingStatus();
  const [isFavorited, setIsFavorited] = useState(false);

  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const iconColor = useColor("icon");
  const borderColor = useColor("border");

  const accessibility: AccessibilityItem[] = [
    {
      id: "1",
      title: "Ramp Access",
      description: "Wheelchair accessible ramps at all entrances",
      icon: (
        <MaterialCommunityIcons
          name="wheelchair-accessibility"
          size={24}
          color={iconColor}
        />
      ),
    },
    {
      id: "2",
      title: "Elevator Access",
      description: "Elevator access to all floors",
      icon: (
        <MaterialCommunityIcons name="elevator" size={24} color={iconColor} />
      ),
    },
    {
      id: "3",
      title: "Restroom Access",
      description: "Restrooms on all floors",
      icon: <MaterialIcons name="wc" size={24} color={iconColor} />,
    },
  ];

  const facilities: FacilityItem[] = [
    {
      id: "1",
      title: "Central Cafeteria",
      description:
        "Gourmet coffee and healthy meal options with indoor and outdoor seating",
      icon: <Utensils size={20} color={iconColor} />,
    },
    {
      id: "2",
      title: "Study Hub",
      description: "Level 2 South Wing",
      icon: <Brain size={20} color={iconColor} />,
    },
    {
      id: "3",
      title: "Lab Access",
      description: "ID required",
      icon: <FlaskConical size={20} color={iconColor} />,
    },
  ];

  if (!foundPlace) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <Header title="Not Found" showBack />
        <Text style={{ padding: 20, color: mutedColor }}>Place not found.</Text>
      </SafeAreaView>
    );
  }

  const place = foundPlace; // now TS knows this is defined

  const handleShare = () => {
    Share.share({
      message: `Check out ${place.name} on Athas: https://athas.app/building/${id}`,
      title: "Check out this location",
    });
  };

  return (
    <ParallaxScrollView
      headerHeight={460}
      headerImage={
        <Image
          source={categoryImages[place.category] ?? categoryImages.library}
          style={{ position: "relative", width: "100%", height: "100%" }}
          contentFit="cover"
        />
      }
      headerOverlay={
        <>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <SafeAreaView edges={["top"]}>
            <Header title={place.name} variant="transparent" />
          </SafeAreaView>
        </>
      }
    >
      <View style={[styles.container, { backgroundColor }]}>
        {/* Badge row */}
        <View style={styles.badgeRow}>
          <View style={styles.badgeRowActions}>
            <Pressable
              onPress={() => setIsFavorited((prev) => !prev)}
              hitSlop={8}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: cardColor },
                pressed && styles.actionButtonPressed,
              ]}
            >
              <Heart
                size={20}
                color={isFavorited ? "#E23744" : iconColor}
                fill={isFavorited ? "#E23744" : "transparent"}
              />
            </Pressable>

            <Pressable
              onPress={handleShare}
              hitSlop={8}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: cardColor },
                pressed && styles.actionButtonPressed,
              ]}
            >
              <Share2 size={20} color={iconColor} />
            </Pressable>
          </View>

          <View
            style={[
              styles.statusBadge,
              place.isOpen ? styles.statusBadgeOpen : styles.statusBadgeClosed,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                place.isOpen ? styles.statusDotOpen : styles.statusDotClosed,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                place.isOpen ? styles.statusTextOpen : styles.statusTextClosed,
              ]}
            >
              {place.isOpen ? "Open now" : "Closed"}
            </Text>
          </View>
        </View>
        {/* Description */}
        <Text style={[styles.description, { color: mutedColor }]}>
          {place.description}
        </Text>
        {/* Carousel */}
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
        <Button
          icon={ArrowRight}
          size="sm"
          onPress={() => router.push(`/map?buildingId=${id}`)}
        >
          Navigate
        </Button>

        {/* Operational Hours */}
        <View style={styles.operationalHoursContainer}>
          <Text style={[styles.sectionHeading, { color: textColor }]}>
            Operational Hours
          </Text>
          <Text style={[styles.subText, { color: mutedColor }]}>
            {place.days}
          </Text>
          <View style={styles.operationalHours}>
            <View style={styles.operationalHoursInner}>
              <Clock4 size={20} color={iconColor} />
              <Text style={[styles.subText, { color: mutedColor }]}>
                {place.isOpen ? "Open Today" : "Closed Today"}
              </Text>
              <Text style={[styles.subText, { color: mutedColor }]}>
                {place.hours}
              </Text>
            </View>
          </View>
        </View>
        {/* Facilities */}
        <View style={styles.section}>
          <View style={styles.sectionList}>
            {facilities.map((item) => (
              <View
                key={item.id}
                style={[styles.facilityItem, { backgroundColor: cardColor }]}
              >
                <View
                  style={[
                    styles.facilityIcon,
                    { backgroundColor: backgroundColor },
                  ]}
                >
                  {item.icon}
                </View>
                <View style={styles.facilityContent}>
                  <Text style={[styles.facilityTitle, { color: textColor }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.facilityDescription, { color: mutedColor }]}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Wifi */}
          <View style={[styles.wifi, { backgroundColor: cardColor }]}>
            <View style={styles.wifiContent}>
              <WifiHigh size={24} color={iconColor} />
              <Text style={[styles.wifiText, { color: textColor }]}>
                High-Speed campus Wi-Fi coverage
              </Text>
            </View>
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={iconColor}
            />
          </View>
        </View>
        {/* Accessibility */}
        <View style={styles.section}>
          <View style={styles.sectionList}>
            {accessibility.map((item) => (
              <View key={item.id} style={styles.accessibilityItem}>
                <View
                  style={[
                    styles.accessibilityIcon,
                    { backgroundColor: cardColor },
                  ]}
                >
                  {item.icon}
                </View>
                <View style={styles.accessibilityContent}>
                  <Text
                    style={[styles.accessibilityTitle, { color: textColor }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.accessibilityDescription,
                      { color: mutedColor },
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Need Assistance */}
        <View style={styles.needAssistance}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Need Assistance
          </Text>
          <Text style={[styles.needAssistanceText, { color: mutedColor }]}>
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
    width: "100%",
    padding: 20,
  },
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
  carouselContent: {
    gap: 12,
  },
  carouselImage: {
    width: 180,
    height: 150,
    borderRadius: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    gap: 16,
  },
  sectionList: {
    gap: 12,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
  },
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
  facilityItem: {
    flexDirection: "column",
    gap: 12,
    padding: 15,
    borderRadius: 30,
  },
  facilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
  },
  wifi: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
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
  accessibilityItem: {
    flexDirection: "row",
    gap: 12,
    padding: 15,
  },
  accessibilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
  },
  needAssistance: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 50,
  },
  needAssistanceText: {
    fontSize: 12,
    textAlign: "center",
  },
});
