import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { formatDistance, formatDuration } from "@/utils/directions";

const BADGE_SIZE = 120;

interface Props {
  /** Name of the place the student has reached. */
  destination: string;
  /** Length of the route they followed, in metres. */
  distanceMeters: number;
  /** How long the walk actually took, in seconds. */
  durationSeconds: number;
  onDone: () => void;
}

/**
 * Full-screen "You've arrived" celebration shown when navigation ends at the
 * destination.
 */
export function ArrivedScreen({
  destination,
  distanceMeters,
  durationSeconds,
  onDone,
}: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;
  const contentShift = useRef(new Animated.Value(24)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const ring = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.delay(150),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(contentShift, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const pulse = Animated.loop(
      Animated.timing(ring, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    );
    pulse.start();

    return () => pulse.stop();
  }, [fade, badgeScale, contentShift, contentOpacity, ring]);

  return (
    <Animated.View style={[styles.overlay, { opacity: fade }]}>
      <LinearGradient
        colors={["#000000", "#052E1A", "#16A34A"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.badgeWrap}>
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  opacity: ring.interpolate({
                    inputRange: [0, 0.2, 1],
                    outputRange: [0, 0.4, 0],
                  }),
                  transform: [
                    {
                      scale: ring.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 2.2],
                      }),
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[styles.badge, { transform: [{ scale: badgeScale }] }]}
            >
              <MaterialIcons name="check" size={64} color="#16A34A" />
            </Animated.View>
          </View>

          <Animated.View
            style={[
              styles.content,
              {
                opacity: contentOpacity,
                transform: [{ translateY: contentShift }],
              },
            ]}
          >
            <Text style={styles.kicker}>YOU&apos;VE ARRIVED</Text>

            <Text style={styles.destination} numberOfLines={3}>
              {destination}
            </Text>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {formatDistance(distanceMeters)}
                </Text>
                <Text style={styles.statLabel}>Distance</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {formatDuration(durationSeconds)}
                </Text>
                <Text style={styles.statLabel}>Time</Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <Animated.View style={{ opacity: contentOpacity }}>
          <Button onPress={onDone} style={styles.doneButton}>
            Done
          </Button>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    elevation: 100,
  },

  safe: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 36,
  },

  badgeWrap: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  pulseRing: {
    position: "absolute",
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 2,
    borderColor: "#fff",
  },

  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    alignItems: "center",
    gap: 12,
    width: "100%",
  },

  kicker: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
  },

  destination: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    textAlign: "center",
  },

  stats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.12)",
    width: "100%",
  },

  stat: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },

  statValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  statLabel: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
  },

  divider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  doneButton: {
    width: "100%",
  },
});
