// File: (auth)/guest/index.tsx – purpose: Guest landing screen, plus a read-only campus map for signed-out visitors.
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Compass, Map, Presentation, Wifi } from "lucide-react-native";
import { router } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import MapboxGL from "@rnmapbox/maps";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";

const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

const INFO = [
  {
    icon: Wifi,
    title: "Guest Wi-Fi",
    subtitle: 'Join "Raute-Guest" when you arrive.',
  },
  {
    icon: Presentation,
    title: "Public Events",
    subtitle: "Football match at Legon Stadium.",
  },
] as const;

export default function GuestScreen() {
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");

  const cameraRef = useRef<MapboxGL.Camera>(null);

  // false = landing page, true = full-screen read-only campus map.
  const [exploring, setExploring] = useState(false);

  /*
   * Leaving while the map is still starting up (back / Sign In tapped right
   * after opening it) removes the MapView before its native side has
   * registered, which makes Mapbox log "Could not find view with tag ...".
   * So any action that would unmount the map waits until it has loaded.
   */
  const mapReady = useRef(false);
  const pendingAction = useRef<(() => void) | null>(null);

  const afterMapReady = (action: () => void) => {
    if (!exploring || mapReady.current) {
      action();
    } else {
      pendingAction.current = action;
    }
  };

  const handleMapLoaded = () => {
    mapReady.current = true;

    const action = pendingAction.current;
    pendingAction.current = null;
    action?.();
  };

  const closeMap = () => {
    mapReady.current = false;
    pendingAction.current = null;
    setExploring(false);
  };

  const handleBack = () =>
    afterMapReady(() => (exploring ? closeMap() : router.back()));

  const handleSignIn = () =>
    afterMapReady(() => router.replace("/(auth)/sign-in"));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* The map is only mounted once the visitor chooses to explore. */}
      {exploring ? (
        <MapboxGL.MapView
          style={StyleSheet.absoluteFill}
          styleURL={MapboxGL.StyleURL.Street}
          logoEnabled={false}
          attributionEnabled={false}
          compassEnabled
          pitchEnabled
          onDidFinishLoadingMap={handleMapLoaded}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={16}
            centerCoordinate={CAMPUS_CENTER}
            animationMode="flyTo"
            animationDuration={0}
          />
        </MapboxGL.MapView>
      ) : null}

      {/* Back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={[
            styles.backButton,
            { backgroundColor: cardColor, borderColor },
          ]}
          hitSlop={8}
        >
          <Octicons name="arrow-left" size={20} color={textColor} />
        </TouchableOpacity>
      </View>

      {exploring ? (
        <View style={styles.exploreBar} pointerEvents="box-none">
          <View
            style={[
              styles.exploreCard,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <Text style={[styles.exploreText, { color: mutedColor }]}>
              Sign in for directions, your timetable and reminders.
            </Text>

            <Button onPress={handleSignIn}>
              Sign In
            </Button>
          </View>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <View
              style={[
                styles.logoTile,
                { backgroundColor: cardColor, borderColor },
              ]}
            >
              <Compass size={34} color={primaryColor} />
            </View>

            <Text style={[styles.title, { color: textColor }]}>
              Explore Legon,{"\n"}no account needed
            </Text>

            <Text style={[styles.subtitle, { color: mutedColor }]}>
              Browse the campus map, find landmarks and get your bearings. Sign
              in later for directions and your own timetable.
            </Text>
          </View>

          {/* Primary action */}
          <Button
            icon={Map}
            style={styles.primaryButton}
            onPress={() => setExploring(true)}
          >
            Continue as Guest
          </Button>

          {/* Good to know */}
          <View style={styles.infoSection}>
            <Text style={[styles.sectionLabel, { color: mutedColor }]}>
              GOOD TO KNOW
            </Text>

            {INFO.map(({ icon: Icon, title, subtitle }) => (
              <View
                key={title}
                style={[
                  styles.infoCard,
                  { backgroundColor: cardColor, borderColor },
                ]}
              >
                <View style={[styles.infoIcon, { backgroundColor }]}>
                  <Icon size={20} color={textColor} />
                </View>

                <View style={styles.infoContent}>
                  <Text style={[styles.infoTitle, { color: textColor }]}>
                    {title}
                  </Text>

                  <Text style={[styles.infoSubtitle, { color: mutedColor }]}>
                    {subtitle}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Footer */}
          <Text style={[styles.footer, { color: mutedColor }]}>
            Already have an account?{" "}
            <Text
              style={[styles.footerLink, { color: primaryColor }]}
              onPress={() => router.replace("/(auth)/sign-in")}
            >
              Sign in
            </Text>
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const SPACING = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: SPACING,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Landing */
  content: {
    paddingHorizontal: SPACING,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 28,
  },

  hero: {
    gap: 16,
  },

  logoTile: {
    width: 72,
    height: 72,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },

  primaryButton: {
    width: "100%",
  },

  infoSection: {
    gap: 12,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
  },

  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
    gap: 2,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  infoSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  footer: {
    textAlign: "center",
    fontSize: 14,
  },

  footerLink: {
    fontWeight: "700",
  },

  /* Explore mode */
  exploreBar: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    paddingHorizontal: SPACING,
    paddingBottom: 24,
  },

  exploreCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },

  exploreText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
