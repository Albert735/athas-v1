import { useRef } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Compass, Wifi, Presentation, Map } from "lucide-react-native";
import { router } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import MapboxGL from "@rnmapbox/maps";

const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

const MAP_STYLE_URL = MapboxGL.StyleURL.Satellite;

export default function GuestScreen() {
  const iconColor = useColor("text");
  const borderColor = useColor("border");
  const cardColor = useColor("card");

  const cameraRef = useRef<MapboxGL.Camera>(null);
  return (
    <SafeAreaView style={styles.container}>
      <MapboxGL.MapView
        style={StyleSheet.absoluteFill}
        styleURL={MapboxGL.StyleURL.Street}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled
        pitchEnabled
      >
        <MapboxGL.Camera
          ref={cameraRef}
          zoomLevel={16}
          centerCoordinate={CAMPUS_CENTER}
          animationMode="flyTo"
          animationDuration={0}
        />
      </MapboxGL.MapView>

      {/* ── Header ─────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Octicons name="arrow-left" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          {/* <View style={styles.iconContainer}>
            <Compass size={40} />
          </View> */}

          <Text style={styles.title}>Explore the Athas Landscape</Text>

          <Text style={styles.subtitle}>
            Whether you&apos;re here for a tour, a walk, or simply exploring,
            our digital guides ensure you never miss a landmark.
          </Text>
        </View>

        {/* Continue as Guest */}
        <TouchableOpacity
          style={[
            styles.guestButton,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <Compass size={24} color={iconColor} />

          <View style={styles.buttonContent}>
            <Text style={styles.buttonTitle}>Continue as Guest</Text>

            <Text style={styles.buttonSubtitle}>
              Immediate access to the campus map
            </Text>
          </View>
        </TouchableOpacity>

        {/* Quick Information */}
        <View style={styles.infoSection}>
          <View style={styles.cardContainer}>
            <View style={styles.infoCard}>
              <Wifi size={20} color={iconColor} />

              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Guest Wi-Fi</Text>

                <Text style={styles.infoSubtitle}>
                  Select &quot;Athas-Guest&quot; {"\n"}on arrival.
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Presentation size={20} color={iconColor} />

              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Public Events</Text>

                <Text style={styles.infoSubtitle}>
                  Football match at Legon {"\n"}Stadium.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Map CTA */}
        <Button icon={Map} style={styles.mapButton}>
          View Campus Map
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const SPACING = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: "100%",
    paddingHorizontal: SPACING,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    padding: 4,
  },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: SPACING,
    paddingTop: 28,
    paddingBottom: 24,
    gap: 28,
    marginTop: "auto",
  },

  hero: {
    alignItems: "flex-start",
    gap: 20,
    marginTop: 20,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.7,
    maxWidth: 320,
  },

  guestButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 16,
  },

  buttonContent: {
    flex: 1,
    gap: 4,
  },

  buttonTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  buttonSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  infoSection: {
    gap: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  infoCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoContent: {
    gap: 4,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  infoSubtitle: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
  },

  mapButton: {
    width: "100%",
    height: 52,
    marginTop: 8,
  },
});
