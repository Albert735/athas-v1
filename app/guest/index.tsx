import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Compass, Wifi, Presentation, Map } from "lucide-react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function GuestScreen() {
  return (
    <SafeAreaView style={styles.container}>
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
            Whether you're here for a tour, a walk, or simply exploring, our
            digital guides ensure you never miss a landmark.
          </Text>
        </View>

        {/* Continue as Guest */}
        <TouchableOpacity style={styles.guestButton} activeOpacity={0.85}>
          <Compass size={24} color="#FFFFFF" />

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
              <Wifi size={20} />

              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Guest Wi-Fi</Text>

                <Text style={styles.infoSubtitle}>
                  Select "Athas-Guest" {"\n"}on arrival.
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Presentation size={20} />

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

  content: {
    paddingHorizontal: SPACING,
    paddingVertical: 24,
    gap: 32,
    flex: 1,
    justifyContent: "flex-end",
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
    backgroundColor: "#000",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 16,
  },

  buttonContent: {
    flex: 1,
    gap: 4,
  },

  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  buttonSubtitle: {
    color: "rgba(255,255,255,0.75)",
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
