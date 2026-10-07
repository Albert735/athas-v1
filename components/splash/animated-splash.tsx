import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

const LOGO = require("../../assets/images/raute-splash-icon-1024.png");

/** Same size as the native launch screen's logo, so the hand-off is seamless. */
const LOGO_SIZE = 200;

/** The animation always plays at least this long, even if sign-in is instant. */
const MIN_VISIBLE_MS = 3500;

const RING_COUNT = 3;
const RING_DURATION = 2400;

interface Props {
  /** True once the app has restored the saved session and can show a screen. */
  ready: boolean;
}

/**
 * Animated launch screen.
 *
 * The native splash (black, white Raute mark) is hidden as soon as this
 * mounts. This component draws the same black screen and mark, then plays a
 * short "radar" animation, reveals the wordmark, and fades out once `ready`.
 */
export function AnimatedSplash({ ready }: Props) {
  const [visible, setVisible] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);

  const logoScale = useRef(new Animated.Value(1)).current;
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const wordShift = useRef(new Animated.Value(14)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const rings = useRef(
    Array.from({ length: RING_COUNT }, () => new Animated.Value(0)),
  ).current;

  // Intro: logo pop, wordmark rise, tagline, repeating radar rings.
  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 0.82,
        duration: 380,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(450),
      Animated.parallel([
        Animated.timing(wordOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(wordShift, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(tagOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();

    const loops = rings.map((ring, index) => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.delay((RING_DURATION / RING_COUNT) * index),
          Animated.timing(ring, {
            toValue: 1,
            duration: RING_DURATION,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return loop;
    });

    const timer = setTimeout(() => setMinTimePassed(true), MIN_VISIBLE_MS);

    return () => {
      clearTimeout(timer);
      loops.forEach((loop) => loop.stop());
    };
  }, [logoScale, wordOpacity, wordShift, tagOpacity, rings]);

  // Exit: once the app is ready and the intro has had its moment, fade away.
  useEffect(() => {
    if (!ready || !minTimePassed) return;

    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1.25,
        duration: 450,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  }, [ready, minTimePassed, logoScale, overlayOpacity]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.overlay, { opacity: overlayOpacity }]}
      // Swap the native splash for this identical-looking screen.
      onLayout={() => SplashScreen.hideAsync().catch(() => {})}
      pointerEvents="auto"
    >
      <View style={styles.center}>
        {rings.map((ring, index) => (
          <Animated.View
            key={index}
            style={[
              styles.ring,
              {
                opacity: ring.interpolate({
                  inputRange: [0, 0.15, 1],
                  outputRange: [0, 0.35, 0],
                }),
                transform: [
                  {
                    scale: ring.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 2.6],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}

        <Animated.Image
          source={LOGO}
          resizeMode="contain"
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        />
      </View>

      <View style={styles.textBlock}>
        <Animated.Text
          style={[
            styles.wordmark,
            {
              opacity: wordOpacity,
              transform: [{ translateY: wordShift }],
            },
          ]}
        >
          RAUTE
        </Animated.Text>

        <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
          Find your way around Legon
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    elevation: 9999,
  },

  center: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },

  ring: {
    position: "absolute",
    width: LOGO_SIZE * 0.5,
    height: LOGO_SIZE * 0.5,
    borderRadius: LOGO_SIZE,
    borderWidth: 1.5,
    borderColor: "#fff",
  },

  textBlock: {
    position: "absolute",
    bottom: 96,
    alignItems: "center",
    gap: 8,
  },

  wordmark: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 10,
    paddingLeft: 10, // balances the trailing letter-spacing so it centres
  },

  tagline: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
